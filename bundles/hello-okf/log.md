# Change log

## 2026-08-05

* **Creation**: Five concepts answering "how many active customers do we have?": the [metric](active-customer.md), the [policy](customer-status-policy.md) behind it, the [table](customers-table.md) it reads, the [sanctioned query](count-active-customers.md), and the [caveat](known-issue-trial-accounts.md) that makes naive counts wrong.
* **Scope**: Written as a teaching example for the `okf` bundle, so the content is illustrative. The `acme.sales` tables are not real. The structure, the frontmatter and the link graph are exactly what a real bundle looks like.
* **Trust**: No concept carries `verified`, because nobody has reviewed this. That field records a confirmation that actually happened, and an example is the worst possible place to teach the habit of faking one.
