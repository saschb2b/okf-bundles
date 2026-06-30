---
type: API Reference
title: useCallback
description: React Hook that caches a function definition between re-renders so its identity stays stable until its dependencies change.
resource: https://react.dev/reference/react/useCallback
tags: [react, hook, performance, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useCallback` caches a function definition between re-renders.

```js
const cachedFn = useCallback(fn, dependencies)
```

Call it at the top level of your component to cache a function so it keeps the same identity until its dependencies change.

```jsx
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', { referrer, orderDetails });
  }, [productId, referrer]);
}
```

Note: React Compiler memoizes values and functions automatically, reducing the need for manual `useCallback` calls.

## Parameters

- `fn`: The function value you want to cache. It can take any arguments and return any values. On the initial render React returns (does not call) it back to you. On the next render React gives you the same function if `dependencies` have not changed, otherwise it gives you the function passed during the current render and stores it. React never calls your function. You decide when and whether to call it.
- `dependencies`: The list of all reactive values referenced inside `fn` (props, state, and every variable and function declared in the component body). The list must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React compares each dependency to its previous value with `Object.is`.

## Returns

- On the initial render, the `fn` function you passed.
- On subsequent renders, either the already stored `fn` from the last render (if dependencies have not changed) or the `fn` you passed during this render (if they have).

# Usage

- Skip re-rendering child components. Wrap a function passed to a child wrapped in [memo](/reference/react/apis/memo.md) so the child can skip re-rendering when the function has not changed. Without `useCallback` a new function is created every render, which breaks the `memo` comparison.
  ```jsx
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', { referrer, orderDetails });
  }, [productId, referrer]);
  ```
- Update state from a memoized callback. Prefer an updater function so you can drop the state dependency.
  ```js
  const handleAddTodo = useCallback((text) => {
    setTodos(todos => [...todos, { id: nextId++, text }]);
  }, []); // No need for the todos dependency
  ```
- Prevent an Effect from firing too often. Wrap a function the Effect depends on in `useCallback`, or better, move the function inside the Effect to remove the dependency entirely. See [synchronizing with Effects](/escape-hatches/synchronizing-with-effects.md).
- Optimize a custom Hook. Wrap functions a [custom Hook](/escape-hatches/reusing-logic-with-custom-hooks.md) returns in `useCallback` so consumers can optimize their own code.

# Caveats

- It is a Hook, so call it only at the top level of your component or your own Hooks, never inside loops or conditions. To memoize per list item, extract a child component and call `useCallback` there, or wrap the child in [memo](/reference/react/apis/memo.md).
- React will not throw away the cached function unless there is a specific reason: in development it discards the cache when you edit the file, and in both development and production it discards the cache if the component suspends during the initial mount.
- Rely on `useCallback` only as a performance optimization. If your code does not work without it, find and fix the underlying problem first. If you need to cache a value that is not a function, consider a [state variable](/reference/react/hooks/useState.md) or a [ref](/reference/react/hooks/useRef.md).
- If `useCallback` returns a new function every render, confirm you passed the dependency array, then check whether one of the dependencies changed (log them or compare with `Object.is`). Memoize a dependency that keeps changing with [useMemo](/reference/react/hooks/useMemo.md).

# Citations

[1] [useCallback](https://react.dev/reference/react/useCallback)
