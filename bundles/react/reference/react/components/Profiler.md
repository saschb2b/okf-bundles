---
type: API Reference
title: Profiler
description: Measure the rendering performance of a React tree programmatically via an onRender callback.
resource: https://react.dev/reference/react/Profiler
tags: [react, component, profiler, performance, rendering]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Wrap a component tree in `<Profiler>` to measure its rendering performance.

```jsx
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

## Props

- `id`: A string identifying the part of the UI being measured.
- `onRender`: A callback React calls every time components within the profiled tree commit an update.

## onRender callback

```js
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings.
}
```

Parameters:

- `id`: The `id` prop of the `<Profiler>` whose tree just committed. Identifies which tree committed when using multiple profilers.
- `phase`: `"mount"`, `"update"`, or `"nested-update"`. Tells you whether the tree just mounted or re-rendered due to a change in props, state, or Hooks.
- `actualDuration`: Milliseconds spent rendering the `<Profiler>` and its descendants for the current update. Reflects how well the subtree uses memoization (for example `memo` and `useMemo`). Should drop significantly after the initial mount.
- `baseDuration`: Estimated milliseconds to re-render the entire subtree with no optimizations (sum of each component's most recent render duration). A worst-case cost; compare `actualDuration` against it to gauge whether memoization is working.
- `startTime`: Numeric timestamp for when React began rendering the current update.
- `commitTime`: Numeric timestamp for when React committed the update. Shared across all profilers in a commit, so they can be grouped.

# Usage

- Measure performance by wrapping a tree:

  ```jsx
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  ```

- Use multiple profilers to measure different parts (`id="Sidebar"`, `id="Content"`).
- Nest profilers to measure a subtree inside a larger measured tree.

# Caveats

- Profiling adds overhead and is disabled in the production build by default. To profile in production, enable a special profiling build (see the React Performance Tracks docs).
- Although lightweight, `<Profiler>` should be used only when needed; each use adds some CPU and memory overhead.
- For interactive profiling, prefer the Profiler tab in React Developer Tools, which exposes similar functionality as a browser extension.
- Components wrapped in `<Profiler>` are marked in the Component tracks of React Performance tracks even in profiling builds. In development builds, all components are marked regardless of wrapping.

# Citations

[1] [Profiler](https://react.dev/reference/react/Profiler)
