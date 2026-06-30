---
type: Guide
title: Updating Arrays in State
description: Update an array held in React state with non-mutating operations that return a new array.
resource: https://react.dev/learn/updating-arrays-in-state
tags: [react, state, immutability, arrays, immer]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Arrays are mutable in JavaScript, but you should treat arrays in React state as read-only. Do not reassign items like `arr[0] = 'bird'`, and do not call mutating methods like `push()` or `pop()`. Instead, build a new array with non-mutating methods like `filter()` and `map()` and pass it to the state setter from [useState](/reference/react/hooks/useState.md).

# Methods to avoid versus prefer

Avoid the methods that mutate the array in place. Prefer the methods that return a new array.

| operation | avoid (mutates)                   | prefer (returns new array)        |
| --------- | --------------------------------- | --------------------------------- |
| adding    | `push`, `unshift`                 | `concat`, `[...arr]` spread       |
| removing  | `pop`, `shift`, `splice`          | `filter`, `slice`                 |
| replacing | `splice`, `arr[i] = ...`          | `map`                             |
| sorting   | `reverse`, `sort`                 | copy the array first              |

Alternatively, use Immer, which lets you use methods from both columns.

## Pitfall: slice versus splice

`slice` and `splice` are named similarly but differ. `slice` copies an array or part of it and does not mutate. `splice` mutates the array to insert or delete items. In React you will reach for `slice` (no `p`) far more often.

# Adding

Create a new array containing the existing items plus the new one. Spread syntax appends or prepends.

```jsx
// append
setArtists([ ...artists, { id: nextId++, name } ]);

// prepend
setArtists([ { id: nextId++, name }, ...artists ]);
```

# Removing

Filter out the item you want to drop. `filter` returns a new array and leaves the original untouched.

```jsx
setArtists(artists.filter(a => a.id !== artist.id));
```

# Transforming

Use `map` to return a new array where some or all items are changed, based on each item or its index.

```jsx
const nextShapes = shapes.map(shape =>
  shape.type === 'square'
    ? shape
    : { ...shape, y: shape.y + 50 }
);
setShapes(nextShapes);
```

# Replacing

Use `map` with the item index (its second argument) to replace specific items without mutating.

```jsx
const nextCounters = counters.map((c, i) =>
  i === index ? c + 1 : c
);
setCounters(nextCounters);
```

# Inserting

To insert at an arbitrary position, spread the slice before the insertion point, then the new item, then the rest.

```jsx
const insertAt = 1;
const nextArtists = [
  ...artists.slice(0, insertAt),
  { id: nextId++, name },
  ...artists.slice(insertAt)
];
setArtists(nextArtists);
```

# Other changes (reverse, sort)

`reverse()` and `sort()` mutate. Copy the array first with spread, then mutate the copy.

```jsx
const nextList = [...list];
nextList.reverse();
setList(nextList);
```

Copying an array is shallow. The copy holds the same item references, so you still cannot mutate an item inside it. `nextList[0].seen = true` mutates the original `list[0]` too, because both arrays point to the same object.

# Updating objects inside arrays

Objects are not really located inside arrays. The array points to separate objects, which may be shared by other state. To update a field on an item without mutation, copy from the changed item all the way up. Use `map` to substitute the old item with a new copy.

```jsx
setMyList(myList.map(artwork =>
  artwork.id === artworkId
    ? { ...artwork, seen: nextSeen } // new object with the change
    : artwork                        // unchanged items kept as is
));
```

# Concise updates with Immer

Updating nested arrays without mutation can get repetitive. The Immer library lets you write mutating-style code against a `draft` and produces the copies for you. Mutating the draft, including `push()` and `pop()`, is safe because it never touches the original state.

```jsx
const [myList, updateMyList] = useImmer(initialList);

updateMyList(draft => {
  const artwork = draft.find(a => a.id === id);
  artwork.seen = nextSeen;
});
```

# Recap

- You can put arrays into state, but you cannot change them in place.
- Instead of mutating an array, create a new version and pass it to the setter.
- Use `[...arr, newItem]` spread syntax to add items.
- Use `filter()` and `map()` to remove or transform items into a new array.
- Copy the array first if you need `reverse()` or `sort()`, and copy nested objects to change their fields.
- Use Immer to keep update logic concise.

# Citations

[1] [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
