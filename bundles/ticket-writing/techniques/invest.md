---
type: Technique
title: INVEST
description: "Bill Wake's six-point checklist for a well-formed user story: Independent, Negotiable, Valuable, Estimable, Small, Testable."
resource: https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/
tags: [user-stories, quality-checklist, slicing]
generated:
  by: claude-code/unrecorded
  at: 2026-06-18T11:30:00Z
sources:
  - resource: https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/
    title: "INVEST in Good Stories, and SMART Tasks (Bill Wake)"
---

# Definition

A good story is:

- **Independent**: schedulable without waiting on another story. Overlap is the most painful dependency; re-split to remove it.
- **Negotiable**: a placeholder for a conversation, not a contract.
- **Valuable**: delivers something a user or stakeholder can perceive.
- **Estimable**: understood well enough to size. "Too big to estimate" usually means "not understood".
- **Small**: fits comfortably in an iteration, ideally a few days.
- **Testable**: you could write its acceptance test today.

# How it catches smells

- Independent kills [the Siamese Twins](/smells/siamese-twins.md).
- Estimable and Small kill [the Iceberg](/smells/iceberg.md) and [the Boulder](/smells/boulder.md).
- Valuable and Testable kill [the Tapper](/smells/tapper.md).

# Notes

Origin: Bill Wake, 2003. The same article gives the cake metaphor behind [vertical slicing](/techniques/vertical-slicing.md). See the [reference](/references/invest-wake.md).
