---
type: Rationale
title: Non-goals
description: What OKF deliberately does not do, and how it relates to formats that already exist.
tags: [spec, scope, positioning]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, non-goals and relationship to other formats"
    last_modified: 2026-07-24
---

# What OKF does not do

- **Define a fixed taxonomy of concept types.** `type` is open by design. See [core frontmatter](core-frontmatter.md).
- **Prescribe storage, serving or query infrastructure.** A bundle is just files. See [distribution](../practice/distribution.md).
- **Subsume domain-specific schemas.** OKF *references* Avro, Protobuf, and OpenAPI through `resource` and links, and can describe them in the body. It does not replace them, and the same holds for an [RDF vocabulary or a catalog's own model](../approaches/knowledge-graphs-and-ontologies.md).
- **Replace a catalog, a semantic layer or a governance system.** Those keep access control, lineage, and certification. See [data catalogs and semantic layers](../approaches/data-catalogs-and-semantic-layers.md).
- **Specify the runtime protocol behind attested computations.** Deferred to a later revision, along with the attester ABI and caching. See [versioning](versioning.md).

A fifth non-goal is implicit and worth stating: OKF does not check that knowledge is correct. [Validation](../practice/validation.md) checks shape. The [trust fields](../trust/trust-tiers.md) record who checked, and record nothing about whether they checked well.

# Relationship to what already exists

OKF is intentionally close to three established patterns:

- LLM "wiki" repositories that use markdown plus frontmatter as an agent-readable knowledge base. This is the direct ancestor rather than a distant cousin, and the lineage is traced in [LLM wikis and second brains](../approaches/llm-wikis.md).
- Personal knowledge tools like Obsidian and Notion, which already use hierarchical markdown with cross-links. A vault is most of a bundle already, and the seam is wikilink syntax.
- "Metadata as code" approaches that keep catalog metadata beside source rather than in a separate registry.

The difference is that OKF is *specified*: it pins down the small set of rules needed for interoperability without dictating tooling. v0.2's provenance and attestation layers move it closer to supply-chain attestation formats in intent, while staying plain markdown.

Because a concept is markdown plus YAML frontmatter, bundles already compose with Obsidian, Notion, MkDocs, Hugo, and Jekyll, which all speak that pairing.

# The guard for producers

OKF is for knowledge an agent reads. A README, a blog post or a design doc written for people is not a bundle, and converting one produces a document that serves neither audience. When an artifact's audience is unclear, ask before converting.

# Related

- [Design principles](design-principles.md) is the positive statement of the same boundaries.
- [OKF versus retrieval](../approaches/okf-versus-retrieval.md) covers the split with the closest neighbouring technique.
