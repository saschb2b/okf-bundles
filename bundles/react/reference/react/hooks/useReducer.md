---
type: API Reference
title: useReducer
description: React Hook that manages component state with a reducer function and dispatched actions.
resource: https://react.dev/reference/react/useReducer
tags: [react, hooks, state, reducer]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useReducer` adds a reducer to your component, managing state through dispatched actions. Call it at the top level of your component.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
}
```

## Parameters

- `reducer`: The function that specifies how state updates. Must be pure, take the state and action as arguments, and return the next state. State and action can be of any type.
- `initialArg`: The value from which the initial state is calculated. Any type.
- **optional** `init`: An initializer function that returns the initial state. If omitted, the initial state is `initialArg`. Otherwise it is the result of `init(initialArg)`.

## Returns

An array with exactly two values:

1. The current state. On the first render it is `init(initialArg)`, or `initialArg` if there is no `init`.
2. The `dispatch` function that updates the state and triggers a re-render.

## `dispatch` function

Updates the state and triggers a re-render. Pass the action as the only argument.

```js
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```

### Parameters

- `action`: The action performed by the user, any type. By convention an action is an object with a `type` property identifying it, plus optional extra data.

### Returns

`dispatch` does not return a value.

# Usage

- Add a reducer to a component: `const [state, dispatch] = useReducer(reducer, initialState)`.
- Write the reducer function: switch on `action.type` and return new state for each case, copying existing fields with `...state`. Throw on unknown actions.

```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age':
      return { ...state, age: state.age + 1 };
    case 'changed_name':
      return { ...state, name: action.nextName };
  }
  throw Error('Unknown action: ' + action.type);
}
```

- Avoid recreating the initial state: pass an `init` function as the third argument (the function itself, not its result), `useReducer(reducer, username, createInitialState)`.

Reducers consolidate state update logic. See the guide [Extracting State Logic into a Reducer](/managing-state/extracting-state-logic-into-a-reducer.md). For app-wide state, combine with context per [Scaling Up with Reducer and Context](/managing-state/scaling-up-with-reducer-and-context.md).

# Caveats

- `useReducer` is a Hook. Call it only at the top level of a component or a custom Hook, never inside loops or conditions.
- The `dispatch` function has a stable identity, so it is often omitted from Effect dependencies; including it will not cause the Effect to fire.
- In Strict Mode, React calls your reducer and initializer twice in development to surface impurities. One result is ignored. Production is unaffected.
- `dispatch` only updates state for the next render. Reading state right after dispatching returns the old value.
- If the next state is identical to the current state by `Object.is`, React skips re-rendering the component and its children.
- React batches state updates. The screen updates after all event handlers have run.
- To debug undefined state: ensure every case returns all fields (spread `...state`), every branch has a `return`, and unmatched actions throw.

# Citations

[1] [useReducer](https://react.dev/reference/react/useReducer)
