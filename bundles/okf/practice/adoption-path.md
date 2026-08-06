---
type: Playbook
title: The adoption path
description: What to do on Monday: one question, five files, in the repo. No migration project.
tags: [practice, adoption, getting-started]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
---

# Three steps

**01. Pick one question your agent keeps getting wrong.** The one that costs a person an hour of re-explaining every week. Not the most important knowledge in the company, the most repeatedly missing.

**02. Write the five files that answer it.** [Frontmatter with a `type`](../spec/conformance.md), a body, and [links between them](../spec/cross-linking.md). That is a conformant bundle. The five files are usually the definition, the policy behind it, the table or system it reads, the sanctioned query, and the caveat everyone forgets. [Your first bundle](first-bundle.md) is those five files written out, in a copyable example that validates.

**03. Put it in the repo next to the code.** Now it gets reviewed, diffed, and blamed like everything else you trust. See [distribution](distribution.md).

# The one rule while you do it

Never write [`verified`](../trust/generated-and-verified.md) unless a person actually checked. That field is the only thing holding the whole trust layer up, and the first bundle is where the habit is set.

# Why this is not a migration

Nothing has to move. The wiki stays, [retrieval](../approaches/okf-versus-retrieval.md) stays, the briefing file stays. You are adding a small, correct core for the knowledge that must be right, and leaving the long tail where it is.

The first bundle also costs almost nothing to abandon. Five markdown files in a repo have no infrastructure to decommission, which is the honest reason to start small rather than an encouraging one.

# What to do second

- Add [`sources`](../trust/sources.md) once you notice yourself asking "where did that come from?"
- Add [`status: deprecated`](../trust/lifecycle.md) the first time an old definition gets served by mistake.
- Add [`verified`](../trust/generated-and-verified.md) when an answer needs to be gated on review.
- Add an [Attested Computation](../trust/attested-computation.md) when a number needs to be defensible.

Each is a field, added when the pain arrives, and none invalidates what you already wrote.

# Related

- [Authoring a bundle](authoring-a-bundle.md) is the fuller procedure.
- [Briefing files](../approaches/briefing-files.md) is probably where you are starting from.
- [The okf skill](../ecosystem/okf-skill.md) does the bookkeeping if your agent has it.

