---
type: Field Report
title: Community tools
description: What has been built on OKF as of August 2026, measured from the GitHub topic and a community registry.
tags: [ecosystem, tooling, community, snapshot]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T18:00:00Z
status: draft
stale_after: 2026-11-05
sources:
  - id: topic
    resource: "GitHub topic open-knowledge-format and per-repository metadata, read 2026-08-05"
    title: "GitHub topic: open-knowledge-format"
    last_modified: 2026-08-05
  - id: bundledex
    resource: https://bundledex.net/
    title: "BundleDex, the OKF bundle directory"
    last_modified: 2026-08-05
---

# How this was measured, and a correction

Read on **2026-08-05** from three instruments: the GitHub topic `open-knowledge-format`, BundleDex (a community bundle directory), and upstream pull request `#167`, in which a contributor assembled a curated index and coordinated one-line descriptions with a dozen tool maintainers. That pull request has been open since 1 July, so the best curated list of OKF tooling is a pending diff. See [governance](/ecosystem/governance.md).

An earlier version of this concept listed ten tools and put the largest at 118 stars. That was wrong, because it was built from the projects that had announced themselves in one upstream issue thread. Self-announcement is a biased sample and it undercounts by roughly an order of magnitude. Star counts are a popularity signal, not a quality one.

# The scale

| Instrument | Value on 2026-08-05 |
| --- | --- |
| Repositories on the `open-knowledge-format` topic | 108 |
| Bundles listed in BundleDex | 479, from 395 authors |
| Of those, meeting OKF conformance | 198 |
| Combined stars across listed bundles | 4,423 |

BundleDex also exposes a JSON API and an MCP server, which makes it a working registry rather than a page of links.

# The largest projects

