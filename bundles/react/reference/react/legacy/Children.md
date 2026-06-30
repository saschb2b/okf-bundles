---
type: API Reference
title: Children
description: Legacy API for manipulating and transforming the children prop. Using Children is uncommon and fragile. Prefer exposing components, accepting array props, or render props.
resource: https://react.dev/reference/react/Children
tags: [react, legacy, children, jsx, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`Children` is a legacy API. Using it is uncommon and can lead to fragile code, because the `children` data structure is opaque and the methods do not see the rendered output of components you pass in. Prefer the alternatives below: exposing multiple components, accepting an array of objects as a prop, or using a render prop.

# Reference

`Children` lets you manipulate and transform the JSX you received as the `children` prop. It exposes five methods.

## `Children.count(children)`

```js
import { Children } from 'react';
const total = Children.count(children);
```

- Parameter `children`: the value of the `children` prop.
- Returns: the number of nodes inside `children`.

## `Children.forEach(children, fn, thisArg?)`

```js
Children.forEach(children, (child, index) => { /* ... */ });
```

- `children`: the `children` prop value.
- `fn`: callback like array `forEach`, called with `(child, index)`, index starting at `0`.
- optional `thisArg`: the `this` value for `fn`, otherwise `undefined`.
- Returns: `undefined`.

## `Children.map(children, fn, thisArg?)`

```js
import { Children } from 'react';

function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child => <div className="Row">{child}</div>)}
    </div>
  );
}
```

- `children`: the `children` prop value.
- `fn`: mapping callback called with `(child, index)`; return a React node (may be empty node, string, number, element, or array of nodes).
- optional `thisArg`: the `this` value for `fn`.
- Returns: same value if `children` is `null` or `undefined`, otherwise a flat array of the nodes returned from `fn`, excluding `null` and `undefined`.

## `Children.only(children)`

```js
const element = Children.only(children);
```

- `children`: the `children` prop value.
- Returns: the single valid element. Throws if `children` is not a single React element (always throws on an array).

## `Children.toArray(children)`

```js
const result = Children.toArray(children);
result.reverse();
```

- `children`: the `children` prop value.
- Returns: a flat array of the elements in `children`. Empty nodes (`null`, `undefined`, Booleans) are omitted, and keys are recomputed from the original keys plus nesting and position.

# Usage

- Transform children: call `Children.map` to wrap each child, instead of assuming `children` is an array.
- Run code per child: call `Children.forEach`, for example to interleave separators.
- Count children: call `Children.count`.
- Convert to a real array: call `Children.toArray`, then use `filter`, `sort`, `reverse`, and other array methods.

# Caveats

- Empty nodes (`null`, `undefined`, Booleans), strings, numbers, and React elements each count as one node. Arrays do not count as a node but their children do.
- Traversal does not go deeper than React elements: their children are not traversed and Fragments are not traversed. The methods never see the rendered output of a component you pass as a child, so `Children.count` of `<p /><MoreRows />` is `2` regardless of what `MoreRows` renders.
- `Children.map` automatically combines the returned elements' keys with the original child's key. Keys returned from `fn` only need to be unique locally.
- `Children.only` throws on an array, including the output of `Children.map`.

# Alternatives

- Expose multiple components. Export a `Row` component and have callers wrap each row, instead of mapping children. This keeps working when you extract nested components.
- Accept an array of objects as a prop, for example a `rows` array, so you can use plain array methods directly.
- Use a render prop. Pass a function that returns JSX (for example `renderContent`) and call it where needed.

`cloneElement` is often used together with `Children.map`; see [cloneElement](/reference/react/legacy/cloneElement.md), which is also legacy. To build elements programmatically, see [createElement](/reference/react/legacy/createElement.md).

# Citations
[1] [Children](https://react.dev/reference/react/Children)
