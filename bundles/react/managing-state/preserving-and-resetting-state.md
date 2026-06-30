---
type: Guide
title: Preserving and Resetting State
description: How React decides when to keep a component's state and when to reset it, based on position in the render tree and the key prop.
resource: https://react.dev/learn/preserving-and-resetting-state
tags: [react, state, reconciliation, key]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

State is isolated between components. React tracks which state belongs to which component by the component's position in the render tree, not by the JSX markup or by a variable name. When you re-render, React keeps state for as long as the same component renders at the same position, and resets state when a different component (or the same component with a different `key`) renders there.

# State is tied to a position in the tree

React builds a render tree from your UI. Each piece of state lives at a position in that tree.

- Same component at the same position keeps its state across re-renders.
- Render the same component twice (two `<Counter />` at two positions) and each gets its own independent state.
- Removing a component, or rendering a different component at its position, destroys its state. React recreates state from scratch if that position is filled again later.

```jsx
{isFancy ? (
  <Counter isFancy={true} />
) : (
  <Counter isFancy={false} />
)}
```

Both branches render a `Counter` as the first child of the same parent, so from React's point of view it is the same position. The count is preserved when `isFancy` flips. React sees positions in the UI tree, not in the conditional code.

# Same position resets state for a different component

If you render a different component type at the same position, the subtree's state is reset, including the state of its children.

```jsx
{isPaused ? (
  <p>See you later!</p>
) : (
  <Counter />
)}
```

When `isPaused` becomes true, the `Counter` is removed and its state is destroyed. Switching back creates a fresh `Counter` with state from scratch.

# Pitfalls

- Do not nest component function definitions. Defining a component inside another component creates a brand new function on every render, so React sees a different component type at the position and resets all of its state (and its children's state) every time the parent re-renders. Always declare components at the top level of the module.

```jsx
// Wrong: MyTextField is redefined on each render, state resets every keystroke.
export default function MyComponent() {
  function MyTextField() { /* ... */ }
  return <MyTextField />;
}

// Right: define at module top level.
function MyTextField() { /* ... */ }
export default function MyComponent() {
  return <MyTextField />;
}
```

# Resetting state at the same position

Sometimes you want to reset state even though the same component renders at the same position (for example, switching the recipient of a chat draft). Two options:

1. Render the components in different positions.

```jsx
{isPlayerA &&
  <Counter person="Taylor" />
}
{!isPlayerA &&
  <Counter person="Sarah" />
}
```

Each conditional slot is a separate position, so the two counters never share state.

2. Give each component a distinct `key` (recommended). The `key` makes React treat the components as different identities even at the same position. Keys are not global; they only identify position within the parent.

```jsx
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```

# Resetting a form with a key

A common use is resetting an uncontrolled subtree when the underlying data changes. In a chat app, keying the editor by the contact id resets the draft when you switch recipients, so you do not send a half-typed message to the wrong person.

```jsx
<Chat key={to.id} contact={to} />
```

Without the key, the same `Chat` stays at the same position and keeps the old draft text.

# Recap

- React keeps state for as long as the same component renders at the same position in the tree.
- State is not kept in JSX tags. It is associated with the tree position you put that JSX in.
- You can force a subtree to reset its state by giving it a different `key`.
- Do not nest component definitions, or you will reset state by accident.

# Citations

[1] [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
