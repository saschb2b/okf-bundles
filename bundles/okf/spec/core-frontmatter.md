---
type: Spec Element
title: Core frontmatter fields
description: type, title, description, resource, and tags: the cover sheet a consumer scans before opening the body.
tags: [spec, frontmatter, fields]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 4"
    last_modified: 2026-07-24
---

# The fields

| Field | Status | Type | Meaning |
| --- | --- | --- | --- |
| `type` | REQUIRED | string | The kind of concept. The only always-required key. Consumers use it for routing, filtering, and presentation. |
| `title` | recommended | string | Display name. If omitted, a consumer **MAY** derive one from the filename. |
| `description` | recommended | string | One sentence. Used by index generators, search snippets, and previews. |
| `resource` | recommended | URI | A URI identifying the underlying asset. Absent for concepts describing abstract ideas. |
| `tags` | recommended | list of strings | Short strings for cross-cutting categorization. |

The provenance, trust, and lifecycle families (`sources`, `generated`, `verified`, `status`, `stale_after`) are separate and all optional. See [sources](/trust/sources.md), [generated and verified](/trust/generated-and-verified.md), and [lifecycle](/trust/lifecycle.md).

# Choosing a `type`

`type` values are not registered anywhere. Producers **SHOULD** pick descriptive, self-explanatory values, and consumers **MUST** tolerate unknown ones.[^spec]

Good values say what the reader is looking at without a lookup: `BigQuery Table`, `Metric`, `Runbook`, `Policy`, `Reference`, `Attested Computation`. Poor values are generic (`Document`, `Page`, `Item`) or encode the file rather than the knowledge (`Markdown`).

Two conventions are worth holding inside a bundle: use one spelling for one kind, and keep the value stable, because consumers filter on it. `Attested Computation` is the one value the spec itself defines, because [the attestation machinery](/trust/attested-computation.md) keys off it.

# `resource` versus `sources`

They answer different questions and are easy to confuse.

`resource`
: The canonical URI of the thing the concept *describes*. For a table concept, the table. For a doc page mirrored under `references/`, the live URL.

`sources[].resource`
: What the concept was *written from*. Provenance, possibly several entries, possibly a scope descriptor rather than a followable link.

A concept about an abstract idea has no `resource` and still has `sources`.

# Drop what you cannot stand behind

A recommended field you guess at is worse than a missing one, because a consumer treats it as an assertion. Omit rather than invent. That rule is sharpest for `verified`, which [must never be backfilled](/trust/generated-and-verified.md).

# Related

- [The concept document](/spec/concept-document.md) shows these fields in place.
- [Extensions](/spec/extensions.md) covers the keys you add yourself.
- [Tags have no special file](/spec/extensions.md): a consumer synthesizes a tag view by scanning frontmatter.

[^spec]: OKF v0.2 specification, section 4.
