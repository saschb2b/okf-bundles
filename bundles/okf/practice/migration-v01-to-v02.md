---
type: Playbook
title: Migrating from v0.1 to v0.2
description: Two mechanical renames, then the judgment calls about actors and what not to claim as verified.
tags: [practice, migration, v0.2, versioning]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 13"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The two breaking changes

| v0.1 | v0.2 | Consumer fallback |
| --- | --- | --- |
| `timestamp: <ISO 8601>` | `generated: { by, at }` | Consumers **MAY** fall back to a legacy `timestamp` when `generated` is absent |
| `# Citations` body section | [`sources`](/trust/sources.md) frontmatter | Consumers **SHOULD** read `sources` and **MAY** still parse a legacy `# Citations` list on v0.1 documents |

Everything else v0.2 added is additive and optional: the credibility signals, [`verified`](/trust/generated-and-verified.md) and trust tiers, [`status` and `stale_after`](/trust/lifecycle.md), [the actor convention](/trust/actor-convention.md), and [Attested Computation](/trust/attested-computation.md).

# It is not urgent

A v0.1 bundle stays consumable by a v0.2 consumer under those fallbacks, so nothing breaks by waiting. Migrating is still worth doing, because the fields a v0.1 bundle lacks are exactly the ones that let a consumer decide whether to believe it.

# The mechanical part

- [ ] Move `timestamp: X` to `generated: { by: <actor>, at: X }`.
- [ ] Convert each `# Citations` bullet into a `sources` entry with a `resource` and a `title`.
- [ ] Give an `id` to any source the body will footnote, and replace the prose citation with a footnote whose label is that id.
- [ ] Declare `okf_version: "0.2"` in the root [`index.md`](/spec/index-file.md).
- [ ] Run [the checker with `--strict`](/practice/validation.md), which flags leftover `timestamp` and `# Citations`.

# The judgment calls

The renames are scriptable. These are not.

**Who is `generated.by`?** v0.1 recorded a time and no actor, so the actor has to be reconstructed. Record what actually wrote the text. If the history does not say which model or version, an honest `myagent/unrecorded` beats a confident guess, and it beats `human:` by a wide margin. See [the actor convention](/trust/actor-convention.md).

**What is `verified`?** Nothing, unless a person or process actually confirmed it. A migration is the single most tempting moment to backfill the field across a whole corpus, and doing so destroys the trust layer before anyone has used it. Leave it absent.

**What is `deprecated`?** A migration is a good moment to mark the definitions everyone knows are superseded, and to link each one forward to its replacement.

**What gets a `stale_after`?** Only concepts with a real expiry. Blanket-applying a date is noise.

# Related

- [Versioning](/spec/versioning.md) explains the numbering and what is deferred.
- [Authoring a bundle](/practice/authoring-a-bundle.md) covers the ongoing bookkeeping after the migration.
