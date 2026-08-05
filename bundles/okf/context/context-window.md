---
type: Primer
title: The context window
description: The finite space an agent reads before it answers, and the only place knowledge can reach a model.
tags: [context, agent, fundamentals]
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: lost-in-the-middle
    resource: https://arxiv.org/abs/2307.03172
    title: "Liu et al., Lost in the Middle: How Language Models Use Long Contexts (2023)"
    last_modified: 2023-07-06
---

# The window is a desk, not a memory

A model ships knowing the world. It ships knowing nothing about you. It knows language, code, SQL syntax, how a P&L works, and every framework doc on the public web. It does not know that your `revenue` figure excludes returns for thirty days, which of your four `customer` tables is the real one, or that the Tuesday pipeline is known-broken. Closing that gap is what [context](/context/knowledge-gap.md) means.

All of it has to arrive through one channel: the context window. Think of a desk rather than a memory. Every turn the desk is cleared and laid again from scratch, and nothing outside it exists to the agent.

# What competes for the space

| Slice | What it holds | Who controls it |
| --- | --- | --- |
| Instructions | Who the agent is, how it should behave | The system builder |
| Tools | What the agent can call | The system builder |
| Conversation so far | Every prior turn, growing | Nobody, it accumulates |
| Your knowledge | Facts about your domain | You |
| The question | The user's actual ask, usually tiny | The user |

The window is finite, so the slices compete. A long conversation crowds out the knowledge slice. A hundred tool definitions crowd out both. The slice you control is the smallest one and the one that decides whether the answer is right.

# Recall drops in the middle of the window

A bigger window does not make the space uniform. Models recall information best at the start and the end of the input, and measurably worse in the middle of a long context. The effect persists in models built for long inputs.[^lost-in-the-middle]

Two consequences follow. Filling the window is not the same as using it: pad the knowledge slice with everything that might be relevant, and you bury the page that mattered. Where a page lands is a real decision, part of [context assembly](/context/context-assembly.md) rather than an implementation detail.

This is also why growing windows do not dissolve the problem on their own. See [a bigger window is not a fix](/approaches/long-context.md).

# Why agents "forget"

The model reads the desk once, answers, and retains nothing. What looks like forgetting is a cleared desk. An agent product's "memory" is a component that re-assembles the desk with a summary of what came before. That re-assembly step is [context assembly](/context/context-assembly.md), and it is where knowledge either arrives or does not.

The consequence runs through the whole format: a bundle exists so the knowledge slice gets the right pages, whole, on the turn that needs them. See [progressive disclosure](/practice/progressive-disclosure.md) for how a bundle keeps that slice small.

# Related

- [Context assembly](/context/context-assembly.md) fills this window each turn.
- [The knowledge gap](/context/knowledge-gap.md) is what the knowledge slice has to close.
- [Retrieval](/approaches/retrieval-augmented-generation.md) is the common way to fill the slice, with [four known failure modes](/approaches/retrieval-failure-modes.md).

[^lost-in-the-middle]: Liu et al., Lost in the Middle: How Language Models Use Long Contexts (2023).

