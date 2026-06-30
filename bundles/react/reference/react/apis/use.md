---
type: API Reference
title: use
description: Reads the value of a Promise or context, callable inside loops and conditionals.
resource: https://react.dev/reference/react/use
tags: [react, suspense, context, promises]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`use` reads the value of a Promise or a context. Despite the name it is not a Hook, so unlike Hooks it can be called inside loops and conditionals like `if`.

```js
const value = use(resource);
```

## use(context)

Call `use` with a context to read its value. Unlike [useContext](/reference/react/hooks/useContext.md), `use` can be called in loops and conditionals.

- Parameter `context`: A context created with [createContext](/reference/react/apis/createContext.md).
- Returns: The context value from the closest provider above the caller, or the `defaultValue` from `createContext` if there is no provider.

```js
import { use } from 'react';
function Button() {
  const theme = use(ThemeContext);
}
```

## use(promise)

Call `use` with a Promise to read its resolved value. The component suspends while the Promise is pending.

- Parameter `promise`: A Promise whose resolved value you want to read. It must be cached so the same instance is reused across re-renders.
- Returns: The resolved value of the Promise.

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
}
```

If the caller is inside a [Suspense](/reference/react/components/Suspense.md) boundary, the fallback shows while the Promise is pending. If the Promise rejects, the nearest [Error Boundary](/reference/react/legacy/Component.md) fallback shows.

# Usage

- Read context conditionally: `use(context)` works like [useContext](/reference/react/hooks/useContext.md) but can sit inside an `if` or `for`. It always finds the closest provider above the calling component and ignores providers in that same component.
- Read a Promise from context by setting a Promise as the context value, then resolving it with two `use` calls: `const userPromise = use(UserContext); const user = use(userPromise);`. Wrap readers in Suspense.
- Read a Promise directly with `use(promise)`, suspending while pending; the closest Suspense boundary above shows its fallback.
- Cache Promises for Client Components so the same instance is reused across re-renders; a new Promise created in render makes the Suspense fallback show every re-render.

```js
let cache = new Map();
export function fetchData(url) {
  if (!cache.has(url)) cache.set(url, getData(url));
  return cache.get(url);
}
```

- Re-fetch data by invalidating the cache entry and starting a new fetch inside [startTransition](/reference/react/apis/startTransition.md), storing the resulting Promise in state so React keeps showing existing content while it is pending.
- Preload data on hover by calling the cached fetch during `onMouseEnter`, so the data may already be resolved by the time `use` reads it.
- Stream data from server to client by passing a Promise as a prop from a Server Component to a Client Component, which reads it with `use`. The resolved value must be serializable.
- Display errors with an Error Boundary: a rejected Promise propagates to the nearest boundary.

# Caveats

- `use` must be called inside a Component or a Hook.
- Reading context with `use` is not supported in [Server Components](/reference/rsc/server-components.md).
- `use` cannot be called inside a try-catch block (it throws internally to integrate with Suspense, surfacing as "Suspense Exception: This is not a real error!"); use an Error Boundary instead.
- Promises passed to `use` must be cached so the same instance is reused; an uncached Promise warns "A component was suspended by an uncached promise".
- When passing a Promise from a Server Component to a Client Component, its resolved value must be serializable.
- Do not bypass `use` by reading `promise.status` or `promise.value` directly; always pass the Promise to `use`. You may call `use` conditionally, but do not condition that call on the promise's own settled state.

# Citations
[1] [use](https://react.dev/reference/react/use)
