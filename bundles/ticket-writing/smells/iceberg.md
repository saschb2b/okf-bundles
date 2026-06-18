---
type: Ticket Smell
title: The Iceberg
description: A ticket that looks small on the surface but hides most of its work below the waterline, surfacing as surprise complexity mid-sprint.
tags: [ticket-smell, estimation, complexity, slicing]
timestamp: 2026-06-18T11:30:00Z
---

# What it is

A ticket whose visible scope (one field, one mechanical move) conceals a migration, an API contract change, an i18n pass, a data backfill, or unknown unknowns. It is estimated low and detonates late.

# Why it happens

- The [planning fallacy](/concepts/planning-fallacy.md): people underestimate their own tasks even when they remember the last one running long.
- The [cone of uncertainty](/concepts/cone-of-uncertainty.md): the earliest estimate is the least reliable, off by up to a factor of sixteen until unknowns are resolved.
- The [curse of knowledge](/concepts/curse-of-knowledge.md): the expert author has compiled the hard parts into reflex, so they no longer look like work.

# The tell (detect before pulling)

- Minimizing verbs: "just", "simply", "only", "quickly". The smaller the word, the bigger the berg.
- Vague action verbs with no object: "update", "handle", "support", "integrate".
- Thin or missing acceptance criteria; nothing about edge cases, migration, or existing data.
- A wide spread in estimation (one person says 3, another says 13). The gap is the signal, not noise to average away.

# The fix

- Split it before committing. "Too big to estimate confidently" usually means "not understood well enough to commit". See [INVEST](/techniques/invest.md) (Estimable, Small).
- If the uncertainty is real, run a [spike](/techniques/spike.md): a timeboxed investigation to buy enough knowledge to estimate or split. Keep spikes rare.
- Re-slice vertically with [SPIDR](/techniques/spidr.md) or the [story-splitting patterns](/techniques/story-splitting-patterns.md).

# Citations

[1] [Planning fallacy (Wikipedia)](https://en.wikipedia.org/wiki/Planning_fallacy)
[2] [The Mysterious Cone of Uncertainty (Coding Horror)](https://blog.codinghorror.com/the-mysterious-cone-of-uncertainty/)
[3] [INVEST in Good Stories (Bill Wake)](https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/)
[4] [What Are Agile Spikes? (Mountain Goat Software)](https://www.mountaingoatsoftware.com/blog/spikes)
