#!/usr/bin/env node
// Migrate OKF bundles from v0.1 to v0.2.
//
// Two mechanical transforms per concept, exactly as the skill's `migrate`
// command describes them:
//
//   1. `timestamp: <ISO>` becomes `generated: { by: <actor>, at: <same ISO> }`.
//      The datetime carries over unchanged; the actor is derived from how the
//      file was actually produced (see `actorFor`), never guessed as a human.
//   2. The `# Citations` body section becomes `sources:` frontmatter entries,
//      each with `resource` and `title`. The body section is deleted.
//
// Not done here, deliberately: `verified` is never backfilled (a verification
// that did not happen is worse than none), and `status`/`stale_after` are left
// to hand-editing where they are real.
//
// Usage: node scripts/migrate-okf-v02.mjs bundles/<bundle> [more...] [--dry-run]

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const roots = args.filter((a) => !a.startsWith("--"));
if (!roots.length) {
  console.error("usage: node scripts/migrate-okf-v02.mjs <bundle-dir>... [--dry-run]");
  process.exit(2);
}

const AGENT = "claude-code/unrecorded"; // the model behind these bundles was never recorded per concept

// Who actually wrote this file. The BGH corpus is script-produced, so its
// concepts get the process that emitted them; everything else is agent-written.
function actorFor(relPath, frontmatter) {
  const p = relPath.split(sep).join("/");
  if (p.startsWith("entscheidungen/"))
    return /tags:.*pdf-quelle/.test(frontmatter)
      ? "process:ingest-bgh-pdf"
      : "process:ingest-bgh-rechtsprechung";
  if (p.startsWith("nach-norm/")) return "process:build-rechtsprechung-index";
  return AGENT;
}

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith(".md")) out.push(full);
  }
  return out;
};

// YAML double-quoted scalar; safe for titles carrying colons, quotes, brackets.
const q = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
// URLs are plain scalars already elsewhere in these bundles; quote only when
// a leading indicator or whitespace would make the plain form ambiguous.
const scalar = (s) => (/^[\s"'&*!|>%@`[{]|[\s]/.test(s) ? q(s) : s);

const CITATION = /^\[(\d+)\]\s+\[(.+)\]\((\S+)\)\s*$/;

const stats = { files: 0, changed: 0, generated: 0, sources: 0, skipped: [] };

for (const root of roots) {
  if (!statSync(root).isDirectory()) continue;
  for (const file of walk(root)) {
    const name = file.split(sep).pop();
    const rel = relative(root, file);
    const isRootIndex = rel === "index.md";
    if (name === "log.md") continue;
    if (name === "index.md" && !isRootIndex) continue;

    const text = readFileSync(file, "utf8");
    if (!text.startsWith("---\n")) continue;
    const end = text.indexOf("\n---", 3);
    if (end === -1) continue;
    let fm = text.slice(4, end + 1);
    let body = text.slice(end + 4).replace(/^\n/, "");
    stats.files++;

    // The bundle-root index only declares the version.
    if (isRootIndex) {
      const bumped = fm.replace(/^okf_version:[ \t]*["']?0\.1["']?[ \t]*$/m, 'okf_version: "0.2"');
      if (bumped !== fm) {
        if (!dryRun) writeFileSync(file, `---\n${bumped}---\n${body ? "\n" + body : ""}`);
        stats.changed++;
      }
      continue;
    }

    let touched = false;

    // 1. timestamp -> generated
    const ts = fm.match(/^timestamp:[ \t]*(\S+)[ \t]*$/m);
    if (ts) {
      const actor = actorFor(rel, fm);
      fm = fm.replace(ts[0], `generated:\n  by: ${actor}\n  at: ${ts[1]}`);
      touched = true;
      stats.generated++;
    }

    // 2. # Citations body section -> sources frontmatter
    const head = body.match(/^# Citations[ \t]*$/m);
    if (head) {
      const start = head.index;
      const after = body.indexOf("\n# ", start + head[0].length);
      const stop = after === -1 ? body.length : after + 1;
      const lines = body.slice(start + head[0].length, stop).split("\n");
      const entries = [];
      let unparsed = false;
      for (const line of lines) {
        if (!line.trim()) continue;
        const m = line.match(CITATION);
        if (!m) {
          unparsed = true;
          break;
        }
        entries.push({ title: m[2], resource: m[3] });
      }
      if (unparsed || !entries.length) {
        stats.skipped.push(`${file}: unparsable '# Citations' section, left in place`);
      } else {
        const block =
          "sources:\n" +
          entries
            .map((e) => `  - resource: ${scalar(e.resource)}\n    title: ${q(e.title)}`)
            .join("\n") +
          "\n";
        fm = fm + block;
        body = (body.slice(0, start) + body.slice(stop)).replace(/\n{2,}$/, "\n");
        if (!body.endsWith("\n")) body += "\n";
        touched = true;
        stats.sources += entries.length;
      }
    }

    if (!touched) continue;
    if (!dryRun) writeFileSync(file, `---\n${fm}---\n\n${body.replace(/^\n+/, "")}`);
    stats.changed++;
  }
}

console.log(
  `${dryRun ? "[dry-run] " : ""}${stats.files} file(s) seen, ${stats.changed} rewritten; ` +
    `${stats.generated} timestamp->generated, ${stats.sources} source entries.`
);
for (const s of stats.skipped.slice(0, 20)) console.warn(`warn  ${s}`);
if (stats.skipped.length > 20) console.warn(`warn  ... and ${stats.skipped.length - 20} more`);
