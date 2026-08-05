---
type: Reference
title: Google Cloud, how the Open Knowledge Format can improve data sharing
description: The announcement post that introduced OKF and framed it as a data-sharing problem rather than an agent-prompting one.
tags: [reference, announcement, google]
resource: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: announcement
    resource: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/
    title: "How the Open Knowledge Format can improve data sharing"
    author: team:google-cloud
---

# The framing

The announcement introduces OKF from the data-sharing side rather than the prompting side: the problem is that meaning does not travel with data between producers and consumers, and every agent, tool and team reconstructs it.

That framing explains two design choices that look odd from a pure agent-context view:

- The format is vendor-neutral and Apache 2.0, because a sharing format that one party owns is not a sharing format. See [design principles](/spec/design-principles.md).
- The first reference producer walks a BigQuery dataset, because a warehouse is where the meaning gap is most expensive. See [knowledge-catalog](/ecosystem/knowledge-catalog.md).

# What it points to

The post is the entry point to `GoogleCloudPlatform/knowledge-catalog`, which holds [the spec](/references/okf-spec-v02.md), the reference producer and consumer, and [the sample bundles](/ecosystem/sample-bundles.md).

# How it relates to the rest of this bundle

Reading the announcement first frames OKF as a catalog and data-sharing format. Reading [the context sections](/context/knowledge-gap.md) first frames it as an agent-context format. Both are accurate, and the second is the broader case: the sixty thousand court decisions and the recipe graph in [okf-bundles](/ecosystem/okf-bundles-repo.md) are not data-catalog use cases.
