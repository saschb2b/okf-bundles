---
type: API Reference
title: useMemo
description: React Hook that caches a calculation result between re-renders.
resource: https://react.dev/reference/react/useMemo
tags: [react, hooks, performance, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useMemo` caches the result of a calculation between re-renders. Call it at the top level of your component.

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

## Parameters

- `calculateValue`: The function that computes the value to cache. Must be pure, take no arguments, and return any type. React calls it on the initial render. On later renders, React returns the same value if `dependencies` have not changed; otherwise it calls `calculateValue` again, returns its result, and stores it.
- `dependencies`: The list of all reactive values referenced inside `calculateValue`. Reactive values include props, state, and all variables and functions declared directly inside the component body. The list must have a constant number of items, written inline like `[dep1, dep2, dep3]`. React compares each dependency to its previous value with `Object.is`.

## Returns

On the initial render, the result of calling `calculateValue`. On later renders, either the stored value from the last render (if dependencies are unchanged) or a fresh result from calling `calculateValue` again.

# Usage

- Skip expensive recalculations: wrap a slow calculation so it only re-runs when its dependencies change.
- Skip re-rendering of components: memoize a value passed to a `memo`-wrapped child so the child's props stay referentially stable.
- Prevent an Effect from firing too often: memoize an object or array used inside an Effect's dependency list.
- Memoize a dependency of another Hook: stabilize a value that other Hooks depend on.
- Memoize a function: prefer [useCallback](/reference/react/hooks/useCallback.md) for functions, which is `useMemo` specialized for caching a function.

Measure before optimizing; `useMemo` is a performance tool, not a correctness one.

# Caveats

- `useMemo` is a Hook. Call it only at the top level of a component or a custom Hook, never inside loops or conditions.
- In Strict Mode, React calls your calculation function twice in development to surface impurities. One result is ignored. Production is unaffected.
- React will not throw away the cached value unless there is a specific reason. For example, in development it discards the cache when you edit the component's file, and in development and production it discards the cache if the component suspends during the initial mount. Rely on `useMemo` only as a performance optimization; for other needs use state or a ref.

# Citations

[1] [useMemo](https://react.dev/reference/react/useMemo)
