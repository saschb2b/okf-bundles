---
type: Guide
title: Updating Objects in State
description: Update an object held in React state by creating a new copy instead of mutating the existing one.
resource: https://react.dev/learn/updating-objects-in-state
tags: [react, state, immutability, objects, immer]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

State can hold any JavaScript value, including objects. Objects are technically mutable, but you should treat objects you put in React state as read-only. To update an object, create a new object (or copy the existing one with changes) and pass it to the state setter from [useState](/reference/react/hooks/useState.md). Mutating an object already in state will not trigger a re-render and can cause bugs.

# Treat state as read-only

Mutating an object that is already in state does not work. React does not know the object changed, so it does not re-render.

```jsx
// Broken: mutation, no re-render
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}

// Fixed: create a new object and call the setter
onPointerMove={e => {
  setPosition({ x: e.clientX, y: e.clientY });
}}
```

# Local mutation is fine

Mutating a freshly created object, before it is passed to the setter, is acceptable because nothing in state references it yet.

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

# Copying with spread syntax

Use the spread operator to copy existing fields and override only the ones that change. This is a shallow copy: nested objects are shared, not copied.

```jsx
setPerson({
  ...person,          // copy old fields
  firstName: newValue // override one field
});
```

# Updating nested objects

Nested objects are not truly nested. They are separate objects that point to each other through properties. To update a nested field without mutation, create a copy at every level from the change up to the top.

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: { title: 'Blue Nana', city: 'Hamburg' }
});

setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi'
  }
});
```

# Simplify with Immer

For deeply nested structures, repeated spreading gets verbose. The Immer library lets you write mutating-style code against a `draft` while still producing new immutable objects under the hood. Install it with `npm install use-immer`.

```jsx
import { useImmer } from 'use-immer';

const [person, updatePerson] = useImmer(initialPerson);

updatePerson(draft => {
  draft.artwork.city = e.target.value; // looks like mutation, actually safe
});
```

# Why immutability matters

- Debugging is easier because past logs are not overwritten by later mutations.
- React can compare object identity (`prevObj === obj`) to decide quickly whether state changed and skip work.
- Future React features assume state is treated as snapshots.
- Undo, redo, and time travel are simpler when past state copies are preserved.
- React stays simpler internally because it does not need to wrap your objects in Proxies.

# Recap

- Treat all objects in state as immutable.
- Create a new object instead of mutating one already in state, then pass it to the setter.
- Use `{ ...obj, field: newValue }` spread syntax for shallow updates.
- Spread at every level to update deeply nested objects.
- Use Immer for convenient update syntax without manual copying.

# Citations

[1] [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
