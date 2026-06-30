---
type: API Reference
title: useState
description: React Hook that adds a local state variable to a component.
resource: https://react.dev/reference/react/useState
tags: [react, hooks, state, reactivity]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useState` declares a state variable that you can update to trigger a re-render. Call it at the top level of your component.

```js
const [state, setState] = useState(initialState)
```

## Parameters

- `initialState`: The value the state should be initially. Any type is allowed. This argument is ignored after the initial render.
  - If you pass a function, it is treated as an initializer function. It must be pure, take no arguments, and return a value of any type. React calls it when initializing the component and stores its return value as the initial state.

## Returns

An array with exactly two values:

1. The current state. During the first render it matches `initialState`.
2. The `set` function that updates the state and triggers a re-render.

## `set` function, like `setSomething(nextState)`

Updates the state and triggers a re-render. Pass the next state directly, or an updater function.

```js
setName('Taylor');
setAge(a => a + 1);
```

### Parameters

- `nextState`: The next state value, any type.
  - If you pass a function, it is treated as an updater function. It must be pure, take the pending state as its only argument, and return the next state. React queues updater functions and applies them in order during the next render.

### Returns

`set` functions do not return a value.

# Usage

- Add state to a component: declare `const [value, setValue] = useState(initial)` at the top level.
- Update based on previous state: pass an updater function to apply queued updates correctly, `setCount(c => c + 1)`.
- Update objects and arrays in state: never mutate, always replace with a new object or array, `setObj({ ...obj, x: 10 })`. See [Updating Objects in State](/adding-interactivity/updating-objects-in-state.md) and [Updating Arrays in State](/adding-interactivity/updating-arrays-in-state.md).
- Avoid recreating the initial state: pass an initializer function `useState(() => createTodos())` so the expensive call runs only on the first render.
- Reset state with a key: changing a component's `key` prop resets its state by remounting it.
- Store information from previous renders: calling the `set` function during rendering (only of the currently rendering component) lets you adjust state based on prior renders.

State is a component's memory. See the guide [State: A Component's Memory](/adding-interactivity/state-a-components-memory.md).

# Caveats

- `useState` is a Hook. Call it only at the top level of a component or a custom Hook, never inside loops or conditions.
- In Strict Mode, React calls your initializer function twice in development to surface accidental impurities. Production is unaffected.
- The `set` function only updates state for the next render. Reading the state variable right after calling `set` returns the old value (state behaves like a snapshot).
- If the new value is identical to the current state by `Object.is`, React skips re-rendering the component and its children.
- React batches state updates. The screen updates after all event handlers have run and called their `set` functions.
- Calling `set` during rendering is only allowed from within the currently rendering component. React discards the output and re-renders immediately with the new state.
- In Strict Mode, React calls your updater function twice in development.
- The `set` function has a stable identity, so it is often omitted from Effect dependencies.
- To store a function in state, wrap it: `useState(() => someFn)` and `setFn(() => someOtherFn)`. A bare function is treated as an initializer or updater and gets called.

# Citations

[1] [useState](https://react.dev/reference/react/useState)
