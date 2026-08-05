---
type: Rationale
title: Why trust became a field
description: An agent-written corpus has nobody to blame, so the consumer has to judge each page on explicit signals.
tags: [trust, v0.2, motivation]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 1"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The failure v0.2 targets

An agent-maintained knowledge corpus fails in ways a human wiki does not.[^spec] It grows faster than anyone reviews it, its claims carry no visible authority, and a stale definition looks exactly like a current one.

A human wiki page comes with someone to blame. An agent's does not. When ten thousand pages appear overnight, "ask the author" stops being an available move, and the reader is often another agent with no way to ask anything.

# Five questions, answerable from the cover sheet

The consumer has to judge each page on explicit signals, before reading a word of the body:

| Question | Field |
| --- | --- |
| What was this made from? | [`sources`](/trust/sources.md) |
| How much should I believe it? | [`generated` and `verified`](/trust/generated-and-verified.md) |
| Is it still true? | [`stale_after`](/trust/lifecycle.md) |
| Is it the current version? | [`status`](/trust/lifecycle.md) |
| Was this number computed the sanctioned way? | [Attested Computation](/trust/attested-computation.md) |

All five are frontmatter, so answering them costs a file-header read rather than a full document read. At corpus scale that difference is the whole product.

# Trust is data, not tone

Whether to believe a concept is answered by fields a consumer computes over, not by how confident the prose sounds. That matters most exactly where a generated corpus is weakest: an agent writes fluent, assured prose about a fact it inferred, and fluency is not evidence.

The corollary is a rule the whole layer rests on: never write [`verified`](/trust/generated-and-verified.md) unless a person or a process actually checked. One backfilled field silently inflates a bundle's trust tier and makes the filter meaningless.

# It is all optional

None of these fields can make a bundle non-conformant. v0.2 adds vocabulary, not rules, and a bundle that adopts none of it is exactly as valid as before. See [conformance](/spec/conformance.md).

# Related

- [Four ways retrieval lets an agent down](/approaches/retrieval-failure-modes.md) covers failure 04, the accountability gap this closes.
- [Trust tiers](/trust/trust-tiers.md) is the derived signal a consumer filters on.

[^spec]: OKF v0.2 specification, section 1.
