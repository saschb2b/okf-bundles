---
type: Guide
title: Manipulating the DOM with Refs
description: Use refs to access DOM nodes that React manages, for focus, scroll, and measurement, and the rules for doing so safely.
resource: https://react.dev/learn/manipulating-the-dom-with-refs
tags: [react, refs, useRef, dom]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React updates the DOM to match your render output, so components rarely manipulate it directly. Sometimes you need access to a DOM node managed by React: to focus it, scroll to it, or measure its size and position. There is no built-in API for those, so you reach for a ref to the node. Get one with the [useRef](/reference/react/hooks/useRef.md) Hook and pass it to a JSX `ref` attribute. This is an escape hatch from the rest of [Escape Hatches](escape-hatches.md), related to holding non-render values in [Referencing Values with Refs](referencing-values-with-refs.md).

# Getting a ref to the node

Import and call `useRef`, then pass the result to the `ref` attribute of the JSX tag whose DOM node you want.

```js
import { useRef } from 'react';

function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus(); // browser API on the DOM node
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

`useRef` returns an object with a single `current` property, initially `null`. When React creates the DOM node for the tag, it puts a reference to that node into `current`. You can then call browser APIs like `focus()`, `scrollIntoView()`, or read measurements. Refs survive re-renders, like state, but setting them does not trigger a re-render. You can have multiple refs in one component (for example, one per image in a carousel).

# Managing a list of refs with a ref callback

You cannot call `useRef` in a loop, condition, or inside `map()`, because Hooks must run at the top level of a component. To attach a ref to each item of a dynamic list, pass a function to the `ref` attribute. This is a ref callback. React calls it with the DOM node when setting the ref, and calls the cleanup function it returns when clearing the ref. Maintain your own Map from item ID to node.

```jsx
<li
  ref={node => {
    const map = getMap();
    map.set(cat, node);
    return () => map.delete(cat); // cleanup clears the entry
  }}
>
```

In Strict Mode, ref callbacks run twice in development to help find bugs.

# Accessing another component's DOM nodes

A component does not expose its DOM nodes by default. To let a parent reach a child's node, pass a ref as a regular prop and forward it to a built-in element.

```js
function MyInput({ ref }) {
  return <input ref={ref} />;
}

function MyForm() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
}
```

`inputRef.current` in the parent now points to the child's `<input>` node. To expose only a subset of the API (for example `focus()` but not styling), use [useImperativeHandle](/reference/react/hooks/useImperativeHandle.md). It instructs React to provide a custom object as the ref value to the parent instead of the DOM node.

```js
function MyInput({ ref }) {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() { realInputRef.current.focus(); }, // only focus is exposed
  }));
  return <input ref={realInputRef} />;
}
```

# When React attaches refs

Every update splits into two phases, render (React works out what should be on screen) and commit (React applies changes to the DOM). Do not access refs during render: on the first render the DOM nodes do not exist yet (`ref.current` is `null`), and during updates they have not been updated yet. React sets `ref.current` during the commit, after updating the DOM (it sets affected refs to `null` first, then to the new nodes). Usually you access refs from event handlers. If there is no specific event, you may need an Effect (see [Synchronizing with Effects](synchronizing-with-effects.md)).

# Flushing state updates with flushSync

State updates are queued, so the DOM is not updated immediately after a `set` call. If you add an item and then scroll to it in the same handler, you scroll before the new node exists. Wrap the state update in `flushSync` from `react-dom` to force React to update the DOM synchronously.

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setTodos([...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView(); // node already in the DOM
```

# Pitfalls

- **Refs are an escape hatch.** Use them only to step outside React, for managing focus, scroll position, or calling browser APIs React does not expose. Manipulating another component's DOM nodes makes code fragile.
- **Avoid changing DOM nodes managed by React.** Modifying, adding to, or removing children that React manages (for example, calling `.remove()` on a conditionally rendered node) leads to inconsistent visuals or crashes, because React then cannot reconcile correctly. After a manual removal, a later `setState` to show the node again can crash.
- **You can safely modify parts React has no reason to update.** For example, an always-empty `<div>` in the JSX: React never touches its children, so adding or removing nodes there is safe.

# Recap

- Refs are a generic concept, but most often hold DOM elements.
- Pass `<div ref={myRef}>` to put a DOM node into `myRef.current`.
- Usually use refs for non-destructive actions: focusing, scrolling, measuring.
- A component does not expose its DOM nodes unless you opt in via a `ref` prop.
- Avoid changing DOM nodes managed by React. If you must, change only parts React has no reason to update.

# Citations

[1] [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
