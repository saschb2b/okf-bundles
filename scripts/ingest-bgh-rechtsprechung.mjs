#!/usr/bin/env node
// ingest-bgh-rechtsprechung.mjs
//
// Populate the bgh-rechtsprechung bundle from the official open data of
// "Rechtsprechung im Internet" (Bundesamt fuer Justiz). Entscheidungen and
// their amtliche Leitsaetze are amtliche Werke and gemeinfrei (s 5 UrhG), so
// the full text may be stored verbatim.
//
// Source model (verified against the rii-dok.dtd, juris GmbH, v1):
//   - Table of contents: https://www.rechtsprechung-im-internet.de/rii-toc.xml
//     A flat list of <item> elements; each has at least <gericht> and <link>.
//     <link> points to a per-decision .zip containing one <doknr>.xml.
//   - Decision document root <dokument> with children incl. doknr, ecli,
//     gertyp, gerort, spruchkoerper, entsch-datum, aktenzeichen, doktyp, norm,
//     titelzeile, leitsatz, tenor, tatbestand, entscheidungsgruende, gruende.
//
// One decision becomes one concept at
//   entscheidungen/<senat>/<jahr>/<aktenzeichen>.md   (type: Gerichtsentscheidung)
//
// USAGE
//   node scripts/ingest-bgh-rechtsprechung.mjs --selftest          # offline, no network
//   node scripts/ingest-bgh-rechtsprechung.mjs --limit 5           # smoke test: 5 BGH decisions
//   node scripts/ingest-bgh-rechtsprechung.mjs --since 2020        # only entsch-datum year >= 2020
//   node scripts/ingest-bgh-rechtsprechung.mjs                     # full batch (large, slow)
//
// FLAGS
//   --limit N     stop after N newly written decisions
//   --since YYYY  skip decisions older than this year
//   --delay MS    pause between document downloads (default 300)
//   --out DIR     bundle root (default bundles/bgh-rechtsprechung)
//   --toc URL     override the table-of-contents URL
//   --selftest    run the embedded fixture through parse+emit and exit (no network)
//
// Resumable: a decision whose target file already exists is skipped. Run the
// smoke test (--limit) against real data first to confirm the field mapping
// before the full batch, then regenerate navigation (see overview.md).
// Zero dependencies (node:zlib, node:fs, global fetch; Node 18+).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { inflateRawSync } from "node:zlib";

const TOC_DEFAULT = "https://www.rechtsprechung-im-internet.de/rii-toc.xml";

// ---- args -----------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const LIMIT = Number(opt("--limit", "0")) || Infinity;
const SINCE = Number(opt("--since", "0")) || 0;
const DELAY = Number(opt("--delay", "300"));
const OUT = opt("--out", join("bundles", "bgh-rechtsprechung"));
const TOC = opt("--toc", TOC_DEFAULT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- tiny XML helpers (the documents are flat, no namespaces) -------------
const firstTag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1] : "";
};
const allTags = (xml, name) => {
  const out = [];
  const re = new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "gi");
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
};
const decode = (s) =>
  s
    .replace(/<br\s*\/?>(?=)/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&auml;/g, "ä").replace(/&ouml;/g, "ö").replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß").replace(/&nbsp;|&#160;/g, " ")
    .replace(/&sect;/g, "§").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
const text = (xml, name) => decode(firstTag(xml, name)).trim();

// ---- single-entry zip reader (via the central directory) ------------------
function unzipFirst(buf) {
  const EOCD = 0x06054b50, CEN = 0x02014b50;
  // locate end of central directory (search backwards)
  let p = buf.length - 22;
  while (p >= 0 && buf.readUInt32LE(p) !== EOCD) p--;
  if (p < 0) throw new Error("zip: no EOCD");
  let cen = buf.readUInt32LE(p + 16); // offset of first central dir record
  if (buf.readUInt32LE(cen) !== CEN) throw new Error("zip: no central dir");
  const method = buf.readUInt16LE(cen + 10);
  const compSize = buf.readUInt32LE(cen + 20);
  const nameLen = buf.readUInt16LE(cen + 28);
  const extraLen = buf.readUInt16LE(cen + 30);
  const commentLen = buf.readUInt16LE(cen + 32);
  const localOff = buf.readUInt32LE(cen + 42);
  void (nameLen + extraLen + commentLen);
  // local header: 30 bytes + name + extra, then data
  const lNameLen = buf.readUInt16LE(localOff + 26);
  const lExtraLen = buf.readUInt16LE(localOff + 28);
  const dataStart = localOff + 30 + lNameLen + lExtraLen;
  const data = buf.subarray(dataStart, dataStart + compSize);
  return (method === 0 ? data : inflateRawSync(data)).toString("utf8");
}

