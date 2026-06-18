---
type: Technique
title: Vertical slicing
description: Slice a story as a thin increment cutting through every layer (UI, logic, data) to deliver demonstrable value, instead of by technical layer.
tags: [slicing, value, increment]
timestamp: 2026-06-18T11:30:00Z
---

# Definition

A vertical slice goes top to bottom through all layers and is independently demoable and valuable. A horizontal slice (one layer: "the backend", "the DB table", "the UI") delivers nothing until combined with the others, which manufactures dependencies and handoffs.

# Why

"A full database layer has little value to the customer if there's no presentation layer" (Wake). The customer cares about a slice of the cake, not one layer of it. Horizontal splits fail INVEST's Independent and Valuable and push integration risk to the end of the sprint.

# Related

- The cure for [the Siamese Twins](/smells/siamese-twins.md).
- Tools to slice vertically: [SPIDR](/techniques/spidr.md), [story-splitting patterns](/techniques/story-splitting-patterns.md), [Elephant Carpaccio](/techniques/elephant-carpaccio.md).
- Step-by-step in the [splitting playbook](/playbooks/splitting-a-story.md).

# Citations

[1] [INVEST in Good Stories (Bill Wake)](https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/)
[2] [Slicing your development work as a multi-layer cake (Thoughtworks)](https://www.thoughtworks.com/insights/blog/slicing-your-development-work-multi-layer-cake)
[3] [Vertical Slice vs Horizontal Slice (Visual Paradigm)](https://www.visual-paradigm.com/scrum/user-story-splitting-vertical-slice-vs-horizontal-slice/)
