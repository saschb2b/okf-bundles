---
type: Rationale
title: Design principles
description: Minimal opinion, producer and consumer independence, format rather than platform, and trust as data.
tags: [spec, principles, philosophy]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, design principles"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The four

`Minimally opinionated`
: OKF requires exactly one thing, a `type` per concept. Which types exist, what other fields appear, and how the body is organized are the producer's call. The spec defines the interoperability surface, not the content model. See [conformance](/spec/conformance.md).

`Producer and consumer independence`
: The party that writes knowledge is cleanly separated from the party that reads it. The format is the contract, and the tooling at each end is independently swappable. See [format versus protocol](/approaches/format-versus-protocol.md).

`Format, not platform`
: Never tied to a specific cloud, database, model provider or agent framework, and never requiring an account or SDK to read, write or serve. Value comes from adoption, not ownership.

`Trust is data, not tone`
: v0.2's addition. Whether to believe a concept is answered by fields a consumer can compute over, not by how confident the prose sounds. See [trust tiers](/trust/trust-tiers.md).

# What the principles rule out

Each principle has teeth because it rejects something that would otherwise be tempting:

- Minimal opinion rules out a fixed taxonomy of types, which would have made every bundle a negotiation.
- Independence rules out a reference implementation that any producer must run.
- Format-not-platform rules out a hosted registry, and with it the account, the pricing page, and the shutdown risk.
- Trust-as-data rules out a single credibility score, which would be subjective, unportable and stale the moment it was written. The [`sources`](/trust/sources.md) design follows directly.

# The consequence for adoption

A lingua franca is only worth the number of parties who speak it. That is why the bar is one field, why the license is Apache 2.0, and why the spec is roughly fourteen pages. Everything expensive was made optional so that the cheap part could spread.

# Related

- [Non-goals](/spec/non-goals.md) states the same boundaries as explicit exclusions.
- [Extensions](/spec/extensions.md) is minimal opinion applied to the key space.
