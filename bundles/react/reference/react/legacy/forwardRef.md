---
type: API Reference
title: forwardRef
description: Legacy API that lets a component receive a ref and forward it to a child. In React 19 it is no longer necessary; pass ref as a regular prop. forwardRef will be deprecated in a future release.
resource: https://react.dev/reference/react/forwardRef
tags: [react, legacy, refs, deprecated, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

In React 19, `forwardRef` is no longer necessary: pass `ref` as a regular prop instead. `forwardRef` will be deprecated in a future release. It is documented here as a legacy API for existing code and for versions before React 19.

# Reference

`forwardRef` lets your component expose a DOM node (or other handle) to its parent through a [ref](/escape-hatches/manipulating-the-dom-with-refs.md).

```js
const SomeComponent = forwardRef(render);
```

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

## Parameters

- `render`: the render function for your component. React calls it with the `props` and the `ref` the component received from its parent. The returned JSX is the component output.

## Returns

A React component that you can render in JSX. Unlike a plain function component, it can receive a `ref` prop.

## `render` function

React calls `render(props, ref)`:

- `props`: the props passed by the parent.
- `ref`: the `ref` passed by the parent. It can be an object or a function, or `null` if no ref was passed. Pass it to a child component or to [useImperativeHandle](/reference/react/hooks/useImperativeHandle.md).

# Usage

- Expose a DOM node to the parent: wrap the component in `forwardRef` and attach the received `ref` to the DOM node you want to expose.

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

The parent passes a ref and can then call methods like `focus()` on the exposed node.

- Forward a ref through multiple components: forward the `ref` to your own child component, which itself forwards it to a DOM node. A ref to the outer component then resolves to the inner DOM node.
- Expose an imperative handle instead of a DOM node: hold the node in an internal `useRef`, then pass the forwarded `ref` to [useImperativeHandle](/reference/react/hooks/useImperativeHandle.md) to expose a constrained object like `{ focus, scrollIntoView }`.

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() { inputRef.current.focus(); },
    scrollIntoView() { inputRef.current.scrollIntoView(); },
  }), []);
  return <input {...props} ref={inputRef} />;
});
```

# Caveats

- In Strict Mode the render function runs twice (development only) to surface accidental impurities; one result is ignored.
- Do not overuse refs. Use them only for imperative behaviors you cannot express as props (focusing, scrolling, animating, selecting text). If something can be a prop, make it a prop, for example `<Modal isOpen={isOpen} />` instead of an imperative `{ open, close }` handle.

# Troubleshooting

- A `ref` to a `forwardRef` component is always `null`: usually the `ref` was not actually attached. Pass it down to a DOM node or another ref-accepting component. Conditional rendering (for example `showInput && <input ref={ref} />`) can also leave it unattached.

# Migration in React 19

Pass `ref` as a normal prop and read it from `props`, dropping the `forwardRef` wrapper. See the React 19 ref-as-a-prop change. For class components, refs use [createRef](/reference/react/legacy/createRef.md).

# Citations
[1] [forwardRef](https://react.dev/reference/react/forwardRef)
