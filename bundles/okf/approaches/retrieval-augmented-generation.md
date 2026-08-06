---
type: Approach
title: Retrieval-augmented generation (RAG)
description: Search the docs, paste the winners: the default answer for three years, and what it got right.
tags: [approach, rag, retrieval]
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: rag-paper
    resource: https://arxiv.org/abs/2005.11401
    title: "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
    last_modified: 2020-05-22
---

# The pipeline

1. Collect the documents.
2. Cut them into chunks, typically a few hundred words each.
3. Index the chunks by meaning, usually as embeddings.
4. On a question, fetch the closest few.
5. Put them on the desk.

The term comes from Lewis et al. in 2020. They paired a generator with a dense vector index of Wikipedia, and showed that the model's own parametric memory plus a non-parametric store beat purely parametric models on knowledge-intensive tasks.[^rag-paper] Almost every production "RAG" stack descends from that shape.

# What it got right, and keep

Retrieval moved knowledge out of the model, into a store you can edit without retraining. You can correct the corpus on a Tuesday afternoon, everyone who queries it shares the fix, and swapping the model does not discard it. That was a genuinely good idea and OKF does not undo it.

Retrieval is also strong exactly where structure is absent. The long tail of unstructured prose: support tickets, old email, meeting notes, anything nobody will ever curate. No version of "write it as concepts" covers ten years of Slack.

# Where it stops

The pipeline's steps 2 and 3 are lossy in ways that matter for the load-bearing core of a domain. Chunking discards structure. Similarity does not know which of two similar pages is current. A flat result list has no edges, and a chunk carries no author or review. [The four failure modes](retrieval-failure-modes.md) works through each.

The practical conclusion is not a migration. Run both: OKF for the knowledge that must be right, retrieval for the long tail. The split is laid out in [OKF versus retrieval](okf-versus-retrieval.md).

# Related

- [Context assembly](../context/context-assembly.md) is the step retrieval implements.
- [Tools and MCP](tools-and-mcp.md) usually run alongside retrieval and solve a different half of the problem.

[^rag-paper]: Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020).

