---
okf_version: "0.2"
---

# OKF

The Open Knowledge Format, explained as an OKF bundle. Google Cloud's vendor-neutral spec (v0.2, Apache 2.0) for the context an AI agent needs: a folder of markdown files with YAML frontmatter, in git, readable with no SDK. One required field, `type`, and a v0.2 trust layer that says who wrote a page, who checked it, and whether it is still true.

Start here: [Overview](overview.md). It carries a reading order for the format, the trust layer, and the practice.

# Why context is the problem

- [How an agent's context actually works](context/index.md) - The context window as a desk, the assembly step that fills it, the gap between world knowledge and your knowledge, and why your knowledge is scattered.

# What we do about it today

- [The current toolbox, honestly](approaches/index.md) - Prompt stuffing, fine-tuning, retrieval and its four failure modes, tools and MCP, briefing files, format versus protocol, and OKF versus retrieval side by side.

# The format

- [The v0.2 specification, worked through](spec/index.md) - Bundles, concept documents, concept IDs, core frontmatter, body conventions, cross-linking, index and log files, conformance, versioning, extensions, design principles and non-goals.

# The trust layer

- [What v0.2 added, and why](trust/index.md) - sources, generated and verified, trust tiers, the actor convention, status and stale_after, attested computations, and verification versus attestation.

# Doing it

- [Authoring, consuming, validating, shipping](practice/index.md) - The producer's procedure and bookkeeping, the consumer's loop, progressive disclosure, validation, graph hygiene, migration from v0.1, external references, distribution, and the adoption path.

# In the wild

- [Implementations and neighbours](ecosystem/index.md) - Google's knowledge-catalog and its sample bundles, the okf skill, OKF Studio, the okf-bundles corpus, and how OKF stacks with sitemap.xml, llms.txt and ODSF.

# Sources

- [The primary documents](references/index.md) - The v0.2 specification with a section map, Google's announcement post, and the talk this bundle follows.
