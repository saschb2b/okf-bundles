---
type: Overview
title: "Ticket writing and slicing: overview"
description: How to write and slice work items a team can act on, organized as four ticket smells, their shared root cause (bad slicing), and the techniques that cure them.
tags: [agile, tickets, user-stories, slicing]
timestamp: 2026-06-18T11:30:00Z
---

# The idea

Most bad tickets are slicing failures, and they are detectable before you start work, the way a code smell is. This bundle catalogs four [ticket smells](/smells/iceberg.md), the [concepts](/concepts/planning-fallacy.md) that explain why they hurt, the [techniques](/techniques/invest.md) that cure them, and [playbooks](/playbooks/ready-smell-test.md) you can run in refinement.

# The four smells and their cures

- [The Iceberg](/smells/iceberg.md) (hidden complexity) is cured by a [spike](/techniques/spike.md), splitting early, and [INVEST](/techniques/invest.md).
- [The Siamese Twins](/smells/siamese-twins.md) (split but intertwined) is cured by [vertical slicing](/techniques/vertical-slicing.md) and a [walking skeleton](/techniques/walking-skeleton.md).
- [The Tapper](/smells/tapper.md) (curse of knowledge) is cured by [Three Amigos](/techniques/three-amigos.md), [Example Mapping](/techniques/example-mapping.md), and explicit acceptance criteria.
- [The Boulder](/smells/boulder.md) (too big, stalled) is cured by right-sizing with [SPIDR](/techniques/spidr.md) and tracking [work item age](/concepts/flow-metrics.md).

# One root cause

The Iceberg is a slice that hid its size. The Twins are a slice on the wrong axis. The Tapper is a slice missing its reason. The Boulder is a slice that was never cut. Each is a slicing failure, and slicing well is a learnable skill (see [INVEST](/techniques/invest.md) and [vertical slicing](/techniques/vertical-slicing.md)).

# Where to start

- New to slicing: read [vertical slicing](/techniques/vertical-slicing.md), then the [splitting playbook](/playbooks/splitting-a-story.md).
- Refining a backlog: run the [ready smell-test](/playbooks/ready-smell-test.md).
