# OKF Bundles Repo Conventions

This repo is a collection of knowledge bundles in the Open Knowledge Format (OKF v0.1). Each bundle is one self-contained folder at the repo root, readable by any AI agent with no SDK. The format is markdown files with YAML frontmatter; the spec is at [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).

## Tooling: the `/okf` skill

Authoring and maintenance run through the OKF skill installed at `.claude/skills/okf/`. It is the authoritative tooling; this file is the repo-specific overlay on top of it. Reach for the skill, do not reinvent its steps by hand.

- **Commands.** Invoke `/okf <command>`: `init` (new bundle), `add` (one concept), `enrich` and `export` (turn a source, a docs site, or a URL into concepts), `link`, `index`, `log`, `validate`, `consume`. Each is detailed in [`.claude/skills/okf/commands.md`](.claude/skills/okf/commands.md).
- **Deep references.** The normative spec is [`.claude/skills/okf/spec.md`](.claude/skills/okf/spec.md); copy-paste starting points are [`.claude/skills/okf/templates.md`](.claude/skills/okf/templates.md). When this file and the spec disagree on anything beyond repo layout, the spec wins.
- **Implicit mode (the discipline this repo most needs).** Whenever you touch a concept, keep the bundle conformant in the same change: refresh that concept's `timestamp`, append a `log.md` entry, regenerate the affected `index.md` (both the area listing and the root), and add the cross-links the new relationships imply. Validate after each slice, not just at the end. This bookkeeping is where bundles silently rot.
- **Guard.** OKF is for knowledge an agent reads. Do not convert human-only prose (a README, a blog post, a design doc) into a bundle; ask first when an artifact's audience is unclear.

## Layout

```
bundles/
  <bundle>/
    index.md          root, declares okf_version: "0.1" (the only index.md with frontmatter)
    overview.md       optional entry concept that orients the reader
    log.md            dated change history, newest first
    <domain>/         concepts grouped by domain, not by file type
      index.md        directory listing, no frontmatter
      <concept>.md    one concept, frontmatter with a non-empty `type`
```

## The one rule

A bundle is conformant when every concept document carries YAML frontmatter with a non-empty `type`. That is the only hard requirement; everything else is recommended structure a consumer must tolerate.

## Adding a bundle

1. `/okf init` under `bundles/<bundle>/`: a root `index.md` declaring `okf_version: "0.1"`.
2. `/okf add` one concept at a time, grouped by domain. Reserved filenames are `index.md` (listings) and `log.md` (history). Never name a concept either, and never put a `README.md` inside a bundle: the checker treats any other `.md` as a concept and will fail it for missing `type`.
3. Add a `log.md` Creation entry dated today (`## YYYY-MM-DD`).
4. Add a row to the Bundles table in `README.md`.
5. Validate before committing. `/okf validate bundles/<bundle>` checks one bundle; `node scripts/check-bundles.mjs` gates the whole repo (it wraps the same checker over every bundle and warns on a missing README row). `scripts/okf-validate.mjs` is a vendored copy of the skill's `okf-validate.mjs`, kept in sync so the repo gate still runs where the skill is not installed.

## Staying conformant

Every bundle must stay conformant at all times, not just at creation. Before committing any change that touches a bundle, run the gate and fix what it flags:

- `node scripts/check-bundles.mjs` validates every bundle in the repo; `node scripts/okf-validate.mjs bundles/<bundle>` checks one. The gate must report 0 errors. Treat its warnings (a non-ISO `log.md` date, a missing README row, a link whose target file is absent) as fix-on-sight, not noise.

The checker verifies the hard rule (every concept has a `type`) and that link targets exist as files. It does not check that the bundle reads as a clean graph, which an OKF consumer (and the graph visualizer) cares about. Hold these too:

- **Link concepts to concepts, never to an `index.md` listing or an in-page `#anchor`.** An `index.md` is navigation, not a concept node, so a concept that links to one is a dangling edge to a graph consumer even though the file exists and the checker stays silent. Point at the section's landing concept or a representative concept instead. The `index.md` files themselves may link to other `index.md` files: that is navigation, and it is fine.
- **No orphans.** Every concept should link to, or be linked from, at least one other concept. A concept with no edges is invisible to graph navigation; give it a `# Related` cross-link or weave one into its prose.
- Quick checks: `grep -rn '](/[^)]*index\.md)' bundles/<bundle> --include='*.md'` finds concept-to-index links (ignore hits inside `index.md` files); a concept with no outbound `](/...md)` link and no inbound link is an orphan to wire up.

This is the same discipline as Implicit mode: when you touch a concept, leave the bundle both validator-clean and graph-clean in the same change.

## Concept format

```markdown
---
type: <descriptive, self-explanatory kind>
title: <human-readable name>
description: <one sentence>
resource: <canonical URL for the underlying asset, if any>
tags: [<tag>, <tag>]
timestamp: <YYYY-MM-DDThh:mm:ssZ>
---

# <Section>

...

# Citations

[1] [<source>](<url>)
```

Rules:

- `type` is the only required field. Drop any recommended field you cannot stand behind rather than guessing; add domain-specific keys freely.
- Prefer structural markdown (headings, lists, tables, fenced code) over freeform prose.
- Link with bundle-absolute targets (`/techniques/invest.md`), and put the relationship in the prose around the link, not in the link itself.
- External sources you mirror live under `references/<slug>.md` with `type: Reference`, the live URL in `resource`, and a dated `timestamp`. Summarize and cite; do not paste a third party's full text.
- Where case law shapes the rule, not just the statute, add a `# Rechtsprechung` section with the leading decisions: court, date, and docket number (`BGH, Urteil vom 06.05.2021 - IX ZR 72/20`), each summarized in a sentence. Verify the docket number against the source; never invent one. The statute is the commodity, the case law is the value.
- A leading decision may also be its own concept with `type: Gerichtsentscheidung` (under a `rechtsprechung/` folder), carrying court, date, docket, official Fundstelle (e.g. `BGHZ 230, 28`), the affected norms as cross-links, and either the verbatim amtlicher Leitsatz or a clearly-labelled Kernaussage. Norm concepts then link to it. Prefer the **official source** as `resource`: `bundesgerichtshof.de` (or the relevant court / rechtsprechung-im-internet.de / Curia) and the amtliche Sammlung; dejure.org and openJur are finding aids, useful for the norm-to-decision index and for non-BGH courts.
- Court decisions and their amtlich verfasste Leitsätze are amtliche Werke and **gemeinfrei (§ 5 UrhG)**, so their text may be reproduced. Commentary literature (Beck, Wolters Kluwer, juris and similar paid or AI-gated literature) is **copyrighted**: do not mirror it; name it at most as a pointer. A full-text corpus of all judgments is a search/RAG artifact, not this bundle, which stays curated and norm-linked.
- Dates and timestamps are ISO 8601.

## Style

- Lead each section with the substance the reader needs, then any background.
- Never em or en dashes. Write natural prose with periods, commas, colons, parentheses.

## Distribution

OKF has no standard installer yet, so this repo is something agents clone or get pointed at, not `npx`-installed. Each bundle is a plain directory you can also tar or drop into another repo.
