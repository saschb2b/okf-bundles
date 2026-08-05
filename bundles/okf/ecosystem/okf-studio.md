---
type: Project
title: OKF Studio
description: A local-first desktop app that gives a machine-readable bundle a human window: graph, reader, agent, staged edits.
tags: [ecosystem, tooling, viewer, desktop]
resource: https://saschb2b.github.io/okf-studio
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: studio
    resource: https://github.com/saschb2b/okf-studio
    title: "saschb2b/okf-studio"
    author: human:sascha
    last_modified: 2026-08-05
---

# The premise

A bundle is machine-readable. Humans deserve a window too.

# Why it exists

Google ships [a reference consumer](/ecosystem/knowledge-catalog.md): one self-contained HTML file that renders a bundle as a force-directed graph. It does its job, which is to prove that a party who did not write the bundle can read it with no SDK. It is a proof of concept and stops there.

Studio started from that gap. Its maintainer built it after finding the reference viewer too barebones to work in.[^studio] The distance between the two is roughly the distance between "the format is readable" and "I can spend an afternoon in this corpus":

| | Reference visualizer | Studio |
| --- | --- | --- |
| Form | One HTML file, opened per bundle | Desktop app, opens any folder |
| Views | Force-directed graph | Graph, treemap, sunburst, beside a reader |
| Trust layer | Not surfaced | Nodes colored by tier, status, staleness |
| Editing | None | Staged tree with reviewable diffs |
| Agent | None | Runs beside the bundle, returns a retrieval receipt |
| Reload | Reopen | Live |

The reference viewer also carries known defects that a working tool cannot: it builds no graph edges from bundle-absolute links, the form the spec recommends, and it never decodes percent-encoded targets. See [open questions](/ecosystem/open-questions.md).

The general point is not about one app. A deliberately minimal reference consumer leaves the reading surface to the ecosystem, and three independent readers and editors now exist alongside it. See [community tools](/ecosystem/community-tools.md).

# What it does

`Understand`
: A force-directed graph beside a reader, with treemap and sunburst views, search, filters, and live reload.

`Ask`
: Run your own agent beside the bundle. Retrieval hands back a receipt for every selection, which is the route-reporting described in [consuming a bundle](/practice/consuming-a-bundle.md).

`Improve`
: Proposed changes land in a staged tree, never on your files. Reviewable diffs, applied in one transaction.

`Local-first`
: Opening a folder is read-only. No account, no telemetry. Tauri 2, MIT.

# The dogfooding

Studio's own spec lives in `docs/` as a conformant bundle, so the app reads the format it is written in. That is a useful test of the format's claim to be for agent-facing knowledge rather than human docs: the app's own design decisions are what its agent needs to know to work on it.

# Why a viewer matters for the format

The trust layer is invisible in a text editor. A graph that colors nodes by [trust tier](/trust/trust-tiers.md), [status](/trust/lifecycle.md) and staleness turns the frontmatter into something a person can audit at a glance, which is exactly the review step that [an agent-written corpus](/trust/why-trust-is-a-field.md) makes expensive.

# Related

- [The okf skill](/ecosystem/okf-skill.md) is the authoring counterpart.
- [knowledge-catalog](/ecosystem/knowledge-catalog.md) ships the single-file reference visualizer this was a reaction to.
- [Community tools](/ecosystem/community-tools.md) lists the other independent readers and editors.

[^studio]: saschb2b/okf-studio, maintainer's account of why the project started.