// ---- mapping --------------------------------------------------------------
const ROMAN = "i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv|xvi|xvii|xviii|xix|xx";
function senatSlug(az) {
  // e.g. "IX ZR 72/20" -> ix-zivilsenat ; "5 StR 1/23" -> 5-strafsenat
  const m = az.match(/^\s*([0-9IVXLCDM]+)\s+([A-Za-zÄÖÜß]+)/);
  if (!m) return "senat-unbekannt";
  const num = m[1].toLowerCase();
  const reg = m[2].toLowerCase();
  if (reg.startsWith("zr") || reg.startsWith("zb")) return `${num}-zivilsenat`;
  if (reg.startsWith("str")) return `${num}-strafsenat`;
  return `${num}-${reg}`;
}
const azSlug = (az) =>
  az.toLowerCase().replace(/[\s/]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
function isoDate(raw) {
  const s = raw.trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return "";
}
function parseNormen(raw) {
  // <norm> is a single PCDATA field; references are newline/semicolon separated.
  return decode(raw)
    .split(/\r?\n|;/)
    .map((s) => s.trim())
    .filter(Boolean);
}
const yaml = (v) => JSON.stringify(v); // safe YAML flow scalar / list

function toConcept(xml) {
  const az = text(xml, "aktenzeichen");
  if (!az) return null;
  const doktyp = text(xml, "doktyp") || "Entscheidung";
  const datum = isoDate(firstTag(xml, "entsch-datum"));
  const year = datum.slice(0, 4) || "ohne-jahr";
  const gertyp = text(xml, "gertyp") || "BGH";
  const ecli = text(xml, "ecli");
  const doknr = text(xml, "doknr");
  const normen = parseNormen(allTags(xml, "norm").join("\n"));
  const leitsatz = text(xml, "leitsatz");
  const tenor = text(xml, "tenor");
  const gruende = text(xml, "entscheidungsgruende") || text(xml, "gruende");
  const titel = text(xml, "titelzeile");
  const ddmmyyyy = datum ? datum.split("-").reverse().join(".") : "";

  const desc = (leitsatz || titel || `${gertyp}, ${doktyp} ${az}`)
    .replace(/\s+/g, " ").slice(0, 200);
  const title = `${gertyp}, ${doktyp} vom ${ddmmyyyy} - ${az}`;

  const fm = [
    "---",
    "type: Gerichtsentscheidung",
    `title: ${yaml(title)}`,
    `description: ${yaml(desc)}`,
    `resource: https://www.bundesgerichtshof.de/SiteGlobals/Forms/Suche/EntscheidungssucheBGH_Formular.html`,
    `gericht: ${yaml(gertyp)}`,
    `senat: ${yaml(text(xml, "spruchkoerper") || senatSlug(az))}`,
    `datum: ${datum}`,
    `aktenzeichen: ${yaml(az)}`,
    ecli ? `ecli: ${yaml(ecli)}` : null,
    doknr ? `doknr: ${yaml(doknr)}` : null,
    `normen: ${yaml(normen)}`,
    "tags: [bgh, rechtsprechung, gemeinfrei]",
    `timestamp: ${new Date().toISOString().replace(/\.\d+Z$/, "Z")}`,
    "---",
    "",
  ].filter((l) => l !== null).join("\n");

  const body = [];
  if (leitsatz) body.push("# Leitsatz", "", leitsatz, "");
  else body.push("# Kernaussage", "", "(Kein amtlicher Leitsatz im Dokument; siehe Tenor und Gründe.)", "");
  if (tenor) body.push("# Tenor", "", tenor, "");
  if (gruende) body.push("# Gründe", "", gruende, "");
  body.push(
    "# Normen",
    "",
    normen.length ? normen.map((n) => `- ${n}`).join("\n") : "(keine ausgewiesen)",
    "",
    "# Citations",
    "",
    `[1] [${title} (bundesgerichtshof.de)](https://www.bundesgerichtshof.de/SiteGlobals/Forms/Suche/EntscheidungssucheBGH_Formular.html)`,
    "",
  );

  const path = join(OUT, "entscheidungen", senatSlug(az), year, `${azSlug(az)}.md`);
  return { path, content: fm + body.join("\n") + "\n", az, normen };
}

// ---- crawl ----------------------------------------------------------------
async function crawl() {
  process.stdout.write(`Lade Inhaltsverzeichnis: ${TOC}\n`);
  const tocXml = await (await fetch(TOC)).text();
  const items = allTags(tocXml, "item");
  process.stdout.write(`${items.length} Einträge gesamt.\n`);
  let written = 0, skipped = 0, seen = 0;
  for (const item of items) {
    if (written >= LIMIT) break;
    const gericht = firstTag(item, "gericht").trim();
    if (!/BGH|Bundesgerichtshof/i.test(gericht)) continue;
    const link = firstTag(item, "link").trim();
    if (!link) continue;
    seen++;
    try {
      const buf = Buffer.from(await (await fetch(link)).arrayBuffer());
      const xml = link.endsWith(".zip") ? unzipFirst(buf) : buf.toString("utf8");
      if (SINCE) {
        const y = Number(isoDate(firstTag(xml, "entsch-datum")).slice(0, 4));
        if (y && y < SINCE) { skipped++; continue; }
      }
      const c = toConcept(xml);
      if (!c) { skipped++; continue; }
      if (existsSync(c.path)) { skipped++; continue; }
      mkdirSync(dirname(c.path), { recursive: true });
      writeFileSync(c.path, c.content);
      written++;
      if (written % 50 === 0) process.stdout.write(`  ${written} geschrieben...\n`);
    } catch (e) {
      process.stderr.write(`  Fehler bei ${link}: ${e.message}\n`);
    }
    await sleep(DELAY);
  }
  process.stdout.write(`Fertig. ${seen} BGH-Einträge, ${written} neu geschrieben, ${skipped} übersprungen.\n`);
  process.stdout.write(`Navigation neu erzeugen: node scripts/build-rechtsprechung-index.mjs\n`);
}

// ---- selftest (offline) ---------------------------------------------------
const FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<dokument>
<doknr>KORE000000000</doknr>
<ecli>ECLI:DE:BGH:2021:060521UIXZR72.20.0</ecli>
<gertyp>BGH</gertyp>
<gerort>Karlsruhe</gerort>
<spruchkoerper>IX. Zivilsenat</spruchkoerper>
<entsch-datum>2021-05-06</entsch-datum>
<aktenzeichen>IX ZR 72/20</aktenzeichen>
<doktyp>Urteil</doktyp>
<norm>§ 133 InsO</norm>
<titelzeile><p>Vorsatzanfechtung</p></titelzeile>
<leitsatz><p>Die erkannte Zahlungsunf&auml;higkeit allein tr&auml;gt den Vorsatz nicht.</p></leitsatz>
<tenor><p>Auf die Revision wird das Urteil aufgehoben.</p></tenor>
<entscheidungsgruende><p>Die Revision ist begr&uuml;ndet.</p></entscheidungsgruende>
</dokument>`;

function selftest() {
  const c = toConcept(FIXTURE);
  process.stdout.write(`--- emitted path ---\n${c.path}\n\n--- emitted concept ---\n${c.content}`);
  const ok = c.path.endsWith(join("ix-zivilsenat", "2021", "ix-zr-72-20.md")) &&
    /type: Gerichtsentscheidung/.test(c.content) &&
    /§ 133 InsO/.test(c.content) &&
    /Zahlungsunfähigkeit/.test(c.content);
  process.stdout.write(`\n--- selftest: ${ok ? "PASS" : "FAIL"} ---\n`);
  process.exit(ok ? 0 : 1);
}

// ---- main -----------------------------------------------------------------
if (flag("--selftest")) selftest();
else crawl().catch((e) => { process.stderr.write(String(e?.stack || e) + "\n"); process.exit(1); });
