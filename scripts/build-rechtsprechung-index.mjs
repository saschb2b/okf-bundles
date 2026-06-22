#!/usr/bin/env node
// build-rechtsprechung-index.mjs
//
// Regenerate the navigation of the bgh-rechtsprechung bundle from the
// frontmatter of the decision concepts. OKF navigation is progressive
// disclosure: every index carries enough context (a description per entry, a
// subject blurb per senate) to choose a branch WITHOUT opening the leaves.
//
// Generates a three-level tree plus the per-norm registers:
//   entscheidungen/index.md                  senates grouped, with subject blurb + count
//   entscheidungen/<senat>/index.md          the senate's blurb + years with counts
//   entscheidungen/<senat>/<jahr>/index.md   the year's decisions, each with its description
//   nach-norm/index.md                       list of per-Gesetz registers
//   nach-norm/<gesetz>.md                    decisions grouped by paragraph (the legal entry)
//
// USAGE
//   node scripts/build-rechtsprechung-index.mjs            # write the indexes
//   node scripts/build-rechtsprechung-index.mjs --dry-run  # count only
//   node scripts/build-rechtsprechung-index.mjs --out DIR  # bundle root
//
// Reads frontmatter only (title/description/datum/senat/normen). Zero deps.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const oi = args.indexOf("--out");
const OUT = oi !== -1 && args[oi + 1] ? args[oi + 1] : join("bundles", "bgh-rechtsprechung");
const ENTSCH = join(OUT, "entscheidungen");
const NORM = join(OUT, "nach-norm");

const walk = (dir) =>
  !existsSync(dir) ? [] : readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") && n !== "index.md" ? [p] : [];
  });

const frontmatter = (txt) => {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const o = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1 || /^\s/.test(line)) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith("[")) { try { o[k] = JSON.parse(v); continue; } catch {} }
    if (v.startsWith('"')) { try { v = JSON.parse(v); } catch {} }
    o[k] = v;
  }
  return o;
};
const tidy = (s) => {
  let t = String(s || "").replace(/\s+/g, " ").replace(/^[-\s]+/, "").trim();
  if (t.length > 180) t = t.slice(0, 180).replace(/\s+\S*$/, "").replace(/[,;:.\s]+$/, "") + " …";
  return t;
};

// --- senate subject matter (Geschäftsverteilung), for the navigation blurbs --
const ZIVIL = {
  "i-zivilsenat": "Wettbewerbs-, Marken-, Urheber- und Verlagsrecht (gewerblicher Rechtsschutz).",
  "ii-zivilsenat": "Gesellschafts-, Genossenschafts- und Kapitalmarktrecht.",
  "iii-zivilsenat": "Staats- und Amtshaftung, Dienst- und Werkverträge, Notarhaftung, teils Kapitalanlage.",
  "iv-zivilsenat": "Versicherungsvertragsrecht und Erbrecht.",
  "v-zivilsenat": "Grundstücks-, Sachen- und Nachbarrecht, Wohnungseigentum.",
  "vi-zivilsenat": "Deliktsrecht, Arzthaftung, Persönlichkeits- und Presserecht, Verkehrsunfall.",
  "vii-zivilsenat": "Werkvertragsrecht, Bau- und Architektenrecht.",
  "viii-zivilsenat": "Wohnraummiete, Kauf- und Verbrauchsgüterkaufrecht, Energielieferung.",
  "ix-zivilsenat": "Insolvenzrecht und Insolvenzanfechtung, Anwalts- und Steuerberaterhaftung, Bürgschaft.",
  "x-zivilsenat": "Patentrecht, Reisevertragsrecht, Werklohn.",
  "xi-zivilsenat": "Bank- und Kapitalmarktrecht, Darlehensrecht.",
  "xii-zivilsenat": "Familien- und Betreuungsrecht, Gewerberaummiete.",
  "xiii-zivilsenat": "Seit 2020: Energiewirtschafts-, Vergabe- und weitere Spezialsachen.",
};
const FACH = {
  kartellsenat: "Kartell-, Vergabe- und Energiewirtschaftsrecht.",
  "senat-fuer-anwaltssachen": "Berufsrecht der Rechtsanwälte.",
  "senat-fuer-notarsachen": "Berufsrecht der Notare.",
};
const ROMAN = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12, xiii: 13, xiv: 14 };
const GROUP_ORDER = ["Zivilsenate", "Strafsenate", "Fachsenate und besondere Spruchkörper", "Große Senate", "Verfahrens- und Hilfsregister", "Sonstige"];

