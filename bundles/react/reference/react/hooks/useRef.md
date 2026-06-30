---
type: API Reference
title: useRef
description: React Hook that references a mutable value which does not trigger re-renders.
resource: https://react.dev/reference/react/useRef
tags: [react, hooks, refs, dom]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useRef` declares a ref, a mutable container whose changes do not trigger a re-render. Call it at the top level of your component.

```js
const ref = useRef(initialValue)
```

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
}
```

## Parameters

- `initialValue`: The value the ref object's `current` property should be initially. Any type. This argument is ignored after the initial render.

## Returns

An object with a single property:

- `current`: Initially the `initialValue` you passed. You can set it to anything else. If you pass the ref object as a `ref` attribute to a JSX node, React sets `current` to that DOM node.

On the next renders, `useRef` returns the same object.

# Usage

- Reference a value with a ref: store values that persist across renders without triggering re-renders, such as timer IDs.

```js
const intervalRef = useRef(0);
intervalRef.current = setInterval(() => { /* ... */ }, 1000);
clearInterval(intervalRef.current);
```

Refs let you store information between re-renders, do not trigger a re-render when changed, and are local to each component instance. See the guide [Referencing Values with Refs](/escape-hatches/referencing-values-with-refs.md).

- Manipulate the DOM with a ref: declare `const inputRef = useRef(null)`, pass it as `<input ref={inputRef} />`, then call methods like `inputRef.current.focus()` after the node mounts. React sets `current` back to `null` when the node is removed. See [Manipulating the DOM with Refs](/escape-hatches/manipulating-the-dom-with-refs.md).

```jsx
const inputRef = useRef(null);
// ...
<input ref={inputRef} />
inputRef.current.focus();
```

- Avoid recreating the ref contents: initialize lazily so an expensive object is built only once.

```js
const playerRef = useRef(null);
if (playerRef.current === null) {
  playerRef.current = new VideoPlayer();
}
```

To expose a ref from your own component, accept `ref` as a prop and forward it to a built-in child.

# Caveats

- You can mutate `ref.current`. Unlike state, it is mutable. But do not mutate an object held in a ref if that object is used for rendering.
- Changing `ref.current` does not re-render the component. React is unaware of the change because a ref is a plain JavaScript object.
- Do not write or read `ref.current` during rendering, except for initialization. This makes the component's behavior unpredictable.
- In Strict Mode, React calls your component function twice in development, creating each ref object twice and discarding one version. Production is unaffected.

# Citations

[1] [useRef](https://react.dev/reference/react/useRef)
