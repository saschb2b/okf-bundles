---
type: Lint Rule
title: set-state-in-render
description: Flags unconditional setState during render, which triggers extra renders and can cause infinite loops.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render
tags: [react, eslint, lint, state, render]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Setting state unconditionally during render. An unconditional `setState` in render triggers another render before the current one finishes, creating an infinite loop that crashes the app.

A conditional state update during render is allowed: the well-known "store previous value" pattern is valid because the condition stops the loop.

# Examples

Invalid:

```js
function Component({ value }) {
  const [count, setCount] = useState(0);
  setCount(value); // Infinite loop
  return <div>{count}</div>;
}
```

Valid:

```js
// Derive during render
const sorted = [...items].sort();

// Set state in an event handler
<button onClick={() => setCount(count + 1)}>{count}</button>

// Conditionally adjust state from previous renders
const [prevItems, setPrevItems] = useState(items);
if (items !== prevItems) { // the condition makes it valid
  setPrevItems(items);
  setSelection(null);
}
```

# Troubleshooting

To sync state to a prop, do not "fix" state after render (for example clamping `count` to `max` with an unconditional `setCount`, which loops forever). Move the logic to the event handler where the state is first set:

```js
const increment = () => setCount(current => Math.min(current + 1, max));
```

Now the setter only runs in response to the click, render finishes normally, and `count` never crosses `max`. Adjusting state from previous renders should use the conditional pattern shown above only when truly needed.

# Citations

[1] [set-state-in-render](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render)
