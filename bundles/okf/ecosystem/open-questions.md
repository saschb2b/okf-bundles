---
type: Field Report
title: Open questions and where v0.3 is heading
description: The live spec debates in the tracker as of August 2026, what is converging, and what OKF v0.2 got wrong.
tags: [ecosystem, roadmap, spec, community, snapshot]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/issues
generated:
  by: claude-code/fable-5
  at: 2026-08-05T22:00:00Z
status: draft
stale_after: 2026-11-05
sources:
  - id: tracker
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/issues
    title: "OKF issue tracker, read 2026-08-05"
    last_modified: 2026-08-05
---

# Nothing here is settled

These are open proposals in a public tracker, not a roadmap Google has published. Read them as where the pressure is, and do not build against any of them as though it were settled. Each carries its issue number so you can check the current state yourself.

# 1. Typed relationships, the most contested question

`#148`, 22 comments, with an open pull request at `#195`.

The complaint is the one [OKF answers by design](/spec/cross-linking.md): a plain markdown link loses the *kind* of relationship, so an agent cannot tell a dependency from a replacement without reading the prose. The proposer runs a GraphRAG engine over roughly 46,000 markdown files, where traversal treats `implements`, `depends_on`, `replaces`, and `part_of` differently.

The thread is unusual for where it converged: **not** on an ontology. Three independent production implementations arrived at the same narrow answer. Register **two** edges, a lifecycle edge (`supersedes`) and a conflict edge (`contested_by`), and attach *query-time semantics* to each rather than argue about spellings. The lifecycle edge means exclude the retired concept from in-force retrieval. The conflict edge means surface both and defer. As one participant put it, the semantics are the part consumers cannot reconstruct from a field name.

If anything from the tracker lands in v0.3, this is the most likely candidate. It would be a small, sharply bounded addition, not the semantic-web turn [that discussion](/approaches/knowledge-graphs-and-ontologies.md) usually takes.

# 2. Trust splits into four axes

`#151` (12 comments), `#140`, `#158` (11 comments), `#160`.

v0.2 shipped [`generated`, `verified`](/trust/generated-and-verified.md) and [trust tiers](/trust/trust-tiers.md). The tracker's position is that "trust" is at least four separate questions, and the spec currently answers two of them:

| Axis | Trust that... | Status |
| --- | --- | --- |
| Authenticity / integrity | the bundle is from who it claims, unaltered | Proposed: signing, SHA-256 manifests, C2PA (`#140`) |
| Safety | the content is data, not instructions (prompt injection) | Written, in unmerged PR `#58` |
| Groundedness / citation | a claim is linked to its evidence | Shipped as [`sources`](/trust/sources.md) |
| Reliability / confidence | how much to believe the claim itself | Open (`#151`) |

