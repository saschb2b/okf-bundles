---
type: Playbook
title: Splitting a story
description: A step-by-step for cutting a too-big or wrongly-sliced story into thin vertical slices that each deliver value.
tags: [slicing, story-splitting, playbook]
timestamp: 2026-06-18T11:30:00Z
---

# Steps

1. **Start from value, not architecture.** Confirm the story is valuable end to end. Reject any slice that is "the backend" or "the DB table"; that is a horizontal layer, not a slice (see [vertical slicing](/techniques/vertical-slicing.md)).
2. **Find the core complexity**: the part most uncertain or most likely to surprise.
3. **Name the variations**: business rules, user paths, interfaces, data types, entities.
4. **Cut one complete slice** through the complex part, top to bottom. Ship the happy path first; defer edge cases, validation, and errors to later slices.
5. **Run through [SPIDR](/techniques/spidr.md)** as a prompt list (Spike, Paths, Interfaces, Data, Rules). Prefer Paths, Interfaces, Data, and Rules; spike only when truly blocked.
6. **Re-test each slice against [INVEST](/techniques/invest.md)**: Independent, Small (a few days), Estimable, Testable.
7. **Apply the tie-breakers** from the [story-splitting patterns](/techniques/story-splitting-patterns.md): favor splits that let you drop low-value work, and favor roughly equal sizes.
8. **Sanity check**: could you demo each slice in a sprint review? If not, it is not a vertical slice.

# Practice

Build the muscle with [Elephant Carpaccio](/techniques/elephant-carpaccio.md).

# Citations

[1] [SPIDR (Mike Cohn)](https://www.mountaingoatsoftware.com/blog/five-simple-but-powerful-ways-to-split-user-stories)
[2] [The Humanizing Work Guide to Splitting User Stories](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)
[3] [INVEST in Good Stories (Bill Wake)](https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/)
