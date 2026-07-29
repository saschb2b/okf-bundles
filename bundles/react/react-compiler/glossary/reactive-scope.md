---
type: Concept
title: Reactive Scope
description: The React Compiler's unit of memoization, a group of values created and mutated together plus the reactive inputs they depend on.
resource: https://github.com/facebook/react/blob/main/compiler/docs/DESIGN_GOALS.md
tags: [react, react-compiler, reactive-scope, memoization, dependencies, internals]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://github.com/facebook/react/blob/main/compiler/docs/DESIGN_GOALS.md
    title: "React Compiler design goals"
  - resource: https://github.com/facebook/react/blob/main/compiler/packages/babel-plugin-react-compiler/src/Entrypoint/Pipeline.ts
    title: "React Compiler pipeline (Pipeline.ts)"
---

# What it is

A reactive scope is the React Compiler's unit of memoization. It is a group of values that are created and mutated together, plus the reactive inputs those values depend on, called the scope's **dependencies**. Everything the compiler does after the [mutability analysis](mutability-model.md) is about finding these scopes, computing their dependencies, and emitting one guarded cache block per scope (see the [memoization model](../memoization-model.md)).

Inputs and outputs:

- **Dependencies (inputs):** the reactive values whose change forces the scope to recompute. A scope is recomputed only when a dependency differs from the previous render.
- **Memoized values (outputs):** the values the scope produces, cached and reused when the dependencies are unchanged.

# Why values are grouped

Two values that mutate each other, or one derived from another, must share a scope so they are always recomputed together and never left half-stale. If a derived object and the array it was built from were memoized separately with different dependencies, one could update while the other did not, producing an inconsistent pair. Grouping by the [aliasing and mutable-range analysis](mutability-model.md) prevents that.

# How scopes are formed

Over the [HIR](hir.md), the [pipeline](../how-it-works.md) runs, in order:

- `inferReactiveScopeVariables` groups values that create and mutate together into scopes.
- `alignReactiveScopesToBlockScopesHIR` aligns scope boundaries to block structure so a scope never straddles a branch unsafely.
- `mergeOverlappingReactiveScopesHIR` merges interleaved scopes.
- `flattenScopesWithHooksOrUseHIR` pulls hook calls out of scopes, because hooks must run every render and cannot sit inside a memoized block.
- `propagateScopeDependenciesHIR` computes each scope's precise dependency set from the dataflow.
- The `prune*` and `merge*` passes then drop scopes that would not pay off (values that never escape, values that always invalidate) and fuse scopes with identical dependencies to allocate fewer cache slots.

# How a scope maps to output

Each surviving scope becomes a guarded block in the generated code: a run of [cache slots](../memoization-model.md) holding the last-seen dependencies and the memoized outputs, guarded by a comparison of current dependencies against the cached ones. Because dependency lists are computed from dataflow rather than hand-written, the result is usually as precise or more precise than manual `useMemo`/`useCallback`, and it is why re-render cascades stop.

# Related

- [Memoization model](../memoization-model.md): how a scope becomes cache slots and why cascades stop.
- [HIR](hir.md): the representation scopes are inferred over.
- [Effect and mutability model](mutability-model.md): the analysis that decides which values share a scope.
- [How the compiler works](../how-it-works.md): the full pass sequence.
