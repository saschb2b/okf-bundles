---
type: Spec Element
title: generated and verified
description: Who wrote it and who confirmed it, kept separate on purpose.
tags: [trust, provenance, verification, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 5.2"
    last_modified: 2026-07-24
---

# The shape

```yaml
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-20T22:53:05Z }
verified:
  - { by: human:ahormati, at: 2026-06-25T09:00:00Z }
  - { by: process:finance-nightly, at: 2026-06-26T02:00:00Z }
```

`generated.by`
: **REQUIRED** within `generated`. An [actor](actor-convention.md).

`generated.at`
: An ISO 8601 datetime marking the content's last meaningful change. This is what v0.1's `timestamp` becomes.

`verified`
: A list of verification events, each `{ by, at }`. Multiple entries capture independent checks, for example a human sign-off plus a nightly process. A single verifier **MAY** be written as one bare `{ by, at }` mapping, and consumers **MUST** treat that as a one-element list.

# Why they are two fields

Authorship and confirmation are different events, usually by different actors. An agent generated it. A human or a process later confirmed it. Collapsing the two loses the only signal that distinguishes reviewed knowledge from generated knowledge, which is the distinction [the trust tier](trust-tiers.md) is computed from.

# The rule that holds the layer up

**Never backfill `verified`.** It records a confirmation that actually happened. Writing it because a concept looks right, or because a pipeline wants every concept to appear reviewed, silently promotes the bundle's trust tier and makes "show only human-reviewed metrics" a filter that returns unreviewed metrics.

Omit the field until a real human or process confirms the concept. Absence is a valid, meaningful state: it means unverified, and a consumer **MUST NOT** reject a concept for it.

# When a concept changes, the verification dies with it

A `verified` event vouches for the text that existed when it was recorded. If you materially change that text, the event no longer covers what the concept now says. Drop it rather than letting it vouch for words nobody checked, and refresh `generated` in the same edit, both `by` and `at`, because the actor may differ from whoever wrote it last.

This is the bookkeeping that decides whether a bundle rots. See [authoring a bundle](../practice/authoring-a-bundle.md).

# Related

- [The actor convention](actor-convention.md) governs both `by` fields.
- [Trust tiers](trust-tiers.md) is what a consumer derives from `verified`.
- [Verification versus attestation](attestation-versus-verification.md) separates confirming a definition from confirming a run.
