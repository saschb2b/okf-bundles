---
type: Playbook
title: Running retrieval and OKF together
description: Four ways a bundle improves an existing retrieval stack, and a diagnostic for whether yours is actually failing.
tags: [rag, retrieval, integration, playbook]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T14:00:00Z
sources:
  - id: rag-paper
    resource: https://arxiv.org/abs/2005.11401
    title: "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
    last_modified: 2020-05-22
---

# Start from what retrieval was for

Retrieval pairs a generator with an external store that can be edited without retraining.[^rag-paper] A bundle does not challenge that design. It changes what is in the store, from arbitrary text chunks to authored concepts with frontmatter, so the same retriever gets better material.

So the question is never "replace the RAG?" It is "what is in the index, and can the retriever see what it needs?"

# Four ways they compose

`1. Index concepts, not chunks`
: Point the existing pipeline at the bundle and set the chunk boundary to the file. A [concept](/spec/concept-document.md) is already a coherent unit, so a rule arrives with its caveat and a schema table arrives whole. This removes [failure 01](/approaches/retrieval-failure-modes.md) with a configuration change rather than a rewrite.

`2. Pre-filter on frontmatter, then rank`
: Parse the frontmatter into your index as fields. Now `status: deprecated` is excluded before ranking, a past [`stale_after`](/trust/lifecycle.md) is a warning, and [trust tier](/trust/trust-tiers.md) is a filter. Similarity never had to distinguish the current definition from the superseded one, and now it does not need to. This removes failure 02.

`3. Traverse after the first hit`
: Use retrieval to find the entry point and [links](/spec/cross-linking.md) to walk from there. One hop pulls in the policy the metric depends on and the table it reads, which a ranked list will not surface because those pages do not resemble the question. This removes failure 03, and it is the change with the largest effect on answer quality.

`4. Return the route, not just the text`
: Because concepts have stable paths, the answer can name which concepts it used and which it skipped and why. That receipt is impossible with embedding offsets. See [consuming a bundle](/practice/consuming-a-bundle.md). This removes failure 04.

Steps 1 and 2 are configuration. Steps 3 and 4 are code, and they are where the benefit is.

# Is your retrieval actually failing?

Run each check against real questions your users ask. Retrieval that passes all four does not need a bundle.

- [ ] **Shredding.** Retrieve for a question whose answer has a caveat. Did the caveat come back in the same chunk as the rule, or not at all?
- [ ] **Staleness.** Put a current definition and a superseded one in the corpus and ask the question. Which one ranked first, and could anything in the result have told you?
- [ ] **Relationships.** Ask something needing two hops, a metric that depends on a policy. Did the second hop appear, or did the model improvise it?
- [ ] **Accountability.** Take any answer and ask who wrote the source, who checked it, and when it expires. Can you get those from the pipeline's output?

A failure on the last two is the strong signal. They are the ones no amount of tuning, reranking or [window size](/approaches/long-context.md) fixes, because the information was never in the corpus.

# What to move first

Not the whole corpus. Take the questions that failed the diagnostic, write the ten or twenty concepts that answer them, index those alongside everything you already have, and leave the long tail exactly where it is. The split is in [OKF versus retrieval](/approaches/okf-versus-retrieval.md), and the starting procedure in [the adoption path](/practice/adoption-path.md).

# Related

- [Four ways retrieval lets an agent down](/approaches/retrieval-failure-modes.md) is what the diagnostic tests for.
- [Retrieval-augmented generation](/approaches/retrieval-augmented-generation.md) is the pipeline being extended.

[^rag-paper]: Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020).
