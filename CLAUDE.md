# OKF Bundles Repo Conventions

This repo is a collection of knowledge bundles in the Open Knowledge Format (OKF v0.1). Each bundle is one self-contained folder at the repo root, readable by any AI agent with no SDK. The format is markdown files with YAML frontmatter; the spec is at [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).

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

1. Create `bundles/<bundle>/` with a root `index.md` declaring `okf_version: "0.1"`.
2. Write concepts grouped by domain. Reserved filenames are `index.md` (listings) and `log.md` (history). Never name a concept either, and never put a `README.md` inside a bundle: the checker treats any other `.md` as a concept and will fail it for missing `type`.
3. Add a `log.md` Creation entry dated today (`## YYYY-MM-DD`).
4. Add a row to the Bundles table in `README.md`.
5. Run `node scripts/check-bundles.mjs` and fix any errors before committing.

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
- Dates and timestamps are ISO 8601.

## Style

- Lead each section with the substance the reader needs, then any background.
- Never em or en dashes. Write natural prose with periods, commas, colons, parentheses.

## Distribution

OKF has no standard installer yet, so this repo is something agents clone or get pointed at, not `npx`-installed. Each bundle is a plain directory you can also tar or drop into another repo.
