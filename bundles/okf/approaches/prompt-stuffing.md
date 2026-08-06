---
type: Approach
title: Prompt stuffing
description: Pasting the document into the chat: instant, and it dies at scale.
tags: [approach, context, baseline]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
---

# What it is

Paste the schema, the policy, or the whole wiki page into the conversation and ask the question after it. The knowledge slice of [the context window](../context/context-window.md) is filled by hand.

# Where it wins

It works immediately, with no infrastructure and no format. For a one-off question against a document you already have open, nothing beats it, and it is the right first move when you are still learning what the agent is missing.

# Where it fails

- **It does not scale to the corpus.** Ten pages fit. Ten thousand do not.
- **It is per-person and per-session.** The paste helps you once. Nobody else benefits, and neither do you tomorrow.
- **It has no freshness signal.** You pasted whatever version you happened to have.
- **It crowds the window.** A full document spends the space the conversation needs.

# The lesson it carries forward

Stuffing is the honest baseline: it proves the knowledge, not the model, was the problem. The rest of the toolbox is variations on "do the paste automatically" ([retrieval](retrieval-augmented-generation.md)), "do the paste once for the whole team" ([briefing files](briefing-files.md)), or "let the agent do its own paste" ([tools and MCP](tools-and-mcp.md)).

# Related

- [Fine-tuning](fine-tuning.md) is the approach most often confused with this one, and it solves a different problem.

