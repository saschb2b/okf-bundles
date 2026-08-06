---
type: Approach
title: Knowledge graphs and ontologies
description: "\"Why not RDF?\" The older answer to the same problem, and why OKF refuses typed edges on purpose."
tags: [approach, rdf, ontology, knowledge-graph, semantic-web]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T14:00:00Z
sources:
  - id: rdf-primer
    resource: https://www.w3.org/TR/rdf11-primer/
    title: "RDF 1.1 Primer (W3C Working Group Note, 24 June 2014)"
    last_modified: 2014-06-24
---

# The older answer

The semantic web solved "make meaning machine-readable" two decades ago. RDF expresses information as triples of subject, predicate, and object, where each statement asserts a relationship between two resources. Vocabularies such as RDF Schema and OWL then define classes, properties, and domain and range restrictions, giving the data formal semantics an engine can reason over.[^rdf-primer]

That is strictly more powerful than what OKF does. A markdown link asserts that two concepts are related and leaves the kind of relation to the surrounding prose. A triple names the relation, and an ontology constrains what relations are legal.

# Why OKF gives that up

Three costs, and they all land before the first useful fact is written.

`Agreement up front`
: An ontology has to be agreed before anyone can publish. That is a committee, and the committee is where these projects stall. OKF's [conformance bar](../spec/conformance.md) is one field precisely so that publishing needs no negotiation.

`Authoring cost`
: A person who knows the revenue rule can write a paragraph. Expressing the same rule as well-formed triples against an approved vocabulary is a specialist skill, so the people with the knowledge stop being the people who can record it.

`The consumer changed`
: A triple store exists so a machine that cannot read prose can traverse meaning. A language model reads prose natively. The expensive formalization buys much less than it did, because the reader improved.

The design choice is stated directly: [a link is the edge and the prose is the label](../spec/cross-linking.md). No graph database, no schema registry, no ontology to agree on.

# What that costs, honestly

Real things are given up, and pretending otherwise would be dishonest:

- **No inference.** Nothing derives that if A supersedes B and B supersedes C then A supersedes C. A reader works it out, or nobody does.
- **No query language.** There is no SPARQL over a bundle. You grep, or you traverse, or you build an index yourself.
- **No edge types to filter on.** "Show every deprecation edge" is not a query a bundle answers. Frontmatter is filterable, [and links are not](../spec/cross-linking.md).
- **Ambiguity is tolerated.** Two concepts can describe the same thing under different names, and no reasoner objects.

# When to reach for a real graph

Use a graph database when the edges are the data and there are millions of them: fraud rings, supply chains, network topology, entity resolution across large populations. Traversal at that scale is a query problem, not a reading problem, and markdown is the wrong tool.

Use a bundle when the edges number in the hundreds, each one is a judgement someone made on purpose, and the consumer is a model that will read the prose around them.

The two also stack. A bundle can describe a graph, and [`resource`](../spec/core-frontmatter.md) can point at the ontology or the endpoint. OKF explicitly [does not subsume domain schemas](../spec/non-goals.md), so referencing an existing model beats restating it.

# GraphRAG and the middle ground

Building a graph out of a corpus with a model, then retrieving over it, sits between the two. It fixes [retrieval's missing relationships](retrieval-failure-modes.md) without asking anyone to author an ontology, and it inherits the accountability gap: the extracted edges have no author, no review, and no expiry. An OKF bundle is the opposite trade, fewer edges, each one authored and attributable.

# The community is pushing back on this

The typed-edge question is the most contested item in the OKF tracker, and it did not converge on an ontology. Three independent production implementations landed on registering exactly two edges, a lifecycle one, and a conflict one, with query-time semantics attached. See [open questions](../ecosystem/open-questions.md). If that lands, OKF gains a narrow, bounded piece of what this concept says it gives up, and still declines the general case.

# Related

- [Format versus protocol](format-versus-protocol.md) covers the other "isn't this solved already?" question.
- [Design principles](../spec/design-principles.md) explains the minimal-opinion stance this concept is an application of.

[^rdf-primer]: RDF 1.1 Primer (W3C Working Group Note, 24 June 2014).
