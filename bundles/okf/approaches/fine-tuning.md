---
type: Approach
title: Fine-tuning
description: Training a model on your data: good for behavior, the wrong tool for facts.
tags: [approach, context, training]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: rag-paper
    resource: https://arxiv.org/abs/2005.11401
    title: "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
    last_modified: 2020-05-22
---

# What it is

Continue training a base model on your own examples so it adopts a style, a format, or a task-specific behavior.

# What it is good at

Behavior. Tone of voice, output shape, a house convention for how a classification is expressed, a domain's phrasing. These are patterns, and patterns are what training absorbs well.

# Why it is the wrong tool for facts

Facts change on Tuesday. A fine-tune bakes the current revenue definition into weights, which means:

- Correcting a fact requires a training run, not an edit.
- You cannot diff, review, or blame a weight.
- Nothing in the output says which version of the fact it used, so [trust](/trust/trust-tiers.md) and [freshness](/trust/lifecycle.md) cannot be checked.
- The knowledge cannot be shared with a different model, or with the next model you migrate to.

Retrieval's genuine contribution was moving knowledge *out* of the model, into a store that can be revised or swapped without retraining.[^rag-paper] Keep that part. See [retrieval-augmented generation](/approaches/retrieval-augmented-generation.md).

# The rule of thumb

Fine-tune for how the agent should behave. Put facts on the desk at inference time, where they can be edited, reviewed and dated. A [concept document](/spec/concept-document.md) is that fact in a form both a person and an agent read.

# Related

- [Prompt stuffing](/approaches/prompt-stuffing.md) sits at the other extreme: entirely at inference time, entirely manual.

[^rag-paper]: Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020).

