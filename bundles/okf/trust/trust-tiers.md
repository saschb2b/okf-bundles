---
type: Spec Element
title: Trust tiers
description: Three tiers a consumer derives from verified, never declared by the producer.
tags: [trust, tiers, filtering, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 5.3"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The three tiers

| [`verified`](/trust/generated-and-verified.md) | Tier |
| --- | --- |
| absent | **unverified** |
| present, non-`human:` actors only | **machine-confirmed** |
| present, includes a `human:<id>` actor | **human-reviewed** |

Consumers **SHOULD** derive trust tiers and staleness only from the specified fields.

# The tier is derived, never declared

OKF defines no `trust:` key. A producer cannot write "trust me". The tier falls out of who actually signed, which is why [the actor convention](/trust/actor-convention.md) matters more than it looks: consumers key off the `human:` prefix, so writing `human:` for agent-generated content inflates the tier of every concept it touches.

# What it is for

A policy becomes a filter on a file rather than a rule nobody enforces. "The executive dashboard only shows human-reviewed metrics" is one predicate over frontmatter, evaluated before a single token of body text is read.

Useful gates, in rough order of strictness:

- Serve any tier, and label the tier in the answer.
- Serve unverified knowledge for exploration, require machine-confirmed for anything written back to a system.
- Require human-reviewed for regulated, financial or customer-facing output.

# Unverified is not rejected

A consumer **MUST NOT** reject a concept for missing `verified`. The tier is an input to a decision, not a validity check. Most of a healthy bundle will sit at unverified, because review is expensive and most knowledge does not need it. The tier exists so the concepts that *do* need it can be told apart.

# Combine it with freshness

Tier answers "did anyone check this?" and says nothing about "is it still true?" A human-reviewed concept that expired in March is worse than an unverified one written yesterday. Read the tier together with [`status` and `stale_after`](/trust/lifecycle.md).

# Related

- [Why trust became a field](/trust/why-trust-is-a-field.md) is the motivation for the whole layer.
- [Consuming a bundle](/practice/consuming-a-bundle.md) shows the tier used in a retrieval decision.

