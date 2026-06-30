---
type: API Reference
title: memo
description: Skips re-rendering a component when its props are unchanged.
resource: https://react.dev/reference/react/memo
tags: [react, performance, memoization, re-rendering]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`memo` lets you skip re-rendering a component when its props are unchanged.

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

The [React Compiler](/react-compiler/react-compiler.md) automatically applies the equivalent of `memo` to all components, reducing the need for manual memoization. Wrapping a component in `memo` returns a memoized version that usually does not re-render when its parent re-renders, as long as its props are unchanged. React may still re-render it: memoization is an optimization, not a guarantee.

## Parameters

- `Component`: The component to memoize. `memo` does not modify it but returns a new memoized component. Any valid React component is accepted, including functions and [forwardRef](/reference/react/legacy/forwardRef.md) components.
- `arePropsEqual` (optional): A function receiving the previous props and the new props. Return `true` if they are equal (same output and behavior), otherwise `false`. Usually omitted. By default React compares each prop with `Object.is`.

## Returns

A new React component. It behaves the same as the provided component, except React will not always re-render it when its parent re-renders unless its props change.

# Usage

- Skip re-rendering when props are unchanged by wrapping the component in `memo`. Keep rendering logic pure: same output for the same props, state, and context.

```js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});
```

- A memoized component still re-renders when its own state changes; memoization only concerns props from the parent.
- A memoized component still re-renders when a context it uses changes. To re-render only on part of a context, read the needed value in an outer component and pass it as a prop to a memoized child.
- Minimize props changes to get value from `memo`, since props are compared by shallow equality (`Object.is({}, {})` is `false`). Use [useMemo](/reference/react/hooks/useMemo.md) for object props, accept individual values instead of objects, or project to derived values that change less. For function props, declare them outside the component or cache them with [useCallback](/reference/react/hooks/useCallback.md).
- Specify a custom comparison function as the second argument when minimizing props changes is infeasible. Return `true` only if the new props would produce the same output.

```js
const Chart = memo(function Chart({ dataPoints }) { /* ... */ }, arePropsEqual);
```

- With [React Compiler](/react-compiler/react-compiler.md) enabled you typically no longer need `memo`, since the compiler optimizes re-rendering automatically and even memoizes intermediate values and computations.

# Should you add memo everywhere?

Memoization helps with granular interactions (such as a drawing editor moving shapes) and is usually unnecessary for coarse interactions (such as replacing a page). It is valuable only when a component re-renders often with the same props, its rendering is expensive, and there is perceptible lag. It is ineffective when props are always different or there is no perceptible lag. Prefer accepting JSX as children, keeping state local, keeping rendering pure, and avoiding unnecessary Effects, which often make memoization unnecessary.

# Caveats

- If you provide a custom `arePropsEqual`, you must compare every prop, including functions. Functions close over parent props and state, so returning `true` when `onClick` differs makes the component see stale props inside the handler.
- Avoid deep equality checks inside `arePropsEqual` unless the data structure has a known limited depth; deep checks can become very slow and freeze the app.
- `memo` is only a performance optimization. If your code does not work without it, fix the underlying problem first.
- A memoized component still re-renders when a prop is a freshly created object, array, or function, because shallow equality sees a new reference. Simplify or memoize those props in the parent.

# Citations
[1] [memo](https://react.dev/reference/react/memo)
