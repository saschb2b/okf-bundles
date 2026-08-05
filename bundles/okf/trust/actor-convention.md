---
type: Spec Element
title: The actor convention
description: One identity syntax for every by and author field, and the one rule that keeps the trust layer honest.
tags: [trust, actors, identity, v0.2]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 7"
    author: team:google-cloud
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

# An open ambiguity: `team:`

The three forms above are what §7 lists. The spec's own §5.1 example then writes `author: team:ga4-docs`, which §7 does not permit, and the contradiction is open in the tracker as an unanswered erratum. See [open questions](/ecosystem/open-questions.md).

This bundle follows the §5.1 example and uses `team:` for organizational authors, so if §7 wins those entries become nonconforming. Naming the ambiguity beats guessing which way it resolves. A validator built from the §7 list alone will flag them, and one built from the general `prefix:value` shape will not, which is a good illustration of why the [conformance corpus proposal](/ecosystem/open-questions.md) matters.

# Choosing a version string

`<producer>/<version>` should let a reader tell two runs apart when the producer changed. A model name, a release tag or a build id all work. `my-agent/1` and `my-agent/unrecorded` are both better than dropping the version, because an unversioned producer cannot be distinguished from a later one that behaved differently.

# `process:` versus a producer string

Use `process:<id>` when the actor is a scheduled or triggered job whose identity is the job, not the software: `process:finance-nightly`, `process:bgh-ingest`. Use `<producer>/<version>` when the actor is a tool or agent invoked ad hoc. A `process:` entry in `verified` yields machine-confirmed, exactly like a producer string.

# Related

- [Generated and verified](/trust/generated-and-verified.md) is where these strings mostly appear.
- [Trust tiers](/trust/trust-tiers.md) is the classification this convention feeds.
