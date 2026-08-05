---
type: Reference
title: OKF v0.2 specification
description: The normative document: fourteen pages, Apache 2.0, published by Google Cloud on 24 July 2026.
tags: [reference, spec, normative]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification"
    last_modified: 2026-07-24
---

# What it is

The normative reference for the Open Knowledge Format, published by Google Cloud in `GoogleCloudPlatform/knowledge-catalog`. Normative keywords (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY, REQUIRED) carry RFC 2119 force. When any concept in this bundle and the upstream spec disagree, the upstream spec wins.

# Section map

| § | Subject | Concept here |
| --- | --- | --- |
| 1 | Motivation | [Why trust became a field](/trust/why-trust-is-a-field.md) |
| 2 | Terminology | [The bundle](/spec/bundle.md), [Concept ID](/spec/concept-id.md) |
| 3 | Bundle structure | [The bundle](/spec/bundle.md) |
| 4 | Concept documents | [The concept document](/spec/concept-document.md), [core frontmatter](/spec/core-frontmatter.md), [body conventions](/spec/body-conventions.md) |
| 5.1 | `sources` | [sources](/trust/sources.md) |
| 5.2 | `generated`, `verified` | [generated and verified](/trust/generated-and-verified.md) |
| 5.3 | Trust tiers | [Trust tiers](/trust/trust-tiers.md) |
| 5.4 | `status`, `stale_after` | [Lifecycle](/trust/lifecycle.md) |
| 6 | Cross-linking and paths | [Cross-linking](/spec/cross-linking.md) |
| 7 | Actor convention | [The actor convention](/trust/actor-convention.md) |
| 8 | Index files | [The index file](/spec/index-file.md) |
| 9 | Log files | [The log file](/spec/log-file.md) |
| 10 | Attested computations | [Attested Computation](/trust/attested-computation.md) |
| 11 | Conformance | [Conformance](/spec/conformance.md) |
| 12 | Versioning | [Versioning](/spec/versioning.md) |
| 13 | Changes from v0.1 | [Migration](/practice/migration-v01-to-v02.md) |

The closing sections on non-goals, distribution, design principles, relationship to other formats and reference implementations map to [non-goals](/spec/non-goals.md), [distribution](/practice/distribution.md), [design principles](/spec/design-principles.md) and [knowledge-catalog](/ecosystem/knowledge-catalog.md).

# The three definitions everything rests on

`Bundle`
: A self-contained directory of markdown files. The unit of distribution.

`Concept`
: One non-reserved `.md` file. One unit of knowledge.

`Concept ID`
: A concept's path within the bundle, without the `.md` suffix.

# What the spec defers

The runtime protocol behind attested computations, the attester ABI, attestation caching, and semantic-layer templates for tools like Looker and dbt. The spec says not to invent these. See [versioning](/spec/versioning.md).
