---
type: Spec Element
title: sources
description: What a concept derives from, with per-source credibility signals and a footnote join key for single claims.
tags: [trust, provenance, sources, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 5.1"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The shape

```yaml
sources:
  - id: ga4-schema
    resource: https://developers.google.com/analytics/bigquery/export-schema
    title: GA4 BigQuery Export schema
    author: team:ga4-docs
    usage_count: 5000
    last_modified: 2026-05-30
usage_window: { from: 2026-06-01, to: 2026-06-30 }
```

# Per entry

`resource`
: **REQUIRED** within an entry. Either a concrete artifact a consumer can follow (an absolute URL, a bundle-relative path, or a path into a `references/` subdirectory) or a population or scope descriptor it cannot, for example `all queries in BigQuery project X`.

`id`
: Optional. A stable key used to attribute individual claims. **SHOULD** be present when the body cites the source.

`title`
: Optional. A human-readable label.

# Credibility signals, all optional

`author`
: Who or what produced the source, in [the actor convention](/trust/actor-convention.md). An authority signal.

`usage_count`
: How often `resource` was exercised (dashboard views, query executions, page reads) over `usage_window`. An adoption and liveness signal.

`last_modified`
: When the source itself last changed, as `YYYY-MM-DD`. A recency signal, distinct from [`generated.at`](/trust/generated-and-verified.md), which records when the *concept* was written.

`usage_window`
: Written once as a sibling of `sources`, it frames every `usage_count` with a `{ from, to }` range.

# Signals, not a score

Each entry names objective facts and stops there. The consumer infers credibility. A single score would be subjective, unportable, and stale the moment it was written, so the format refuses to compute one. A finance consumer weighting `author` and a search consumer weighting `usage_count` both get what they need from the same file.

# Attributing one claim

Use a markdown footnote whose label matches a source `id`. This concept's frontmatter carries `id: spec`, so this sentence can carry its attribution as a footnote keyed to that id.[^spec]

The label is a join key into `sources`. Consumers resolve attribution by matching the label to an entry's `id`, not by parsing the footnote text, so attributions survive an agent reordering the list. A numbered footnote that keys to nothing is a broken attribution wearing the right clothes.

The footnote definition at the foot of the file gives the human-readable label. That text is for the reader. The machine uses the id.

# This replaced `# Citations`

v0.1 put provenance in a body section. Moving it to frontmatter is one of the two breaking changes, and it is what lets a consumer read provenance without parsing the body. See [migration](/practice/migration-v01-to-v02.md).

# Related

- [Why trust became a field](/trust/why-trust-is-a-field.md) is the motivation.
- [Core frontmatter](/spec/core-frontmatter.md) distinguishes `sources[].resource` from the top-level `resource`.
- [External references](/practice/external-references.md) covers mirroring a source under `references/`.

[^spec]: OKF v0.2 specification, section 5.1.
