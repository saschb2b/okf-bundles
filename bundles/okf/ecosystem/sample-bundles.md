---
type: Reference
title: Google's sample bundles
description: acme_retail exercises every v0.2 feature, and GA4, Stack Overflow, and Bitcoin are the regenerated v0.1 samples.
tags: [ecosystem, examples, google, acme-retail]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, reference implementations"
    last_modified: 2026-07-24
---

# The four

| Bundle | What it shows |
| --- | --- |
| `acme_retail` | New in v0.2, and the one to read first. Small, and it exercises every v0.2 feature. |
| GA4 e-commerce | The BigQuery export schema, regenerated in v0.2 form |
| Stack Overflow | A public dataset, regenerated in v0.2 form |
| Bitcoin | A public dataset, regenerated in v0.2 form |

# What `acme_retail` demonstrates

`A verified metric`
: Written by an agent, signed off by the VP of Finance. The [human-reviewed tier](../trust/trust-tiers.md), with the two actors kept distinct.

`A deprecated metric`
: The pre-FY2026 gross-margin formula, kept in the bundle for reproducibility and never served to new work. See [lifecycle](../trust/lifecycle.md).

`Attested SQL`
: Revenue YTD, with a real SQL-equality attester script. See [Attested Computation](../trust/attested-computation.md).

`Policies as concepts`
: Revenue recognition as its own file, cited per claim through [footnoted source ids](../trust/sources.md).

`Sources with credibility signals`
: `author`, `usage_count`, and `last_modified` filled where they are known.

Its layout is the worked example in [the bundle](../spec/bundle.md): `tables/`, `metrics/`, `computations/`, `policies/`, `attesters/`.

# How to read a sample

Start at its root `index.md` and walk one question through the graph, exactly as [a consumer would](../practice/consuming-a-bundle.md). Reading the files in directory order teaches the layout and misses the point, because the point is the traversal.

# Related

- [knowledge-catalog](knowledge-catalog.md) is the repository these live in.
- [okf-bundles](okf-bundles-repo.md) is a different kind of example: bundles at corpus scale.
