---
type: Ticket Smell
title: The Siamese Twins
description: Two tickets split on paper but so technically intertwined that neither can be built, demoed, or shipped on its own.
tags: [ticket-smell, dependencies, slicing, coupling]
timestamp: 2026-06-18T11:30:00Z
---

# What it is

A feature divided into cards like "Build the login API" and "Build the login screen". On the board it looks like progress, but neither half delivers value alone, and the integration (where the bugs live) is an untracked third step.

# Why it happens

Horizontal slicing: cutting work by technical layer (backend, frontend, database) instead of by value. A layer is not a slice. A database table with no screen delivers nothing a stakeholder can see, so the split fails INVEST's Independent and Valuable. See [vertical slicing](/techniques/vertical-slicing.md).

# The tell (detect before pulling)

- The two cards share a branch or a single pull request.
- Neither can be demoed on its own.
- A standing "blocked by" link between them, especially a chain.
- They are always estimated together and assigned to the same person in the same sprint.
- One card is named after a layer, not an outcome ("Backend for X", "API for X", "UI for X").

# The fix

- Re-slice vertically: one thin story top to bottom (UI, service, storage) that is demoable. Then slice further by happy path, error handling, and edge cases.
- If two teams must work in parallel, decouple with a contract-first interface (build against a stub) or a [walking skeleton](/techniques/walking-skeleton.md).

# Citations

[1] [The Humanizing Work Guide to Splitting User Stories](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)
[2] [Vertical Slice vs Horizontal Slice (Visual Paradigm)](https://www.visual-paradigm.com/scrum/user-story-splitting-vertical-slice-vs-horizontal-slice/)
[3] [INVEST in Good Stories (Bill Wake)](https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/)
[4] [Start with a Walking Skeleton (97 Things)](https://www.oreilly.com/library/view/97-things-every/9780596800611/ch60.html)
