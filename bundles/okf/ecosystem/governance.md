---
type: Field Report
title: Governance
description: Who decides what OKF is, the gaps the community is asking to close, and how to participate.
tags: [ecosystem, governance, community, standards, snapshot]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T16:00:00Z
status: draft
stale_after: 2026-11-05
sources:
  - id: tracker
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/issues
    title: "OKF issue tracker, read 2026-08-05"
    last_modified: 2026-08-05
---

# Where the format lives today

In one directory of one company's repository. `okf/SPEC.md` inside `GoogleCloudPlatform/knowledge-catalog`, Apache 2.0, alongside Google's own tooling, and samples. Spec changes land as ordinary commits from Google engineers. The v0.2 rewrite was a single merged pull request on 2026-07-24.

That is a normal and effective way to start a format. It is not the structure the format's own [design principles](../spec/design-principles.md) point at, and the community has noticed.

# The four gaps the tracker is asking to close

`A home of its own`
: `#43` proposes giving OKF a first-class repository, separate from Google's catalog tooling. Today the spec, the reference agent, the visualizer, and Google's BigQuery work share a tree, so "the format" and "Google's implementation of the format" are not separable by URL.

`An authoritative site`
: `#231` asks whether one is planned. OKF has no `okf.dev`, no canonical rendered spec, and no versioned archive of prior revisions. Compare [`llms.txt`](llms-txt-and-sitemap.md), which has `llmstxt.org`, and [Agent Skills](../approaches/skills-and-procedures.md), which has `agentskills.io` plus a foundation behind it.

`A place to discuss`
: `#51` requested one and was closed. Design debate therefore happens in issue threads, where a 22-comment convergence across three independent implementations is buried in a numbered ticket that no newcomer will find.

`A community index`
: `#65` and `#166` both ask for a Community and ecosystem tools section. Neither has landed, so [the tool list](community-tools.md) exists only in a comment thread. Newcomers keep asking what they can use to author or validate a bundle, which is the question an index answers.

A fifth is technical but governs conformance in practice: `#62` proposes a conformance corpus of valid and invalid bundles with a runner. Without one, every validator encodes its author's reading of the prose, and [this repo's checker](../practice/validation.md) is no exception.

# What is working

The failure mode this list might suggest, a vendor spec with a decorative comment box, is not what the tracker looks like.

- Google engineers participate under their own names, including proposals against their own spec.
- Community pull requests are open against the reference implementation and the spec, including a typed-relationships proposal and a change binding trust tiers to current content.
- Proposals get merged into each other. In one case an author explicitly withdrew a parallel proposal and folded it into another thread, which is the behaviour of a functioning standards conversation rather than a feature-request queue.
- Precise errata from outside readers sit open and unedited rather than being closed defensively.

# The throughput problem, measured

Attention is not the constraint. Merging is. The pull request numbers are sharper than the issue numbers:

| Signal | Value on 2026-08-05 |
| --- | --- |
| Pull requests, all states | 145 (72 open, 41 merged, 32 closed) |
| Distinct PR authors | 59 |
| Open PRs excluding dependabot | 61 |
| Median age of those | 39 days |
| Oldest | 71 days |
| Merged PRs | 41, from the same 13 recurring committers |

Every merged pull request comes from the repository's regular committers, the people who also write its internal tooling. No community contribution identified in this survey has landed.

# Three worked examples of the cost

`The community proposes, the release ships it separately`
: PR `#50` (14 June) proposed an optional `sources` frontmatter field for machine-readable provenance, complementing `# Citations`. v0.2 shipped [exactly that](../trust/sources.md) on 24 July, through Google's own bulk migration commit. The originating PR is still open, unmerged, and unclosed, 52 days on.

`The same defect, identified and then re-fixed`
: PR `#58` (15 June) flagged that §6 and §11 contradicted each other on index frontmatter, noting a conformance checker could not satisfy both. v0.2 resolved it the way the PR proposed. Still open. The same PR also adds the trust-and-safety section that later issue threads discuss as though it exists; it does not, because the PR never merged.

`The same bug, fixed three times`
: PR `#66` (15 June) fixed the reference viewer's handling of bundle-absolute links, with the before-and-after diff, closing the oldest visualizer issue. It sat. Two more contributors later opened `#203` and `#206` fixing the same defect, because the first fix never landed. Three pull requests, one bug, none merged. See [open questions](open-questions.md).

Even the community index has this shape. PR `#167`, adding the Community and ecosystem tools section that two issues requested, has been open since 1 July with 18 comments, initially blocked on a contributor licence agreement. Its author coordinated one-line descriptions with a dozen tool maintainers in the thread. That work is done and unmerged, which is why [the tool list](community-tools.md) has no upstream home.

None of this reads as hostility. It reads as a small team shipping its own roadmap fast while an external contribution queue accumulates beside it. The cost is specific: duplicated work, uncredited proposals, and contributors who eventually stop opening pull requests.

# What this means if you are adopting

Adopt the parts that cannot move and keep a margin on the parts that can.

- **Safe to build on.** [The one rule](../spec/conformance.md), the [bundle and concept structure](../spec/bundle.md), [markdown links as the graph](../spec/cross-linking.md), [reserved filenames](../spec/index-file.md). These are load-bearing for every existing implementation, so they will not move without a major version.
- **Stable but contested at the edges.** The [v0.2 trust families](../trust/why-trust-is-a-field.md). They will most likely gain fields rather than change meaning, and see [the four axes](open-questions.md).
- **Do not build on it yet.** Typed edges, confidence scores, deletion semantics, stable ids, profiles. All are live proposals. If you need one now, implement it as a producer extension under your own key, which [the format explicitly permits](../spec/extensions.md), and expect to migrate.
- **Pin the version you targeted.** Declare `okf_version` in the root index and record in [`log.md`](../spec/log-file.md) which revision you read. When §7 and §5.1 [contradict each other](open-questions.md), the useful record is which one you followed.

# How to participate

The tracker is the whole process, so a good issue is the whole contribution. What visibly gets traction there:

- **Producer reports beat proposals.** The threads that converged are the ones where people brought what they already run in production and what it cost them. A field name argued from first principles goes nowhere; the same field with two independent implementations behind it moves.
- **Bring the semantics, not the spelling.** The typed-relationship thread landed because participants stopped arguing about names and specified what a consumer must do at query time.
- **Errata are welcome and cheap.** The precise inconsistency reports are among the most useful things in the tracker, and they take twenty minutes.
- **Publish the tool and say so.** Several entries in [community tools](community-tools.md) reached people only by opening an issue announcing themselves, since no index exists.

# Related

- [State of adoption](adoption.md) is the measured picture this governance sits on top of.
- [Design principles](../spec/design-principles.md) states the vendor-neutrality this concept measures the format against.

[^tracker]: OKF issue tracker, read 2026-08-05.
