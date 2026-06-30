---
type: API Reference
title: startTransition
description: Marks a state update as a Transition so part of the UI renders in the background without blocking.
resource: https://react.dev/reference/react/startTransition
tags: [react, transitions, concurrent, performance]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`startTransition` lets you render a part of the UI in the background by marking a state update as a Transition.

```js
startTransition(action)
```

```js
import { startTransition } from 'react';

function selectTab(nextTab) {
  startTransition(() => {
    setTab(nextTab);
  });
}
```

## Parameters

- `action`: A function that updates state by calling one or more `set` functions. React calls `action` immediately with no parameters and marks all state updates scheduled synchronously during the call as Transitions. Async calls awaited in the `action` are included, but state updates after an `await` currently need to be wrapped in an additional `startTransition`. Transition updates are non-blocking and avoid unwanted loading indicators.

## Returns

`startTransition` does not return anything.

# Usage

- Mark a state update as a non-blocking Transition by wrapping the `set` call in `startTransition`. The UI stays responsive mid-render, so a user can click a different tab without waiting for the first re-render to finish.

```js
startTransition(() => {
  setTab(nextTab);
});
```

- `startTransition` is similar to [useTransition](/reference/react/hooks/useTransition.md) but does not provide an `isPending` flag. Use it when `useTransition` is not available, for example outside components such as from a data library.

# Caveats

- It does not track whether a Transition is pending. To show a pending indicator, use [useTransition](/reference/react/hooks/useTransition.md).
- You can wrap an update in a Transition only if you have access to that state's `set` function. To start a Transition from a prop or custom Hook return value, use [useDeferredValue](/reference/react/hooks/useDeferredValue.md).
- The `action` is called immediately; updates in a `setTimeout` inside it are not marked as Transitions.
- Wrap any state updates after async requests in another `startTransition`. This is a known limitation.
- A Transition update is interrupted by other state updates; React restarts the transition work after handling the interrupting update.
- Transition updates cannot be used to control text inputs.
- Multiple ongoing Transitions are currently batched together, a limitation that may be removed.

# Citations
[1] [startTransition](https://react.dev/reference/react/startTransition)
