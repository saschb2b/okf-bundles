---
type: Metric
title: Active customer
description: A customer with at least one paid order in the trailing 90 days.
tags: [metric, customer, revenue]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T20:00:00Z
sources:
  - id: policy
    resource: /customer-status-policy.md
    title: Customer status policy
---

# Definition

A customer is **active** when both hold:

- At least one order with `status = 'paid'` in the trailing 90 days.
- The account is not a trial account. See [trial accounts](known-issue-trial-accounts.md).

$$
\text{active} = \bigl|\{c : \exists\, o \in \text{orders}(c),\ o.status = \text{paid},\ o.date \ge \text{today} - 90\}\bigr|
$$

The 90-day window is a business decision, not a technical one. It comes from the [customer status policy](customer-status-policy.md), which Finance owns.[^policy]

# What does not count

| Case | Counts? | Why |
| --- | --- | --- |
| Paid order 100 days ago | No | Outside the window |
| Refunded order in window | No | `status` becomes `refunded` |
| Trial account with usage | No | See [trial accounts](known-issue-trial-accounts.md) |
| Two paid orders in window | Once | The metric counts customers, not orders |

# How to compute it

Do not write your own SQL for this. Use the sanctioned query in [counting active customers](count-active-customers.md), which reads [the customers table](customers-table.md).

[^policy]: Customer status policy.
