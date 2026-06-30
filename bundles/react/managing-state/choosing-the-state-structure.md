---
type: Guide
title: Choosing the State Structure
description: Five principles for shaping state so it stays in sync, avoids impossible states, and is easy to update without introducing bugs.
resource: https://react.dev/learn/choosing-the-state-structure
tags: [react, state, data-modeling, bugs]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Structuring state well separates a component that is pleasant to modify and debug from one that is a constant source of bugs. The goal is to make state easy to update without introducing mistakes. Make your state as simple as it can be, but no simpler.

# Principles for structuring state

1. Group related state. If you always update two or more variables together, merge them into one.
2. Avoid contradictions in state. Do not let several pieces of state disagree with each other.
3. Avoid redundant state. If you can calculate it from props or existing state during render, do not store it in state.
4. Avoid duplication in state. The same data in multiple variables or nested objects is hard to keep in sync.
5. Avoid deeply nested state. Flat (normalized) state is easier to update.

## Group related state

If two state variables always change together, unify them so you never forget to keep them in sync. Also group into an object or array when you do not know how many pieces of state you will need (for example, a form with user-added custom fields).

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

Pitfall: with an object in state, you cannot update one field without copying the others. `setPosition({ x: 100 })` drops `y`. Use `setPosition({ ...position, x: 100 })`, or split into two variables and call `setX(100)`.

## Avoid contradictions in state

Two booleans like `isSending` and `isSent` that should never both be true leave room for impossible states. Replace them with one `status` variable holding one of three valid values: 'typing', 'sending', 'sent'. Derive read-only constants for readability:

```js
const isSending = status === 'sending';
const isSent = status === 'sent';
```

These are not state, so they cannot get out of sync.

## Avoid redundant state

If you can calculate information from props or existing state during render, do not put it in state. Instead of a `fullName` state variable, derive it:

```js
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName;
```

### Do not mirror props in state

Initializing state from a prop only captures the prop's first value; later prop changes are ignored.

```js
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor); // stale on later prop changes
}
```

Use the prop directly: `const color = messageColor;`. Mirroring is correct only when you intentionally want to ignore prop updates. Name such props with an `initial` or `default` prefix to signal that further changes are ignored.

## Avoid duplication in state

Storing a `selectedItem` object that also lives inside an `items` array duplicates data; editing the list will not update the selection. Store an ID instead and look the item up during render:

```js
const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);
const selectedItem = items.find((item) => item.id === selectedId);
```

For selection patterns generally, keep an ID or index in state, not the object itself.

## Avoid deeply nested state

If state is too nested to update easily, flatten it. Instead of each place holding an array of child places, have each place hold an array of child IDs, plus a flat mapping from ID to place (like a database table).

```js
export const initialTravelPlan = {
  0: { id: 0, title: '(Root)', childIds: [1, 42, 46] },
  1: { id: 1, title: 'Earth', childIds: [2, 10, 19] },
  2: { id: 2, title: 'Africa', childIds: [3, 4, 5] },
  // ...
};
```

Removing a place then updates only two levels: the parent's `childIds` and the root table object.

Improving memory usage: also delete removed items and their children from the table. Use [Immer](/adding-interactivity/updating-objects-in-state.md) to keep update logic concise. Sometimes you can reduce nesting by moving ephemeral UI state (like whether an item is hovered) into the child components.

# Recap

- If two state variables always update together, consider merging them into one.
- Choose state variables carefully to avoid impossible states.
- Structure state to reduce the chance of making a mistake updating it.
- Avoid redundant and duplicate state so you do not need to keep it in sync.
- Do not put props into state unless you specifically want to prevent updates.
- For patterns like selection, keep an ID or index in state instead of the object itself.
- If updating deeply nested state is complicated, try flattening it.

# Citations

[1] [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
