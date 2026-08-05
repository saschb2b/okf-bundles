---
type: Spec Element
title: status and stale_after
description: Knowledge with a lifecycle and an expiry date, both checkable without an LLM.
tags: [trust, lifecycle, freshness, deprecation, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 5.4"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The shape

```yaml
status: stable          # draft | stable | deprecated
stale_after: 2026-09-23 # absolute date; stale on or after this day
```

# `status`

`draft`
: Not yet reviewed, possibly incomplete.

`stable`
: Ready for consumption. This is also what an absent `status` means.

`deprecated`
: Kept for links and history, no longer current.

Deprecation is the field that earns its keep in a real corpus. The old gross-margin formula stays in the bundle so last year's report can still be reproduced, and it is never served to new work. Retrieval cannot make that distinction, because the deprecated page reads exactly like the current one. See [retrieval failure 02](/approaches/retrieval-failure-modes.md).

Write the replacement into the deprecated concept as a [cross-link](/spec/cross-linking.md), with the relationship in the prose: "superseded by the FY2026 definition in `/metrics/gross-margin.md`". A deprecated concept with no forward pointer is a dead end.

# `stale_after`

An absolute date. A concept is stale when `today >= stale_after`.

Absolute rather than a relative TTL, on purpose: staleness becomes a date comparison a one-line script can do, and it does not depend on when the concept was read or how a consumer chose to interpret "90 days". No clock skew, no arithmetic, no ambiguity.

Set it where the expiry is real. A quarterly figure expires at quarter end. A policy expires when the policy is next reviewed. A definition of "customer" probably never expires, and a blanket `stale_after` on every concept in a bundle degrades to noise within a month.

# Both are optional, and both should be sparse

`status` and `stale_after` go only on concepts where they carry meaning, never blanket-applied. Absence means stable and non-expiring, which is the correct default for most knowledge.

# Freshness is not trust

They answer different questions. A concept can be human-reviewed and expired, or unverified and current. Read them together, and see [trust tiers](/trust/trust-tiers.md) for the other axis.

# Related

- [Why trust became a field](/trust/why-trust-is-a-field.md) covers the stale-looks-like-current failure.
- [The log file](/spec/log-file.md) records the change that moved a concept to `deprecated`.
