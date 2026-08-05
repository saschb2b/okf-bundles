---
type: Spec Element
title: The concept document
description: One markdown file, one unit of knowledge: YAML frontmatter plus a free-form body.
tags: [spec, concept, frontmatter]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 4"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The unit

A concept is one non-reserved `.md` file holding one unit of knowledge. It may describe a tangible asset (a table, an API), an abstract idea (a metric, a business process), or anything between.[^spec]

Structurally it is two parts: a YAML frontmatter block fenced by `---`, then a free-form markdown body.

# The three registers of a concept

`The cover sheet`
: [Core frontmatter](/spec/core-frontmatter.md). What it is, what it points at, how to find it. Cheap to scan across ten thousand files without opening any of them.

`The decision fields`
: The v0.2 families. Who wrote it, who checked it, when it expires, what it derives from. See [trust tiers](/trust/trust-tiers.md), [lifecycle](/trust/lifecycle.md), [sources](/trust/sources.md).

`The body`
: Structural markdown. Tables, code, diagrams, formulas, with each claim footnoted to a source id. See [body conventions](/spec/body-conventions.md).

A human can read this. So can an agent. Neither needs a tool.

# One concept, in full

`tables/orders.md`:

```markdown
---
type: BigQuery Table
title: Customer Orders
description: One row per completed order.
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-30T14:00:00Z }
verified:
  - { by: human:kliu@acme, at: 2026-07-01T16:00:00Z }
status: stable
stale_after: 2026-12-31
sources:
  - id: revenue-policy
    resource: policies/revenue-recognition.md
    author: human:jsmith@acme
    last_modified: 2026-06-15
---

# Schema

| Column       | Type   | Description                     |
|--------------|--------|---------------------------------|
| order_id     | STRING | Unique order id.                |
| order_status | STRING | Recognised only at 'delivered'. |
```

The `order_status` description is the claim that needs attribution, so in the real file it ends with a footnote whose label is `revenue-policy`, the `id` of the matching `sources` entry. See [sources](/trust/sources.md).

Everything below `type` is optional. A file carrying only `type` is fully conformant, which is the point of [the one rule](/spec/conformance.md).

# Related

- [Core frontmatter](/spec/core-frontmatter.md) covers the recommended fields and how to pick a `type`.
- [Extensions](/spec/extensions.md) covers adding your own keys.
- [Authoring a bundle](/practice/authoring-a-bundle.md) is the procedure for writing one.

[^spec]: OKF v0.2 specification, section 4.
