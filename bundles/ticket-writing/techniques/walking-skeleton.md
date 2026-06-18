---
type: Technique
title: Walking skeleton and contract-first
description: Build a tiny end-to-end path linking the real components first, and agree interfaces up front so coupled work can proceed in parallel without hard blockers.
tags: [architecture, dependencies, decoupling]
timestamp: 2026-06-18T11:30:00Z
---

# Walking skeleton

"A tiny implementation of the system that performs a small end-to-end function" and links the main architectural components (Cockburn). Architecture and features then grow in parallel, and integration risk surfaces early instead of at the end.

# Contract-first

Agree the interface (request and response schema) before implementation, so the consumer builds against a generated stub while the producer builds the real thing. This removes the hard "blocked by" between split work.

# Use it to

Untangle [the Siamese Twins](/smells/siamese-twins.md) when two teams must work in parallel, and keep slices [Independent](/techniques/invest.md).

# Citations

[1] [Start with a Walking Skeleton (97 Things Every Software Architect Should Know)](https://www.oreilly.com/library/view/97-things-every/9780596800611/ch60.html)
