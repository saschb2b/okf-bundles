---
type: Ticket Smell
title: The Tapper
description: A ticket written by one expert in such terse, context-free, solution-dictating terms that whoever picks it up cannot tell what done means and runs in circles.
tags: [ticket-smell, clarity, acceptance-criteria, shared-understanding]
timestamp: 2026-06-18T11:30:00Z
---

# What it is

Named for the tapper-and-listener study: the author "hears the whole song" (the full plan and reason) but taps out only fragments (a solution, some jargon). The reader hears disconnected knocks. The ticket names an implementation and deletes the problem.

# Why it happens

The [curse of knowledge](/concepts/curse-of-knowledge.md): once you know something you cannot reconstruct not knowing it, so you write as if the reader already shares your hidden context.

# The tell (detect before pulling)

- No "so that", no stated value: a build with no reason.
- Solution dictated, problem absent ("add a Redis TTL", "memoize the selector").
- No acceptance criteria, or vague ones ("fast", "clean", "user friendly").
- Dense in-group jargon (internal codenames, event names, file references) with no expansion.
- One author, zero discussion: no questions, no testing perspective on the thread.

# The fix

- State the user value (the "so that"); it often reveals a better solution.
- Write testable acceptance criteria, for example in Given / When / Then form.
- Build shared understanding before "ready" via [Three Amigos](/techniques/three-amigos.md) and [Example Mapping](/techniques/example-mapping.md). A pile of open-question cards means too much is still in one head.

# Example

Cursed:

```text
TITLE: Add Redis TTL to user-profile resolver
Set a 300s TTL on the profile resolver cache key. Use cacheWrap. Bust on PROFILE_UPDATED.
```

Cured: state the slow-profile problem, the "so that", and acceptance criteria covering a cache hit, immediate freshness after an edit, and a graceful miss. Note the implementation as one option, not the requirement.

# Citations

[1] [The Curse of Knowledge (Harvard Business Review)](https://hbr.org/2006/12/the-curse-of-knowledge)
[2] [Made to Stick, Introduction (Heath Brothers)](https://heathbrothers.com/made-to-stick-introduction/)
[3] [Short Answers About User Stories (Mike Cohn)](https://www.mountaingoatsoftware.com/blog/short-answers-to-your-big-questions-about-user-stories)
[4] [Introducing Example Mapping (Matt Wynne)](https://cucumber.io/blog/bdd/example-mapping-introduction/)
