---
type: Technique
title: SPIDR
description: "Mike Cohn's five patterns for splitting a user story into vertical slices: Spike, Paths, Interfaces, Data, Rules."
resource: https://www.mountaingoatsoftware.com/blog/five-simple-but-powerful-ways-to-split-user-stories
tags: [slicing, story-splitting]
timestamp: 2026-06-18T11:30:00Z
---

# Definition

- **Spike**: a research task to resolve uncertainty before splitting (the one non-shippable option). See [spike](/techniques/spike.md).
- **Paths**: split by alternate routes through the workflow (one payment method first, then others).
- **Interfaces**: split by device, browser, or progressive UI (a basic input first, a rich UI later).
- **Data**: support a narrower data set first (one file format, one range), then widen.
- **Rules**: relax or defer a business rule, then add it back as its own slice.

Prefer the four functional patterns (Paths, Interfaces, Data, Rules), which keep each slice vertical. Use a Spike only when uncertainty truly blocks splitting.

# Worked example (checkout)

Pay for one item by credit card end to end (happy path), then add PayPal (Paths), then decline an unsupported billing country (Rules), then validate a discount code (Rules). Each slice ships on its own.

# Related

A toolkit for [vertical slicing](/techniques/vertical-slicing.md); complements the [story-splitting patterns](/techniques/story-splitting-patterns.md). See the [reference](/references/spidr-cohn.md).

# Citations

[1] [SPIDR: Five Simple but Powerful Ways to Split User Stories (Mike Cohn)](https://www.mountaingoatsoftware.com/blog/five-simple-but-powerful-ways-to-split-user-stories)
