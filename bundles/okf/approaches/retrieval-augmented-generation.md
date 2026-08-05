---
type: Approach
title: Retrieval-augmented generation (RAG)
description: Search the docs, paste the winners: the default answer for three years, and what it got right.
tags: [approach, rag, retrieval]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
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

The term comes from Lewis et al. in 2020, who paired a generator with a dense vector index of Wikipedia and showed that combining the model's own parametric memory with a non-parametric store beat purely parametric models on knowledge-intensive tasks.[^rag-paper] Almost every production "RAG" stack is a descendant of that shape.

# What it got right, and keep

Retrieval moved knowledge out of the model, into a store that can be edited without retraining. The corpus is editable on a Tuesday afternoon, it is shared across everyone who queries it, and swapping the model does not discard it. That was a genuinely good idea and OKF does not undo it.

Retrieval is also strong exactly where structure is absent: the long tail of unstructured prose, support tickets, old email, meeting notes, anything nobody will ever curate. There is no version of "write it as concepts" that covers ten years of Slack.

# Where it stops

The pipeline's steps 2 and 3 are lossy in ways that matter for the load-bearing core of a domain. Chunking discards structure, similarity does not know which of two similar pages is current, a flat result list has no edges, and a chunk carries no author or review. Each is worked through in [the four failure modes](/approaches/retrieval-failure-modes.md).

The practical conclusion is not a migration. Run both: OKF for the knowledge that must be right, retrieval for the long tail. The split is laid out in [OKF versus retrieval](/approaches/okf-versus-retrieval.md).

# Related

- [Context assembly](/context/context-assembly.md) is the step retrieval implements.
- [Tools and MCP](/approaches/tools-and-mcp.md) are often deployed alongside retrieval and solve a different half of the problem.

[^rag-paper]: Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020).

