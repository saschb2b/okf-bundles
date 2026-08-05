---
type: Field Report
title: State of adoption
description: Who is actually building on OKF as of August 2026, measured rather than claimed, and what the numbers do and do not show.
tags: [ecosystem, adoption, community, snapshot]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
status: draft
stale_after: 2026-11-05
sources:
  - id: repo
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog
    title: "GoogleCloudPlatform/knowledge-catalog, repository metadata and issue tracker"
    last_modified: 2026-08-05
  - id: announcement
    resource: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/
    title: "How the Open Knowledge Format can improve data sharing"
  - id: gitbook
    resource: https://www.gitbook.com/blog/what-is-okf-open-knowledge-format
    title: "GitBook, What is OKF? Understanding Google's Open Knowledge Format"
---

# Read this as a dated snapshot

Every number in this concept comes from a measurement taken on **2026-08-05**, eight weeks after v0.1. A format this young moves fast, so treat the numbers as a reading rather than a fact, and re-measure before quoting them. That is what the `stale_after` on this concept is for.

# The measured numbers

| Signal | Value on 2026-08-05 |
| --- | --- |
| `knowledge-catalog` stars | 8,306 |
| Forks | 703 |
| Repository created | 2026-05-04 |
| v0.1 published | 2026-06-12 |
| v0.2 merged | 2026-07-24 |
| Issues in the tracker | 100, of which 96 open |
| Distinct issue authors | 73 |
| Open pull requests | 20 |
| Last push | 2026-08-05, the day of measurement |
| Repositories on the `open-knowledge-format` GitHub topic | 108 |
| Bundles in the BundleDex directory | 479, from 395 authors |

Sam McVeety (Tech Lead, Data Analytics) and Amir Hormati (Tech Lead, BigQuery) announced the format at Google Cloud under Apache 2.0.[^announcement] The verifier in the spec's own worked examples, `human:ahormati`, is the second of those two.

# What the numbers actually support

**Attention is real and broad.** 73 distinct issue authors in eight weeks is a genuine cross-organizational conversation, not a repo with one team talking to itself. Several threads run past ten substantive comments between people who do not work together.

**Independent implementations are many.** 108 repositories carry the topic. Two stand out: a 3,121-star Obsidian agent framework that added OKF interop, and a 1,359-star markdown knowledge graph. Separate teams have implemented the format in Go, Rust, Ruby, Python, and TypeScript. That is what a format people build against looks like, rather than one people discuss. See [community tools](/ecosystem/community-tools.md).

**A second vendor produces OKF from its own catalog.** `aws-samples/sample-okf-llm-wiki` turns AWS Glue Data Catalog and Amazon Redshift sources into bundles and serves them to agents over MCP. It is a sample rather than a product, and it is still the strongest available evidence for [format, not platform](/spec/design-principles.md): a competing cloud emitting Google's format from its own metadata, with no coordination required.

**The pull comes from the wiki lineage, not the catalog framing.** The two largest projects both come from the [LLM wiki and second-brain](/approaches/llm-wikis.md) direction and added OKF to an existing user base. OKF launched as a data-sharing format, and adopters use it hardest as a knowledge-portability one.

**Convergent design is the strongest signal.** The AKB team reported reaching OKF's exact core model on their own, per-vault git repos of markdown with YAML frontmatter and path-as-identity, *before the spec existed*. A standard that names a shape people already built beats one that asks them to adopt a new shape.

# What the numbers do not support

Be careful with the word adoption. It conflates three different claims:

`Building on OKF`
: 108 topic-tagged repositories and 479 directory-listed bundles. Verifiable, and worth noting that only 198 of those bundles pass conformance, so a bundle count is not a conformant-bundle count.

`Positioning as OKF-compatible`
: GitBook published an explainer arguing its markdown-native, git-synced docs already align with OKF, and stopped short of announcing an export feature or an integration roadmap.[^gitbook] That is thought leadership, not shipped support. Expect more of it, and check whether a claim of compatibility comes with a command you can run.

`Production use of bundles as the knowledge layer`
: The hardest to verify and the thing that actually matters. The tracker carries credible reports (a GraphRAG engine over ~46,000 markdown files, a wiki compiler at Lexenne, governance profiles in production) but no public census. Nobody can honestly tell you how many organizations run OKF today.

**No adopter list exists upstream.** The `okf/README.md` has no community, ecosystem or implementations section, which is why two open issues request one. The community built [a directory](/ecosystem/community-tools.md) instead, so the authoritative place to check who uses OKF is not run by the format's authors.

# Where the pull comes from

The tracker skews toward people with a corpus problem rather than a data-catalog problem, which is broader than the launch framing suggested. Recurring producer contexts: enterprise SaaS documentation, wiki memory systems, civic and civil-society knowledge, ML experiment trails, legal and regulated corpora, and coding-agent governance. The [data-sharing framing](/references/google-cloud-announcement.md) brought the format out. The demand turns out to be general knowledge portability.

# A caution about measuring this

The first version of this concept undercounted by roughly an order of magnitude, because it counted only the projects that had announced themselves in one upstream issue thread. That instrument misses everyone who built something and tagged it without announcing.

The lesson generalizes past this bundle: for a young format with no official adopter list, count from a topic index and a community registry, state which instrument you used, and expect it to still be a floor.

# The honest summary

OKF at eight weeks has an implementation ecosystem larger than its age suggests: 108 tagged repositories, independent implementations in five languages, a community registry of 479 bundles, a second cloud vendor emitting the format from its own catalog, and the two largest adopters arriving from the [LLM wiki lineage](/approaches/llm-wikis.md) rather than from data cataloguing.

What is still missing is the boring institutional layer. No verified enterprise deployments in public, no official adopter list, no [governance](/ecosystem/governance.md) outside one vendor's repository, and a set of [open questions](/ecosystem/open-questions.md) with no maintainer verdict. One large documentation vendor is positioning without shipping.

The fair reading is that OKF has won the early implementer argument and has not yet been tested as an institution. Formats fail at the second stage more often than the first.

# Related

- [Community tools](/ecosystem/community-tools.md) is the verified list behind the "ten tools" claim.
- [knowledge-catalog](/ecosystem/knowledge-catalog.md) is the upstream these numbers describe.

[^announcement]: How the Open Knowledge Format can improve data sharing.
[^gitbook]: GitBook, What is OKF? Understanding Google's Open Knowledge Format.
[^repo]: GoogleCloudPlatform/knowledge-catalog, repository metadata and issue tracker.
