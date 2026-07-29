# OKF Bundles Repo Conventions

This repo is a collection of knowledge bundles in the Open Knowledge Format (OKF v0.2). Each bundle is one self-contained folder at the repo root, readable by any AI agent with no SDK. The format is markdown files with YAML frontmatter; the spec is at [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).

## Tooling: the `/okf` skill

Authoring and maintenance run through the OKF skill installed at `.claude/skills/okf/`. It is the authoritative tooling; this file is the repo-specific overlay on top of it. Reach for the skill, do not reinvent its steps by hand.

- **Commands.** Invoke `/okf <command>`: `init` (new bundle), `add` (one concept), `attest` (a computation an agent may run but not write), `migrate` (v0.1 to v0.2), `enrich` and `export` (turn a source, a docs site, or a URL into concepts), `link`, `index`, `log`, `validate`, `health`, `retrieve`, `consume`. Each is detailed in [`.claude/skills/okf/commands.md`](.claude/skills/okf/commands.md).
- **Deep references.** The normative spec is [`.claude/skills/okf/spec.md`](.claude/skills/okf/spec.md); copy-paste starting points are [`.claude/skills/okf/templates.md`](.claude/skills/okf/templates.md). When this file and the spec disagree on anything beyond repo layout, the spec wins.
- **Implicit mode (the discipline this repo most needs).** Whenever you touch a concept, keep the bundle conformant in the same change: refresh that concept's `generated` (both `by` and `at`, since the actor may differ from whoever wrote it last), append a `log.md` entry, regenerate the affected `index.md` (both the area listing and the root), and add the cross-links the new relationships imply. If you materially change a concept that carried a `verified` event, drop that event rather than letting it vouch for text nobody checked. Validate after each slice, not just at the end. This bookkeeping is where bundles silently rot.
- **Guard.** OKF is for knowledge an agent reads. Do not convert human-only prose (a README, a blog post, a design doc) into a bundle; ask first when an artifact's audience is unclear.

## Layout

```
bundles/
  <bundle>/
    index.md          root, declares okf_version: "0.2" (the only index.md with frontmatter)
    overview.md       optional entry concept that orients the reader
    log.md            dated change history, newest first
    <domain>/         concepts grouped by domain, not by file type
      index.md        directory listing, no frontmatter
      <concept>.md    one concept, frontmatter with a non-empty `type`
```

## The one rule

A bundle is conformant when every concept document carries YAML frontmatter with a non-empty `type`. That is the only hard requirement; everything else is recommended structure a consumer must tolerate. Nothing v0.2 added (`sources`, `generated`, `verified`, `status`, `stale_after`, attested computations) can make a bundle non-conformant, but this repo holds itself to the producer gate: `okf-validate --strict` on a bundle that declares `"0.2"` must pass.

## Adding a bundle

1. `/okf init` under `bundles/<bundle>/`: a root `index.md` declaring `okf_version: "0.2"`.
2. `/okf add` one concept at a time, grouped by domain. Reserved filenames are `index.md` (listings) and `log.md` (history). Never name a concept either, and never put a `README.md` inside a bundle: the checker treats any other `.md` as a concept and will fail it for missing `type`.
3. Add a `log.md` Creation entry dated today (`## YYYY-MM-DD`).
4. Add a row to the Bundles table in `README.md`.
5. Validate before committing. `/okf validate bundles/<bundle>` checks one bundle; `node scripts/check-bundles.mjs` gates the whole repo (it wraps the same checker over every bundle and warns on a missing README row). `scripts/okf-validate.mjs` is a vendored copy of the skill's `okf-validate.mjs`, kept in sync so the repo gate still runs where the skill is not installed.

## Staying conformant

Every bundle must stay conformant at all times, not just at creation. Before committing any change that touches a bundle, run the gate and fix what it flags:

- `node scripts/check-bundles.mjs` validates every bundle in the repo; `node scripts/okf-validate.mjs bundles/<bundle>` checks one, and `--strict` adds the producer gate (connectivity plus, on a bundle declaring `"0.2"`, leftover `timestamp` or `# Citations`, a `sources` entry with no `resource`, a `generated` with no `by`, an out-of-range `status`). The gate must report 0 errors. Treat its warnings (a non-ISO `log.md` date, a missing README row, a link whose target file is absent, an actor that is not `producer/version`, `human:id` or `process:id`) as fix-on-sight, not noise.

The checker verifies the hard rule (every concept has a `type`), the link targets, and the v0.2 provenance shapes. It does not check that the knowledge is right or that the bundle covers its source. Hold the graph expectations too, which the default run reports as warnings and `--strict` gates:

