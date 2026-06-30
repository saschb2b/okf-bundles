---
type: Guide
title: State: A Component's Memory
description: How to give a component memory across renders with the useState Hook, and the rules of Hooks.
resource: https://react.dev/learn/state-a-components-memory
tags: [react, state, useState, hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Components often need to change what is on screen as a result of an interaction. They need to remember things: the current input value, the current image, the shopping cart. In React, this component-specific memory is called state. You add state with the [useState](/reference/react/hooks/useState.md) Hook.

# When a regular variable is not enough

A plain local variable fails for interactive components for two reasons:

1. Local variables do not persist between renders. React renders from scratch each time and ignores changes to local variables.
2. Changes to local variables do not trigger renders. React does not know to render again.

To update a component with new data, two things must happen: retain the data between renders, and trigger React to re-render with the new data. The `useState` Hook provides both.

# Adding a state variable

`useState` returns a state variable to retain the data and a setter function to update it and queue a render.

```js
import { useState } from 'react';

const [index, setIndex] = useState(0);
```

The square bracket syntax is array destructuring. The returned array always has exactly two items: the state variable (current value) and the setter. The naming convention is `const [something, setSomething] = useState(initialValue)`.

How it works on click:

1. First render: `useState(0)` returns `[0, setIndex]`. React remembers `0`.
2. `setIndex(index + 1)` (so `setIndex(1)`) tells React to remember `1` and triggers a render.
3. Second render: React still sees `useState(0)` but, because it remembers you set `index` to `1`, returns `[1, setIndex]`.

# Meet your first Hook

Functions starting with `use` are called Hooks. Hooks are special functions only available while React is rendering. They let you hook into React features. State is one of those features.

# Rules of Hooks

Hooks can only be called at the top level of your components or your own Hooks. You cannot call Hooks inside conditions, loops, or other nested functions. Think of them as unconditional declarations of your component's needs, similar to imports at the top of a file.

```js
// Wrong: inside a condition
if (isSent) {
  const [message, setMessage] = useState('');
}

// Wrong: inside a loop
for (let i = 0; i < 5; i++) {
  const [state, setState] = useState(i);
}
```

# Multiple state variables

A component can have as many state variables of as many types as you like.

```jsx
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

If you often change two state variables together, consider combining them into one (for example a single object for a form with many fields).

# How React matches state to the right variable

Hooks rely on a stable call order on every render of the same component. React holds an array of state pairs per component and a current index reset to `0` before each render. Each `useState` call returns the next pair and increments the index. This only works if you follow the rule of calling Hooks at the top level, so the order stays the same across renders.

# State is isolated and private

State is local to a component instance on screen. If you render the same component twice, each copy has completely isolated state, and changing one does not affect the other. Unlike props, state is fully private to the component that declares it. The parent cannot change it. To keep state in sync between components, move it up to their closest shared parent.

# Recap

- Use a state variable when a component needs to remember information between renders.
- Declare state variables by calling the [useState](/reference/react/hooks/useState.md) Hook.
- Hooks are special functions starting with `use`. They let you hook into React features like state.
- Hooks are like imports: call them unconditionally, only at the top level of a component or another Hook.
- `useState` returns a pair: the current state and the function to update it.
- You can have more than one state variable. React matches them by call order.
- State is private to the component. Rendered in two places, each copy gets its own state.

# Citations

[1] [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
