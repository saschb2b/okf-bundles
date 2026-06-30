---
type: API Reference
title: useInsertionEffect
description: React Hook for CSS-in-JS libraries that inserts elements into the DOM before any layout Effects fire.
resource: https://react.dev/reference/react/useInsertionEffect
tags: [react, hooks, effects, css-in-js]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useInsertionEffect` fires before any layout Effects, letting CSS-in-JS libraries inject `<style>` tags before code that reads layout runs. It is intended for library authors, not application code. Call it at the top level of your Hook.

```js
useInsertionEffect(setup, dependencies?)
```

```js
import { useInsertionEffect } from 'react';

// Inside your CSS-in-JS library
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... inject <style> tags here ...
  });
  return rule;
}
```

## Parameters

- `setup`: The function with your Effect's logic. It may optionally return a cleanup function. When your component is added to the DOM but before any layout Effects fire, React runs `setup`. After every re-render with changed dependencies, React first runs cleanup (if provided) with the old values, then runs `setup` with the new values. When the component is removed, React runs cleanup.
- **optional** `dependencies`: The list of all reactive values referenced inside `setup` (props, state, and variables and functions declared in the component body). The list must be written inline like `[dep1, dep2]`. React compares each to its previous value with `Object.is`. Omitting the argument re-runs the Effect after every re-render.

## Returns

`useInsertionEffect` returns `undefined`.

# Usage

- Inject dynamic styles from CSS-in-JS libraries: insert `<style>` tags here so they are present before layout Effects measure the DOM. Runtime `<style>` injection is discouraged in general, but when unavoidable this is the correct place.

```js
let isInserted = new Set();
function useCSS(rule) {
  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });
  return rule;
}
```

For collecting rules during server rendering, accumulate them outside the Effect (the Effect itself does not run on the server). Most apps should use plain CSS files or [useEffect](/reference/react/hooks/useEffect.md) instead.

# Caveats

- Effects only run on the client, not during server rendering.
- You cannot update state from inside `useInsertionEffect`.
- By the time `useInsertionEffect` runs, refs are not attached yet.
- `useInsertionEffect` may run either before or after the DOM has been updated. Do not rely on the DOM being updated at any particular time.
- Unlike other Effects, which fire cleanup for every Effect and then setup for every Effect, `useInsertionEffect` fires both cleanup and setup one component at a time, interleaving the two.

# Citations

[1] [useInsertionEffect](https://react.dev/reference/react/useInsertionEffect)
