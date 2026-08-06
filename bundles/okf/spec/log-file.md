---
type: Spec Element
title: The log file
description: log.md gives a knowledge base a changelog: dated entries, newest first, in ISO 8601.
tags: [spec, log, history, reserved]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 9"
    last_modified: 2026-07-24
---

# What it is

A `log.md` **MAY** appear at any level to record that scope's history. It is a flat list of date-grouped entries, newest first, optionally preceded by a single `#` title.[^spec]

```markdown
# Directory Update Log

## 2026-05-28
* **Update**: Added the `loyalty_tier` column to the orders schema.

## 2026-05-22
* **Creation**: Documented the orders table and its join to customers.
```

Date headings **MUST** use the ISO 8601 `YYYY-MM-DD` form. Entries beneath a date are prose. The leading bold word (`**Creation**`, `**Update**`, `**Deprecation**`) is a convention, not a requirement.

# Why it exists when git already has history

Git records what bytes changed. The log records what a reader should know changed, in the reader's terms. "Added `loyalty_tier`" is a sentence an agent can act on. A diff of 40 lines across three files is not, and a bundle shipped as a tarball has no git history at all.

The log is also where you record what a producer *did not* cover: a crawl boundary, a section skipped, a source that was unavailable. That is the only place a consumer can learn about a gap, because the missing concepts cannot announce themselves.

# The discipline

Append an entry in the same change that touches a concept. A log written at the end of a month is a reconstruction. This is part of the bookkeeping that keeps a bundle from rotting silently, along with refreshing [`generated`](../trust/generated-and-verified.md) and regenerating the affected [index](index-file.md). See [authoring a bundle](../practice/authoring-a-bundle.md).

# Related

- [The index file](index-file.md) is the other reserved filename.
- [Lifecycle](../trust/lifecycle.md) records per-concept state, and the log records the change that produced it.

[^spec]: OKF v0.2 specification, section 9.
