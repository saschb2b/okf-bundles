---
type: Ticket Smell
title: The Boulder
description: A ticket too big to finish, which sits on the board for weeks showing no progress because nothing smaller than the whole thing can reach done.
tags: [ticket-smell, flow, batch-size, sizing]
timestamp: 2026-06-18T11:30:00Z
---

# What it is

A monolithic item ("Build user account management") that stays "In Progress" across sprints. It produces no completion and no throughput until it is entirely done, so the board shows nothing while its age climbs.

# Why it happens

Large [batch size](/concepts/batch-size.md). [Little's Law](/concepts/littles-law.md) makes it exact: the more you keep open at once, the longer each item takes.

# The tell (detect before pulling, and while in flight)

- No status change in several days. The simplest stall signal there is.
- The story has rolled over two or more sprints.
- An estimate larger than half the sprint.
- Many subtasks, all still open. Work is fragmented but nothing finishes.
- A permanent "In Progress". [Work item age](/concepts/flow-metrics.md) counts idle and blocked time too, so a ticket nobody touches is still aging.

# The fix

- Right-size before committing: if a story will take more than a few days, split it (vertically).
- Track [work item age](/concepts/flow-metrics.md) against your team's history; a boulder crosses the 85th-percentile line before it is formally late.

# Citations

[1] [What Is Little's Law? (Businessmap)](https://businessmap.io/continuous-flow/littles-law)
[2] [What is Work Item Age? (55degrees)](https://www.55degrees.se/blog/post/what-is-work-item-age)
[3] [Getting to 85: Agile Metrics with ActionableAgile (Scrum.org)](https://www.scrum.org/resources/blog/getting-85-agile-metrics-actionableagile-part-1)
[4] [The Principles of Product Development Flow (Reinertsen)](https://www.amazon.com/Principles-Product-Development-Flow-Generation/dp/1935401009)
