---
type: Attested Computation
title: Counting active customers
description: The sanctioned query for the active customer metric, with a deterministic check on any run.
tags: [computation, customer, sql]
runtime: bigquery
parameters:
  - { name: as_of_date, type: date, required: true }
executor:
  resource: /count-active-customers.md
  receipt: [job_id, executed_sql, result]
attester:
  resource: attesters/sql_equality.py
generated:
  by: claude-code/opus-5
  at: 2026-08-05T20:00:00Z
status: stable
---

# Computation

```sql
SELECT COUNT(DISTINCT c.customer_id) AS active_customers
FROM `acme.sales.customers` AS c
JOIN `acme.sales.orders` AS o
  ON o.customer_id = c.customer_id
WHERE c.account_type = 'paid'
  AND o.status = 'paid'
  AND o.order_date > DATE_SUB(@as_of_date, INTERVAL 90 DAY)
  AND o.order_date <= @as_of_date
```

# How to use it

An agent may set `as_of_date`. It may **not** edit the query. Changing the join, the 90-day interval or the `account_type` filter silently changes what the number means, and each of those encodes a decision from the [customer status policy](/customer-status-policy.md).

A run returns a receipt with the job id, the SQL that actually executed, and the result. A deterministic checker canonicalises the executed SQL and compares it to the query above. If they differ, the number is refused rather than displayed.

# Why this exists

Without it, an agent asked for the active customer count writes plausible SQL, forgets the `account_type` filter, and returns a number that is wrong by roughly 8%. See [trial accounts](/known-issue-trial-accounts.md).

This implements [active customer](/active-customer.md) and reads [the customers table](/customers-table.md).
