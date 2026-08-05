---
type: Primer
title: Scattered knowledge
description: Why organizational knowledge already exists but cannot be read by an agent: many surfaces, no shared shape.
tags: [context, motivation, interoperability]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
---

# The actual state of play

Your knowledge exists. It is spread over surfaces that share nothing:

- Confluence pages nobody updates
- A data catalog with its own API
- Slack threads
- A spreadsheet called `final_v3`
- Code comments
- A PDF from 2023
- Runbooks in a wiki
- Two senior colleagues' heads

Each surface has a different access method, a different structure, a different idea of who owns it, and a different answer to "is this still true?" The best-governed of them, [the catalog](/approaches/data-catalogs-and-semantic-layers.md), is still one more proprietary model behind one more API.

# The cost of no shared shape

Because the surfaces are incompatible, every agent, every team, and every vendor solves [context assembly](/context/context-assembly.md) again from scratch. The connector to Confluence teaches nothing about the connector to the catalog. Work spent making one agent smart about your revenue definition does not transfer to the next agent, or to a colleague's team, or to a vendor's product.

The pattern shows up again inside the current toolbox: [briefing files](/approaches/briefing-files.md) work well, and standardize where the file lives rather than what it says. Everyone is hand-rolling a wiki for machines, in twelve incompatible shapes.

# What a format changes

A shared shape does not move the knowledge. It makes the knowledge readable by a party that did not write it. That is the whole claim behind [format versus protocol](/approaches/format-versus-protocol.md), and it is why OKF specifies [one required field](/spec/conformance.md) instead of an ingestion pipeline.

The instinct to keep your own better shape instead is the oldest trap in standards history, and the formats that carried the most weight were rarely the strongest candidates. [Why standards win](/context/why-standards-win.md) makes that case with OSI, Xanadu, Gopher, and Markdown.

# Related

- [The knowledge gap](/context/knowledge-gap.md) is what these surfaces hold and fail to deliver.
- [Distribution](/practice/distribution.md) shows what shipping knowledge looks like once it has a shape.

