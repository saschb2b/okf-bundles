---
type: Practice
title: Progressive disclosure
description: Reading the table of contents before the content, so a large bundle fits a small context window.
tags: [practice, navigation, index, context]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 8"
    last_modified: 2026-07-24
---

# The idea

An agent should be able to see what exists before opening anything. [`index.md`](../spec/index-file.md) at every level gives it a curated listing with one-sentence descriptions, so it can decide where to descend without reading the tree.

The cost of finding the right concept becomes one index read per level, rather than a full-corpus scan. That is what makes a bundle of sixty thousand files usable inside [a finite context window](../context/context-window.md).

# What a good index entry does

Carry the linked concept's `description` verbatim. The entry has one job: let a reader rule the concept in or out without opening it. A listing of bare filenames forces the agent to open files to find out what they are, which defeats the point.

```markdown
# Provenance
* [sources](../trust/sources.md) - What a concept derives from, with per-source credibility signals.
* [generated and verified](../trust/generated-and-verified.md) - Who wrote it and who confirmed it.

# Subdirectories
* [Practice](practice/) - Authoring, consuming, validating, shipping.
```

Each line rules the concept in or out. A reader chasing "who signed this off?" descends into [generated and verified](../trust/generated-and-verified.md) and never opens the other file.

# The two-layer effect

Progressive disclosure and [traversal](../spec/cross-linking.md) do different jobs and compose:

- The index answers "where do I start?"
- The links answer "what next?"

The same pattern shows up outside OKF. [Agent skills](../approaches/skills-and-procedures.md) load a name and a description at startup and the full instructions only when a task matches, which is this idea applied to procedure instead of knowledge.

Once an agent is on the right landing concept, it stops using the index and follows edges. An index that tries to list every concept in the bundle at the root defeats the first job without helping the second.

# Keep it current

An index that lags the directory is worse than none, because it asserts a listing a consumer will believe. Regenerating the affected index is part of [the bookkeeping](authoring-a-bundle.md) for every change that adds or renames a concept.

# Related

- [The index file](../spec/index-file.md) is the format.
- [Consuming a bundle](consuming-a-bundle.md) is the loop that uses it.
