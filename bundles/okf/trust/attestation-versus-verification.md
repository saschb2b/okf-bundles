---
type: Comparison
title: Verification versus attestation
description: One confirms a definition, the other confirms a single run. Both are needed.
tags: [trust, attestation, verification, v0.2]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 10.4"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# Side by side

| | [`verified`](/trust/generated-and-verified.md) | [Attestation](/trust/attested-computation.md) |
| --- | --- | --- |
| Confirms | The *definition* matches policy | A single *run* produced the values correctly |
| Cadence | Doc-level, slow | Per-call, at runtime |
| Stored | In the bundle | Not in the bundle |
| Performed by | A human or a process | A deterministic checker, no LLM |

# Why both

They fail independently, which is the whole reason the spec keeps them apart:

- A concept with a **stale definition can still attest cleanly**. The query ran exactly as written. The query is out of date.
- A **freshly verified definition still requires attestation on every run**. The VP of Finance signed off on the SQL in June. That says nothing about whether today's agent ran that SQL or something it improvised.

Checking one and calling it done leaves the other failure wide open.

# Where each lives

`verified` is a field in the bundle, so it travels with the file and any consumer reads it. An attestation verdict is per-call and is not written back into the bundle, because it belongs to a run rather than to the knowledge. Storing verdicts would make the bundle a log.

# The reading order for a consumer

1. Check [`status` and `stale_after`](/trust/lifecycle.md). A deprecated or expired concept is out before anything else runs.
2. Check the [trust tier](/trust/trust-tiers.md) against what this answer is for.
3. If a number is involved, execute through the attested computation and gate on the verdict.

Steps 1 and 2 are free, being frontmatter reads. Step 3 costs a query, so it goes last.

# Related

- [Why trust became a field](/trust/why-trust-is-a-field.md) sets out all five questions the layer answers.
- [Consuming a bundle](/practice/consuming-a-bundle.md) puts this order into a procedure.
