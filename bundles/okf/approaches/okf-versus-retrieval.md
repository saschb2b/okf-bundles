---
type: Comparison
title: OKF versus retrieval
description: Side by side on unit, selection, structure, trust and review, and the split that says which to use where.
tags: [rag, comparison, positioning]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: rag-paper
    resource: https://arxiv.org/abs/2005.11401
    title: "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
    last_modified: 2020-05-22
---

# Side by side

| | Retrieval / RAG | OKF |
| --- | --- | --- |
| Unit | A chunk of text | A [concept](/spec/concept-document.md), whole |
| Selection | Similarity, at query time | [Traversal](/spec/cross-linking.md), along authored links |
| Structure | Lost in chunking | Preserved and required |
| Trust | Implicit, unrecorded | Explicit, [in frontmatter](/trust/trust-tiers.md) |
| Review | Nothing to review | A pull request |
| Best at | The long tail, unstructured prose | The load-bearing, relational core |

# This is not a migration

Run both. Use OKF for the knowledge that must be right, and retrieval for the long tail. Retrieval was designed to pair a generator with an editable external store, and a bundle is a better-shaped store rather than a replacement for the idea.[^rag-paper] Split the corpus by knowledge type rather than by technology preference:

- **Write it as a concept** when a wrong answer costs something, when the fact has structure (a schema, a formula, a policy), when it connects to other facts, or when somebody should be accountable for it.
- **Leave it to retrieval** when the corpus is large, unstructured, and unowned. Nobody will ever curate ten years of support tickets, and they still hold answers.

A bundle also improves the retrieval side rather than competing with it. Indexing whole concepts instead of arbitrary chunks removes [failure 01](/approaches/retrieval-failure-modes.md), and the frontmatter gives the retriever fields to filter on before ranking. The four compose patterns and a diagnostic for whether your retrieval is actually failing are in [running retrieval and OKF together](/approaches/retrieval-and-okf-together.md).

# The honest limits of the OKF side

Curation costs work. A bundle is only as good as the person or agent who wrote it, and [validation](/practice/validation.md) checks conformance, never correctness. Volume production makes that worse, which is the problem the whole [trust layer](/trust/trust-tiers.md) exists to address.

# Related

- [Four ways retrieval lets an agent down](/approaches/retrieval-failure-modes.md) is the argument in full.
- [Consuming a bundle](/practice/consuming-a-bundle.md) is what "traversal" means concretely.

[^rag-paper]: Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020).

