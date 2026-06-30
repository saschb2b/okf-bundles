---
type: Guide
title: Referencing Values with Refs
description: Use refs to let a component remember information without triggering re-renders, and how refs differ from state.
resource: https://react.dev/learn/referencing-values-with-refs
tags: [react, refs, useRef, state]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

When you want a component to remember some information but you do not want that information to trigger new renders, use a ref. A ref is a plain JavaScript object with a single mutable `current` property, created with the [useRef](/reference/react/hooks/useRef.md) Hook. Like state, refs are retained between re-renders. Unlike state, setting a ref does not re-render the component. Treat refs as an escape hatch you reach for rarely.

# Adding a ref to your component

Import and call `useRef`, passing the initial value as the only argument. It returns an object whose `current` property holds the value you can read and write.

```js
import { useRef } from 'react';

const ref = useRef(0); // returns { current: 0 }

function handleClick() {
  ref.current = ref.current + 1; // mutate directly, no setter, no re-render
}
```

A ref can point to anything: a number, string, object, or function. The component does not re-render when `current` changes.

# Refs vs state

| refs | state |
| --- | --- |
| `useRef(initialValue)` returns `{ current: initialValue }` | `useState(initialValue)` returns `[value, setValue]` |
| Does not trigger a re-render when changed | Triggers a re-render when changed |
| Mutable: modify `current` outside the rendering process | Immutable: use the setter to queue a re-render |
| Do not read or write `current` during rendering | Read state any time; each render has its own snapshot |

When information is used for rendering, keep it in state. When it is only needed by event handlers and changing it should not re-render, a ref is more efficient. Reading `ref.current` during render leads to unreliable code because React does not track when it changes.

# Example: stopwatch

Keep render data (`startTime`, `now`) in state, and the non-render interval ID in a ref so changing it does not re-render.

```js
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
const intervalRef = useRef(null);

function handleStart() {
  setStartTime(Date.now());
  setNow(Date.now());
  clearInterval(intervalRef.current);
  intervalRef.current = setInterval(() => setNow(Date.now()), 10);
}

function handleStop() {
  clearInterval(intervalRef.current);
}
```

# How useRef works inside

In principle `useRef` could be built on top of `useState`: it returns the same `{ current }` object on every render and never uses the setter, so the object identity stays stable. Think of it as a state variable without a setter, similar to an instance field where you write `somethingRef.current` instead of `this.something`.

# When to use refs

Use a ref when a component must step outside React to talk to external APIs (often browser APIs) without affecting appearance:

- Storing timeout or interval IDs
- Storing and manipulating DOM elements
- Storing other objects not needed to compute the JSX

# Pitfalls

- **Treat refs as an escape hatch.** If much of your logic and data flow relies on refs, rethink the approach.
- **Do not read or write `ref.current` during rendering.** Use state when information is needed during rendering. The one exception is lazy initialization like `if (!ref.current) ref.current = new Thing()`, which only sets the ref once.
- Unlike state, a ref mutation takes effect immediately: `ref.current = 5; console.log(ref.current); // 5`. The ref is a regular JavaScript object, so you do not need to avoid mutation.

# Refs and the DOM

The most common use is to access a DOM element. Passing a ref to a JSX `ref` attribute (`<div ref={myRef}>`) makes React set `myRef.current` to the DOM node, then back to `null` when the element is removed. See [Manipulating the DOM with Refs](manipulating-the-dom-with-refs.md).

# Recap

- Refs are an escape hatch to hold values that are not used for rendering. You will not need them often.
- A ref is a plain JavaScript object with a single `current` property you read or set.
- Get a ref by calling the [useRef](/reference/react/hooks/useRef.md) Hook.
- Like state, refs retain information between re-renders.
- Unlike state, setting `ref.current` does not trigger a re-render.
- Do not read or write `ref.current` during rendering. This makes the component hard to predict.

# Citations

[1] [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
