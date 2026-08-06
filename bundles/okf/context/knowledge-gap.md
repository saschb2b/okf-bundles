---
type: Primer
title: The knowledge gap
description: The difference between what a model learned from the public web and what is true inside your organization.
tags: [context, motivation, agent]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
---

# Two boxes

A model ships with world knowledge and zero local knowledge.

`It knows`
: Language. Code. Statistics. SQL syntax. How a P&L works. Every framework doc on the public web.

`It does not know`
: That `revenue` excludes returns for thirty days. Which of your four `customer` tables is the real one. That the Tuesday pipeline is known-broken.

Every disappointing agent answer comes from the gap between those two boxes. The agent is not weak at reasoning. It is reasoning correctly over facts nobody gave it.

# Why the gap does not close by itself

The local facts share three properties that keep them out of training data:

- They are private, so they were never on the public web.
- They change on a business timescale, so a model trained six months ago would be wrong anyway.
- They are conventions rather than logic, so they cannot be derived. Nothing about SQL implies that your finance team recognizes revenue at `delivered`.

That rules out waiting for a better model, and it mostly rules out [fine-tuning](../approaches/fine-tuning.md), which teaches behavior rather than facts.

# What closing it costs today

The knowledge usually exists. Somebody knows the revenue rule. It is just [scattered across surfaces](scattered-knowledge.md) that no agent can read uniformly, so the cost lands on a person re-explaining it every week.

# Related

- [The context window](context-window.md) is the only channel through which the gap can be closed.
- [The adoption path](../practice/adoption-path.md) starts by picking one question in this gap and writing the files that answer it.

