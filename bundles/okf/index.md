---
okf_version: "0.2"
---

# OKF

The Open Knowledge Format, explained as an OKF bundle, in 63 concepts. OKF is Google Cloud's vendor-neutral spec for the context an AI agent needs. Markdown files with YAML frontmatter, kept in git, readable with no SDK. One required field, `type`. Published under Apache 2.0, currently at v0.2.

# Two ways in

- **To write a bundle in the next hour**, read [your first bundle](practice/first-bundle.md), then copy `bundles/hello-okf/`, a five-concept worked example in this repository that validates clean.
- **To understand the format and the case for it**, read [the overview](overview.md). It carries a reading order by what you want, this bundle's type vocabulary, and an honest note on what is and is not sourced.

# Why context is the problem

- [How an agent's context works](context/index.md) - 5 concepts. The context window as a desk that is cleared every turn, the assembly step that fills it, the gap between world knowledge and yours, why your knowledge is scattered across surfaces no agent can read, and the history of why one agreed format beats a better bespoke one.
- [The current toolbox, honestly](approaches/index.md) - 14 concepts. Prompt stuffing, fine-tuning, retrieval with its four failure modes and how to run it alongside a bundle, the "bigger windows will fix it" objection, tools and MCP, Agent Skills, briefing files, data catalogs and semantic layers, knowledge graphs and ontologies, the LLM-wiki and Obsidian-style second-brain lineage OKF descends from, and format versus protocol.

# The format

- [The v0.2 specification, worked through](spec/index.md) - 13 concepts. Bundles, concept documents, concept IDs, core frontmatter, body conventions, cross-linking, index and log files, conformance, versioning, extensions, design principles, and non-goals.
- [The trust layer](trust/index.md) - 8 concepts. What v0.2 added and why: sources with credibility signals, generated and verified, the three trust tiers, the actor convention, status and stale_after, attested computations, verification versus attestation, and the security questions the layer leaves open.

# Using it

- [Practice](practice/index.md) - 10 concepts. A first bundle, the authoring procedure and the bookkeeping that stops rot, the consumer's loop, progressive disclosure, validation, graph hygiene, migration from v0.1, external references and their copyright line, distribution, and what to do on Monday.

# Where it stands

- [In the wild](ecosystem/index.md) - 10 concepts. Google's knowledge-catalog and sample bundles, the okf skill, OKF Studio, this repository at 62,000 files, how OKF stacks with sitemap.xml, llms.txt and ODSF, plus four dated snapshots of adoption, community tooling, the live spec debates, and governance. Those four carry `status: draft` and `stale_after`, so filter them out if you want only durable claims.
- [References](references/index.md) - 2 concepts. The v0.2 specification with a section-to-concept map, and Google's announcement post.