function senatInfo(slug) {
  if (slug.endsWith("zivilsenat")) return { group: "Zivilsenate", blurb: ZIVIL[slug] || "Zivilsenat des Bundesgerichtshofs.", ord: ROMAN[slug.split("-")[0]] || 99 };
  if (slug.endsWith("strafsenat")) return { group: "Strafsenate", blurb: (slug.startsWith("3-") ? "Strafsachen, u.a. Staatsschutz und Terrorismus. " : "") + "Revisionen und Beschlüsse in Strafsachen (Zuständigkeit überwiegend nach Land- und OLG-Bezirken).", ord: Number(slug.split("-")[0]) || 99 };
  if (FACH[slug]) return { group: "Fachsenate und besondere Spruchkörper", blurb: FACH[slug], ord: 0 };
  if (["gsst", "gsz", "v-gs"].includes(slug) || slug.endsWith("-gs")) return { group: "Große Senate", blurb: "Großer Senat bzw. Vereinigte Große Senate (Vorlagen zur Sicherung der Rechtseinheit).", ord: 0 };
  if (slug.includes("arz")) return { group: "Verfahrens- und Hilfsregister", blurb: "Bestimmung des zuständigen Gerichts (§ 36 ZPO).", ord: 0 };
  if (slug.includes("bgs")) return { group: "Verfahrens- und Hilfsregister", blurb: "Ermittlungsrichter des BGH (Anordnungen im Ermittlungsverfahren).", ord: 0 };
  if (["envz", "enzb", "krb", "kvb", "kzb"].includes(slug)) return { group: "Fachsenate und besondere Spruchkörper", blurb: "Kartell- und Energie-Beschwerdesachen (Kartellsenat).", ord: 0 };
  if (["notst", "patanwst", "patanwz", "stbst", "wpst", "rist", "riz"].includes(slug)) return { group: "Fachsenate und besondere Spruchkörper", blurb: "Berufs- bzw. Dienstgerichtssachen (Notare, Patentanwälte, Steuerberater, Wirtschaftsprüfer, Richter).", ord: 0 };
  if (/(^|-)ar($|[a-z])|(^|-)a$/.test(slug)) return { group: "Verfahrens- und Hilfsregister", blurb: "Allgemeines Register, Rechtshilfe- und Zuständigkeitssachen.", ord: 0 };
  return { group: "Sonstige", blurb: "Verfahrens- oder Hilfsregister des Bundesgerichtshofs.", ord: 0 };
}

// --- read decisions ---------------------------------------------------------
const decisions = walk(ENTSCH).map((p) => {
  const fm = frontmatter(readFileSync(p, "utf8"));
  return {
    rel: relative(OUT, p).split(/[\\/]/).join("/"),
    file: p.split(/[\\/]/).pop(),
    title: fm.title || fm.aktenzeichen || p,
    description: tidy(fm.description),
    datum: fm.datum || "",
    jahr: (fm.datum || "").slice(0, 4) || "ohne-jahr",
    senatDir: relative(ENTSCH, p).split(/[\\/]/)[0],
    senatLabel: fm.senat || "",
    normen: Array.isArray(fm.normen) ? fm.normen : [],
  };
});

const writes = [];
const plan = (path, content) => writes.push({ path, content });
const linkFrom = (dir, target) => relative(dir, join(OUT, target)).split(/[\\/]/).join("/");

// --- per-senate aggregation -------------------------------------------------
const senates = new Map(); // slug -> {label, info, count, years:Map(year->[decisions])}
for (const d of decisions) {
  if (!senates.has(d.senatDir)) senates.set(d.senatDir, { label: "", info: senatInfo(d.senatDir), count: 0, years: new Map() });
  const s = senates.get(d.senatDir);
  if (!s.label && d.senatLabel) s.label = d.senatLabel;
  s.count++;
  if (!s.years.has(d.jahr)) s.years.set(d.jahr, []);
  s.years.get(d.jahr).push(d);
}
for (const [slug, s] of senates) if (!s.label) s.label = slug;

// entscheidungen/index.md : grouped senates with blurb + count
let top = `# Entscheidungen nach Senat\n\n` +
  `Der strukturelle Einstieg in den Entscheidungsbestand. Wer von der Vorschrift her sucht, beginnt im [Norm-Register](../nach-norm/index.md). Jeder Senat ist nach seinem Sachgebiet beschrieben; darunter führt der Pfad Senat zu Jahr zu Entscheidung.\n`;
for (const group of GROUP_ORDER) {
  const list = [...senates.entries()].filter(([, s]) => s.info.group === group)
    .sort((a, b) => (a[1].info.ord - b[1].info.ord) || a[0].localeCompare(b[0]));
  if (!list.length) continue;
  top += `\n## ${group}\n\n`;
  top += list.map(([slug, s]) => `- [${s.label}](${slug}/index.md) (${s.count}) — ${s.info.blurb}`).join("\n") + "\n";
}
plan(join(ENTSCH, "index.md"), top);

