---
type: API Reference
title: Fragment (<>...</>)
description: Group elements without adding a wrapper DOM node, optionally with a key or a ref.
resource: https://react.dev/reference/react/Fragment
tags: [react, component, fragment, ref, key]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`<Fragment>`, usually written with the shorthand `<>...</>`, groups elements where a single element is required. It produces no DOM node, so the children render as siblings with no wrapper.

```jsx
<>
  <OneChild />
  <AnotherChild />
</>
```

## Props

- `key` (optional): Fragments declared with the explicit `<Fragment>` form may take a key, used when rendering a list of fragments.
- `ref` (optional): A ref object or callback. React supplies a `FragmentInstance` as the value for interacting with the wrapped DOM nodes without a wrapper element.

The shorthand `<>...</>` accepts neither `key` nor `ref`. To pass either, import `Fragment` from `react` and use `<Fragment key={...} ref={...}>`.

## FragmentInstance

When a `ref` is passed, React provides a `FragmentInstance` whose methods act on the first-level host (DOM) children of the fragment (it looks through nested React components but not through nested DOM elements).

- `addEventListener(type, listener, options?)`: adds a listener to all first-level DOM children. Returns `undefined`.
- `removeEventListener(type, listener, options?)`: removes the listener from all first-level DOM children. Returns `undefined`.
- `dispatchEvent(event)`: dispatches an event on the fragment, which can bubble to the parent DOM node. Returns `true` unless `preventDefault()` was called.
- `focus(options?)`: focuses the first focusable node, searching all nested children depth-first. Returns `undefined`.
- `focusLast(options?)`: focuses the last focusable node, searching depth-first then in reverse. Returns `undefined`.
- `blur()`: removes focus if the active element is within the fragment, otherwise does nothing. Returns `undefined`.
- `observeUsing(observer)`: starts observing all first-level DOM children with an `IntersectionObserver` or `ResizeObserver`. Returns `undefined`.
- `unobserveUsing(observer)`: stops observing with the given observer. Returns `undefined`.
- `getClientRects()`: returns `Array<DOMRect>` for all first-level DOM children.
- `getRootNode(options?)`: returns the `Document`, `ShadowRoot`, or the `FragmentInstance` itself when there is no parent DOM node.
- `compareDocumentPosition(otherNode)`: returns a position bitmask. Empty fragments and portal-rendered children include `DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC`.
- `scrollIntoView(alignToTop?)`: scrolls children into view. `alignToTop` true (default) aligns the first child to the top; false aligns the last child to the bottom. It does not accept an options object (passing one throws).

# Usage

- Return multiple elements from a component without a wrapper:

  ```jsx
  function Post() {
    return (
      <>
        <PostTitle />
        <PostBody />
      </>
    );
  }
  ```

- Assign a group to a variable and pass it as a prop, like `const buttons = <><OK /><Cancel /></>`.

- Group text together with components, for example `From <DatePicker /> to <DatePicker />`.

- Render a list of fragments with a key, using the explicit form:

  ```jsx
  posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
  ```

- Attach event listeners to a group without a wrapper node by passing a `ref` and calling `addEventListener` inside an Effect (with `removeEventListener` cleanup).

- Manage focus across a group with `focus`, `focusLast`, and `blur` (these search all nested children, not just first-level ones).

- Scroll a group into view with `scrollIntoView()` (top) or `scrollIntoView(false)` (bottom).

- Observe visibility with `observeUsing` plus an `IntersectionObserver`, and share a single observer across fragments via the `reactFragments` property on each first-level DOM child.

# Caveats

- React does not reset state when going from `<><Child /></>` to `[<Child />]` or `<Child />` and back. This holds only one level deep: `<><><Child /></></>` to `<Child />` does reset state.
- `key` and `ref` require the explicit `<Fragment>` form, not `<>...</>`.
- Child-targeting methods (`addEventListener`, `observeUsing`, `getClientRects`) operate only on first-level host children, not on nodes nested inside another DOM element.
- `focus` and `focusLast` differ: they search all nested children depth-first for focusable elements.
- `observeUsing` does not work on text nodes; React warns in development if the fragment has only text children.
- Listeners added via `addEventListener` are not applied to hidden Activity trees; they apply automatically when the boundary becomes visible. See the Activity caveat at [Activity](/reference/react/components/Activity.md).
- `scrollIntoView` rejects an options object; use the `alignToTop` boolean. With no children, it scrolls the nearest sibling or parent as a fallback.
- Each first-level DOM child of a fragment with a `ref` gets a `reactFragments` property (a `Set<FragmentInstance>`), enabling a shared/cached observer across fragments.

# Citations

[1] [Fragment (<>...</>)](https://react.dev/reference/react/Fragment)
