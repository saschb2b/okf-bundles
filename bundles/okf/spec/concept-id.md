---
type: Spec Element
title: Concept ID
description: A concept's identity is its path inside the bundle with the .md suffix removed.
tags: [spec, identity, path]
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, sections 2 and 6"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# The rule

A concept's identity is its file path within the bundle, with the `.md` suffix removed.[^spec] So `tables/users.md` has Concept ID `tables/users`.

OKF defines no id field, no UUID, and no registry. The filesystem is the identifier space.

# What follows from it

- **Renaming a file changes the concept's identity.** Inbound links break, and a consumer sees a new concept rather than a moved one. Treat a rename the way you would treat a URL change.
- **The path is the only namespace.** Two concepts cannot share a path, so uniqueness is enforced by the filesystem rather than by a checker.
- **Identity is bundle-local.** `tables/users` means one thing in this bundle and something else in another. Cross-bundle references are ordinary URLs, not concept IDs.
- **Directory choice is a naming decision.** Moving `revenue.md` from `metrics/` to `finance/` is a rename. Pick the grouping before you accumulate inbound links.

# Practical naming

Use lowercase, hyphen-separated filenames that read as the concept's name: `revenue-recognition.md`, `proof-of-stake.md`. Keep `title` in the frontmatter for display, so the filename can stay stable while the display name changes.

Never name a concept `index.md` or `log.md`. Those are [reserved](/spec/bundle.md), and a checker will treat any other `.md` file as a concept and fail it for a missing `type`.

# Related

- [Cross-linking](/spec/cross-linking.md) explains why bundle-absolute links survive a move better than relative ones.
- [The bundle](/spec/bundle.md) is the space these IDs live in.

[^spec]: OKF v0.2 specification, sections 2 and 6.
