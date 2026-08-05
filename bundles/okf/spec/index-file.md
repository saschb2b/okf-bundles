---
type: Spec Element
title: The index file
description: index.md is a directory listing for progressive disclosure, carries no frontmatter, and is never a concept.
tags: [spec, index, navigation, reserved]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, sections 8 and 12"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# What it is for

An `index.md` **MAY** appear in any directory, including the bundle root. It is the table of contents at that level: a short, curated listing so an agent can decide where to descend without reading every file.[^spec] That is [progressive disclosure](/practice/progressive-disclosure.md), and it is what keeps a ten-thousand-file bundle usable inside a finite [context window](/context/context-window.md).

# The frontmatter rule

An `index.md` carries **no frontmatter**, with exactly one exception: the bundle-root `index.md` **MAY** carry a frontmatter block, and that is the only place `index.md` frontmatter is permitted. It exists to declare the format version:

```yaml
---
okf_version: "0.2"
---
```

See [versioning](/spec/versioning.md).

# The body shape

One or more sections, each grouping concepts under a heading, as a bulleted list of links with short descriptions. Entries **SHOULD** carry the description from the linked concept's frontmatter and **MAY** link to subdirectories with a trailing slash:

Modelled on this bundle's own trust listing, which groups [trust tiers](/trust/trust-tiers.md) and [lifecycle](/trust/lifecycle.md) under one heading:

```markdown
# Judgement
* [Trust tiers](/trust/trust-tiers.md) - Three tiers a consumer derives from verified.
* [status and stale_after](/trust/lifecycle.md) - Knowledge with a lifecycle and an expiry date.

# Subdirectories
* [Practice](practice/) - Authoring, consuming, validating, shipping.
```

Both link forms work in an index. Relative targets keep a listing short, and bundle-absolute targets survive the directory moving.

Producers **MAY** generate index files automatically, and consumers **MAY** synthesize one when it is absent. Neither is required.

# An index is navigation, not a node

An `index.md` is not a concept, so a graph consumer does not treat it as one. The practical rule follows: **a concept should never link to an `index.md`.** That link looks fine to a file checker and is a dangling edge to a traversing agent. Point at the section's landing concept instead, or at a representative concept.

Index files linking to other index files is fine. That is navigation linking to navigation.

# Related

- [The log file](/spec/log-file.md) is the other reserved filename.
- [Graph hygiene](/practice/graph-hygiene.md) covers the concept-to-index mistake and how to find it.
- [The bundle](/spec/bundle.md) shows where index files sit in the tree.

[^spec]: OKF v0.2 specification, sections 8 and 12.
