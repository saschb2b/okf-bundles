---
type: Concept
title: Flow metrics
description: Cycle time, throughput, WIP, and work item age, the lens that makes a stalled ticket visible before it is formally late.
tags: [flow, kanban, metrics]
timestamp: 2026-06-18T11:30:00Z
---

# The metrics

- **Cycle time**: elapsed time from start to done for a finished item (a lagging indicator).
- **Lead time**: from request to delivery (broader than cycle time).
- **Throughput**: items completed per unit time.
- **Work in progress (WIP)**: items started but not finished.
- **Work item age**: how long an unfinished item has been in progress (a leading indicator). It counts idle and blocked time too.

# Aging WIP

Plot each in-progress item's age against the team's historical cycle-time percentiles (50th, 85th, 95th). An item drifting past the 85th-percentile line is a flow risk to act on before it is late. A cumulative flow diagram shows the same stall structurally: a flat band means zero departures, a widening band means a bottleneck.

# Why it matters for tickets

The detector for [the Boulder](/smells/boulder.md). Governed by [Little's Law](/concepts/littles-law.md) and [batch size](/concepts/batch-size.md).

# Citations

[1] [4 Key Flow Metrics (Scrum.org)](https://www.scrum.org/resources/blog/4-key-flow-metrics-and-how-use-them-scrums-events)
[2] [What is Work Item Age? (55degrees)](https://www.55degrees.se/blog/post/what-is-work-item-age)
[3] [Getting to 85: Agile Metrics with ActionableAgile (Scrum.org)](https://www.scrum.org/resources/blog/getting-85-agile-metrics-actionableagile-part-1)
