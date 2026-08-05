---
type: Spec Element
title: Versioning
description: okf_version in the root index, what a major and a minor bump mean, and what v0.2 defers.
tags: [spec, versioning, roadmap]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 12"
    last_modified: 2026-07-24
---

# Declaring a version

A bundle **MAY** declare its target version in the bundle-root `index.md` frontmatter, which is the only place [`index.md` frontmatter](/spec/index-file.md) is permitted:

```yaml
---
okf_version: "0.2"
---
```

The value is a quoted string, so `0.10` never becomes `0.1`.

# What the numbers mean

Revisions use `<major>.<minor>`:

- A **minor** bump introduces backward-compatible additions, such as new optional fields or conventional headings.
- A **major** bump may break, such as renaming a required field or changing reserved filenames.

v0.1 to v0.2 broke two things despite the minor bump, both listed in [migration](/practice/migration-v01-to-v02.md), and both with documented consumer fallbacks. That is the pre-1.0 latitude, not a promise the rule will bend again. The same observation is open as an unanswered erratum against the spec, along with several others. See [open questions](/ecosystem/open-questions.md).

# Timeline

| Version | Date | What it added |
| --- | --- | --- |
| v0.1 | June 2026 | The format: bundles, concepts, `type`, links, index and log files |
| v0.2 | 24 July 2026 | Provenance, trust, lifecycle, and [attested computations](/trust/attested-computation.md) |

Six weeks apart, and additive apart from the two renames.

# What is deliberately deferred

The spec names these as open and tells producers not to invent them:

- The full runtime protocol behind attested computations, meaning the receipt and verdict wire formats
- The attester ABI, with its portability and sandboxing story
- Attestation caching
- Semantic-layer templates for tools like Looker and dbt, so mapping [an existing semantic layer](/approaches/data-catalogs-and-semantic-layers.md) into concepts is currently your own convention

If you need one of these today, build it outside the format and treat your solution as local rather than as OKF.

# Related

- [Conformance](/spec/conformance.md) covers the best-effort rule for an unknown version.
- [Migration from v0.1](/practice/migration-v01-to-v02.md) is the procedure for the one bump so far.
