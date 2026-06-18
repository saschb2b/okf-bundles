---
type: Checklist
title: The ready smell-test
description: A yes/no checklist to run before a ticket reaches the board; a "no" is a prompt to talk, split, or send it back, not a veto.
tags: [refinement, checklist, definition-of-ready]
timestamp: 2026-06-18T11:30:00Z
---

# The checklist

- **Value is explicit**: you can say who benefits and why (the "so that").
- **Acceptance criteria are written and testable**: a tester could turn them into checks today.
- **No open question is blocking a start.**
- **It is small enough** to finish comfortably in a few days.
- **It is independent**, or every dependency is named and tracked.
- **The team agrees on the size**, with no wide spread left unexplained.
- **Three lenses have seen it**: product, development, and testing.
- **You could map it in about 25 minutes** (otherwise it is too big or too vague).

# How to use it

Run it in [backlog refinement](/techniques/backlog-refinement.md). It operationalizes the [Definition of Ready](/techniques/definition-of-ready.md) as a guideline, and each failing line points at a smell:

- Missing value or criteria points at [the Tapper](/smells/tapper.md).
- Not small points at [the Boulder](/smells/boulder.md).
- Not independent points at [the Siamese Twins](/smells/siamese-twins.md).
- A wide, unexplained estimate spread points at [the Iceberg](/smells/iceberg.md).

# Citations

[1] [What is a Definition of Ready? (Atlassian)](https://www.atlassian.com/agile/project-management/definition-of-ready)
[2] [Introducing Example Mapping (Matt Wynne)](https://cucumber.io/blog/bdd/example-mapping-introduction/)