// entscheidungen/<senat>/index.md : blurb + years with counts
// entscheidungen/<senat>/<jahr>/index.md : decisions with descriptions
for (const [slug, s] of senates) {
  const years = [...s.years.keys()].sort().reverse();
  let si = `# ${s.label}\n\n${s.info.blurb} ${s.count} Entscheidung(en).\n\n## Nach Jahr\n\n`;
  si += years.map((y) => `- [${y}](${y}/index.md) (${s.years.get(y).length})`).join("\n") + "\n";
  plan(join(ENTSCH, slug, "index.md"), si);
  for (const y of years) {
    const ds = s.years.get(y).sort((a, b) => b.datum.localeCompare(a.datum));
    const yi = `# ${s.label} – ${y}\n\n${ds.length} Entscheidung(en).\n\n` +
      ds.map((d) => `- [${d.title}](${d.file})${d.description ? " — " + d.description : ""}`).join("\n") + "\n";
    plan(join(ENTSCH, slug, y, "index.md"), yi);
  }
}

// --- per-Gesetz registers (unchanged structure) -----------------------------
const NORM_STOP = new Set(["ND", "TH", "ISR", "DDR", "NF", "AE", "IDF", "IVM"]);
function splitNorm(n) {
  const s = String(n).trim();
  if (!/^(§{1,2}|Art\.?)\s*\d/i.test(s)) return null;
  const para = s.match(/(?:§{1,2}|Art\.?)\s*(\d+[a-z]?)/i);
  const gesetz = s.match(/([A-ZÄÖÜ][A-Za-z0-9ÄÖÜäöüß]{1,11})\s*$/);
  if (!para || !gesetz || NORM_STOP.has(gesetz[1].toUpperCase())) return null;
  const isArt = /^Art/i.test(s);
  return { gesetz: gesetz[1], para: (isArt ? "Art. " : "§ ") + para[1], sort: Number(para[1]) || 0 };
}
const byGesetz = new Map();
for (const d of decisions) for (const n of d.normen) {
  const sp = splitNorm(n);
  if (!sp) continue;
  if (!byGesetz.has(sp.gesetz)) byGesetz.set(sp.gesetz, new Map());
  const m = byGesetz.get(sp.gesetz);
  const key = `${sp.sort} ${sp.para}`;
  if (!m.has(key)) m.set(key, []);
  m.get(key).push(d);
}
const gesetze = [...byGesetz.keys()].sort();
plan(join(NORM, "index.md"),
  `# Rechtsprechung nach Norm\n\nDer juristische Einstieg: je Gesetz ein Register, das die Entscheidungen nach Vorschrift ordnet. Erzeugt aus dem Feld \`normen\` jeder Entscheidung.\n\n` +
  gesetze.map((g) => `- [${g}](${g.toLowerCase()}.md)`).join("\n") + "\n");
for (const g of gesetze) {
  const rows = [...byGesetz.get(g).entries()].sort((a, b) => a[0].localeCompare(b[0], "en", { numeric: true }))
    .map(([key, ds]) => {
      const para = key.split(" ")[1];
      const links = ds.sort((a, b) => b.datum.localeCompare(a.datum)).map((d) => `[${d.title}](${linkFrom(NORM, d.rel)})`).join("; ");
      return `| ${para} ${g} | ${links} |`;
    });
  plan(join(NORM, `${g.toLowerCase()}.md`),
    `---\ntype: Rechtsprechungsregister\ntitle: ${JSON.stringify(`Rechtsprechung zu ${g}`)}\n` +
    `description: ${JSON.stringify(`BGH-Entscheidungen zu ${g}, geordnet nach Vorschrift.`)}\n` +
    `tags: [register, navigation, ${g.toLowerCase()}]\ntimestamp: ${new Date().toISOString().replace(/\.\d+Z$/, "Z")}\n---\n\n` +
    `# Nach Vorschrift\n\nWelche erfassten BGH-Entscheidungen die einzelnen Vorschriften des ${g} auslegen.\n\n` +
    `| Norm | Entscheidung(en) |\n|------|------------------|\n${rows.join("\n")}\n`);
}

process.stdout.write(`${decisions.length} Entscheidung(en), ${senates.size} Senat(e), ${gesetze.length} Gesetz(e), ${writes.length} Index-Dateien.\n`);
for (const w of writes) { if (!DRY) writeFileSync(w.path, w.content); }
if (DRY) process.stdout.write(`(dry-run, nichts geschrieben)\n`);
