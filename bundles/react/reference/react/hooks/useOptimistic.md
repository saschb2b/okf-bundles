---
type: API Reference
title: useOptimistic
description: React Hook that optimistically updates the UI while an async Action is pending.
resource: https://react.dev/reference/react/useOptimistic
tags: [react, hooks, state, optimistic, actions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useOptimistic` shows a temporary optimistic state while an async Action is in progress, reverting to the real value when the Action ends. Call it at the top level of your component.

```js
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn?)
```

```js
import { useOptimistic } from 'react';

function MyComponent({ name, todos }) {
  const [optimisticName, setOptimisticName] = useOptimistic(name);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, todoReducer);
  // ...
}
```

## Parameters

- `state`: The value returned when there are no pending Actions.
- **optional** `updateFn`: A pure reducer function `(currentState, optimisticValue) => nextState` that computes the merged optimistic state from the current state and the value passed to the set function. If omitted, the set function's value is used directly.

## Returns

An array with exactly two values:

1. `optimisticState`: The current optimistic state. Equals `state` unless an Action is pending, in which case it equals the value returned by `updateFn` (or the value passed to the set function if no `updateFn`).
2. `addOptimistic` (the set function): Updates the optimistic state during an Action.

## `addOptimistic(optimisticValue)`

Call inside `startTransition` or an Action to set the optimistic state.

```js
function handleClick() {
  startTransition(async () => {
    setOptimisticLike(true);
    await saveChanges();
  });
}
```

### Parameters

- `optimisticValue`: The value (any type) or updater function for the optimistic state during the Action. If a `updateFn` was provided to `useOptimistic`, this value is passed as its second argument.

### Returns

The set function has no return value.

# Usage

How it works: after the set function runs, React renders the optimistic value immediately, keeps showing it while the Action awaits, then commits the real `state` once the Action completes. The optimistic state is temporary; when the Action ends (success or failure), React renders the current `state`. Since parents typically update only on success, a failed Action shows the state before the optimistic update, which rolls back the UI.

- Add optimistic state to a component: wrap a value, update it inside an Action with the set function.
- Use optimistic state in Action props: Action props (named with "Action") already run inside `startTransition`, so call the set function directly without wrapping.
- Add optimistic pending UI: use a boolean optimistic state like `useOptimistic(false)` to drive a "Submitting..." state.
- Update props or state optimistically: feed a prop or state value as the base; after the Action commit the parent updates the real value.
- Update multiple values together with a reducer: pass `updateFn` to merge several fields, for example following state plus follower count.

```js
const [optimisticState, updateOptimistic] = useOptimistic(
  { isFollowing: user.isFollowing, followerCount: user.followerCount },
  (current, isFollowing) => ({
    isFollowing,
    followerCount: current.followerCount + (isFollowing ? 1 : -1),
  })
);
```

- Optimistically add to a list: use a reducer that appends a pending item.

```js
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (currentTodos, newTodo) => [...currentTodos, { ...newTodo, pending: true }]
);
```

- Handle multiple action types with a reducer: switch on an action object for add, remove, and update cases.
- Optimistic delete with error recovery: mark items deleting optimistically and catch errors in the Action to roll back.

Optimistic state is driven by Actions; pair it with [useTransition](/reference/react/hooks/useTransition.md) or [useActionState](/reference/react/hooks/useActionState.md). Check pending state via `optimistic !== value`, a `useTransition` `isPending` flag, or a `pending` flag set in the reducer.

# Caveats

- Call the set function inside `startTransition` or an Action prop. Called outside, React warns and the optimistic state briefly renders then reverts.
- Do not call the set function during render. Call it from event handlers, effects, or callbacks inside Actions.
- For relative updates, use an updater function or a reducer rather than a hardcoded value, to avoid stale data.

# Citations

[1] [useOptimistic](https://react.dev/reference/react/useOptimistic)
