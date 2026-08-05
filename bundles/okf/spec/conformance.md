---
type: Spec Element
title: Conformance
description: The one hard rule, the consumer's tolerance contract, and why the bar is deliberately low.
tags: [spec, conformance, rules]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 11"
    last_modified: 2026-07-24
---

# The producer's obligation

A bundle is conformant with OKF v0.2 when all three hold:[^spec]

1. Every non-reserved `.md` file in the tree contains a parseable YAML frontmatter block.
2. Every such frontmatter block contains a non-empty `type` field.
3. Every reserved filename (`index.md`, `log.md`), where present, follows [the index](/spec/index-file.md) and [log](/spec/log-file.md) structure.

In one sentence: every concept document carries YAML frontmatter with a non-empty `type`. Everything else in the format is guidance.

# The consumer's obligation

Consumers **MUST NOT** reject a bundle because of:

- Missing optional frontmatter fields
- Unknown `type` values
- Unknown additional frontmatter keys
- Broken cross-links
- Missing `index.md` files

Four more rules bind the consumer. It **MUST** treat a bare `verified` mapping as a one-element list. It **MUST NOT** reject a concept for missing any optional family. It **SHOULD** derive [trust tiers](/trust/trust-tiers.md) and staleness only from the specified fields. It **SHOULD** surface a failing [attestation](/trust/attested-computation.md) rather than drop it silently.

A consumer that does not understand the declared [version](/spec/versioning.md) **SHOULD** attempt best-effort consumption rather than refusing the bundle.

The asymmetry is the design: producers aim to be precise, consumers aim to be forgiving.

# Why one field

Standards die by demanding forty fields on day one, which is [how OSI lost to TCP/IP](/context/why-standards-win.md). Nothing v0.2 added can make a bundle non-conformant, because all of it is optional. A team can adopt the format on a Friday afternoon with `type` alone, then add [`sources`](/trust/sources.md) when they need provenance and [`verified`](/trust/generated-and-verified.md) when they need review, without any file becoming invalid in between.

# The `README.md` trap

Rule 1 says *every* non-reserved `.md` file. `index.md` and `log.md` are the only reserved names, so a plain `README.md` dropped into a bundle is treated as a concept, has no frontmatter, and makes the whole bundle non-conformant.

This catches people, because putting a README in a directory is reflex. Either keep it outside the bundle root or give it frontmatter with a `type`, which makes it a concept and no longer a README. An upstream pull request has proposed exempting it since June and has not merged, so plan around the rule as written. See [governance](/ecosystem/governance.md).

# Conformance is not coverage

A thin stub of a fifty-page site passes the check clean. The rule is about each file's `type`, never about whether the bundle captured its source, so passing [validation](/practice/validation.md) is necessary and not sufficient. A producer still owes real depth, every load-bearing name given its own concept, [a connected graph](/practice/graph-hygiene.md), and any crawl boundary recorded in [the log](/spec/log-file.md).

Nor does conformance say the knowledge is *true*. That is what the [trust layer](/trust/trust-tiers.md) exists to make checkable.

# Related

- [The concept document](/spec/concept-document.md) is what rule 2 applies to.
- [Design principles](/spec/design-principles.md) explains the minimal-opinion stance behind this bar.
- [Validation](/practice/validation.md) is the mechanical check.

[^spec]: OKF v0.2 specification, section 11.
