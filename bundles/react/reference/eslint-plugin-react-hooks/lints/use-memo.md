---
type: Lint Rule
title: use-memo
description: Flags useMemo callbacks with no return value, which signals the wrong hook is being used.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo
tags: [react, eslint, lint, memoization, hooks]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

A `useMemo` callback that returns nothing. `useMemo` is for computing and caching an expensive value, not for running side effects. Without a return value it yields `undefined`, which defeats its purpose and usually means the wrong Hook is being used.

# Examples

Invalid:

```js
// No return value, 'processed' is always undefined
const processed = useMemo(() => {
  data.forEach(item => console.log(item));
}, [data]);
```

Valid:

```js
// Returns the computed value
const processed = useMemo(() => {
  return data.map(item => item * 2);
}, [data]);
```

# Troubleshooting

To run side effects when dependencies change, do not put them in `useMemo`. Use the appropriate place instead:

```js
// Event handler for user-triggered effects
const handleClick = () => {
  analytics.track('ButtonClicked', { userId: user.id });
};

// useEffect for synchronization with external systems
useEffect(() => {
  localStorage.setItem('preferredTheme', theme);
  document.body.className = theme;
}, [theme]);
```

# Related

Related to manual memoization with [useMemo](/reference/react/hooks/useMemo.md) and the compiler-driven ["use memo" directive](/reference/react-compiler/directives/use-memo.md).

# Citations

[1] [use-memo](https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo)
