---
type: Spec Element
title: Body conventions
description: Conventional headings, why structure beats prose, and picking the sharpest markdown form for a fact.
tags: [spec, body, markdown, authoring]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 4"
    last_modified: 2026-07-24
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "The okf skill: pick the sharpest markdown form"
    author: human:sascha
    last_modified: 2026-08-05
---

# Structure over prose

The body is ordinary markdown. Producers **SHOULD** favor headings, lists, tables, and fenced code over freeform prose, because a consumer can parse and present structure.[^spec] A paragraph describing five columns is one blob to an agent. A table of five columns is five facts.

# Conventional headings

| Heading | Purpose |
| --- | --- |
| `# Schema` | A structured description of the asset's columns or fields, typically a table. |
| `# Examples` | Concrete usage examples, typically fenced code. |
| `# Computation` | The sanctioned computation, for [Attested Computation](../trust/attested-computation.md) concepts. |

These are conventions, not a template. A concept may have only a body, or entirely different headings.

# Pick the sharpest form for the fact

Beyond headings and tables, a fact with inherent shape has a markdown form that carries that shape. It parses better and renders richly where people read bundles. Where a consumer renders none of it, the source still reads as plain markdown.[^skill]

| The fact | Write it as | Not as |
| --- | --- | --- |
| Topology: joins, lineage, pipeline flow, states | A ` ```mermaid ` fence (`erDiagram`, `flowchart`, `sequenceDiagram`) | A paragraph describing arrows |
| A formal definition: metric formula, threshold, window | TeX, `$…$` inline or `$$…$$` display | Pseudo-math in prose |
| Term meanings: a glossary, enum values, status codes | A definition list | Bullets shaped like "X - means Y" |
| A checklist with state | A task list (`- [x]` / `- [ ]`) | Prose like "steps 1 to 3 are done" |
| Attribution of one claim | A footnote whose label is a `sources` entry `id` | A parenthetical URL, or a numbered footnote keyed to nothing |
| Field-by-field facts: schemas, parameters | A markdown table | Key-value prose |

Keep prose for meaning and reasoning. Reach for these forms when the fact has shape.

# `# Citations` is gone

v0.1 put provenance in a `# Citations` body section. v0.2 moves it to [the `sources` frontmatter family](../trust/sources.md), and a footnote keyed to a source `id` now attributes each claim. This is one of the two breaking changes. See [migration](../practice/migration-v01-to-v02.md).

# Related

- [The concept document](concept-document.md) is the file this body sits in.
- [Authoring a bundle](../practice/authoring-a-bundle.md) puts these conventions into a procedure.

[^spec]: OKF v0.2 specification, section 4.
[^skill]: The okf skill: pick the sharpest markdown form.