| Project | Stars | License | What it is |
| --- | --- | --- | --- |
| [obsidian-wiki](https://github.com/Ar9av/obsidian-wiki) | 3,121 | MIT | Framework for agents to build and maintain a digital brain through an Obsidian wiki. Added OKF bundle import/export interop. |
| [iwe](https://github.com/iwe-org/iwe) | 1,359 | Apache-2.0 | Markdown knowledge graph: an LSP for your editor plus a CLI and MCP memory. The most-adopted bundle in the directory. |
| [pi-llm-wiki](https://github.com/zosmaai/pi-llm-wiki) | 264 | MIT | Self-maintaining, Obsidian-compatible knowledge base that turns raw sources into a wiki. |
| [okf-skills](https://github.com/scaccogatto/okf-skills) | 230 | MIT | OKF toolkit for Claude Code: author, maintain, validate, and visualize. |
| [okf-gem](https://github.com/serradura/okf-gem) | 118 | Apache-2.0 | Ruby harness: an agent skill, a CLI and library, and a server. |
| [OWOX Model Canvas](https://github.com/OWOX/owox-model-canvas) | 86 | Apache-2.0 | Visual canvas and ERD editor for data models in OKF. |
| [AKB](https://github.com/dnotitia/akb) | 75 | other | Organizational memory for agents: MCP plus REST, Postgres, per-vault git, RBAC. |
| [OKFy](https://github.com/0dust/OKFy) | 63 | see repo | Turns docs into agent-readable bundles. |

The top two matter most for reading the ecosystem. Both come from the [LLM wiki and second-brain lineage](/approaches/llm-wikis.md) rather than from the data-catalog framing OKF launched with, and both added OKF support to an existing user base rather than starting from the format.

# Implementations across runtimes

A format is being implemented, not merely discussed, when it appears in languages nobody coordinated:

- [okfcli/okf](https://github.com/okfcli/okf), a vendor-neutral **Go** CLI (create, validate, lint, index, search).
- [W4G1/okf](https://github.com/W4G1/okf), a pure-**Rust**, zero-dependency implementation.
- [okf-gem](https://github.com/serradura/okf-gem) in **Ruby**, [okft](https://github.com/PoorvaJ-WW/okft) and [okf-kit](https://github.com/vinodborole/okf-kit) in **Python**, the Obsidian plugins in **TypeScript**.

# Agent skills for OKF

Four independent skill packages exist, which is [the procedure layer](/approaches/skills-and-procedures.md) filling in around the format: [okf-skills](https://github.com/scaccogatto/okf-skills) (230), [xSAVIKx/okf-skills](https://github.com/xSAVIKx/okf-skills) (29), [agent-knowledge](https://github.com/stjbrown/agent-knowledge) (26), and [the okf skill](/ecosystem/okf-skill.md) in this repo's toolchain.

# Personal knowledge management

The [second-brain](/approaches/llm-wikis.md) direction has working conversion:

- [okf-enforcer](https://github.com/MartinForreal/okf-enforcer), published in the official Obsidian community plugin directory, validates and enforces OKF v0.2 across a vault.
- [obsidian-okf](https://github.com/kennyg/obsidian-okf) exports a vault or subfolder as a bundle, rewriting wikilinks and embeds into bundle-absolute links and generating the reserved files.
- [awesome-okf](https://github.com/yzfly/awesome-okf) is a Chinese-language resource collection with converters for Feishu, Obsidian, and Notion.

# Validation, again and again

The most duplicated category, with at least four dedicated projects beyond the ones already listed: [okf-lint](https://github.com/thisismydesign/okf-lint), [okf-conformance](https://github.com/Sudhakaran88/okf-conformance) (a conformance criteria document plus an executable validator), [okf-frontmatter](https://github.com/longsizhuo/okf-frontmatter) (a pure-Python skill keeping repo docs under OKF), and [okf-knowledge](https://github.com/sniperunder123/okf-knowledge) (a portable `/okf` skill). Two independent Go CLIs also exist, [okfcli/okf](https://github.com/okfcli/okf) and [openknowledge](https://github.com/openknowledge-sh/openknowledge).

Everyone writes the validator because [conformance is prose](/spec/conformance.md) and there is no shared test corpus. That is the argument for the conformance-corpus proposal in [open questions](/ecosystem/open-questions.md), and it is the single clearest piece of wasted community effort visible in the ecosystem.

# Serving, publishing, and validating

[Kiso](https://github.com/oak-invest/kiso) publishes bundles as static sites, emitting `llms.txt` and a sitemap alongside, which is [the three-layer stack](/ecosystem/llms-txt-and-sitemap.md) implemented rather than argued. [wiki-as-an-mcp](https://github.com/taikunudel/wiki-as-an-mcp) serves a wiki over MCP following OKF. [okft](https://github.com/PoorvaJ-WW/okft) lints and MCP-serves. [Data Olympus](https://github.com/knaisoma/data-olympus) adds a governance profile with a single-writer MCP server. [Surface](https://github.com/Connorrmcd6/surface) and [Throughline](https://github.com/inkxel/throughline) keep docs and repo memory as conformant bundles. [OKF Studio](/ecosystem/okf-studio.md) and [OnyxWriter](https://github.com/activetwist/OnyxWriter) read them on the desktop.

# What the shape tells you

**MCP is the default transport.** It recurs across AKB, Data Olympus, okft, iwe, wiki-as-an-mcp, and BundleDex itself. The [format and protocol layers](/approaches/format-versus-protocol.md) compose in practice exactly as the theory says.

**Validation is the most duplicated work.** Independent linters exist in at least eight projects. That redundancy is the argument behind the conformance-corpus and `okf_profile` proposals in [open questions](/ecosystem/open-questions.md).

**A registry exists, and cross-bundle resolution does not.** An earlier version of this concept claimed nobody had built a registry, which BundleDex disproves. What is still missing is a resolver: no standard way for one bundle to reference a concept in another, which is live upstream as a bundle-local registry proposal.

# Related

- [State of adoption](/ecosystem/adoption.md) reads these numbers as evidence.
- [LLM wikis and second brains](/approaches/llm-wikis.md) explains why the two largest projects come from that direction.

[^topic]: GitHub topic: open-knowledge-format.
[^bundledex]: BundleDex, the OKF bundle directory.
