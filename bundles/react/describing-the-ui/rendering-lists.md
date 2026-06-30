---
type: Guide
title: Rendering Lists
description: How to render multiple components from a collection using map() and filter(), with stable keys.
resource: https://react.dev/learn/rendering-lists
tags: [react, lists, keys, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

You often need to render many similar components from a collection of data. Use the JavaScript array methods `filter()` and `map()` to turn data into JSX, and give each list item a stable `key` so React can track items across renders.

# Rendering data from an array

Three steps turn an array into rendered list items: move the data into an array, map each member to a JSX node, then return the nodes from your component.

```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
];

export default function List() {
  const listItems = people.map(person => <li>{person}</li>);
  return <ul>{listItems}</ul>;
}
```

# Filtering arrays

Use `filter()` to select a subset before mapping it to JSX.

```jsx
const chemists = people.filter(person => person.profession === 'chemist');
const listItems = chemists.map(person =>
  <li key={person.id}>
    <img src={getImageUrl(person)} alt={person.name} />
    <p>{person.name}: {person.profession}</p>
  </li>
);
```

# Keeping list items in order with keys

A `key` tells React which array item each component corresponds to. Keys become critical when items can move, be inserted, or be deleted, so React can match elements between renders. JSX elements produced directly inside a `map()` call always need a key.

Rules of keys:

- Keys must be unique among siblings.
- Keys must not change between renders.
- Do not generate keys on the fly (for example with `Math.random()`).

Good key sources:

- Database IDs for data from a database.
- A locally incrementing counter or `crypto.randomUUID()` for data generated on the client.
- Any stable ID derived from the data itself.

# Rendering several DOM nodes per item

When one item must render multiple DOM nodes, use `<Fragment>` with a key. The shorthand `<>...</>` cannot take a key. Fragments leave no wrapper element in the DOM.

```jsx
import { Fragment } from 'react';

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

# Pitfalls

- Do not use the array index as a key when the list can reorder, be filtered, or have items added or removed. It causes subtle bugs.
- Do not generate keys during rendering (for example `key={Math.random()}`); they must be stable across renders.
- Keys are a hint to React only. They are not passed to your component as a prop. If a child needs the value, pass it explicitly as a separate prop.
- An arrow function with a block body must `return` explicitly: `map(item => { return <li>{item}</li>; })`. Implicit return needs no braces: `map(item => <li>{item}</li>)`.

# Recap

- Use `map()` to transform arrays into JSX elements.
- Use `filter()` to select items before mapping.
- Give each list item a unique, stable `key`.
- Keys help React identify which items changed, were added, or were deleted.
- Use a keyed `<Fragment>` when an item renders multiple DOM nodes.

# Citations

[1] [Rendering Lists](https://react.dev/learn/rendering-lists)
