---
type: Project
title: knowledge-catalog (Google Cloud)
description: The upstream repository: the spec, a reference producer, a reference consumer, and the sample bundles.
tags: [ecosystem, google, reference-implementation]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, reference implementations"
    last_modified: 2026-07-24
  - id: announcement
    resource: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/
    title: "How the Open Knowledge Format can improve data sharing"
---

# What is in it

`GoogleCloudPlatform/knowledge-catalog` is the home of the format. Apache 2.0, vendor-neutral, roughly fourteen pages of spec.

`The spec`
: `okf/SPEC.md`, the normative document. Everything in this bundle's [spec](../spec/conformance.md) and [trust](../trust/why-trust-is-a-field.md) sections tracks it.

`A reference producer`
: An enrichment agent built on Google ADK and Gemini. It walks a BigQuery dataset in a metadata pass, then an optional web pass that crawls seed URLs and mints `references/<slug>` concepts.

`A reference consumer`
: A single self-contained HTML visualizer that renders a bundle as a force-directed graph, with type-colored nodes, cross-link edges, backlinks, search, and type filters. Deliberately minimal, and best read as an existence proof rather than a tool. It surfaces none of the [v0.2 trust layer](../trust/trust-tiers.md), and it currently builds no edges from the bundle-absolute links the spec recommends. See [open questions](open-questions.md).

`Sample bundles`
: Four browsable bundles under `bundles/`. See [the sample bundles](sample-bundles.md).

# Why the reference implementations matter

They are proofs of concept rather than products, and that is the point. A producer and a consumer written independently, communicating only through the file format, is the demonstration that [producer and consumer independence](../spec/design-principles.md) works. Neither is required to use OKF, and neither is a dependency of any bundle.

The minimalism has a second effect worth naming. Because the reference consumer stops at the demonstration, the reading surface was left to the ecosystem, and independent readers and editors filled it within weeks. [OKF Studio](okf-studio.md) was built as a direct reaction to it. That is the design principle working as intended rather than a shortfall, and it is also why "Google ships a viewer" is a poor reason to skip evaluating [the community tools](community-tools.md).

# Timeline

The format was published by Google Cloud on 12 June 2026, with [v0.2](../spec/versioning.md) merged on 24 July 2026. The repository itself was created on 4 May 2026 and is under daily commit activity.

The same tree holds Google's own tooling, so "the format" and "Google's implementation of it" are not separable by URL. That is one of the gaps [governance](governance.md) covers, and the reason a `#43` proposal asks for OKF to get a repository of its own.

For the measured state of the repository and its tracker, see [state of adoption](adoption.md). For what Google is currently building on top of it, see [open questions](open-questions.md).

# Related

- [The okf skill](okf-skill.md) and [OKF Studio](okf-studio.md) are independent implementations built on the same spec.
- [Design principles](../spec/design-principles.md) covers the format-not-platform stance this repository holds to.
