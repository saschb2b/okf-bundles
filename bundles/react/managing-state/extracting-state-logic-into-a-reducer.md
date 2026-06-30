---
type: Guide
title: Extracting State Logic into a Reducer
description: How to consolidate many state updates spread across event handlers into a single reducer function with useReducer.
resource: https://react.dev/learn/extracting-state-logic-into-a-reducer
tags: [react, state, reducer, hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Components with many state updates spread across many event handlers can get overwhelming. For these cases, consolidate all the state update logic outside the component in a single function called a reducer. A reducer takes the current state and an action and returns the next state. Event handlers stop setting state directly and instead dispatch actions that describe what the user did. This guide builds on [useReducer](/reference/react/hooks/useReducer.md).

# Migrating from useState to a reducer in three steps

## Step 1: Move from setting state to dispatching actions

Replace every call that sets state with a `dispatch` call carrying an action object. An action describes what happened, not how state should change.

```js
// Before: handler sets state directly.
function handleAddTask(text) {
  setTasks([...tasks, { id: nextId++, text, done: false }]);
}

// After: handler dispatches an action.
function handleAddTask(text) {
  dispatch({ type: 'added', id: nextId++, text: text });
}
```

By convention an action object has a `type` string naming what happened, plus any other fields the reducer needs. Keep `type` descriptive of the user interaction (`added`, `changed`, `deleted`), not of how state is set.

## Step 2: Write a reducer function

Move the state-setting logic into a reducer declared outside the component. It receives the current state and the action, and returns the next state. A `switch` statement over `action.type` is the common convention.

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case 'changed': {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t));
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

The name "reducer" comes from the array `reduce()` operation: a reducer accumulates state by applying each action in turn.

## Step 3: Use the reducer from your component

Replace `useState` with `useReducer`. It takes a reducer function and the initial state, and returns the current state plus a `dispatch` function.

```js
import { useReducer } from 'react';

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

# useState versus useReducer

| Aspect | useState | useReducer |
| --- | --- | --- |
| Code size | Less upfront code. | More boilerplate, but pays off when many handlers update state similarly. |
| Readability | Best when updates are simple. | Cleaner when update logic is complex: handlers say what happened, the reducer says how state changes. |
| Debugging | Hard to see where a bad update came from. | You can log each action and step through state changes; every update has a clear cause. |
| Testing | Tied to the component. | A reducer is a pure function you can export and test in isolation. |

Use a reducer when a component's state updates are spread across many event handlers and start causing bugs. You can also mix the two: use a reducer for some state and `useState` for the rest.

# Pitfalls

- Reducers must be pure. Given the same state and action they must return the same result. No side effects (no requests, timeouts, or DOM work) and no mutation. Update objects and arrays without mutating them.
- Each action should describe a single user interaction, even if that changes several pieces of data. For example, on "Reset" of a form with five fields, dispatch one `reset_form` action rather than five separate `set_field` actions. This keeps action logs meaningful for debugging.

# Writing concise reducers with Immer

The `useImmerReducer` Hook from `use-immer` lets you write reducers that mutate a `draft` parameter. Immer produces the immutable copy under the hood, so you can `push` and assign directly.

```js
import { useImmerReducer } from 'use-immer';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({ id: action.id, text: action.text, done: false });
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
  }
}
```

# Recap

- To convert from useState to useReducer: dispatch actions from event handlers, write a reducer that returns the next state for a given state and action, then replace useState with useReducer.
- Reducers require more code but help with debugging and testing.
- Reducers must be pure.
- Each action describes a single user interaction.
- Use Immer if you want to write reducers in a mutating style.

# Citations

[1] [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
