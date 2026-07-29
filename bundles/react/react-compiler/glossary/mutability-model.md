---
type: Concept
title: Effect and Mutability Model
description: The React Compiler's per-instruction effect kinds, its aliasing analysis, mutable ranges, and the freeze point that makes automatic memoization sound.
resource: https://shapkarin.me/articles/drop-react-manual-memoization/
tags: [react, react-compiler, mutability, aliasing, effects, internals]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://shapkarin.me/articles/drop-react-manual-memoization/
    title: "The Mutability and Aliasing Model in React"
  - resource: https://github.com/facebook/react/blob/main/compiler/packages/babel-plugin-react-compiler/src/Entrypoint/Pipeline.ts
    title: "React Compiler pipeline (Pipeline.ts)"
  - resource: https://github.com/facebook/react/blob/main/compiler/docs/DESIGN_GOALS.md
    title: "React Compiler design goals"
---

# Why this exists

Automatic memoization is only safe if the compiler can prove a value has stopped changing before it caches it. The effect and mutability model is how it proves that. It is the analytical heart of the [pipeline](../how-it-works.md): the passes `inferMutationAliasingEffects`, `inferMutationAliasingRanges`, and `inferReactivePlaces` run this analysis over the [HIR](hir.md), and their output is what [reactive scope](reactive-scope.md) inference groups into memoization units.

# Effect kinds

`inferMutationAliasingEffects` labels every instruction with an effect describing how it touches each operand:

Read
: The instruction observes a value without changing it.

Store
: The instruction assigns into a binding.

Capture
: A value flows into another value, aliasing it, so the two now share underlying identity.

Mutate
: The instruction modifies a value in place.

Freeze
: The value is now treated as immutable, typically once it is passed to React as a prop, a child, or a hook argument.

# Aliasing and mutable ranges

From the `capture` effects the compiler builds an **aliasing model**: which values share underlying identity, so that mutating one is understood to affect the others. `inferMutationAliasingRanges` then collapses the per-instruction effects into a **mutable range** for each value: the span of instructions from the value's creation to the last point it, or anything aliased to it, may be mutated.

After a value's mutable range ends it is frozen, and only then is it safe to cache. Freezing at the boundary where a value enters React is what makes automatic memoization sound: the compiler caches only values it has proven stop changing. `inferReactivePlaces` marks which values are **reactive**, meaning they can differ between renders and therefore must be tracked as [scope dependencies](reactive-scope.md).

# Why this is where apps break

When an app relies on mutation during render, or on a value staying referentially stable for correctness rather than performance, this analysis is the part that either catches it (and bails the component) or is defeated by a Rules of React violation it could not see. That is why the common breaking patterns in [debugging](../debugging.md) are all mutability or referential-equality issues, and why the [immutability](/reference/eslint-plugin-react-hooks/lints/immutability.md) and [refs](/reference/eslint-plugin-react-hooks/lints/refs.md) lints matter most for the compiler.

# Related

- [How the compiler works](../how-it-works.md): where these passes sit in the sequence.
- [HIR](hir.md): the representation these effects annotate.
- [Reactive scope](reactive-scope.md): what consumes the mutable-range and reactivity output.
- [Linting for the compiler](../linting.md): the lints that flag violations of this model.
