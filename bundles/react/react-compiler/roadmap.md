---
type: Outlook
title: Roadmap and Directional Signals
description: Where the React Compiler is heading after 1.0, based on React Team signals: finer-grained control, compiler-aware Server Components, DevTools visibility, React Native priority, and non-Babel backends.
resource: https://react.dev/blog/2025/10/07/react-compiler-1
tags: [react, react-compiler, roadmap, outlook, server-components, devtools]
timestamp: 2026-07-24T12:00:00Z
---

# How to read this

These are directional signals from the React Team and the community as of mid 2026, not committed features or dated promises. Pieces are still missing and things are in motion. Treat each as "the stated direction," and verify against the [React Compiler Working Group](https://github.com/reactwg/react-compiler) before depending on it.

# Finer-grained control

Today the levers are coarse: [`compilationMode`](/reference/react-compiler/compilationMode.md) (`infer`, `annotation`, `syntax`, `all`) and the per-function directives [`use memo`](/reference/react-compiler/directives/use-memo.md) and [`use no memo`](/reference/react-compiler/directives/use-no-memo.md). The signaled direction is per-component hints for how aggressively or conservatively to compile, moving beyond a single on/off/annotation switch, so teams can tune behavior without falling back to the all-or-nothing opt-out.

# Compiler-aware Server Components

Expected to be the biggest real-app performance lever still on the table. The direction is a compiler that understands [Server Components](/reference/rsc/server-components.md): reducing hydration cost and tightening serialization boundaries so values the compiler can prove the browser does not need are not shipped across the wire. This is where the largest wins for real applications are anticipated, precisely because it attacks payload and hydration rather than just re-render frequency.

# Better DevTools visibility

The current tooling gap adopters feel most. React DevTools shows only whether a component was memoized (the "Memo sparkle"), not what the compiler did or why it skipped something. The wanted artifact is a DevTools panel showing per-component compiler decisions and their reasoning, a parallel to the RSC tree visualizer. There is no public roadmap for it, and a community plugin may well precede an official one. Until then the [ESLint plugin](linting.md) and the [`logger`](/reference/react-compiler/logger.md) option are the only windows into compiler decisions, which is why silent opt-outs are hard to spot (see [production experience](production-experience.md)).

# React Native priority

Auto-memoization is arguably higher-impact on native than on web, because native view diffing is more expensive than DOM reconciliation, so avoided re-renders save more. Expo shipped compiler support (on by default in SDK 54+), and parity pressure on React Native itself is growing.

# Non-Babel backends and the Rust port

The endpoint here is no longer just "invoke the TypeScript compiler without Babel." The React team has an official [Rust port](rust-port.md) of the compiler (merged June 2026, still experimental), reusing the same HIR and passes but running natively inside the Rust bundlers. `swc` has migrated to it, `oxc` vendors it, and Rspack ships native support, so the direction is a faster compiler that drops into those toolchains without a Babel pass at all. See the [Rust port](rust-port.md) for status, performance, and caveats.

# A convergence to watch

The stable-event-callback idea (a primitive that reads the latest state without being a reactive dependency, in the lineage of [`useEffectEvent`](/reference/react/hooks/useEffectEvent.md)) becomes more tractable once the compiler's purity analysis can verify the semantics. The long-standing tension there is expected to resolve in some form now that the compiler can reason about which reads are safe.

# Related

- [Adoption timeline](adoption-timeline.md): the arc that led here.
- [Production experience](production-experience.md): the DevTools and silent-opt-out gaps this roadmap addresses.
- [How the compiler works](how-it-works.md): the analysis that makes several of these directions feasible.
- [Migration playbook](migration-playbook.md): what to do now, given the roadmap is unfinished.

# Citations

[1] [React Compiler v1.0](https://react.dev/blog/2025/10/07/react-compiler-1)
[2] [The React Compiler at Eighteen Months](https://saschb2b.com/blog/react-compiler-year-in-review)
[3] [React Compiler Working Group](https://github.com/reactwg/react-compiler)
