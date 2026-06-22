#!/usr/bin/env node
// ingest-bgh-pdf.mjs
//
// Augment the bgh-rechtsprechung bundle with decisions from the Bundesgerichtshof
// decision database (bundesgerichtshof.de), which reaches back to 2000 (the rii
// open-data feed used by ingest-bgh-rechtsprechung.mjs only covers 2010+). These
// decisions are published as PDF; text is extracted with `pdftotext` (poppler).
//
// One decision becomes one slim concept (metadata + best-effort Leitsatz; full
// PDF one link away) at entscheidungen/<senat>/<jahr>/<aktenzeichen>.md, the same
// scheme as the rii ingester, so the 2010+ overlap is skipped (resume) and the
// pre-2010 years fill in. Decisions are amtliche Werke, gemeinfrei (s 5 UrhG).
//
// USAGE
//   node scripts/ingest-bgh-pdf.mjs --until 2009                 # decision years 2000..2009
//   node scripts/ingest-bgh-pdf.mjs --until 2009 --max-pages 3   # smoke test (oldest pages)
//
// FLAGS
//   --from YYYY     lowest decision year to keep (default 2000)
//   --until YYYY    highest decision year to keep (default 2009)
//   --conc N        concurrent PDF downloads/extracts (default 4)
//   --delay MS      pause between search-page fetches (default 200)
//   --max-pages N   stop after scraping N result pages (for testing)
//   --out DIR       bundle root (default bundles/bgh-rechtsprechung)
//
// Resumable (skips existing files). Requires pdftotext on PATH and Node 18+.

import { writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";

const BASE = "https://www.bundesgerichtshof.de";
const FORM = BASE + "/SiteGlobals/Forms/Suche/EntscheidungssucheBGH_Formular.html";
const UA = { headers: { "user-agent": "Mozilla/5.0 (okf-bundle research ingest)" } };

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i !== -1 && args[i + 1] ? args[i + 1] : d; };
const FROM = Number(opt("--from", "2000"));
const UNTIL = Number(opt("--until", "2009"));
const CONC = Math.max(1, Number(opt("--conc", "4")));
const DELAY = Number(opt("--delay", "200"));
const MAXPAGES = Number(opt("--max-pages", "0")) || Infinity;
const OUT = opt("--out", join("bundles", "bgh-rechtsprechung"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#228;/g, "ä").replace(/&#246;/g, "ö")
  .replace(/&#252;/g, "ü").replace(/&#196;/g, "Ä").replace(/&#214;/g, "Ö").replace(/&#220;/g, "Ü")
  .replace(/&#223;/g, "ß").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();

// --- senate/file helpers (same scheme as the rii ingester) -----------------
const SENAT_TYPE = {
  zr: "Zivilsenat", zb: "Zivilsenat", za: "Zivilsenat", str: "Strafsenat", stb: "Strafsenat",
  ars: "Strafsenat", ak: "Strafsenat", ss: "Strafsenat", ste: "Strafsenat",
  anwz: "Senat für Anwaltssachen", anwst: "Senat für Anwaltssachen", notz: "Senat für Notarsachen",
  lwzr: "Senat für Landwirtschaftssachen", lwzb: "Senat für Landwirtschaftssachen",
  kzr: "Kartellsenat", kvr: "Kartellsenat", kvz: "Kartellsenat", envr: "Kartellsenat", enzr: "Kartellsenat",
};
const slugSenat = (s) => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
  .replace(/ß/g, "ss").replace(/\./g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
function senatOf(az) {
  const m = az.match(/^\s*([0-9]+|[IVXLCDM]+)?\s*([A-Za-zÄÖÜäöüß]+)/);
  const num = m && m[1] ? m[1] : "", reg = m && m[2] ? m[2].toLowerCase() : "";
  const type = SENAT_TYPE[reg];
  if (type) { const label = num ? `${num}. ${type}` : type; return { label, slug: slugSenat(label) }; }
  const label = (num ? num + " " : "") + (m && m[2] ? m[2].toUpperCase() : "BGH");
  return { label, slug: slugSenat((num ? num + "-" : "") + (reg || "bgh-sonstige")) };
}
const azSlug = (az) => az.toLowerCase().replace(/[\s/]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
const fileBase = (az) => { const s = azSlug(az); return s.length <= 80 ? s : s.slice(0, 80).replace(/-+$/, ""); };
const yaml = (v) => JSON.stringify(v);

// --- pdftotext on a temp file (pdftotext needs seekable input, not a pipe) --
// First two pages carry the header/Leitsatz/subject we parse.
let pdfCounter = 0;
function pdftext(buf) {
  return new Promise((resolve) => {
    const tmp = join(tmpdir(), `bghpdf-${process.pid}-${pdfCounter++}.pdf`);
    try { writeFileSync(tmp, buf); } catch { return resolve(""); }
    const done = (out) => { try { unlinkSync(tmp); } catch {} resolve(out); };
    const p = spawn("pdftotext", ["-enc", "UTF-8", "-f", "1", "-l", "2", tmp, "-"]);
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.on("error", () => done(""));
    p.on("close", () => done(out));
  });
}

// --- parse one decision PDF's leading text ---------------------------------
function parsePdf(text) {
  const head = text.split(/BUNDESGERICHTSHOF/)[0] || "";
  const doktyp = (text.match(/\b(Vers[äa]umnisurteil|Anerkenntnisurteil|Teilurteil|Urteil|Beschluss|Verf[üu]gung)\b/i) || [, "Entscheidung"])[1];
  const wegen = (text.match(/wegen\s+([^\n]{3,140})/i) || [])[1];
  let leitsatz = "";
  const lm = head.match(/Leits[äa]tze?\s*:?\s*\n?([\s\S]{20,1600})/i);
  if (lm) leitsatz = lm[1];
  else {
    const cleaned = head.replace(/^(BGHZ|BGHSt|BGHR|Nachschlagewerk|ja|nein)[:\s].*$/gim, "").trim();
    if (cleaned.length > 70) leitsatz = cleaned;
  }
  leitsatz = leitsatz.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 1600);
  const normen = [...head.matchAll(/§+\s*\d+[a-z]?\s+[A-ZÄÖÜ][A-Za-z]{1,10}\b/g)]
    .map((m) => m[0].replace(/\s+/g, " ").trim());
  return { doktyp: doktyp[0].toUpperCase() + doktyp.slice(1).toLowerCase(), wegen, leitsatz, normen: [...new Set(normen)].slice(0, 12) };
}

function concept({ az, isoDate, ddmmyyyy, sen, pdfUrl, parsed }) {
  const title = `BGH, ${parsed.doktyp} vom ${ddmmyyyy} - ${az}`;
  const desc = (parsed.wegen || parsed.leitsatz || title).replace(/\s+/g, " ").slice(0, 200);
  const fm = [
    "---", "type: Gerichtsentscheidung", `title: ${yaml(title)}`, `description: ${yaml(desc)}`,
    `resource: ${pdfUrl}`, "gericht: Bundesgerichtshof", `senat: ${yaml(sen.label)}`,
    `datum: ${isoDate}`, `aktenzeichen: ${yaml(az)}`, `normen: ${yaml(parsed.normen)}`,
    "tags: [bgh, rechtsprechung, gemeinfrei, pdf-quelle]",
    `timestamp: ${new Date().toISOString().replace(/\.\d+Z$/, "Z")}`, "---", "",
  ].join("\n");
  const body = [];
  if (parsed.leitsatz) body.push("# Leitsatz", "", parsed.leitsatz, "");
  body.push("# Volltext", "",
    `Volltext (PDF) beim Bundesgerichtshof: ${az} vom ${ddmmyyyy}.`, "",
    "# Citations", "", `[1] [${title} (bundesgerichtshof.de, PDF)](${pdfUrl})`, "");
  return fm + body.join("\n") + "\n";
}

// --- search-result row parser ----------------------------------------------
const ROW = /<tr>\s*<td>\s*([^<]*?)<\/td>\s*<td>\s*(\d{2}\.\d{2}\.\d{4})\s*<\/td>\s*<td>\s*([^<]*?)<\/td>\s*<td>[\s\S]*?href="([^"]*?\.pdf[^"]*?)"/g;

async function run() {
  const first = await (await fetch(`${FORM}?gtp=565194_list%253D1`, UA)).text();
  const total = Number((first.match(/von insgesamt\s+([\d.]+)/) || [, "0"])[1].replace(/\./g, ""));
  const lastPage = Math.max(1, Math.ceil(total / 10));
  process.stdout.write(`Gesamt ${total} Entscheidungen, letzte Seite ${lastPage}. Ziel: Jahre ${FROM}-${UNTIL}.\n`);

  let written = 0, skipped = 0, scanned = 0, pages = 0;
  for (let page = lastPage; page >= 1 && pages < MAXPAGES; page--, pages++) {
    let html;
    try { html = await (await fetch(`${FORM}?gtp=565194_list%253D${page}`, UA)).text(); }
    catch (e) { process.stderr.write(`Seite ${page}: ${e.message}\n`); await sleep(DELAY); continue; }
    const rows = [...html.matchAll(ROW)].map((m) => ({
      senatTxt: dec(m[1]), datum: m[2], az: dec(m[3]), href: dec(m[4]),
    })).filter((r) => r.az && r.href);
    const years = rows.map((r) => Number(r.datum.slice(6)));
    if (years.length && Math.min(...years) > UNTIL) break; // past the scope (years climb as page falls)
    const todo = rows.filter((r) => { const y = Number(r.datum.slice(6)); return y >= FROM && y <= UNTIL; });
    // process this page's in-scope rows concurrently
    let i = 0;
    const worker = async () => {
      while (i < todo.length) {
        const r = todo[i++];
        scanned++;
        const [d, mo, y] = r.datum.split(".");
        const iso = `${y}-${mo}-${d}`, sen = senatOf(r.az);
        const path = join(OUT, "entscheidungen", sen.slug, y, `${fileBase(r.az)}.md`);
        if (existsSync(path)) { skipped++; continue; }
        try {
          const pdfUrl = r.href.startsWith("http") ? r.href : BASE + r.href;
          const buf = Buffer.from(await (await fetch(pdfUrl, UA)).arrayBuffer());
          const parsed = parsePdf(await pdftext(buf));
          mkdirSync(dirname(path), { recursive: true });
          writeFileSync(path, concept({ az: r.az, isoDate: iso, ddmmyyyy: r.datum, sen, pdfUrl, parsed }));
          written++;
        } catch (e) { process.stderr.write(`  ${r.az}: ${e.message}\n`); }
      }
    };
    await Promise.all(Array.from({ length: CONC }, worker));
    if (pages % 25 === 0) process.stdout.write(`  Seite ${page}: ${written} geschrieben, ${skipped} vorhanden...\n`);
    await sleep(DELAY);
  }
  process.stdout.write(`Fertig. ${scanned} im Zielbereich, ${written} neu geschrieben, ${skipped} vorhanden.\n`);
  process.stdout.write(`Navigation neu erzeugen: node scripts/build-rechtsprechung-index.mjs\n`);
}

run().catch((e) => { process.stderr.write(String(e?.stack || e) + "\n"); process.exit(1); });
