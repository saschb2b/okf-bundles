---
type: API Reference
title: useLayoutEffect
description: Version of useEffect that fires synchronously before the browser repaints the screen.
resource: https://react.dev/reference/react/useLayoutEffect
tags: [react, hooks, effects, layout]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useLayoutEffect` is a version of [useEffect](/reference/react/hooks/useEffect.md) that fires before the browser repaints the screen. It can hurt performance, so prefer `useEffect` when possible. Call it at the top level of your component.

```js
useLayoutEffect(setup, dependencies?)
```

```js
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  // ...
}
```

## Parameters

- `setup`: The function with your Effect's logic. It may optionally return a cleanup function. After your component commits to the DOM and before the browser repaints, React runs `setup`. After every commit with changed dependencies, React first runs cleanup (if provided) with the old values, then runs `setup` with the new values. Before the component is removed, React runs cleanup.
- **optional** `dependencies`: The list of all reactive values referenced inside `setup` (props, state, and variables and functions declared in the component body). The list must be written inline like `[dep1, dep2]`. React compares each to its previous value with `Object.is`. Omitting the argument re-runs the Effect after every commit.

## Returns

`useLayoutEffect` returns `undefined`.

# Usage

- Measure layout before the browser repaints: render, read layout with something like `getBoundingClientRect()`, set state, and re-render before the user sees anything, avoiding visual flicker.

```js
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);
```

Key difference from `useEffect`: `useLayoutEffect` blocks the browser from repainting so you can measure and update synchronously, while `useEffect` does not block and may cause a flicker when measurements affect layout. For synchronizing with external systems that do not need to block paint, use [useEffect](/reference/react/hooks/useEffect.md). For external stores, consider [useSyncExternalStore](/reference/react/hooks/useSyncExternalStore.md).

# Caveats

- `useLayoutEffect` is a Hook. Call it only at the top level of a component or a custom Hook, never inside loops or conditions.
- In Strict Mode, React runs one extra development-only setup and cleanup cycle before the first real setup to stress-test cleanup logic.
- If dependencies are objects or functions defined inside the component, they may cause the Effect to re-run more often than needed. Remove unnecessary object and function dependencies where possible.
- Effects only run on the client, not during server rendering. On the server `useLayoutEffect` does nothing and warns; mark the component client-only or fall back to `useEffect` if flicker is acceptable.
- The code inside `useLayoutEffect` and all state updates it schedules block the browser from repainting. Used excessively, this makes the app slow. Prefer `useEffect`.
- If you trigger a state update inside `useLayoutEffect`, React executes all remaining Effects immediately, including `useEffect`.

# Citations

[1] [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
