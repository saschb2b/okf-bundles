---
okf_version: "0.2"
---

# hello-okf

The smallest bundle that is still worth reading: five concepts answering one question a team keeps re-explaining, **"how many active customers do we have?"**

Copy this directory, replace the five files with your own, and you have a conformant OKF bundle. Nothing else is required. The walkthrough is in the `okf` bundle, at `practice/first-bundle.md`.

Read it in this order, which is the path an agent would walk:

# The question

- [Active customer](active-customer.md) - The metric: what counts as an active customer, and what does not.

# What it depends on

- [Customer status policy](customer-status-policy.md) - The business rule the metric implements, and who owns it.
- [Customers table](customers-table.md) - Where the data lives, and which columns matter.
- [Counting active customers](count-active-customers.md) - The sanctioned query, and how to check a result came from it.

# The thing everyone forgets

- [Trial accounts are not customers](known-issue-trial-accounts.md) - The caveat that makes naive counts wrong by roughly 8%.
