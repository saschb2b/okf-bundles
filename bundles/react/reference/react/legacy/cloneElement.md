---
type: API Reference
title: cloneElement
description: Legacy API that creates a new React element from an existing one with overridden props and children. Using it is uncommon and fragile. Prefer render props, context, or a custom Hook.
resource: https://react.dev/reference/react/cloneElement
tags: [react, legacy, elements, props, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`cloneElement` is a legacy API. Using it is uncommon and can lead to fragile code, because it makes data flow hard to trace. Prefer the alternatives below: passing data with a render prop, passing data through context, or extracting logic into a custom Hook.

# Reference

`cloneElement` creates a new React element using another element as a starting point, with overridden props and children.

```js
const clonedElement = cloneElement(element, props, ...children);
```

```js
import { cloneElement } from 'react';

const clonedElement = cloneElement(
  <Row title="Cabbage">Hello</Row>,
  { isHighlighted: true },
  'Goodbye'
);
// <Row title="Cabbage" isHighlighted={true}>Goodbye</Row>
```

## Parameters

- `element`: a valid React element (a JSX node, the result of `createElement`, or another `cloneElement` call).
- `props`: an object or `null`. With `null`, the clone keeps all original `element.props`. Otherwise each prop in `props` overrides the original, and the rest are filled from `element.props`. Passing `props.key` or `props.ref` replaces the originals.
- optional `...children`: zero or more child nodes (elements, strings, numbers, portals, empty nodes, arrays of nodes). If omitted, the original `element.props.children` is preserved.

## Returns

A React element object with:

- `type`: same as `element.type`.
- `props`: the shallow merge of `element.props` with the overriding `props`.
- `ref`: the original `element.ref`, unless overridden by `props.ref`.
- `key`: the original `element.key`, unless overridden by `props.key`.

# Usage

- Override props of an element: pass it to `cloneElement` with the props to override. A common pattern is a `List` that clones each `<Row>` child to inject `isHighlighted`.

```js
{Children.map(children, (child, index) =>
  cloneElement(child, { isHighlighted: index === selectedIndex })
)}
```

# Caveats

- Cloning does not modify the original element.
- Only pass children as multiple arguments when they are statically known, like `cloneElement(element, null, child1, child2)`. For dynamic children, pass the whole array as the third argument so React can warn about missing keys.
- `cloneElement` makes data flow harder to trace, so prefer the alternatives.

# Alternatives

- Pass data with a render prop. Accept a `renderItem` prop and call it per item, passing values like `isHighlighted`. The source of the value is explicit.
- Pass data through context. Wrap items in a context provider and have children read the value with `useContext`, instead of receiving an injected prop.
- Extract logic into a custom Hook. Move non-visual logic (selection, navigation) into a Hook like `useList` and use its return value to decide what to render.

This API is commonly paired with [Children](/reference/react/legacy/Children.md), which is also legacy. The `element` argument can be produced by [createElement](/reference/react/legacy/createElement.md), and you can guard inputs with [isValidElement](/reference/react/legacy/isValidElement.md).

# Citations
[1] [cloneElement](https://react.dev/reference/react/cloneElement)
