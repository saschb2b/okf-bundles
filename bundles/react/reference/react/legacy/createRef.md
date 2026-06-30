---
type: API Reference
title: createRef
description: Legacy API that creates a ref object, used mostly in class components. Function components should use useRef instead.
resource: https://react.dev/reference/react/createRef
tags: [react, legacy, refs, class-components, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`createRef` is mostly used for [class components](/reference/react/legacy/Component.md). It is grouped with the legacy APIs. Function components should use [useRef](/reference/react/hooks/useRef.md) instead, which always returns the same object across renders. Use `createRef` only inside class components.

# Reference

```js
import { createRef, Component } from 'react';

class MyComponent extends Component {
  inputRef = createRef();
  // ...
}
```

## Parameters

`createRef` takes no parameters.

## Returns

An object with a single property:

- `current`: initially `null`. You can set it later. If you pass the ref to a JSX node's `ref` attribute, React sets `current` to the corresponding node.

# Usage

- Declare a ref in a class component: call `createRef` and assign it to a class field, then pass it as `ref` on a JSX node. React populates `this.fieldRef.current` with the DOM node.

```js
class Form extends Component {
  inputRef = createRef();
  handleClick = () => { this.inputRef.current.focus(); };
  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>Focus the input</button>
      </>
    );
  }
}
```

# Caveats

- `createRef` always returns a different object. It is equivalent to writing `{ current: null }` yourself.
- In a function component, use [useRef](/reference/react/hooks/useRef.md), which always returns the same object. Conceptually `const ref = useRef()` is like `const [ref] = useState(() => createRef(null))`.

# Alternatives

- Migrate to a function component with `useRef`. Replace the `createRef` class field with a `useRef(null)` call and use the same `ref.current.focus()` pattern in an event handler.

```jsx
function Form() {
  const inputRef = useRef(null);
  function handleClick() { inputRef.current.focus(); }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

# Citations
[1] [createRef](https://react.dev/reference/react/createRef)
