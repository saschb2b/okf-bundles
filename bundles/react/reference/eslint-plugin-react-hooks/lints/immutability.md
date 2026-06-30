---
type: Lint Rule
title: immutability
description: Flags direct mutation of props, state, and other immutable values instead of creating new values.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
tags: [react, eslint, lint, state, immutability]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Mutating props, state, or other values that are meant to be immutable. Props and state are immutable snapshots and must never be mutated directly. Mutating in place and then passing the same reference to a setter produces no re-render, because the reference did not change.

Instead:

- Pass new props down to child components.
- Call the `useState` setter with new values.

# Examples

Invalid:

```js
// Array push mutation, same reference, no re-render
items.push(4);
setItems(items);

// Object property assignment
user.name = 'Bob';
setUser(user);

// Sort mutates in place
setItems(items.sort());
```

Valid:

```js
// New array
setItems([...items, 4]);

// New object
setUser({ ...user, name: 'Bob' });
```

# Troubleshooting

- Adding items to an array: build a new array, for example `setTodos([...todos, { id, text }])` or `setTodos(todos => [...todos, { id: Date.now(), text }])`.
- Updating nested objects: spread at every level you change:

```js
setUser({
  ...user,
  settings: { ...user.settings, theme: 'dark' }
});
```

# Citations

[1] [immutability](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability)
