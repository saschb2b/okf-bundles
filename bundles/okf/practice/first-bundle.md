---
type: Tutorial
title: Your first bundle
description: The smallest conformant bundle, then a real five-file one you can copy, with the reasoning behind each file.
tags: [practice, tutorial, getting-started, example]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T20:00:00Z
sources:
  - id: example
    resource: "bundles/hello-okf in this repository"
    title: "hello-okf, the worked example bundle"
    last_modified: 2026-08-05
---

# The smallest thing that conforms

One file, one field. This is a complete, conformant OKF bundle:

```
my-bundle/
└── revenue.md
```

```yaml
---
type: Metric
---
Revenue excludes returns for the first 30 days.
```

That is not a simplification for teaching. [Conformance](../spec/conformance.md) requires frontmatter with a non-empty `type` and nothing else, so this file is as valid as anything in Google's samples. If you stop here you have already given an agent one fact it did not have.

# The version worth writing

A single file has no graph, so it wastes what the format is for. The useful minimum answers one question a person keeps re-explaining, in five files. The worked example is `bundles/hello-okf/` in this repository, and it answers **"how many active customers do we have?"**

```
hello-okf/
├── index.md                        okf_version: "0.2", the reading order
├── log.md                          dated history
├── active-customer.md              Metric      the definition
├── customer-status-policy.md       Policy      the rule behind it
├── customers-table.md              Table       where the data lives
├── count-active-customers.md       Attested Computation   the sanctioned query
└── known-issue-trial-accounts.md   Known Issue the caveat everyone forgets
```

It validates clean under `--strict`, so it is a proof rather than an illustration:

```sh
node scripts/okf-validate.mjs bundles/hello-okf --strict
```

# Why those five

The shape generalizes past this example, and it is [the adoption path](adoption-path.md) made concrete. Most questions an agent gets wrong need the same five kinds of file:

| File | Kind | Answers |
| --- | --- | --- |
| `active-customer.md` | The definition | What does this term mean here? |
| `customer-status-policy.md` | The rule behind it | Who decided, and why that number? |
| `customers-table.md` | The system | Where does the data actually live? |
| `count-active-customers.md` | The computation | How do I get the number without inventing SQL? |
| `known-issue-trial-accounts.md` | The caveat | What makes the obvious answer wrong? |

The last one earns its place most often. In the example, trial accounts make a naive count wrong by about 8%, which is large enough to matter and small enough that nobody notices. That fact lives in one person's head at most companies, and it is the single highest-value thing to write down.

# What each file demonstrates

`active-customer.md`
: [Core frontmatter](../spec/core-frontmatter.md) filled honestly, a TeX formula for the definition, a table of what does not count, and outbound [links](../spec/cross-linking.md) with the relationship named in the prose.

`customer-status-policy.md`
: A [definition list](../spec/body-conventions.md) for the three statuses, and an explicit ownership statement. The "why 90 days" section is the kind of reasoning that never survives in a schema comment.

`customers-table.md`
: A `# Schema` table, a mermaid `erDiagram` for the join, and a Gotchas section. `resource` carries the table URI.

`count-active-customers.md`
: An [Attested Computation](../trust/attested-computation.md) with `runtime`, a typed `parameters` entry, an inline `# Computation` fence, and a plain statement that an agent may set the parameter and may not edit the query.

`known-issue-trial-accounts.md`
: [`stale_after`](../trust/lifecycle.md) used for its actual purpose, a date by which the 8% figure needs re-checking, rather than blanket-applied.

# What it deliberately does not do

**No `verified`, anywhere.** Nobody reviewed the example, so writing the field would teach exactly the habit that [breaks the trust layer](../trust/generated-and-verified.md). An example is the worst place to fake one.

**No subdirectories.** Five concepts do not need a folder hierarchy, and a flat bundle is easier to read. Group by domain when the count makes navigating hard, not before. See [the bundle](../spec/bundle.md).

**No `README.md`.** A plain README inside a bundle is a non-reserved `.md` file with no `type`, so it would make the whole bundle non-conformant. The root [`index.md`](../spec/index-file.md) does that job.

# Copy it

```sh
cp -r bundles/hello-okf my-bundle
```

Then, in order: replace the five concepts with your own, fix the `type` values, rewrite the root `index.md`, reset `log.md` to one Creation entry dated today, and set every [`generated.by`](../trust/actor-convention.md) to whoever actually writes the text. Run the validator after each file rather than at the end.

# Where to go next

- [Authoring a bundle](authoring-a-bundle.md) is the full procedure, including the bookkeeping that keeps a bundle from rotting.
- [Graph hygiene](graph-hygiene.md) covers the two defects a file checker misses.
- [Consuming a bundle](consuming-a-bundle.md) is how to point an agent at what you just wrote.
- [Google's sample bundles](../ecosystem/sample-bundles.md) are the next size up, and `acme_retail` exercises every v0.2 feature.
