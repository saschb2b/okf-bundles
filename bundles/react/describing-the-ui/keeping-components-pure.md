---
type: Guide
title: Keeping Components Pure
description: How to avoid a class of bugs by writing components as pure functions with the same output for the same inputs.
resource: https://react.dev/learn/keeping-components-pure
tags: [react, purity, components, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React assumes every component you write is a pure function. Writing components this way avoids a whole class of confusing bugs and unlocks React's optimizations. This is one of React's core rules; see [components and hooks must be pure](/reference/rules/components-and-hooks-must-be-pure.md) for the full rule.

# What purity means

A pure function has two properties:

1. It minds its own business. It does not change any object or variable that existed before it was called.
2. Same inputs, same output. Given the same inputs, it always returns the same result.

React relies on this: a component must return the same JSX for the same props, state, and context.

```jsx
function Recipe({ drinkers }) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
    </ol>
  );
}
```

# Side effects and impurity

An impure component changes preexisting variables during render, so calling it more than once produces different output.

```jsx
let guest = 0;

function Cup() {
  guest = guest + 1; // wrong: mutates an external variable during render
  return <h2>Tea cup for guest #{guest}</h2>;
}
```

The fix is to pass the value in as a prop, so output depends only on inputs.

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}
```

# Local mutation is fine

It is safe to create and mutate objects and variables during render as long as you made them in that same render. External code does not see them. This is called local mutation.

```jsx
function TeaGathering() {
  const cups = []; // created during this render
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

# Where side effects belong

Side effects such as updating the screen, starting animations, or changing data should not run during render. They belong:

1. In event handlers, functions that run in response to user interaction. Event handlers run after rendering, so they may be impure.
2. In `useEffect` as a last resort, to run code after rendering rather than during it. See [synchronizing with effects](/escape-hatches/synchronizing-with-effects.md).

# Strict Mode detects impurity

In development, React's Strict Mode calls each component function twice. A pure component returns the same result both times; an impure one produces different output, exposing the bug early.

# Why purity matters

- Components can run in any environment, including the server.
- React can safely skip rendering components whose inputs have not changed.
- React can interrupt and restart a render without wasting work on stale results.
- It enables advanced features such as concurrent rendering.

# Pitfalls

- Do not change objects or variables that existed before rendering.
- Do not read from or write to external variables during render.
- Do not mutate props, state, or context; treat them as read-only.
- Use `useState` to update state instead of mutating variables in place.

# Recap

- A component must be pure: it minds its own business and returns the same JSX for the same inputs.
- Treat props, state, and context as read-only.
- Local mutation of values created during the same render is safe.
- Put side effects in event handlers, or in `useEffect` as a last resort.
- Strict Mode double-invokes components in development to surface impurity.

# Citations

[1] [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
