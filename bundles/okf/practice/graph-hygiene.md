---
type: Playbook
title: Graph hygiene
description: No orphans, no concept-to-index links, and the difference between a valid bundle and a navigable one.
tags: [practice, graph, links, quality]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "The okf skill: connectivity warnings and the --strict producer gate"
    author: human:sascha
    last_modified: 2026-08-05
---

# Two defects a file checker misses

`Concept-to-index links`
: A concept linking to an `index.md`. The file exists, so nothing errors, and to a graph consumer it is a dangling edge, because [an index is navigation and not a node](/spec/index-file.md). Point at the section's landing concept instead, or at a representative concept.

`Orphans`
: A concept with no concept-to-concept link in or out. It is invisible to traversal. It exists, it validates, and no agent walking the graph will ever reach it.

Both are reported as warnings by the default checker run and gated by `--strict`. See [validation](/practice/validation.md).

# Finding them

```sh
# concept-to-index links (ignore hits inside index.md files)
grep -rn --include='*.md' -e '](.*index\.md' bundles/<bundle>

# a concept with no outbound bundle-absolute link is a candidate orphan
grep -Lr --include='*.md' -e '](/' bundles/<bundle>
```

An orphan needs an edge in either direction. Either weave a link into the prose of a related concept, or give the orphan a `# Related` section that points outward. Prefer weaving it into prose, because that carries the relationship; a `# Related` list is the fallback when no sentence needs it.

# The exception: bulk corpora

A bundle that is a bulk, index-navigable corpus, one concept per record reached through an index tree by id, date or norm, is exempt from the no-orphans expectation. Its leaf records are legitimately reached through the index, and its overview points at the index roots. A corpus of sixty thousand court decisions is the canonical case.

The exemption is for corpora only. A curated bundle, one concept per idea, must be fully graph-clean.

# Why this is worth enforcing

A conformant bundle can still be unusable. Validation proves each file is well-formed. Connectivity proves the bundle is a graph rather than a pile of well-formed files, which is the property that made [traversal](/spec/cross-linking.md) the answer to [retrieval's third failure](/approaches/retrieval-failure-modes.md) in the first place.

# Related

- [Cross-linking](/spec/cross-linking.md) is the format rule behind this discipline.
- [Authoring a bundle](/practice/authoring-a-bundle.md) folds it into the per-change bookkeeping.
