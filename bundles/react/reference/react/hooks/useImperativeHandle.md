---
type: API Reference
title: useImperativeHandle
description: React Hook that customizes the handle exposed to a parent through a ref, replacing the default DOM node with your own methods.
resource: https://react.dev/reference/react/useImperativeHandle
tags: [react, hook, refs, imperative]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useImperativeHandle` customizes the handle exposed as a ref.

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

Call it at the top level of your component to customize the ref handle it exposes.

```jsx
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);
}
```

## Parameters

- `ref`: The `ref` you received as a prop to the component.
- `createHandle`: A function that takes no arguments and returns the ref handle you want to expose. The handle can have any type, but is usually an object with the methods you want to expose.
- `dependencies` (optional): The list of all reactive values referenced inside `createHandle` (props, state, and every variable and function declared in the component body). The list must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React compares each dependency with `Object.is`. If a dependency changed since the last render, or if you omit this argument, `createHandle` re-executes and the new handle is assigned to the ref.

Note: Starting with React 19, `ref` is available as a prop. In React 18 and earlier you had to obtain the `ref` from [forwardRef](/reference/react/legacy/forwardRef.md).

## Returns

`useImperativeHandle` returns `undefined`.

# Usage

- Expose a custom ref handle to the parent. Keep your own internal ref to the real DOM node and expose only the methods you choose, so the parent cannot reach the whole node. See [manipulating the DOM with refs](/escape-hatches/manipulating-the-dom-with-refs.md).
  ```jsx
  function MyInput({ ref }) {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      focus() { inputRef.current.focus(); },
      scrollIntoView() { inputRef.current.scrollIntoView(); },
    }), []);
    return <input ref={inputRef} />;
  }
  ```
- Expose your own imperative methods. The exposed methods do not have to match DOM methods. Compose several actions into one method, such as a `scrollAndFocusAddComment()` that scrolls a list and focuses an input.

# Caveats

- Do not overuse refs. Use them only for imperative behaviors you cannot express as props: scrolling to a node, focusing a node, triggering an animation, selecting text, and so on.
- If you can express something as a prop, do not use a ref. Instead of exposing a `{ open, close }` handle from a `Modal`, prefer an `isOpen` prop like `<Modal isOpen={isOpen} />`. [Effects](/escape-hatches/synchronizing-with-effects.md) can help you expose imperative behaviors via props.

# Citations

[1] [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