- **Link concepts to concepts, never to an `index.md` listing or an in-page `#anchor`.** An `index.md` is navigation, not a concept node, so a concept that links to one is a dangling edge to a graph consumer even though the file exists and the checker stays silent. Point at the section's landing concept or a representative concept instead. The `index.md` files themselves may link to other `index.md` files: that is navigation, and it is fine.
- **No orphans.** Every concept should link to, or be linked from, at least one other concept. A concept with no edges is invisible to graph navigation; give it a `# Related` cross-link or weave one into its prose.
- **Exception for bulk corpora.** A bundle that is a bulk, index-navigable corpus (one concept per record, reached through an `index.md` tree by id, date, or norm, like `bgh-rechtsprechung`) is exempt from the no-orphans expectation: its leaf records are legitimately reached through the index tree, and its overview may point to the index roots. This exemption is for corpora only. A curated bundle (concepts, techniques, norms, docs, one concept per idea) must be fully graph-clean: concept-to-concept links and no orphans.
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
generated:
  by: <producer/version | human:id | process:id>
  at: <YYYY-MM-DDThh:mm:ssZ>
sources:
  - resource: <url or bundle path>
    title: <human-readable label>
---

# <Section>

...
```

Rules:

- `type` is the only required field. Drop any recommended field you cannot stand behind rather than guessing; add domain-specific keys freely.
- **Provenance is v0.2's point, so fill it honestly.** `generated.by` is the actor that actually wrote the content: `<producer>/<version>` for an agent or tool, `process:<id>` for automation (the BGH ingest scripts), `human:<id>` only for hand-authored text. Content this repo's agents write is `claude-code/<model>` where the model is known and `claude-code/unrecorded` where it is not, never `human:`, because a consumer computes its trust tier off the `human:` prefix.
- **Never backfill `verified`.** It records a confirmation that actually happened, and it is the single field distinguishing reviewed knowledge from generated knowledge. Omit it until a real human or process confirms the concept.
- `sources` replaces the old `# Citations` body section: one entry per source with `resource` and `title`, plus an `id` for any the body footnotes (`...text.[^ga4-schema]`). `status` (`draft|stable|deprecated`) and `stale_after` (absolute `YYYY-MM-DD`) go only on concepts where they are real, never blanket-applied.
- Prefer structural markdown (headings, lists, tables, fenced code) over freeform prose.
- Link with bundle-absolute targets (`/techniques/invest.md`), and put the relationship in the prose around the link, not in the link itself.
- External sources you mirror live under `references/<slug>.md` with `type: Reference`, the live URL in `resource`, and a dated `generated`. Absorb the substance into the body so the concept stands alone offline; summarize and cite, do not paste a third party's full text.
- Where case law shapes the rule, not just the statute, add a `# Rechtsprechung` section with the leading decisions: court, date, and docket number (`BGH, Urteil vom 06.05.2021 - IX ZR 72/20`), each summarized in a sentence. Verify the docket number against the source; never invent one. The statute is the commodity, the case law is the value.
- A leading decision may also be its own concept with `type: Gerichtsentscheidung` (under a `rechtsprechung/` folder), carrying court, date, docket, official Fundstelle (e.g. `BGHZ 230, 28`), the affected norms as cross-links, and either the verbatim amtlicher Leitsatz or a clearly-labelled Kernaussage. Norm concepts then link to it. Prefer the **official source** as `resource`: `bundesgerichtshof.de` (or the relevant court / rechtsprechung-im-internet.de / Curia) and the amtliche Sammlung; dejure.org and openJur are finding aids, useful for the norm-to-decision index and for non-BGH courts.
- Court decisions and their amtlich verfasste Leitsätze are amtliche Werke and **gemeinfrei (§ 5 UrhG)**, so their text may be reproduced. Commentary literature (Beck, Wolters Kluwer, juris and similar paid or AI-gated literature) is **copyrighted**: do not mirror it; name it at most as a pointer. A full-text corpus of all judgments is a search/RAG artifact, not this bundle, which stays curated and norm-linked.
- Dates and timestamps are ISO 8601.

## Style

- Lead each section with the substance the reader needs, then any background.
- Never em or en dashes. Write natural prose with periods, commas, colons, parentheses.

## Distribution

OKF has no standard installer yet, so this repo is something agents clone or get pointed at, not `npx`-installed. Each bundle is a plain directory you can also tar or drop into another repo.
