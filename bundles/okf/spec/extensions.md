---
type: Spec Element
title: Extensions and unknown keys
description: Producers may add any frontmatter key, and consumers preserve what they do not understand.
tags: [spec, extensibility, frontmatter, tags]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, sections 4 and 11"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The contract

Producers **MAY** include any additional frontmatter keys. Consumers **SHOULD** preserve unknown keys when round-tripping and **SHOULD NOT** reject documents that carry them.[^spec]

OKF defines no schema to register against. A producer adds the fields its domain needs, and a consumer that does not recognize them carries them through instead of dropping them.

# What this buys

A domain gets to be specific without waiting for the spec. A legal bundle adds `gericht`, `aktenzeichen`, and `fundstelle` to a decision concept. A data bundle adds `partition_column` and `row_count`. Both stay conformant, both stay readable by a generic viewer, and both keep their domain fields when a tool round-trips the file.

The cost is real and worth naming: an extension is local. Another team's consumer will not know what `aktenzeichen` means, so put anything a stranger needs in `type`, `title`, `description`, and the body, and treat extensions as a bonus for consumers that know your domain.

# Tags are first-class and have no special file

`tags` is a recommended [core field](/spec/core-frontmatter.md), and OKF defines no format for aggregating documents by tag. OKF defines no `tags/` directory and no tag registry. A consumer that wants a tag-browsing view synthesizes it at consumption time by scanning frontmatter.

That follows the same principle as index files: the bundle holds the data, and views over it are the consumer's job.

# Where extension stops

Do not extend into the areas the spec [defers](/spec/versioning.md), namely the attestation runtime protocol, the attester ABI, caching, and semantic-layer templates. Inventing a field there produces something that looks standard and is not, which is worse than an obviously local key.

# Related

- [Core frontmatter](/spec/core-frontmatter.md) is the part every consumer understands.
- [Conformance](/spec/conformance.md) states the tolerance rule this relies on.
- [Design principles](/spec/design-principles.md) covers minimal opinion, the stance behind an open key space.

[^spec]: OKF v0.2 specification, sections 4 and 11.
