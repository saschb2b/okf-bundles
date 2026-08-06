---
type: Known Issue
title: Trial accounts are not customers
description: The caveat that makes naive active-customer counts wrong by roughly 8%.
tags: [known-issue, customer, data-quality]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T20:00:00Z
status: stable
stale_after: 2027-01-31
---

# The problem

[The customers table](customers-table.md) contains trial accounts, and trial accounts can place orders with `status = 'paid'` when a trial converts mid-cycle. A count that filters only on order status therefore includes accounts that are not customers.

As of Q2 2026 trial accounts are about **8%** of rows in the table, so the error is large enough to change a board number and small enough that nobody notices it is wrong.

# The fix

Always filter `account_type = 'paid'`. This is why [the sanctioned query](count-active-customers.md) exists and why an agent may not rewrite it.

# Why it is not fixed upstream

Splitting trials into a separate table has been proposed and not scheduled. Until it is, this concept is the warning. The `stale_after` on this file is the date the next review is due, so if you are reading it after that, check whether the 8% figure still holds.

# Related

- [Active customer](active-customer.md) is the metric this distorts.
- [Customer status policy](customer-status-policy.md) defines what a customer is.
