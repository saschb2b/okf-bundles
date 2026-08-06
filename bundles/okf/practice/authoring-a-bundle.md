---
type: Playbook
title: Authoring a bundle
description: From empty directory to a validated bundle, and the bookkeeping that keeps it from rotting.
tags: [practice, authoring, producer, playbook]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification"
    last_modified: 2026-07-24
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "The okf skill, commands and implicit mode"
    author: human:sascha
    last_modified: 2026-08-05
---

# Create

1. Make the directory and a root `index.md` declaring `okf_version: "0.2"`. That frontmatter block is [the only permitted index frontmatter](../spec/index-file.md).
2. Decide the domain folders before writing concepts, because a folder is part of a [concept's identity](../spec/concept-id.md) and moving one later breaks inbound links.
3. Add a `log.md` with a dated Creation entry.

# Write one concept at a time

For each concept:

- [ ] Pick a descriptive [`type`](../spec/core-frontmatter.md), and use the same spelling for the same kind throughout.
- [ ] Fill `title` and a one-sentence `description`. Index generators and previews read them.
- [ ] Add `resource` if a canonical URI for the underlying asset exists.
- [ ] Record [`sources`](../trust/sources.md) with a real `resource` per entry, and an `id` for anything the body footnotes.
- [ ] Record [`generated`](../trust/generated-and-verified.md) with the actor that actually wrote the text.
- [ ] Body it with [structural markdown](../spec/body-conventions.md), picking the sharpest form per fact.
- [ ] Add [links](../spec/cross-linking.md) with the relationship in the surrounding prose.
- [ ] Leave `verified` out. It goes in only when someone actually checks.

# The bookkeeping, in the same change

Every edit to a concept carries four obligations. Doing them later is how bundles rot silently.

1. **Refresh `generated`**, both `by` and `at`, since the actor may differ from whoever wrote it last.
2. **Append a `log.md` entry**, dated today, newest first.
3. **Regenerate the affected [`index.md`](../spec/index-file.md)**, both the area listing and the root.
4. **Add the cross-links the change implies**, in both directions where the relationship is mutual.

One more, easy to miss: if you materially change a concept that carried a [`verified`](../trust/generated-and-verified.md) event, drop that event. It vouches for text nobody has now checked.

# Validate as you go

Run [the checker](validation.md) after each slice, not at the end. A conformance error found after forty concepts is forty files to revisit.

# Know when you are done

Conformance is not coverage. Before calling an export finished, check that every discovered section is covered, that concepts have real depth rather than stub summaries, that every load-bearing name the source mentions but never explains has its own linked concept, that [the graph is connected](graph-hygiene.md), and that any crawl boundary is recorded in [the log](../spec/log-file.md).

A bundle stops where that gate says, not where the source's own explanations ran out.

# Related

- [Consuming a bundle](consuming-a-bundle.md) is the other side of the contract.
- [External references](external-references.md) covers pulling a webpage into the bundle.
- [The okf skill](../ecosystem/okf-skill.md) automates this procedure as commands.
