---
type: Approach
title: Briefing files (AGENTS.md and friends)
description: Writing the agent a briefing file: astonishingly effective, standardized in location, and unstandardized in everything it says.
tags: [approach, agents-md, convention]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: agents-md
    resource: https://agents.md/
    title: "AGENTS.md, an open format for guiding coding agents"
---

# What it is

A markdown file in the repo that tells the coding agent how this project works: `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, a `docs/` page the tool is pointed at. The agent reads it before it reads the code.

`AGENTS.md` is the convention that consolidated the pattern. It describes itself as a README for agents, a predictable place to put project context, and it is stewarded as an open format by the Agentic AI Foundation under the Linux Foundation, with over 60,000 open-source projects carrying one.[^agents-md]

# Why it works so well

It is the first approach that puts knowledge where the work happens, in version control, next to the thing it describes. It gets reviewed in a pull request, diffed, and blamed. It is written by the people who know, in the form they already write in. No pipeline, no embedding, no service.

OKF keeps every one of those properties. A bundle is the same idea, [specified](../spec/conformance.md) instead of improvised.

# Where it stops

- **The location is standard, the content is not.** `AGENTS.md` settles where the file lives and what it is for. It says nothing about what is inside, so no consumer can rely on any field being present, and your file's shape teaches nothing to the next team's agent. That is precisely the [format versus protocol](format-versus-protocol.md) split, one layer down: a predictable path is not a predictable payload.
- **One file, one audience.** It briefs the coding agent in this repo. It does not become the finance agent's revenue definition.
- **No trust layer.** Nothing records who wrote a line, whether anyone checked it, or when it went out of date.
- **It does not scale past one file.** Once the briefing is fifty pages, the agent needs [navigation](../practice/progressive-disclosure.md) and [edges](../spec/cross-linking.md), which a flat file does not have.

# The pattern underneath

Everyone is hand-rolling a wiki for machines. Same idea, twelve incompatible shapes. That is exactly the condition a format addresses, and it is why the OKF conformance bar is one field rather than forty: the briefing files already work, so the job is to make them portable, not to replace them.

The two compose directly. Keep `AGENTS.md` as the entry point the tooling already looks for, and let it point at a bundle for the knowledge that outgrew one file. See [the adoption path](../practice/adoption-path.md).

# Related

- [Scattered knowledge](../context/scattered-knowledge.md) is the same fragmentation one level up.
- [The adoption path](../practice/adoption-path.md) is how a briefing file becomes a bundle without a migration project.

[^agents-md]: AGENTS.md, an open format for guiding coding agents.

