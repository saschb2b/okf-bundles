---
type: Project
title: okf-bundles
description: Does it scale past the demo? 62,000 files across court rulings, framework docs, blockchains, and cooking notes.
tags: [ecosystem, examples, scale, corpus]
resource: https://github.com/saschb2b/okf-bundles
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: repo
    resource: https://github.com/saschb2b/okf-bundles
    title: "saschb2b/okf-bundles"
    author: human:sascha
    last_modified: 2026-08-05
---

# The numbers

| Count | Bundle | What makes it interesting |
| --- | --- | --- |
| 60,600 | BGH decisions | German Federal Court of Justice, 2000 to 2026, one concept each, navigable by norm and senate |
| 162 | React doc pages | Restructured rather than copied, and each cites its react.dev URL |
| 45 | Blockchain concepts | Shared primitives written once, and each chain links back to what it implements |
| 138 | Recipe concepts | Down to the single ingredient, so the graph reads both ways |

Court rulings, framework docs, company teardowns, and personal cooking notes, in the same format, with no schema negotiation. That is what portable buys.

# The two shapes it shows

`A curated bundle`
: One concept per idea, fully connected, no orphans, concept-to-concept links throughout. React, blockchain, and the recipes are this shape, and it is what [graph hygiene](../practice/graph-hygiene.md) demands.

`A bulk corpus`
: One concept per record, reached through an index tree by id, date or norm. Nobody can hand-link sixty thousand court decisions, so the leaves stay index-navigable and the no-orphans expectation does not apply. See [the corpus exception](../practice/graph-hygiene.md).

Knowing a bundle's shape decides how to validate it and how an agent should read it.

# What scale actually tested

- [Progressive disclosure](../practice/progressive-disclosure.md) is load-bearing rather than nice, since no agent reads 60,600 files.
- Ingest is [`process:`](../trust/actor-convention.md) work, and scripted producers make the actor convention concrete.
- [`sources`](../trust/sources.md) has to carry a licensing story. A producer may copy official texts, and may not copy commentary literature. See [external references](../practice/external-references.md).
- A recipe bundle linking each ingredient back to the dishes it appears in answers "what can I cook with what I have?" by intersecting backlinks. That is [traversal](../spec/cross-linking.md) doing work no similarity search does.

# Related

- [Sample bundles](sample-bundles.md) is the small, feature-complete counterpart.
- [The okf skill](okf-skill.md) is what authors and validates this repo.