The distinction that drives it: a concept can be perfectly signed, correctly cited, and still wrong. The proposals insist on two honesty rules that match [this bundle's own line on `verified`](/trust/generated-and-verified.md). Signed is not verified. A consumer must be able to recompute any confidence value from exposed signals rather than trust an opaque score.

Prompt injection is worth flagging separately, because a bundle is text an agent reads and the spec currently says nothing about treating it as data rather than instructions. Later threads cite a "§12 trust-and-safety" section as though it were part of the spec. It is not. It exists in a community pull request open since 15 June, which is a good illustration of why [governance throughput](/ecosystem/governance.md) matters for what people believe the format says.

# 3. Deletion is invisible

`#207`, 11 comments.

The sharpest defect found so far. Three spec provisions combine into a gap: consumers must tolerate broken links and are told to read them as not-yet-written knowledge, `log.md` and its `Deprecation` convention are both optional, and [identity is the file path](/spec/concept-id.md) so a rename destroys it. The result is that a removed concept is indistinguishable from one that was never written, and the spec instructs the consumer to assume the innocent case.

The thread added a third history nobody had modelled: a log entry recording a write that never happened, produced by an extraction agent. It has since produced a public conformance fixture of 111 cases across 17 classes, and it separates *presence* (removed, never landed) from *validity* as independent axes. [`status` and `stale_after`](/trust/lifecycle.md) address validity and say nothing about presence.

# 4. Path-as-identity is brittle

`#115`, `#85`, `#120`, `#175`.

[Concept ID is the file path](/spec/concept-id.md), which is elegant and makes every rename an identity change that silently breaks inbound links. Proposals include a stable `id` in frontmatter, permalinks, and a bundle-local registry for external references. A sub-thread argues specifically against canonizing DOIs, on the grounds that a centrally revocable pointer is the wrong thing for a bundle's identity to hang on.

# 5. Profiles, which is where ODSF fits

`#212`, `#250`.

Because [conformance is deliberately minimal](/spec/conformance.md), every serious producer builds a private validation layer, and the tracker is the evidence: multiple independent linters exist. The proposal is an opt-in `okf_profile` key beside `okf_version`, naming a domain-scoped document that pins a `type` vocabulary, any required-beyond-`type` fields, and lint rules. Consumers that do not know the profile ignore it, exactly as with `okf_version`.

The rule the thread settled on is worth keeping whatever the spec does: a profile warning is never core nonconformance, and a profile pass never rescues a core failure. Two verdicts, one bundle, no arithmetic between them. This is the mechanism [ODSF](/ecosystem/llms-txt-and-sitemap.md) is an instance of, so a bundle profile for a domain is a pattern with tracker support rather than an invention.

# 6. Errata in v0.2 itself

A cluster of precise, unanswered reports from careful readers, mostly `#234` to `#245`:

- **`#234`**: §7's actor convention lists only `producer/version`, `human:` and `process:`, which excludes the spec's own §5.1 example, `author: team:ga4-docs`.
- **`#239`**: v0.2 calls itself a minor bump while retiring two v0.1 fields. This bundle [makes the same observation](/spec/versioning.md).
- **`#242`**: `stale_after` has no timezone anchor, so staleness depends on where the bundle is read.
- **`#235`, `#241`, `#243`**: internal inconsistencies in the [Attested Computation](/trust/attested-computation.md) section about where the computation lives and which fields are required.
- **`#240`**: date-valued frontmatter is unquoted in the examples, leaving the parsed type to the YAML implementation.
- **`#244`**: eight files in the Stack Overflow sample write `tags` as a scalar, so no tags parse from them.

**This bundle inherited `#234`.** It uses `team:` for organizational authors in 39 places, following the spec's §5.1 example rather than its §7 list. The validator accepts it because the actor pattern allows any `prefix:value`. If §7 wins, those become nonconforming; if §5.1 wins, §7 gains a fourth form. Recorded here rather than quietly corrected, because guessing which way it resolves would be worse than naming the ambiguity.

# 7. Spec versus reference implementation

`#48`, `#201`, `#203`, `#206`, `#157`.

The spec **recommends** bundle-absolute links (`/tables/orders.md`) as the stable form. Google's reference visualizer builds no graph edges from them, so a bundle following the recommendation renders with zero edges, and percent-encoded targets are never decoded. Multiple independent reports, with community pull requests open to fix it.

Two practical consequences. Test your bundle against more than one consumer. And when a spec and its reference implementation disagree, expect producers to follow the implementation, which is how a recommendation quietly dies.

The fix has been written three times. A community pull request closed the oldest of these issues on 15 June with the before-and-after diff, and two further contributors have since submitted the same fix independently. None has merged. See [governance](/ecosystem/governance.md).

# What Google builds

Read from merged commits rather than from statements, the reference work moves toward the semantic and graph layer. `mdcode` gained a Semantic Model intermediate representation and a model loader, then the ability to generate BigQuery property-graph DDL from it, merged the day this snapshot was taken. A further semantic-model and BigQuery Graph push is open. The enrichment agent gained Confluence and SharePoint sources that produce OKF output, which is the enterprise-wiki ingestion path. A `ConversationLearner` mines conversation logs into proposals with human-in-the-loop review.

The direction is bundles as an intermediate representation between existing enterprise sources and a queryable graph, which is more ambitious than the "folder of markdown" framing suggests and consistent with the [data-sharing motivation](/references/google-cloud-announcement.md).

# Related

- [State of adoption](/ecosystem/adoption.md) covers who is in these threads.
- [Governance](/ecosystem/governance.md) covers who decides which of these lands.

[^tracker]: OKF issue tracker, read 2026-08-05.
