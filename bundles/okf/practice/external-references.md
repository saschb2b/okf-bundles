---
type: Playbook
title: External references
description: Pulling a webpage or a doc into a bundle as a Reference concept that stands alone offline.
tags: [practice, references, sources, authoring]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "The okf skill: external material and the references/ convention"
    author: human:sascha
    last_modified: 2026-08-05
---

# The convention

External material a bundle depends on becomes an ordinary concept under `references/<slug>.md`, with `type: Reference` and the live URL in [`resource`](/spec/core-frontmatter.md), plus a dated [`generated`](/trust/generated-and-verified.md).

The [`sources`](/trust/sources.md) entry of a concept that uses it then points at the local path rather than the URL, so the citation resolves inside the bundle.

# Absorb the substance

A reference concept must stand alone offline. Extract the material into the body so the concept answers the question without a network call. `resource` is provenance for re-checking, not a replacement for the knowledge.

A summary that defers to the live link is a stub. "See the GA4 export schema for details" tells an agent nothing it could not have guessed, and it fails exactly when the link rots, which is the case the reference exists for.

# Summarize, do not paste

Absorb the substance, and do not mirror a third party's full text. Two reasons, and they point the same way:

- **Copyright.** Most documentation, commentary, and paid literature is protected. Reproducing it wholesale is a licensing problem regardless of how useful it would be.
- **Value.** A restructured summary keyed to your bundle's vocabulary is more useful to an agent than a verbatim copy, and it is the part that survives the source changing its layout.

Public-domain material is the exception worth knowing: official texts such as statutes and court decisions can be reproduced, so a legal bundle may carry a verbatim official headnote where a docs bundle may not carry a vendor's page.

# Keep the reference honest

- Record `last_modified` on the source when the page states one. It is the recency signal a consumer weighs.
- Set [`stale_after`](/trust/lifecycle.md) when the source has a known review cadence.
- Re-check the URL when you touch the concept, and note a dead link in [`log.md`](/spec/log-file.md) rather than leaving it silently broken.

# Related

- [Sources](/trust/sources.md) is where a reference gets cited from.
- [Authoring a bundle](/practice/authoring-a-bundle.md) covers the surrounding procedure.
