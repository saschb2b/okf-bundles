---
type: Guide
title: Introduction
description: What React Compiler is, what it optimizes, whether to adopt it, supported build tools, and how it interacts with existing manual memoization.
resource: https://react.dev/learn/react-compiler/introduction
tags: [react, react-compiler, memoization, re-renders, build-tools]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React Compiler is a build-time tool that automatically optimizes your React app. It works with plain JavaScript and understands the [Rules of React](/reference/rules/rules-of-hooks.md), so you do not need to rewrite code to use it. It applies memoization for you, removing the need to hand-write `useMemo`, `useCallback`, and `React.memo`.

# What React Compiler does

It applies optimal memoization at build time so your app only re-renders when necessary. React is often fast enough without optimization, but manual memoization to keep apps responsive is tedious, easy to get wrong, and adds code to maintain. The compiler does this automatically.

Before, you memoize by hand:

```js
import { useMemo, useCallback, memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => expensiveProcessing(data), [data]);
  const handleClick = useCallback((item) => onClick(item.id), [onClick]);
  return <div>{processedData.map(item =>
    <Item key={item.id} onClick={() => handleClick(item)} />)}</div>;
});
```

After, you write the same logic without manual memoization and the compiler optimizes it:

```js
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data);
  const handleClick = (item) => onClick(item.id);
  return <div>{processedData.map(item =>
    <Item key={item.id} onClick={() => handleClick(item)} />)}</div>;
}
```

A subtle manual-memoization bug: even with `handleClick` wrapped in `useCallback`, the inline arrow `() => handleClick(item)` is recreated every render, so `Item` always gets a new `onClick` prop and memoization breaks. React Compiler optimizes this correctly with or without the arrow function, so `Item` only re-renders when `props.onClick` changes.

# What kind of memoization it adds

The compiler's automatic memoization targets update performance (re-rendering existing components), focused on two cases:

- Skipping cascading re-renders. Re-rendering `<Parent />` would re-render much of its subtree even though only `<Parent />` changed.
- Skipping expensive calculations done outside React, for example an expensive array-processing call inside a component or hook.

For expensive non-React functions, note:

- The compiler only memoizes React components and hooks, not every function.
- Its memoization is not shared across multiple components or hooks, so the same expensive call used in many components runs repeatedly.
- Profile first (see [how to tell if a calculation is expensive](/reference/react/hooks/useMemo.md)) before adding your own memoization outside React.

# Should I try it?

Everyone is encouraged to start using React Compiler. It is currently optional, but some future React features may require it to work fully.

# Is it safe?

React Compiler is stable and tested extensively in production, including at Meta. A safe rollout for your app depends on the health of your codebase and how well it follows the [Rules of React](/reference/rules/components-and-hooks-must-be-pure.md).

# Supported build tools

The compiler installs across several build tools including Babel, Vite, Metro, and Rsbuild. See [installation](installation.md) for setup. It is primarily a light Babel plugin wrapper around a core compiler that is decoupled from Babel; first-class swc and oxc support is in progress so Babel will not be required in the future. Next.js users can enable the swc-invoked compiler from v15.3.1 and up.

# What about useMemo, useCallback, and React.memo

By default the compiler memoizes based on its own analysis and heuristics, usually as precise or more precise than hand-written memoization.

- `useMemo` and `useCallback` still work as an escape hatch when you need precise control, for example when a memoized value is an effect dependency and you must keep the effect from firing on insignificant changes.
- For new code, rely on the compiler and reach for `useMemo`/`useCallback` only where you need that control.
- For existing code, leave existing memoization in place (removing it can change compilation output), or test carefully before removing it.

# Recap

- React Compiler optimizes at build time, replacing most manual memoization.
- Adopt it incrementally if needed, then debug runtime issues by hunting Rules of React violations.
- Next: [install the compiler](installation.md), plan [incremental adoption](incremental-adoption.md), and learn [debugging](debugging.md).

# Citations

[1] [Introduction](https://react.dev/learn/react-compiler/introduction)
