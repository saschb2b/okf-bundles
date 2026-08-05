---
type: Spec Element
title: The bundle
description: A self-contained directory of markdown files, and OKF's unit of distribution.
tags: [spec, structure, bundle]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, sections 2 and 3"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# What a bundle is

A bundle is a self-contained, hierarchical collection of markdown files. It is the unit of distribution: what you clone, tar, or drop into another repo.[^spec] Every non-reserved `.md` file inside it is a [concept](/spec/concept-document.md).

There is no central schema registry, no service, no database, and no account. If you can read a file you can read OKF, and if you can clone a repo you can ship it.

# The shape

```
bundle/
  index.md                 optional listing; declares okf_version at the root
  log.md                   optional chronological change history
  <concept>.md             a concept document
  <subdir>/
    index.md
    <concept>.md
    <subdir>/...
```

A worked layout, from Google's `acme_retail` sample:

```
acme_retail/
├── index.md          okf_version: "0.2"
├── log.md            dated history
├── tables/           orders.md
├── metrics/          revenue.md
│                     gross-margin.md
│                     gross-margin-legacy.md
├── computations/     revenue-ytd.md
├── policies/         revenue-recognition.md
└── attesters/        sql_equality.py
```

# Hierarchy is navigation, links are the graph

The directory tree exists so a human and an agent can find things. It is not the relationship model. The real graph is expressed by [links](/spec/cross-linking.md), which cross the hierarchy freely: a metric in `metrics/` points at a policy in `policies/` and a table in `tables/`.

Group by domain, not by file type. The spec has no opinion on which domains, and adding one is making a directory.

# Reserved filenames

`index.md` and `log.md` have defined meaning at any level and **MUST NOT** be used for concept documents. See [the index file](/spec/index-file.md) and [the log file](/spec/log-file.md).

These two names are inherited rather than invented. They are the catalog and the append-only record from the LLM wiki pattern OKF descends from, carried over with their meanings intact. See [LLM wikis and second brains](/approaches/llm-wikis.md).

Non-markdown files may live in a bundle. The `attesters/sql_equality.py` above is referenced by an [attested computation](/trust/attested-computation.md) and is not itself a concept.

# Related

- [Conformance](/spec/conformance.md) states what makes this directory a valid bundle.
- [Concept ID](/spec/concept-id.md) is how a file inside it is named.
- [Distribution](/practice/distribution.md) covers how a bundle ships.

[^spec]: OKF v0.2 specification, sections 2 and 3.
