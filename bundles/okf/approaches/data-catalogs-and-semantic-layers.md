---
type: Approach
title: Data catalogs and semantic layers
description: "\"We already have a catalog.\" What catalogs and semantic layers solve, and the seam they leave for an agent."
tags: [approach, catalog, semantic-layer, dbt, governance]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T14:00:00Z
sources:
  - id: dbt-sl
    resource: https://docs.getdbt.com/docs/build/semantic-models
    title: "dbt semantic models and the dbt Semantic Layer"
    author: team:dbt-labs
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, non-goals and deferred items"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# Two things, often confused

`A data catalog`
: An inventory of what data exists, with owners, lineage, classifications and descriptions. Collibra, Alation, Atlan, DataHub, Dataplex. The question it answers is "what do we have, and who owns it?"

`A semantic layer`
: One definition of a metric, resolved to SQL at query time so every tool computes it the same way. dbt's Semantic Layer defines semantic models in YAML with entities, dimensions and metrics, then serves them to BI tools so a metric is defined once and reused.[^dbt-sl] The question it answers is "what does revenue mean, and how is it calculated?"

Both predate the agent era and both are good at their jobs. If you have either, keep it.

# What they already give you

They cover ground OKF does not. Access control and row-level policy. Lineage computed from query logs rather than asserted by hand. Certification workflows with real approvers. Compiled, executable metric definitions with a query engine behind them. A bundle has none of that and should not try.

The semantic layer in particular overlaps with OKF at exactly one point: both want one blessed definition per metric. Where a semantic layer *executes* that definition, an [Attested Computation](/trust/attested-computation.md) only *records* it and says how to check a run. The spec is explicit that OKF never executes anything, and that semantic-layer templates for tools like Looker and dbt are [deferred to a later revision](/spec/versioning.md).[^spec]

# The seam for an agent

- **The knowledge is behind an API and a proprietary model.** Readable by that vendor's UI, and reachable by an agent only through a bespoke integration. This is the [scattered-surfaces](/context/scattered-knowledge.md) problem with better governance.
- **Coverage stops at data assets.** A catalog documents a table. It does not hold the runbook, the policy prose, the deprecation, the "the Tuesday pipeline is known-broken" that an agent needs to answer the question well.
- **Descriptions are one field, not a document.** A column description is a sentence in a form. The caveat, the worked example and the join path have nowhere to go.
- **Relationships are lineage, not meaning.** Lineage tells you `orders` feeds `revenue_daily`. It does not tell you the recognition policy that decides which rows count.
- **It is a system, not a file.** No diff, no pull request, no `git blame`, no offline copy. See [distribution](/practice/distribution.md).

# How they compose

Treat the catalog as the system of record and the bundle as the agent-readable projection of it.

1. Export the catalog's assets into concepts, one per table, view or metric. This is what [`/okf export`](/ecosystem/okf-skill.md) is for.
2. Keep the catalog authoritative for access, lineage and certification. Do not fork the governance.
3. Write into the bundle the things the catalog has no field for: the policy, the caveat, the join path, the deprecation, the sanctioned query.
4. Cite the catalog entry in [`sources`](/trust/sources.md), with `last_modified` so a consumer can see when the underlying entry last changed.

The result is that a catalog's meaning becomes readable by an agent that has no integration with your catalog, which is the whole [format-not-platform](/spec/design-principles.md) claim.

# Related

- [OKF versus retrieval](/approaches/okf-versus-retrieval.md) is the same "we already have X" question for the search side.
- [Non-goals](/spec/non-goals.md) states that OKF does not prescribe storage, serving or query infrastructure.

[^dbt-sl]: dbt semantic models and the dbt Semantic Layer.
[^spec]: OKF v0.2 specification, non-goals and deferred items.
