---
type: Overview
title: OKF, explained
description: What the Open Knowledge Format is, the problem it addresses, and a reading order through this bundle.
tags: [overview, okf, entry-point]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The short version

The Open Knowledge Format is a folder of markdown files with YAML frontmatter, kept in git, that an agent can read with no SDK and no service. Google Cloud published it in June 2026 under Apache 2.0, and [v0.2](/spec/versioning.md) followed on 24 July 2026.

The whole hard requirement is one field: every [concept document](/spec/concept-document.md) carries frontmatter with a non-empty `type`. Everything else is guidance a consumer must tolerate the absence of.

# The problem it addresses

A model ships knowing the world and knowing nothing about you. Closing that [knowledge gap](/context/knowledge-gap.md) means putting the right facts on the agent's [desk](/context/context-window.md) on the turn that needs them. The step that does it is [context assembly](/context/context-assembly.md), and it decides more about answer quality than the model does. Almost nobody owns it.

The knowledge usually exists. It sits [scattered](/context/scattered-knowledge.md) across wikis, catalogs, Slack threads and two colleagues' heads, in shapes no agent can read uniformly. [Retrieval](/approaches/retrieval-augmented-generation.md) is the standard answer, and it [fails in four reliable ways](/approaches/retrieval-failure-modes.md). Chunking shreds structure. Similarity cannot tell the current page from the deprecated one. A ranked list has no edges. A chunk carries no author and no review.

Agents reason by traversal. Retrieval hands them a pile. They need a map.

# What v0.2 adds

v0.1 answered "what does the agent need to know?" v0.2 answers "should it believe this, and is it still true?" When [an agent writes ten thousand pages overnight](/trust/why-trust-is-a-field.md), nobody is left to blame and nobody is left to ask. The consumer has to judge each page on explicit signals: [what it derives from](/trust/sources.md), [who wrote it and who checked it](/trust/generated-and-verified.md), [whether it is current](/trust/lifecycle.md), and [whether a number came from the sanctioned query](/trust/attested-computation.md).

All of it is optional. A bundle that adopts none of it is exactly as valid as before.

# Reading order

| If you want | Start at |
| --- | --- |
| The argument, from the beginning | [The context window](/context/context-window.md) |
| The honest comparison with what you run today | [OKF versus retrieval](/approaches/okf-versus-retrieval.md) |
| To answer "but we already have X" | [retrieval](/approaches/retrieval-and-okf-together.md), [a catalog](/approaches/data-catalogs-and-semantic-layers.md), [a knowledge graph](/approaches/knowledge-graphs-and-ontologies.md), [skills](/approaches/skills-and-procedures.md), [a huge context window](/approaches/long-context.md) |
| The format itself | [The bundle](/spec/bundle.md), then [the concept document](/spec/concept-document.md) |
| The trust layer | [Why trust became a field](/trust/why-trust-is-a-field.md) |
| To write one in the next hour | [Your first bundle](/practice/first-bundle.md), a copyable five-file example |
| To write one this week | [The adoption path](/practice/adoption-path.md) |
| To point an agent at one | [Consuming a bundle](/practice/consuming-a-bundle.md) |
| Working examples | [Google's sample bundles](/ecosystem/sample-bundles.md) |
| Whether anyone else is using this | [State of adoption](/ecosystem/adoption.md), then [community tools](/ecosystem/community-tools.md) |
| What is still unsettled | [Open questions](/ecosystem/open-questions.md) and [governance](/ecosystem/governance.md) |

# The type vocabulary

`type` is what a consumer routes and filters on, so here is what this bundle uses. Values are descriptive rather than registered, per [core frontmatter](/spec/core-frontmatter.md).

| `type` | What it marks | Count |
| --- | --- | --- |
| `Spec Element` | One part of the v0.2 specification | 17 |
| `Approach` | A way of getting knowledge to an agent | 10 |
| `Playbook` | A procedure you follow | 8 |
| `Primer` | Foundational orientation, read first | 4 |
| `Comparison` | Two or more things set side by side | 4 |
| `Field Report` | A dated measurement of the world | 4 |
| `Project` | A named implementation | 4 |
| `Rationale` | Why the format decided something | 3 |
| `Reference` | External material absorbed into the bundle | 3 |
| `Practice` | How something is done in the field | 2 |
| `Analysis`, `Tutorial`, `Overview` | One each | 3 |

Two are worth filtering on deliberately. Every `Field Report` carries [`status: draft` and `stale_after`](/trust/lifecycle.md), because those four are dated snapshots rather than durable facts. Everything else is written to stay true.

# What this bundle is

An OKF bundle about OKF, written to the spec it describes. The normative claims trace to [the v0.2 specification](/references/okf-spec-v02.md) and [Google's announcement](/references/google-cloud-announcement.md). The surrounding argument about context, retrieval and adoption is analysis rather than citation, and it carries a source only where a specific claim needs one. Nothing in the bundle is `verified`, because nobody has reviewed it yet, which is the field working as designed.

