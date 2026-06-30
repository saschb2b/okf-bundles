---
type: Rule
title: Components and Hooks must be pure
description: Components and Hooks must be pure functions so React can re-run, pause, and optimize render safely.
resource: https://react.dev/reference/rules/components-and-hooks-must-be-pure
tags: [react, rules, purity, render, hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Pure components and Hooks only calculate and return output, nothing more. Purity lets React re-render multiple times, pause and resume work, and prioritize updates safely. This is the foundation that makes React's concurrent features correct. It builds on the conceptual guide [Keeping Components Pure](/describing-the-ui/keeping-components-pure.md).

# What purity means

A pure component or Hook is:

- **Idempotent**: same output for the same inputs (props, state, context for components; arguments for Hooks).
- **Has no side effects in render**: side-effecting code runs separately from render, in an event handler or an [Effect](/reference/react/hooks/useEffect.md).
- **Does not mutate non-local values**: never modify values that were not created locally during render.

# How React runs your code

- **Render** calculates what the next UI should look like. React diffs it against the previous calculation and commits only the minimum DOM changes, then flushes Effects.
- **Code runs in render** when it sits at the top level of a component body. A quick heuristic: top-level code likely runs during render.
- **Event handlers and Effects do not run in render.** Handlers run on user interaction; Effects run after render.

```js
function Dropdown() {
  const selectedItems = new Set();        // runs during render
  const onSelect = (item) => {            // event handler, runs on interaction
    selectedItems.add(item);
  };
  useEffect(() => {                        // Effect, runs after render
    logForAnalytics(selectedItems);
  }, [selectedItems]);
}
```

# Components and Hooks must be idempotent

Return the same output for the same inputs. All code that runs during render must also be idempotent. Non-idempotent calls like `new Date()` or `Math.random()` return a different result each call, so they break the rule when used in render.

```js
function Clock() {
  const time = new Date(); // Bad: different result every render, value gets stuck
  return <span>{time.toLocaleString()}</span>;
}
```

Move the non-idempotent call out of render by synchronizing it with an Effect (or compute it in an event handler if it only needs to update on interaction).

```js
function useTime() {
  const [time, setTime] = useState(() => new Date()); // initializer runs once
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000); // Good: out of render
    return () => clearInterval(id);
  }, []);
  return time;
}
```

# Side effects must run outside of render

Side effects (any observable effect beyond returning a value) must not run in render, because React may render a component multiple times. Prefer event handlers. Use `useEffect` only as a last resort.

- "Effects" are code wrapped in `useEffect`. "Side effects" is the broader term.

Acceptable cases:

- **Local mutation** is fine: creating an array in render and pushing into it is safe because the value is recreated each render and not remembered.

```js
function FriendList({ friends }) {
  const items = [];                               // Good: locally created
  for (const friend of friends) {
    items.push(<Friend key={friend.id} friend={friend} />); // Good: local mutation
  }
  return <section>{items}</section>;
}
```

- **Lazy initialization** like `SuperCalculator.initializeIfNotReady()` is fine if it does not affect other components.

Not acceptable:

- Mutating a value created **outside** the component (it persists across renders and duplicates output).
- **Changing the DOM** in render, for example `document.title = product.title`. Synchronize with `document` in an Effect instead.

# Props and state are immutable

Props and state are snapshots. Never mutate them directly.

- **Props**: copy instead of mutating. `const url = new Url(item.url, base);` not `item.url = ...`.
- **State**: update with the setter from `useState`, never assign to the variable. `setCount(count + 1)` not `count = count + 1`. Direct assignment does not trigger a re-render and leaves the UI stale.

# Hook arguments and return values are immutable

Once a value is passed to a Hook, do not modify it. Hooks may memoize based on their arguments, so mutating an argument makes the memoized result incorrect. Copy first: `icon = { ...icon, enabled: false }`. Do not modify a Hook's return value either, since it may be memoized.

# Values are immutable after being passed to JSX

React may eagerly evaluate JSX before the component finishes rendering, so mutating a value after it has been used in JSX can produce a stale UI. Create a new value instead of mutating a shared one between two JSX uses.

```js
function Page({ colour }) {
  const headerStyles = { colour, size: "large" };
  const header = <Header styles={headerStyles} />;
  const footerStyles = { colour, size: "small" }; // Good: new value, not a mutation
  const footer = <Footer styles={footerStyles} />;
  return <>{header}<Content />{footer}</>;
}
```

# Related rules

- Components must only be called by React, not invoked directly: see [React calls Components and Hooks](/reference/rules/react-calls-components-and-hooks.md).
- Hooks have placement restrictions: see [Rules of Hooks](/reference/rules/rules-of-hooks.md).
- The conceptual introduction to purity is [Keeping Components Pure](/describing-the-ui/keeping-components-pure.md).
- The lint that enforces purity at the call site is [rules-of-hooks](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks.md).

# Citations

[1] [Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure)
