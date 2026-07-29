---
type: Explainer
title: Memoization Model and the Cache Runtime
description: What React Compiler emits, how the per-component memo cache and the _c hook work, why the output is more granular than manual memoization, and why re-render cascades stop.
resource: https://react.dev/learn/react-compiler/installation
tags: [react, react-compiler, memoization, re-renders, compiler-runtime, useMemoCache]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://react.dev/learn/react-compiler/installation
    title: "Installation"
  - resource: https://react.dev/blog/2025/10/07/react-compiler-1
    title: "React Compiler v1.0"
  - resource: https://github.com/facebook/react/blob/main/compiler/docs/DESIGN_GOALS.md
    title: "React Compiler design goals"
---

# The unit of memoization: reactive scopes

The compiler's [pipeline](how-it-works.md) groups values into [reactive scopes](glossary/reactive-scope.md), each with a computed list of reactive dependencies (the inputs that can change between renders) and one or more cached outputs. Code generation turns every scope into a guarded block: compare the current dependencies against the cached ones, reuse the cached output if they match, otherwise recompute and store. This is exactly what a hand-written [`useMemo`](/reference/react/hooks/useMemo.md) does, except the compiler infers the dependency list from dataflow instead of trusting a hand-written array, and it does it for every scope in the function.

# The cache: `_c` and the slot array

Compiled output opens with a fixed-size cache array allocated per component instance:

```js
import { c as _c } from "react/compiler-runtime";

export default function MyApp() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div>Hello World</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}
```

The mechanics:

- `_c(n)` allocates `n` cache slots for this component. `_c` is React's memo cache hook (historically `useMemoCache`). It is built into React 19, so the compiler targets React 19 by default. For React 17 and 18 it is imported from `react-compiler-runtime`; see [target](/reference/react-compiler/target.md).
- `$` is the flat slot array, persisted across renders like any hook state. Slots start as the sentinel `Symbol.for("react.memo_cache_sentinel")`, which means "not yet computed."
- Each reactive scope claims a contiguous run of slots: some hold the dependency values captured last render, the rest hold the memoized outputs. On each render the guard compares dependencies to their cached copies; a match reuses the output slot, a mismatch recomputes and rewrites both.

A dependency-guarded scope looks like this:

```js
function Profile({ user }) {
  const $ = _c(2);
  let greeting;
  if ($[0] !== user.name) {          // dependency changed?
    greeting = `Hello, ${user.name}`; // recompute
    $[0] = user.name;                 // store new dep
    $[1] = greeting;                  // store new output
  } else {
    greeting = $[1];                  // reuse cached output
  }
  return <h1>{greeting}</h1>;
}
```

# A worked before and after

This component derives a value, builds a callback, and renders a child:

```js
function SearchRow({ query, onSelect }) {
  const label = query.trim().toUpperCase();
  const handleClick = () => onSelect(query);
  return <Row label={label} onClick={handleClick} />;
}
```

The compiler emits three independently guarded scopes over a six-slot cache. `label` recomputes only when `query` changes; `handleClick` is rebuilt only when `query` or `onSelect` changes; the `<Row>` element is rebuilt only when `label` or `handleClick` actually changed reference:

```js
import { c as _c } from "react/compiler-runtime";

function SearchRow({ query, onSelect }) {
  const $ = _c(6);
  let label;
  if ($[0] !== query) {
    label = query.trim().toUpperCase();
    $[0] = query;
    $[1] = label;
  } else {
    label = $[1];
  }
  let handleClick;
  if ($[2] !== query || $[3] !== onSelect) {
    handleClick = () => onSelect(query);
    $[2] = query;
    $[3] = onSelect;
    $[4] = handleClick;
  } else {
    handleClick = $[4];
  }
  let t0;
  if ($[5] !== label || /* handleClick tracked above */ false) {
    t0 = <Row label={label} onClick={handleClick} />;
    $[5] = label;
  } else {
    t0 = $[5];
  }
  return t0;
}
```

The exact slot layout is illustrative, but the shape is real: separate dependency guards, separate output slots, and a stable `handleClick` reference so `Row` does not re-render when only some unrelated parent state changed. Writing this by hand is a `useMemo` plus a `useCallback` plus a `memo` on `Row`, each with a dependency array you must keep correct.

# Why it is more granular than manual memoization

`memo` caches a whole component, and one `useMemo` caches one value against one hand-written dependency array. The compiler instead assigns independent scopes to independent sub-expressions of the same component, each with its own minimal dependency set. A value that depends only on `props.a` recomputes only when `a` changes, even if `props.b` changed on the same render. Getting the same precision by hand means threading many `useMemo` and `useCallback` calls with exactly-right dependency arrays, which is the tedious, bug-prone work the compiler removes.

Crucially, the compiler caches JSX element objects too. `<Child value={x} />` evaluates to an object; when `x` is unchanged, the compiler returns the same cached element by reference.

# Why re-render cascades stop

React re-renders a child when its props are not referentially equal to last render's props. The classic failure is a parent that recreates a callback or object literal every render, so every child sees a "new" prop and re-renders even though nothing meaningful changed. The canonical case: a list where the parent's row callback is unstable, so a keystroke in one field re-renders every row and cost scales with list size.

Because the compiler memoizes those callbacks, objects, and JSX elements against their real dependencies, the references stay stable across renders where their inputs did not change. Children then receive identical props by reference and skip re-rendering through React's normal bail-out. The cascade does not scale with the subtree size anymore; it is bounded to the components whose inputs actually changed. This is the "bounding re-renders" design goal made concrete, and it is the boring, compounding win teams report (see [production experience](production-experience.md)).

Note the compiler does not add `memo` around your children; it makes the props feeding them stable so React's existing referential-equality bail-outs fire. Correctness still depends on children not relying on always-fresh references, which is where memoization-for-correctness bugs come from (see [debugging](debugging.md)).

# Cost model

The only runtime footprint is the slot array: memory proportional to the number of memoized values per component instance, plus a cheap dependency comparison per scope per render. There is no analysis at runtime; all the reasoning happened at build time in the [pipeline](how-it-works.md).

# Related

- [Reactive scope](glossary/reactive-scope.md): the definition of the unit these slots encode.
- [How the compiler works](how-it-works.md): the passes that produce these scopes and slots.
- [Installation](installation.md): confirming the `_c` output appears in your build.
- [target](/reference/react-compiler/target.md): where `_c` comes from for React 17, 18, and 19.
- [useMemo](/reference/react/hooks/useMemo.md) and [useCallback](/reference/react/hooks/useCallback.md): the manual equivalents the compiler still honors as escape hatches.
