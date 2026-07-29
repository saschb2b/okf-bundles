---
type: Field Report
title: Production Experience
description: What adopting teams actually reported: the boring compounding wins, and the silent opt-out failure mode where components quietly stop being memoized.
resource: https://saschb2b.com/blog/react-compiler-year-in-review
tags: [react, react-compiler, production, case-study, debugging, silent-failure]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://saschb2b.com/blog/react-compiler-year-in-review
    title: "The React Compiler at Eighteen Months"
  - resource: https://react.dev/blog/2025/10/07/react-compiler-1
    title: "React Compiler v1.0"
  - resource: https://react.dev/learn/react-compiler/debugging
    title: "Debugging and Troubleshooting"
---

# The boring wins

The strongest signal from a year and a half of production adoption is how unremarkable it felt day to day. It just worked, and made everything quietly better. The recurring reports:

- **Fewer re-render bugs.** The class of bug where a forgotten dependency or an unstable callback causes a subtree to re-render on every keystroke largely stops appearing, because the compiler keeps references stable against their real inputs (see the [memoization model](memoization-model.md)).
- **Fewer "why is this slow" reports.** Performance regressions from missed memoization stop reaching the backlog, because the default is now memoized rather than un-memoized.
- **Smaller, more readable code.** Codebases stopped accumulating [`useMemo`](/reference/react/hooks/useMemo.md), [`useCallback`](/reference/react/hooks/useCallback.md), and [`memo`](/reference/react/apis/memo.md) scaffolding. Removing that boilerplate made components shorter and easier to maintain, and removed the review conversation about whether a given value needed memoizing.

The lasting legacy adopters point to is not a benchmark, it is a retired bug category: the dependency-tracking mistakes that manual memoization invited. By 2026 the guidance is that a hand-written `useMemo` should feel like a hand-written `for` loop in modern JavaScript, occasionally necessary, usually a historical artifact.

# The silent failures

The failure mode that actually cost teams time is not a crash, it is silence. When the compiler encounters a pattern it cannot compile soundly, it does not error, it skips that one component and keeps the rest optimized (the "skip, don't guess" stance from the [pipeline](how-it-works.md)). The component still works, it just quietly reverts to un-memoized behavior.

Why this is hard to debug:

- **There is no visible symptom.** The app is correct. It is only slower than it should be, and only for that component, so nothing points you at the cause.
- **Skips cascade.** Once a component bails, downstream lint findings on that same component may not surface. Fixing the upstream skip can reveal a second issue underneath, so cleanup is iterative, not one-shot.
- **Common triggers are subtle.** Mutating a value during render, reading a [ref](/reference/react/hooks/useRef.md) in the render body, a mutated counter inside a `.map()` lambda, or [unsupported syntax](/reference/eslint-plugin-react-hooks/lints/unsupported-syntax.md) inside an otherwise fine component are enough to bail it.

## How to detect a silent opt-out

- **React DevTools** shows a "Memo sparkle" badge on compiled components. A component you expected to be optimized that has no badge was skipped. This is currently the main signal, and it only tells you memoized-or-not, not why.
- **The ESLint plugin** flags most un-compilable patterns before they reach the compiler; run it in CI and treat its findings as the early warning system. See [linting for the compiler](linting.md).
- **The `logger` option** can emit compiler events (including bailouts) for tracking; see [logger](/reference/react-compiler/logger.md).
- **`"use no memo"` as a tracked metric.** Every explicit opt-out is a performance cliff. Teams treat the count of `"use no memo"` directives like `@ts-ignore` or `eslint-disable`: a legitimate codebase-health number to watch and drive toward zero, not a fire-and-forget escape hatch.

# The honest brownfield picture

New apps get the wins for free. Existing apps do the work: the compiler makes previously-hidden Rules of React violations visible, and each one is a small fix. The payoff is real but front-loaded, which is why adoption is best done incrementally rather than in one pass (see the [migration playbook](migration-playbook.md)).

# Related

- [Memoization model](memoization-model.md): why the boring wins happen.
- [Debugging](debugging.md): the workflow for isolating a compiler-related runtime issue.
- [Linting for the compiler](linting.md): catching silent opt-outs before they ship.
- [Adoption timeline](adoption-timeline.md): how these reports fit the two-year arc.
