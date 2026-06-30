---
type: API Reference
title: StrictMode
description: Enable extra development-only checks to surface common bugs early in a component tree.
resource: https://react.dev/reference/react/StrictMode
tags: [react, component, strict-mode, development, debugging]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Wrap a tree in `<StrictMode>` to enable additional development behaviors and warnings for the components inside.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Strict Mode enables these development-only behaviors:

- Components re-render an extra time to find bugs from impure rendering.
- Components re-run Effects an extra time (setup, cleanup, setup) to find bugs from missing Effect cleanup.
- Components re-run ref callbacks an extra time to find bugs from missing ref cleanup.
- Components are checked for usage of deprecated APIs.

## Props

`StrictMode` accepts no props.

# Usage

- Enable for the entire app by wrapping the root component passed to `createRoot`. If a framework calls `createRoot` for you, check its docs for how to enable Strict Mode. Recommended for new apps.
- Enable for part of the app by wrapping any subtree; checks then run on that subtree and everything below it, no matter how deep, but not on siblings outside it.

## What double rendering catches

React assumes every component is a pure function returning the same JSX for the same props, state, and context. Strict Mode calls these functions twice in development: component bodies (top-level logic only, not event handlers), updater functions passed to `useState`, set functions, `useMemo`, and `useReducer`, and some class methods like `constructor`, `render`, and `shouldComponentUpdate`. An impure function (for example one that mutates a prop array) shows the defect immediately, such as a list item appearing twice. The fix is to copy before mutating, for example `stories.slice()`.

## What re-running Effects catches

React runs an extra setup and cleanup cycle for every Effect. An Effect that subscribes (for example connecting to a chat) but lacks a cleanup function leaves a leftover connection, visible immediately as a doubled connection count. The fix is to return a cleanup function from the Effect. See [synchronizing with Effects](/escape-hatches/synchronizing-with-effects.md).

## What re-running ref callbacks catches

React runs an extra setup and cleanup cycle for every callback ref. A callback ref that adds an item to a list but does not remove it in cleanup leaks, visible immediately as a growing list. The fix is to return a cleanup function that removes the item.

## Deprecation warnings

React warns when any component inside `<StrictMode>` uses a deprecated API, such as the `UNSAFE_` class lifecycle methods (for example `UNSAFE_componentWillMount`). These appear mostly in older class components.

# Caveats

- There is no way to opt out of Strict Mode inside a tree wrapped in `<StrictMode>`; every component inside is checked.
- All Strict Mode checks run only in development and do not affect the production build.
- When Strict Mode is enabled for only part of the app, React enables only behaviors possible in production. For example, it will not double-run Effects on initial mount if `<StrictMode>` is not at the root, since that could not happen in production.
- With React DevTools installed, `console.log` calls during the second render appear dimmed, and DevTools offers a setting to suppress them.

# Citations

[1] [StrictMode](https://react.dev/reference/react/StrictMode)
