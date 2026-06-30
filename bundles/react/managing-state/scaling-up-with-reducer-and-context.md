---
type: Guide
title: Scaling Up with Reducer and Context
description: How to combine a reducer with context so state and dispatch reach any component in the tree without prop drilling.
resource: https://react.dev/learn/scaling-up-with-reducer-and-context
tags: [react, state, reducer, context]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Reducers consolidate a component's state update logic. Context lets you pass information deep into the tree. Combine them to manage state of a complex screen: a single reducer holds the update logic, and context distributes both the state and the dispatch function to any component that needs them, with no prop drilling. This builds on [Extracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.md) and [Passing Data Deeply with Context](passing-data-deeply-with-context.md).

# The problem

With `useReducer`, the state and the `dispatch` function exist only in the top-level component. To let deeply nested components read state or dispatch actions, you have to pass both down through every intermediate component as props, which is tedious and noisy. Context removes that wiring.

# Combining a reducer with context in three steps

## Step 1: Create the context

Create two separate contexts: one for the current state, one for the dispatch function. Use two so a component that only needs to dispatch does not subscribe to state changes it does not read.

```js
// TasksContext.js
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

## Step 2: Put state and dispatch into context

In the component that owns the reducer, provide the state and dispatch through their contexts so the whole subtree can read them.

```jsx
import { useReducer } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext>
    </TasksContext>
  );
}
```

## Step 3: Use the context anywhere in the tree

Children read state and dispatch from context directly, instead of receiving them as props.

```jsx
import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...
}

export default function AddTask() {
  const dispatch = useContext(TasksDispatchContext);
  // dispatch directly, no props threaded down
  dispatch({ type: 'added', id: nextId++, text: text });
}
```

# Moving all wiring into a single file

To keep components clean, move the reducer, both contexts, and a provider component into one module, and expose custom Hooks for reading state and dispatch.

```jsx
// TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

The app component then wraps its tree in the provider, and children call the custom Hooks.

```jsx
// App.js
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```js
import { useTasks, useTasksDispatch } from './TasksContext.js';

const tasks = useTasks();
const dispatch = useTasksDispatch();
```

You can have many such context-reducer pairs in one app for different concerns.

# Recap

- Combine a reducer with context to let any component read and update parent state.
- To provide state and dispatch to the tree: create two contexts (state and dispatch), provide both from the component that uses the reducer, then read whichever you need from child components.
- Declutter by moving the reducer, contexts, and provider into a single file, exposing custom Hooks like useTasks and useTasksDispatch.
- You can have many context-reducer pairs in your app.

# Citations

[1] [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
