---
type: Approach
title: A bigger window is not a fix
description: "\"Context windows keep growing, so this solves itself.\" Why capacity is not the binding constraint."
tags: [approach, context, long-context, objection]
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
sources:
  - id: lost-in-the-middle
    resource: https://arxiv.org/abs/2307.03172
    title: "Liu et al., Lost in the Middle: How Language Models Use Long Contexts (2023)"
    last_modified: 2023-07-06
---

# The claim

Windows went from a few thousand tokens to millions. So stop curating, put the whole corpus in, and let the model sort it out. [Prompt stuffing](/approaches/prompt-stuffing.md), scaled until the problem disappears.

It is the most reasonable-sounding objection in the set, because the trend is real. The conclusion does not follow from it.

# Four reasons it does not follow

`Recall is not uniform across the window`
: Models perform best when the relevant information sits at the start or the end of the input, and measurably worse when it sits in the middle of a long context. The effect persists in models built for long inputs.[^lost-in-the-middle] More material moves the good page toward the middle, so a bigger window can make a specific answer worse.

`Cost and latency scale with what you send`
: You pay for every token on every turn. A pipeline that ships 500,000 tokens to answer a question 3,000 would cover is not thorough, it is expensive, and the cost recurs per call.

`Contradiction is not resolved by capacity`
: Put the current definition and the deprecated one in the same window and the model sees two plausible statements with no way to rank them. That is [retrieval failure 02](/approaches/retrieval-failure-modes.md), unchanged. Nothing about size tells the model which one Finance approved, and only [`status` and `stale_after`](/trust/lifecycle.md) do.

`Most corpora do not fit anyway`
: Sixty thousand court decisions, a warehouse's full documentation, ten years of tickets. The window grew, and the corpus grew too. "Fits in context" is a property of small collections, and the collections that hurt are not small.

# What the trend actually changes

Bigger windows are genuinely useful, and they move the boundary rather than removing it. They make [prompt stuffing](/approaches/prompt-stuffing.md) viable for larger documents. They let an agent hold a longer traversal without re-reading. They reduce how aggressively [assembly](/context/context-assembly.md) has to prune.

None of that removes selection. Something still decides what goes in and in what order, so the question stays "which pages, and can the model tell which to trust?" rather than "how many pages fit?"

# Capacity does not touch the knowledge side

Every argument for structure survives a larger window intact. A rule still needs to arrive with its caveat. A deprecated definition still needs its marker. A number still needs [an attested computation](/trust/attested-computation.md) behind it. A page still needs an author and a review date. None of these are capacity problems, so capacity solves none of them.

# Related

- [The context window](/context/context-window.md) covers the position effect and what competes for the space.
- [Context assembly](/context/context-assembly.md) is the step that survives no matter how large the window gets.

[^lost-in-the-middle]: Liu et al., Lost in the Middle: How Language Models Use Long Contexts (2023).
