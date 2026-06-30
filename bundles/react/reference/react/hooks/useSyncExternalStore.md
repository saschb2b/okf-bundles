---
type: API Reference
title: useSyncExternalStore
description: React Hook that subscribes a component to an external data store.
resource: https://react.dev/reference/react/useSyncExternalStore
tags: [react, hooks, store, subscription]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useSyncExternalStore` subscribes to an external store and reads a value from it. Call it at the top level of your component.

```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```

## Parameters

- `subscribe`: A function that takes a single `callback` argument and subscribes it to the store. When the store changes, it should invoke `callback`, causing React to re-call `getSnapshot` and re-render if needed. It must return a cleanup function that unsubscribes.
- `getSnapshot`: A function that returns a snapshot of the store data the component needs. While the store is unchanged, repeated calls must return the same value. If the store changes and the returned value differs by `Object.is`, React re-renders.
- **optional** `getServerSnapshot`: A function returning the initial snapshot, used only during server rendering and during hydration on the client. It must match between server and client (usually serialized and passed from server). Omitting it throws when rendering the component on the server.

## Returns

The current snapshot of the store, for use in your rendering logic.

# Usage

- Subscribe to an external store: pass the store's `subscribe` and `getSnapshot` functions.
- Subscribe to a browser API: wrap APIs like `navigator.onLine` with `getSnapshot` and a `subscribe` that adds and removes event listeners.

```js
function getSnapshot() {
  return navigator.onLine;
}
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

- Extract the logic to a custom Hook: wrap the call in something like `useOnlineStatus()` for reuse.
- Add support for server rendering: provide `getServerSnapshot` so the component renders without throwing on the server.

# Caveats

- The snapshot returned by `getSnapshot` must be immutable. If the underlying store is mutable, return a new immutable snapshot when data changes, otherwise return a cached last snapshot.
- If a different `subscribe` function is passed on re-render, React re-subscribes. Declare `subscribe` outside the component to avoid this.
- If the store is mutated during a non-blocking Transition, React falls back to a blocking update. For every Transition update, React calls `getSnapshot` a second time just before applying DOM changes; if the value differs from the original call, React restarts the update as blocking so all components reflect the same store version.
- Avoid suspending a render based on a value from `useSyncExternalStore`. Store mutations cannot be marked as non-blocking Transitions, so they trigger the nearest Suspense fallback, replacing on-screen content with a spinner.

# Citations

[1] [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
