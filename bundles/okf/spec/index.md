# The format

OKF v0.2, worked through. Where any concept here and the [upstream specification](../references/okf-spec-v02.md) disagree, the specification wins.

# Structure

- [The bundle](bundle.md) - A self-contained directory of markdown files, and OKF's unit of distribution.
- [The concept document](concept-document.md) - One markdown file, one unit of knowledge: YAML frontmatter plus a free-form body.
- [Concept ID](concept-id.md) - A concept's identity is its path inside the bundle with the .md suffix removed.

# Fields and body

- [Core frontmatter fields](core-frontmatter.md) - type, title, description, resource and tags: the cover sheet a consumer scans before opening the body.
- [Body conventions](body-conventions.md) - Conventional headings, why structure beats prose, and picking the sharpest markdown form for a fact.
- [Extensions and unknown keys](extensions.md) - Producers may add any frontmatter key, and consumers preserve what they do not understand.

# Navigation and the graph

- [Cross-linking](cross-linking.md) - Ordinary markdown links make a bundle a graph, and the prose around the link says what the relationship is.
- [The index file](index-file.md) - index.md is a directory listing for progressive disclosure, carries no frontmatter, and is never a concept.
- [The log file](log-file.md) - log.md gives a knowledge base a changelog: dated entries, newest first, in ISO 8601.

# Rules and scope

- [Conformance](conformance.md) - The one hard rule, the consumer's tolerance contract, and why the bar is deliberately low.
- [Versioning](versioning.md) - okf_version in the root index, what a major and a minor bump mean, and what v0.2 defers.
- [Design principles](design-principles.md) - Minimal opinion, producer and consumer independence, format rather than platform, and trust as data.
- [Non-goals](non-goals.md) - What OKF deliberately does not do, and how it relates to formats that already exist.

# Next

- [The trust layer](../trust/) - What v0.2 added, and why.
