---
type: Policy
title: Customer status policy
description: The business rule behind the 90-day activity window, owned by Finance.
tags: [policy, customer, finance]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T20:00:00Z
status: stable
---

# The rule

A customer's status is derived from paid order activity, not from login activity or contract state.

`Active`
: At least one paid order in the trailing 90 days.

`Dormant`
: No paid order in 90 days, but at least one in the trailing 365 days.

`Churned`
: No paid order in 365 days.

# Why 90 days

The window matches the longest standard billing cycle plus a 30-day grace period. A quarterly customer who pays on time is never counted as dormant. Changing the window changes reported revenue retention, so it is a Finance decision rather than an engineering one.

# Ownership

Finance owns this rule. Engineering owns [the table it reads](customers-table.md) and [the query that implements it](count-active-customers.md). Neither may change the window without Finance.

The metric that implements this policy is [active customer](active-customer.md).
