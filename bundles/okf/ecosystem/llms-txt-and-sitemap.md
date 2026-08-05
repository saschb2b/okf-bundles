---
type: Comparison
title: How OKF stacks with sitemap.xml and llms.txt
description: Three layers that answer different questions: which URLs exist, which pages matter, and what the content means.
tags: [ecosystem, llms-txt, sitemap, web, interoperability]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: llmstxt
    resource: https://llmstxt.org/
    title: "The /llms.txt proposal"
---

# The three layers

`sitemap.xml`
: Which URLs exist. Written for crawlers, complete rather than curated.

`llms.txt`
: Which handful of pages you most want an agent to read. A curated markdown shortlist at `/llms.txt`, proposed by Jeremy Howard at Answer.AI in September 2024.[^llmstxt]

`An OKF bundle`
: The content itself, as a graph an agent can walk.

They answer different questions, so they stack rather than compete. The `llms.txt` proposal makes the same argument against sitemaps that this bundle makes against retrieval: a sitemap's URLs collectively exceed any context window, and it offers no markdown version of what it lists, so it serves indexing rather than inference.[^llmstxt]

The layers degrade in a useful order. A sitemap points at everything and explains nothing. An `llms.txt` points at the important things and still hands the agent whatever HTML happens to be there. A bundle is the thing worth pointing at.

# Wiring them together

Add a line to your `llms.txt` pointing at the bundle root and you are done. An agent that follows the convention finds the shortlist, follows it to the bundle, and starts at [the root index](/spec/index-file.md) with [traversal](/spec/cross-linking.md) available from there.

No new protocol is involved. This is [format versus protocol](/approaches/format-versus-protocol.md) again: the transport is HTTP and a text file, and the payload is what changed.

# ODSF, a profile for design systems

The Open Design System Format is a profile of OKF for design systems: machine-readable tokens plus runnable examples, so an agent produces on-brand UI rather than plausible UI.

A profile is the interesting move for adoption. It constrains the open parts of OKF (which `type` values exist, which fields are expected) for one domain, without changing the format, so a generic OKF consumer still reads an ODSF bundle. [Extensions](/spec/extensions.md) are what make that possible.

The pattern has since been proposed for the spec itself as an opt-in `okf_profile` key, with the rule that a profile warning is never core nonconformance and a profile pass never rescues a core failure. See [open questions](/ecosystem/open-questions.md).

# Related

- [Distribution](/practice/distribution.md) covers the shipping side.
- [Design principles](/spec/design-principles.md) explains why the format stays out of the transport layer.

[^llmstxt]: The /llms.txt proposal.
