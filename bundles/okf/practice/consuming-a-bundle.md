---
type: Playbook
title: Consuming a bundle
description: How a well-behaved agent reads a bundle: start at the index, traverse links, filter on trust, tolerate absence.
tags: [practice, consumer, retrieval, playbook]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, sections 8 and 11"
    last_modified: 2026-07-24
---

# The loop

1. **Start at the bundle-root `index.md`.** Read what exists before opening anything. That is [progressive disclosure](progressive-disclosure.md).
2. **Descend only the branches the question needs.** A bundle of ten thousand concepts costs one index read plus the path you actually walk.
3. **Open the landing concept, then follow its links.** The [edges](../spec/cross-linking.md) are the map: metric, then policy, then table, then computation.
4. **Filter on frontmatter before spending tokens on a body.** Skip `status: deprecated`. Warn on `stale_after` in the past. Check the [trust tier](../trust/trust-tiers.md) against what the answer is for.
5. **Gate any number** through its [attested computation](../trust/attested-computation.md), and refuse a failing verdict rather than dropping it silently.
6. **Tolerate anything missing.** The only hard guarantee is that every concept declares a `type`.

# The tolerance contract, restated for implementers

Do not reject a bundle for a missing optional field, an unknown `type`, an unknown key, a broken link, or a missing index. Treat a bare `verified` mapping as a one-element list. Preserve keys you do not understand when round-tripping. Attempt best-effort consumption of a version you do not know. See [conformance](../spec/conformance.md).

Forgiveness is the consumer's half of the contract, and it is what makes a partial or in-progress bundle useful instead of broken.

# Report the route

An answer assembled from a bundle can say which concepts it used, in which order, and which it skipped and why. That receipt is cheap here and impossible with [chunk retrieval](../approaches/retrieval-failure-modes.md), because the file paths are stable identities rather than embedding offsets.

Surface at least: the concepts read, the trust tier of each, and any concept excluded for being deprecated or stale. A user who can see that the answer skipped a deprecated definition can trust it for a different reason than "it sounded right".

# When the bundle does not answer

Abstain and say what was missing. A bundle is a curated core, so a question outside it should fall through to [retrieval](../approaches/okf-versus-retrieval.md) or to a person, not be improvised from adjacent concepts. Improvising against a curated bundle is worse than improvising against nothing, because the answer inherits unearned authority.

# Related

- [Authoring a bundle](authoring-a-bundle.md) is the producer's side.
- [Context assembly](../context/context-assembly.md) is what this loop implements.
