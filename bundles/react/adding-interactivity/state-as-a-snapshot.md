---
type: Guide
title: State as a Snapshot
description: Why state behaves like a snapshot fixed per render, so it does not update immediately after you set it.
resource: https://react.dev/learn/state-as-a-snapshot
tags: [react, state, rendering, snapshot]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

State variables look like regular JavaScript variables, but state behaves more like a snapshot. Setting it does not change the variable you already have. It requests a re-render. Each render captures a fixed snapshot of state, so a render's event handlers always see the state from that render.

# Setting state triggers renders

For the UI to react to an event, you update the state, which requests a re-render. When you click a button that calls `setIsSent(true)`:

1. The event handler executes.
2. `setIsSent(true)` sets `isSent` to `true` and queues a render.
3. React re-renders the component according to the new value.

# Rendering takes a snapshot in time

Rendering is React calling your component function. The JSX it returns is a snapshot of the UI in time. The props, event handlers, and local variables were all calculated using the state at the time of that render.

State does not live in your function. It lives in React itself, outside your function. When React calls your component, it hands you a snapshot of the state for that particular render. Your returned JSX uses the state values from that render.

## The counter example

You might expect three `setNumber(number + 1)` calls to add 3, but `number` only increments once per click.

```jsx
const [number, setNumber] = useState(0);

<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

Setting state only changes it for the next render. During the first render `number` is `0`, so in that render's handler all three calls are `setNumber(0 + 1)`. You set state to `1` three times, and React re-renders with `number` equal to `1`, not `3`. You can mentally substitute the value: this render's handler is effectively three `setNumber(0 + 1)` calls.

# State over time

A state variable's value never changes within a render, even in asynchronous code.

```jsx
<button onClick={() => {
  setNumber(number + 5);
  alert(number); // shows 0, the value fixed for this render
}}>+5</button>
```

A delayed read shows the same thing. The alert still shows `0` even after the re-render, because the handler captured the snapshot at the time of the click.

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setTimeout(() => { alert(number); }, 3000); // still 0
}}>+5</button>
```

React keeps state values fixed within one render's event handlers. A form that reads `message` and `to` inside a delayed alert will show the values captured when the form was submitted, even if you change a field during the delay. You do not need to worry whether state changed while the code is running. To read the latest state before a re-render, use an updater function, covered in [Queueing a Series of State Updates](queueing-a-series-of-state-updates.md).

# Recap

- Setting state requests a new render.
- React stores state outside of your component, as if on a shelf.
- When you call [useState](/reference/react/hooks/useState.md), React gives you a snapshot of the state for that render.
- Variables and event handlers do not survive re-renders. Every render has its own.
- Every render (and the functions inside it) always sees the snapshot of the state React gave that render.
- You can mentally substitute state in event handlers, like you do for the rendered JSX.
- Event handlers created in the past hold the state values from the render in which they were created.

# Citations

[1] [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
