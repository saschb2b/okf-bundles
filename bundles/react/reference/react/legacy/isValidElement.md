---
type: API Reference
title: isValidElement
description: Legacy API that checks whether a value is a React element. Rarely needed; mostly useful before calling an API that only accepts elements, such as cloneElement.
resource: https://react.dev/reference/react/isValidElement
tags: [react, legacy, elements, validation, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`isValidElement` is grouped with the legacy APIs and is very uncommon to need. It is mainly useful before calling an API that only accepts elements (like [cloneElement](/reference/react/legacy/cloneElement.md)) when you want to avoid an error on a non-element argument. Unless you have a specific reason, you probably do not need it. Do not use it to check whether something is renderable, since valid React nodes (numbers, strings, arrays) are not React elements.

# Reference

```js
const isElement = isValidElement(value);
```

```js
import { isValidElement, createElement } from 'react';

isValidElement(<p />);                 // true
isValidElement(createElement('p'));    // true
isValidElement(25);                    // false
isValidElement('Hello');               // false
isValidElement({ age: 42 });           // false
```

## Parameters

- `value`: any value to check.

## Returns

`true` if `value` is a React element, otherwise `false`.

# Usage

- Check whether a value is a React element. Elements are values from a [JSX tag](/describing-the-ui/writing-markup-with-jsx.md) or from [createElement](/reference/react/legacy/createElement.md). Both `<p />` and `<MyComponent />`, and `createElement('p')` and `createElement(MyComponent)`, return `true`. Strings, numbers, objects, arrays, `null`, portals, and a component type itself return `false`.

# Caveats

- Only JSX tags and objects returned by `createElement` count as React elements. A number like `42` is a valid React node but not a valid React element. Arrays and portals created with `createPortal` are not React elements either.
- React elements versus React nodes: a component may return any React node (an element, a portal, a string, a number, `true`, `false`, `null`, `undefined`, or an array of nodes). `isValidElement` checks specifically for an element, not for a renderable node, so do not use it to decide if a value can be rendered.

# Related

The values it validates are produced by [createElement](/reference/react/legacy/createElement.md), and the main consumer that requires an element is [cloneElement](/reference/react/legacy/cloneElement.md).

# Citations
[1] [isValidElement](https://react.dev/reference/react/isValidElement)
