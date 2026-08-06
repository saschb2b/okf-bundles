---
type: Approach
title: Tools and MCP
description: Letting the agent go and look: solves reach, not meaning.
tags: [approach, mcp, tools, protocol]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: mcp
    resource: https://modelcontextprotocol.io/
    title: Model Context Protocol
---

# What it is

Give the agent a callable surface instead of pre-pasted text. A tool definition, an API client, or a Model Context Protocol server lets the agent query the warehouse, read the ticket, or list the tables at the moment it needs to.[^mcp]

MCP standardizes the connection: the call shape, the auth, the transport. One server, many agents, no bespoke integration per client.

# What it solves

Reach. Before tools, knowledge had to be predicted and pre-loaded. With tools the agent can go and get what it turns out to need, including things that did not exist when the turn started, such as a live row count.

# What it does not solve

Meaning. A pipe carries whatever is at the other end. If the warehouse returns four `customer` tables, MCP delivers four table names correctly and says nothing about which one Finance uses. The agent still has to guess, and it will.

Reach and meaning are different problems, and conflating them is the most common misreading of "don't we already have MCP for this?" The distinction is worked through in [format versus protocol](format-versus-protocol.md): a perfect pipe to an empty reservoir is still a drought.

# How the two compose

They are complements, and the good pattern is both. MCP moves the bundle to the agent, or serves it. The bundle says what the tool's output means. A tool that returns `orders.order_status` and a concept that says the value is recognized only at `delivered` together produce a correct answer that neither produces alone.

# Related

- [Retrieval](retrieval-augmented-generation.md) is the other half of most current stacks.
- [Distribution](../practice/distribution.md) covers the mundane alternative: the bundle is a folder, so cloning it also works.

[^mcp]: Model Context Protocol
