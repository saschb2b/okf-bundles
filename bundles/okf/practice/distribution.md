---
type: Practice
title: Distribution
description: A bundle is a directory, so it ships however files ship: a git repo, an archive, or a folder in the repo it documents.
tags: [practice, distribution, git, shipping]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, distribution"
    last_modified: 2026-07-24
---

# Three ways, all boring

`A git repository`
: The recommended home, because it versions the knowledge alongside the code it describes.

`An archive`
: A tarball or zip. No git, no history, so put anything a reader needs to know about coverage in [`log.md`](../spec/log-file.md).

`A subdirectory inside a larger repo`
: `docs/knowledge/`, or a folder next to the service it documents. The knowledge moves with the code it is about.

OKF has no installer and no package manager. OKF has no standard install command, so a bundle is something you clone or point an agent at. A community directory now indexes published bundles and exposes a JSON API and an MCP server, which makes bundles discoverable without making them installable. See [community tools](../ecosystem/community-tools.md).

# What git gives the knowledge

Putting a bundle in version control transfers properties the knowledge did not have as a wiki page:

- **Review.** A change to the revenue definition arrives as a pull request, with a diff a person can read.
- **Blame.** `git blame` says who changed the caveat and when, independently of what the [frontmatter](../trust/generated-and-verified.md) claims.
- **Atomicity.** The concept, its links, and its log entry land in one commit.
- **Rollback.** A bad definition is one revert away.

This is also the argument for keeping the bundle next to the code rather than in a separate knowledge repo: the schema change and the concept describing it can be the same pull request.

# Serving it

A folder on disk is already consumable. Beyond that, the same bundle can be served by an MCP server, indexed by a search system, or rendered by a viewer, without a change to the files. See [format versus protocol](../approaches/format-versus-protocol.md), and [OKF Studio](../ecosystem/okf-studio.md) for a reader.

# Announce it where agents look

If the bundle documents something public, add a line to your `llms.txt` pointing at the bundle root. See [how OKF stacks with llms.txt and sitemap.xml](../ecosystem/llms-txt-and-sitemap.md).

# Related

- [The bundle](../spec/bundle.md) is what gets shipped.
- [The adoption path](adoption-path.md) starts by putting five files in a repo.
