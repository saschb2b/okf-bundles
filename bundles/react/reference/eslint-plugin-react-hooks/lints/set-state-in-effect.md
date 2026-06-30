---
type: Lint Rule
title: set-state-in-effect
description: Flags synchronous setState calls inside effects that cause an avoidable extra render pass.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
tags: [react, eslint, lint, effects, state]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Calling `setState` synchronously inside an effect. Doing so forces React to restart the render cycle: it re-renders, applies the DOM changes, then runs effects again, an extra pass that could have been avoided by computing the value during render or deriving it from props. The synchronous update happens before the browser can paint, causing performance issues and visual jank. Often you do not need an effect at all.

# Examples

Invalid:

```js
// Extra render, use initial state instead
useEffect(() => { setItems(data); }, [data]);

// Setting loading state synchronously
useEffect(() => {
  setLoading(true);
  fetchData().then(() => setLoading(false));
}, []);

// Deriving state from props in an effect
useEffect(() => {
  setSelected(items.find(i => i.id === selectedId));
}, [selectedId, items]);
```

Valid:

```js
// setState in an effect is fine when the value comes from a ref
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);

// Calculate during render instead of storing in state
const selected = items.find(i => i.id === selectedId);
```

# Best practice

When something can be calculated from existing props or state, do not put it in state. Calculate it during rendering. This is faster, simpler, and less error-prone. See [You Might Not Need an Effect](/escape-hatches/you-might-not-need-an-effect.md).

# Citations

[1] [set-state-in-effect](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect)
