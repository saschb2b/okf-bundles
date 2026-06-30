---
type: Guide
title: Passing Data Deeply with Context
description: How to use context to make information available to any component in the tree below a parent, without passing it explicitly through props.
resource: https://react.dev/learn/passing-data-deeply-with-context
tags: [react, state, context, prop-drilling]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Usually you pass information from a parent to a child through props. Passing props gets verbose and inconvenient when you have to thread the same data through many components in the middle, or when many components in your tree need the same information. Context lets a parent component make some information available to any component in the tree below it, no matter how deep, without passing it explicitly through props. It builds on [useContext](/reference/react/hooks/useContext.md) and [createContext](/reference/react/apis/createContext.md).

# The problem context solves: prop drilling

"Prop drilling" is passing a prop through many intermediate components that do not use it themselves, just to reach a deeply nested consumer. It is verbose and brittle, especially when the nearest common ancestor is far from the components that need the data, or when many components need the same value.

# Using context in three steps

## Step 1: Create the context

Create a context in its own module and export it. The argument to `createContext` is the default value used when a consumer has no matching provider above it.

```js
import { createContext } from 'react';
export const LevelContext = createContext(1);
```

## Step 2: Use the context

Read the context in the component that needs the value with the `useContext` Hook. React searches up the tree for the closest matching provider and returns its value, or the default if there is none.

```js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ... use level
}
```

## Step 3: Provide the context

Wrap children with the context as a provider, passing the value. Any component anywhere inside, at any depth, reads the closest value above it.

```js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

# How context behaves

- It passes through intermediate components. Any number of components can sit between the provider and the consumer without forwarding the value.
- A component can both read and provide the same context. Reading the value, incrementing it, and providing the new value to its own children lets each level adapt to its surroundings, much like CSS inheritance.

```js
export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

- Different contexts do not override each other. Each context created by `createContext` is fully independent, so unrelated contexts can coexist in the same tree.
- `useContext` must be called at the top level of a component, not inside loops or conditions.

# Before you use context

Context is tempting to overuse. Try these first:

1. Start by passing props. It makes the data flow explicit and is not as bad as it feels for a handful of props.
2. Extract components and pass JSX as `children`. If an intermediate component does not use the data and only forwards it, you may be able to pass the rendered JSX through `children` instead, shortening the path between the data's source and its consumer.

Reach for context only when passing props through many layers, for data many components in different parts of the tree need.

# Common use cases

- Theming, such as a dark or light mode toggle near the top of the app.
- The current authenticated account.
- Routing, where the current route is held in context.
- Managing complex state with a reducer and distributing it to distant components. See [Scaling Up with Reducer and Context](scaling-up-with-reducer-and-context.md).

# Recap

- Context lets a component provide information to the entire tree below it.
- To pass context: create and export it with `createContext`, read it with the `useContext` Hook in any child, and provide it by wrapping children with the context as a provider.
- Context passes through any components in the middle.
- A component can read and override the context for its own subtree.
- Before using context, try passing props or passing JSX as `children`.

# Citations

[1] [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
