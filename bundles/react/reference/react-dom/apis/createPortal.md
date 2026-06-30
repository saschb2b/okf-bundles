---
type: API Reference
title: createPortal
description: A react-dom API that renders children into a different DOM node while keeping them part of the React tree for context and event bubbling.
resource: https://react.dev/reference/react-dom/createPortal
tags: [react, react-dom, portal, modal, dom]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```js
import { createPortal } from 'react-dom';

<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

A portal changes only the physical DOM placement of its children. In every other respect the children behave as a normal child of the component that renders them: they read context from the parent React tree, and events bubble up the React tree, not the DOM tree.

## Parameters

- `children`: anything React can render: JSX, a Fragment, a string, a number, or an array of these.
- `domNode`: an existing DOM node (for example from `document.getElementById()` or `document.body`). The node must already exist. Passing a different node on a later render recreates the portal content.
- optional `key`: a unique string or number used as the portal's key.

## Returns

A React node that you include in JSX or return from a component. When React renders it, it places `children` inside `domNode`.

# Usage

## Render to a different part of the DOM

Lets part of a component escape its containers, useful for content that must appear above and outside the rest of the page.

```jsx
function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>Inside the parent div.</p>
      {createPortal(
        <p>Teleported into document.body.</p>,
        document.body
      )}
    </div>
  );
}
```

## Render a modal dialog

A portal lets a modal float above the page even when its summoning component sits inside a container with `overflow: hidden` or other clipping styles. Manage keyboard focus and follow the [WAI-ARIA Modal Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal) for accessibility.

## Render into non-React server markup

Use portals to add islands of interactivity inside a server-rendered page (for example a Rails app), treating the whole thing as one React tree with shared state.

## Render into non-React DOM nodes

Store a third-party widget's DOM node in state, then `createPortal` React content into it once it exists, for example a popup inside a map widget.

# Caveats

- Events propagate according to the React tree, not the DOM tree. A click inside a portal fires an `onClick` on a React ancestor even though the portal's DOM lives elsewhere. Stop propagation inside the portal, or move the portal up the React tree, if this causes issues.

# Citations

[1] [createPortal](https://react.dev/reference/react-dom/createPortal)
