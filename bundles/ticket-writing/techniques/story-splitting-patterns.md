---
type: Technique
title: Story-splitting patterns (Humanizing Work)
description: Richard Lawrence's flow and nine patterns for splitting stories, built on a meta-pattern of finding the core complexity and slicing one complete path through it.
resource: https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/
tags: [slicing, story-splitting, patterns]
timestamp: 2026-06-18T11:30:00Z
---

# Meta-pattern

1. Find the core complexity (the part most uncertain or most likely to surprise).
2. Identify the variations (business rules, user types and paths, interfaces, data types, entities).
3. Reduce the variations to one and cut a single complete slice through the complex part.

# The nine patterns

Workflow Steps, Operations (CRUD), Business Rule Variations, Variations in Data, Data Entry Methods, Major Effort, Simple/Complex, Defer Performance, Break Out a Spike.

# Two tie-breakers

- Prefer the split that lets you deprioritize or drop the low-value part (the 80/20 split).
- Prefer splits that come out roughly equal in size.

# Related

Pairs with [SPIDR](/techniques/spidr.md); both serve [vertical slicing](/techniques/vertical-slicing.md). The downloadable flowchart is a useful refinement cheat sheet. See the [reference](/references/humanizing-work-splitting.md).

# Citations

[1] [The Humanizing Work Guide to Splitting User Stories](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)
[2] [Story Splitting Flowchart (PDF)](https://www.humanizingwork.com/wp-content/uploads/2020/10/HW-Story-Splitting-Flowchart.pdf)
