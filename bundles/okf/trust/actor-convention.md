---
type: Spec Element
title: The actor convention
description: One identity syntax for every by and author field, and the one rule that keeps the trust layer honest.
tags: [trust, actors, identity, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/fable-5
  at: 2026-08-06T00:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 7"
    last_modified: 2026-07-24
---

# The three forms

| Form | For | Example |
| --- | --- | --- |
| `<producer>/<version>` | agents and tools | `reference_agent/gemini-2.5-pro` |
| `human:<id>` | a person | `human:ahormati` |
| `process:<id>` | an automated process | `process:finance-nightly` |

The convention applies everywhere an identity is recorded: [`generated.by`](/trust/generated-and-verified.md), `verified[].by`, and [`sources[].author`](/trust/sources.md).

# The one rule

Consumers that classify trust key off the `human:` prefix, so producers **MUST** use it for hand-authored or human-confirmed content. The corollary matters more: **do not write `human:` for content an agent generated.** That single substitution silently inflates the bundle's [trust tier](/trust/trust-tiers.md) and turns a filter into decoration.

An agent writing a concept records itself. In this repo, that is `claude-code/opus-5` where the model is known and `claude-code/unrecorded` where it is not, never `human:sascha`, even though a person asked for the file. Requesting a document is not authoring it.

`human:` is correct when a person typed the words, or when a person read the concept and signed it off in `verified`.

# An open ambiguity: `team:`, and how it bit this bundle

The three forms above are what §7 lists. The spec's own §5.1 example then writes `author: team:ga4-docs`, which §7 does not permit, and the contradiction is open in the tracker as an unanswered erratum. See [open questions](/ecosystem/open-questions.md).

This bundle originally followed the §5.1 example and wrote `team:` for organizational authors, in 47 places. Then a real consumer ruled. OKF Studio implements §7 as written and flagged every one as a validation warning, while this repo's own validator, built from the general `prefix:value` shape, accepted them all. When a spec and its own example disagree, consumers implement the rule text, and the producer eats the difference.

The resolution followed [core frontmatter](/spec/core-frontmatter.md)'s rule: drop a field you cannot fill honestly. An organization is not an agent, a person, or a process, so the `author` fields came out and the organization names stay in each source's `title`, where no convention constrains them. Shoehorning `team:google-cloud` into `process:google-cloud` would have traded a visible warning for a quiet lie.

Two validators disagreeing over 47 fields in one bundle is also the whole argument for the [conformance corpus proposal](/ecosystem/open-questions.md) in miniature.

# Choosing a version string

`<producer>/<version>` should let a reader tell two runs apart when the producer changed. A model name, a release tag or a build id all work. `my-agent/1` and `my-agent/unrecorded` are both better than dropping the version, because an unversioned producer cannot be distinguished from a later one that behaved differently.

# `process:` versus a producer string

Use `process:<id>` when the actor is a scheduled or triggered job whose identity is the job, not the software: `process:finance-nightly`, `process:bgh-ingest`. Use `<producer>/<version>` when the actor is a tool or agent invoked ad hoc. A `process:` entry in `verified` yields machine-confirmed, exactly like a producer string.

# Related

- [Generated and verified](/trust/generated-and-verified.md) is where these strings mostly appear.
- [Trust tiers](/trust/trust-tiers.md) is the classification this convention feeds.
