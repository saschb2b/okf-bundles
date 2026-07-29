#!/usr/bin/env node
// Prueft, ob die Wochenplaene des Rezepte-Bundles noch zu ihren Gerichten passen.
//
// Ein Wochenplan ist abgeleitetes Wissen: er haengt an den Rezepten, aus denen er
// besteht, und wird falsch, sobald sich eines davon aendert. Jeder Plan nennt seine
// Grundlage im Frontmatter unter `gerichte`. Dieses Skript vergleicht das
// `generated.at` des Plans mit dem der gelisteten Gerichte und meldet jeden Plan,
// der aelter ist als eines seiner Rezepte.
//
// Das ersetzt die inhaltliche Pruefung nicht (Zeiten, Portionen, Einkaufsmengen,
// ob ein neues Gericht in einen Plan gehoert). Es verhindert nur, dass sie
// vergessen wird. Die Regel steht in bundles/rezepte/guide/wochenplanung.md.
//
// Aufruf:  node scripts/check-wochenplaene.mjs [bundle-pfad]
// Exit 1, wenn ein Plan veraltet ist oder auf ein fehlendes Gericht zeigt.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const bundle = resolve(process.argv[2] ?? 'bundles/rezepte');
const planDir = join(bundle, 'wochenplaene');

/** Liest den Frontmatter-Block einer Konzeptdatei als Rohtext. */
function frontmatter(file) {
  const text = readFileSync(file, 'utf8');
  if (!text.startsWith('---')) return '';
  const end = text.indexOf('\n---', 3);
  return end === -1 ? '' : text.slice(4, end);
}

/** `generated: { at: ... }` in beiden Schreibweisen, block und inline. */
function generatedAt(fm) {
  const block = fm.match(/^generated:\s*\n(?:\s+\w+:.*\n)*?\s+at:\s*(\S+)/m);
  if (block) return block[1];
  const inline = fm.match(/^generated:\s*\{[^}]*\bat:\s*([^,}\s]+)/m);
  return inline ? inline[1] : null;
}

/** Die `gerichte:`-Liste eines Plans als Bundle-absolute Pfade. */
function gerichte(fm) {
  const start = fm.search(/^gerichte:\s*$/m);
  if (start === -1) return [];
  const rest = fm.slice(start).split('\n').slice(1);
  const out = [];
  for (const line of rest) {
    const m = line.match(/^\s+-\s+(\S+)/);
    if (!m) break;
    out.push(m[1]);
  }
  return out;
}

if (!existsSync(planDir)) {
  console.log(`Keine Wochenplaene unter ${planDir}, nichts zu pruefen.`);
  process.exit(0);
}

const plans = readdirSync(planDir).filter((f) => f.endsWith('.md') && f !== 'index.md');
let problems = 0;

for (const file of plans) {
  const path = join(planDir, file);
  const fm = frontmatter(path);
  const planAt = generatedAt(fm);
  const deps = gerichte(fm);

  if (!planAt) {
    console.error(`FEHLER  ${file}: kein generated.at`);
    problems++;
    continue;
  }
  if (deps.length === 0) {
    console.error(`FEHLER  ${file}: keine gerichte-Liste im Frontmatter`);
    problems++;
    continue;
  }

  const stale = [];
  for (const dep of deps) {
    const depPath = join(bundle, dep.replace(/^\//, ''));
    if (!existsSync(depPath)) {
      console.error(`FEHLER  ${file}: gelistetes Gericht fehlt: ${dep}`);
      problems++;
      continue;
    }
    const depAt = generatedAt(frontmatter(depPath));
    if (depAt && depAt > planAt) stale.push(`${dep} (${depAt})`);
  }

  if (stale.length) {
    console.error(`VERALTET  ${file} (${planAt}) ist aelter als:`);
    for (const s of stale) console.error(`            ${s}`);
    problems++;
  } else {
    console.log(`ok        ${file} (${deps.length} Gerichte)`);
  }
}

if (problems) {
  console.error(
    `\n${problems} Plan/Plaene pruefen. Neu rechnen (Zeiten, Portionen, Einkauf),` +
      ` dann generated.at aktualisieren. Regeln: bundles/rezepte/guide/wochenplanung.md`
  );
  process.exit(1);
}
console.log(`\n${plans.length} Wochenplan/Wochenplaene aktuell.`);
