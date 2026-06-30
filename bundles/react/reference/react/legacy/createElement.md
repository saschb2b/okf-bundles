---
type: API Reference
title: createElement
description: Legacy API that creates a React element without JSX. Prefer JSX in modern code; createElement is the alternative when JSX is unavailable.
resource: https://react.dev/reference/react/createElement
tags: [react, legacy, elements, jsx, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`createElement` is grouped with the legacy APIs. It lets you create a React element without [JSX](/describing-the-ui/writing-markup-with-jsx.md) and is the alternative when you cannot or do not want to use JSX. In modern code, prefer writing JSX, which makes it easier to see which closing tag matches which opening tag. `createElement` remains valid and is what JSX compiles to.

# Reference

```js
const element = createElement(type, props, ...children);
```

```js
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement('h1', { className: 'greeting' }, 'Hello');
}
```

## Parameters

- `type`: a valid React component type, either a tag name string (`'div'`, `'span'`) or a React component (a function, a class, or a special type like `Fragment`).
- `props`: an object or `null` (treated as an empty object). React creates an element whose props match. `ref` and `key` are special: they are not exposed as `element.props.ref` or `element.props.key`, but as `element.ref` and `element.key`.
- optional `...children`: zero or more child nodes (elements, strings, numbers, portals, empty nodes, arrays of nodes).

## Returns

A React element object with:

- `type`: the `type` you passed.
- `props`: the `props` you passed, except `ref` and `key`.
- `ref`: the `ref` you passed, or `null`.
- `key`: the `key` you passed coerced to a string, or `null`.

# Usage

- Create an element without JSX: call `createElement` with a type, props, and children. To render your own component, pass the function or class as `type` instead of a string.

```js
createElement('h1', { className: 'greeting' }, 'Hello ', createElement('i', null, name), '. Welcome!');
createElement(Greeting, { name: 'Taylor' });
```

- A React element is a lightweight, immutable description of UI. Both `<Greeting name="Taylor" />` and `createElement(Greeting, { name: 'Taylor' })` produce an object like `{ type: Greeting, props: { name: 'Taylor' }, key: null, ref: null }`. Creating it does not render the component or create DOM, and is extremely cheap.

# Caveats

- Treat elements and their props as immutable; never change them after creation. In development React freezes the returned element and its `props` shallowly.
- In JSX, start a tag with a capital letter to render a custom component: `<Something />` is `createElement(Something)`, while `<something />` is `createElement('something')` (a built-in HTML tag).
- Pass children as multiple arguments only when statically known. For dynamic children, pass the whole array as the third argument so React can warn about missing keys.

# Related

To check whether a value is a valid element, see [isValidElement](/reference/react/legacy/isValidElement.md). To derive a new element from one, see [cloneElement](/reference/react/legacy/cloneElement.md).

# Citations
[1] [createElement](https://react.dev/reference/react/createElement)
