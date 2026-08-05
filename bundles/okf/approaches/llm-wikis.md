---
type: Approach
title: LLM wikis and second brains
description: The compiled-knowledge pattern OKF descends from, why it is not dead, and how personal knowledge tools connect to it.
tags: [approach, llm-wiki, pkm, obsidian, lineage, history]
resource: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
generated:
  by: claude-code/opus-5
  at: 2026-08-05T18:00:00Z
sources:
  - id: gist
    resource: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
    title: "Andrej Karpathy, LLM Wiki (gist, 4 April 2026)"
    author: human:karpathy
    last_modified: 2026-04-04
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, relationship to other formats"
    author: team:google-cloud
    last_modified: 2026-07-24
  - id: tracker
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/issues/44
    title: "OKF issue #44, wikilinks and Obsidian-style vaults"
---

# The pattern

In April 2026 Andrej Karpathy published a gist proposing that an agent should not re-retrieve documents on every question, but incrementally build and maintain a persistent markdown wiki that sits between you and your raw sources. "The wiki is a persistent, compounding artifact." Each new source updates several pages rather than being indexed for later.[^gist]

Three layers:

1. **Raw sources**, immutable originals.
2. **The wiki**, LLM-generated markdown with cross-references.
3. **The schema**, a configuration document such as `CLAUDE.md` or `AGENTS.md` defining structure and workflow. See [briefing files](/approaches/briefing-files.md).

Three operations: **ingest** a source into several pages, **query** the wiki and file valuable answers back as new pages, and **lint** for contradictions, stale claims, orphan pages and missing cross-references.

Two named files: **`index.md`**, a catalog organized by category, and **`log.md`**, an append-only chronological record.

It reached roughly 5,000 stars and 1,294 forks within 48 hours, and the reaction split between "this is RAG with extra steps" and people who immediately started building.

# The lineage is not subtle

OKF v0.1 was published on 12 June 2026, about ten weeks later, and [reserves exactly two filenames](/spec/bundle.md): `index.md` and `log.md`. With the same meanings. The spec names its ancestry directly, listing "LLM wiki repositories that use markdown plus frontmatter as an agent-readable knowledge base" first among the patterns it is close to.[^spec]

| LLM wiki gist | OKF |
| --- | --- |
| Markdown wiki with cross-references | [Bundle of concepts](/spec/bundle.md), linked |
| `index.md` catalog by category | [`index.md`](/spec/index-file.md), reserved, for progressive disclosure |
| `log.md` append-only record | [`log.md`](/spec/log-file.md), reserved, dated newest-first |
| Schema doc (`CLAUDE.md`) | Frontmatter on each concept, plus `okf_version` |
| Lint for contradictions, stale claims, orphans | [Validation](/practice/validation.md) and [graph hygiene](/practice/graph-hygiene.md) |
| Ingest, query | [`export`/`enrich`, `consume`](/ecosystem/okf-skill.md) |

# So are they dead? No. One of them got specified.

That is the honest answer, and it has two halves.

**The pattern won.** Compiled knowledge that persists and compounds, rather than retrieval that starts over every turn, is the premise underneath OKF. Everything in [why retrieval falls short](/approaches/retrieval-failure-modes.md) is the same argument the gist made.

**The gist was a pattern, not a format.** It told one person how to run one wiki with one agent. It did not say what makes a wiki readable by *someone else's* agent, which is the entire [interoperability](/spec/conformance.md) problem: no required field, no conformance statement, no provenance, no trust signals, no version. Two people following the gist produce two incompatible wikis, which is [exactly the fragmentation](/context/scattered-knowledge.md) a format exists to remove.

OKF took the shape and added the contract. What it deliberately did **not** take is the operations. Ingest, query and lint are procedure, so they live in [skills and tooling](/approaches/skills-and-procedures.md) rather than in the format, which is the [procedure-versus-fact split](/approaches/skills-and-procedures.md) applied to this exact lineage.

# The migration is visible in the tracker

This is not a retrospective reading. In the OKF issue tracker, a maintainer of a production LLM wiki skill (a 600-line markdown skill generating agent-readable bundles) reports completing the migration to OKF and finding it straightforward, with roughly seven wikilinks to rewrite.[^tracker] Projects on GitHub carrying both labels are now common, for example an "agent-first local harness for OKF-compatible LLM Wikis" and a "self-maintaining, Obsidian-compatible knowledge base." See [community tools](/ecosystem/community-tools.md).

# Second brains: alive, and closer than you would think

Personal knowledge management (Obsidian, Logseq, Roam, Notion, Zettelkasten practice) never depended on agents and is not going anywhere. The interesting fact is structural: **an Obsidian vault is already about 90% of an OKF bundle.** A directory of markdown files with YAML frontmatter and cross-links is both things at once, which is why the spec lists those tools as compatible rather than competing.[^spec]

The remaining 10% is small and specific:

- A non-empty [`type`](/spec/core-frontmatter.md) on every note, the one hard requirement.
- The reserved `index.md` and `log.md`.
- **Standard markdown links instead of `[[wikilinks]]`.**

The third is the real seam, and it is the most-discussed interop question from this direction. Wikilink resolution assumes a flat, globally-unique namespace, while [OKF identity is the file path](/spec/concept-id.md), so the two disagree about what a name means. The spec is currently silent, which two open proposals argue is itself the problem: one asks that wikilinks be declared out of scope and canonicalized, the other that they be permitted as an equivalent form. Until it resolves, convert on export.

Conversion is a solved problem in practice. Obsidian plugins exist that validate a vault against the spec, rewrite wikilinks and embeds into bundle-absolute links, and generate the reserved files. See [community tools](/ecosystem/community-tools.md).

# What to take from this

If you already run an LLM wiki or a vault, you are not facing a migration. You are facing a conformance pass: add `type`, add the two reserved files, rewrite the links. [The adoption path](/practice/adoption-path.md) is shorter for you than for anyone else, and what you gain is that a second party can read the result.

# Related

- [Briefing files](/approaches/briefing-files.md) are the gist's schema layer, standardized separately.
- [OKF versus retrieval](/approaches/okf-versus-retrieval.md) is the same compiled-versus-retrieved argument the gist opened.
- [Non-goals](/spec/non-goals.md) lists the patterns OKF positions itself against.

[^gist]: Andrej Karpathy, LLM Wiki (gist, 4 April 2026).
[^spec]: OKF v0.2 specification, relationship to other formats.
[^tracker]: OKF issue #44, wikilinks and Obsidian-style vaults.
