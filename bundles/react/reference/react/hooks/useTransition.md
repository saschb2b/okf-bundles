---
type: API Reference
title: useTransition
description: React Hook that renders part of the UI in the background by marking state updates as non-blocking Transitions.
resource: https://react.dev/reference/react/useTransition
tags: [react, hooks, transitions, concurrency]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useTransition` lets you mark some state updates as Transitions, rendering them in the background without blocking the UI. Call it at the top level of your component.

```js
const [isPending, startTransition] = useTransition()
```

```js
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ...
}
```

## Parameters

`useTransition` takes no parameters.

## Returns

An array with exactly two items:

1. `isPending`: A flag telling you whether a Transition is pending.
2. `startTransition`: A function that marks updates as a Transition.

## `startTransition(action)`

Marks the state updates performed inside `action` as Transitions.

```js
function selectTab(nextTab) {
  startTransition(() => {
    setTab(nextTab);
  });
}
```

### Parameters

- `action`: A function that updates some state by calling one or more `set` functions. React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the call as Transitions. Awaited async calls are included, but `set` calls after an `await` must be wrapped in an additional `startTransition`. Transition updates are non-blocking and do not display unwanted loading indicators.

### Returns

`startTransition` does not return anything.

# Usage

- Perform non-blocking updates with Actions: wrap async work in `startTransition` so the UI stays responsive and `isPending` reflects progress.
- Expose an `action` prop from components: let a parent pass an async action that the component runs in a Transition.
- Display a pending visual state: use `isPending` to show a spinner or disable controls while the Transition runs.
- Prevent unwanted loading indicators: Transitions keep already-shown content visible instead of falling back to a Suspense spinner.
- Build a Suspense-enabled router: wrap navigation state updates in a Transition.
- Display an error to users with an error boundary: combine Transitions with an error boundary to catch failures.

For a value you cannot wrap (a prop or custom Hook result), use [useDeferredValue](/reference/react/hooks/useDeferredValue.md) instead. Outside a component, use the standalone [startTransition](/reference/react/apis/startTransition.md).

```js
startTransition(async () => {
  await someAsyncFunction();
  startTransition(() => {
    setPage('/about');
  });
});
```

# Caveats

- `useTransition` is a Hook; call it only inside components or custom Hooks. Use the standalone `startTransition` elsewhere.
- You can wrap an update in a Transition only if you have access to that state's `set` function. For a prop or custom Hook value, use `useDeferredValue`.
- The function passed to `startTransition` is called immediately. Updates in a `setTimeout` (or after an `await` without re-wrapping) are not marked as Transitions.
- Wrap state updates after async requests in another `startTransition`.
- The `startTransition` function has a stable identity, so it is often omitted from Effect dependencies.
- A Transition update is interrupted by other state updates.
- Transition updates cannot be used to control text inputs. Use a separate state variable or `useDeferredValue`.
- Multiple ongoing Transitions are currently batched together.

# Citations

[1] [useTransition](https://react.dev/reference/react/useTransition)
