---
type: Guide
title: React Performance tracks
description: Custom entries that visualize React-specific events and metrics on the browser Performance panel timeline.
resource: https://react.dev/reference/dev-tools/react-performance-tracks
tags: [react, dev-tools, performance, profiling, scheduler]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React Performance tracks are specialized custom entries on the browser Performance panel's timeline. They visualize React-specific events (renders, commits, effects, scheduler priorities, server work) alongside network, JavaScript execution, and event loop activity on one synchronized timeline, giving a complete picture of application behavior.

# Availability

Tracks are only in development and profiling builds, never production (the instrumentation adds overhead).

- **Development**: enabled by default. Server Components and Server Requests tracks are development-only.
- **Profiling**: only Scheduler tracks are enabled by default. The Components track lists only components in subtrees wrapped in [`<Profiler>`](/reference/react/components/Profiler.md), unless the React Developer Tools extension is enabled, in which case all components appear. Server tracks are not available in profiling builds.

When enabled, tracks appear automatically in traces recorded with the Performance panel of browsers that provide the extensibility APIs.

## Using profiling builds

Use `react-dom/profiling` instead of `react-dom/client`. The recommended approach is aliasing `react-dom/client` to `react-dom/profiling` at build time via bundler aliases, rather than editing each import. Your framework may have built-in support.

# Tracks

## Scheduler

The Scheduler manages tasks of different priorities. The track has four subtracks:

- **Blocking**: synchronous updates, often from user interactions.
- **Transition**: non-blocking background work, usually via [`startTransition`](/reference/react/apis/startTransition.md).
- **Suspense**: work for Suspense boundaries, such as showing fallbacks or revealing content.
- **Idle**: lowest priority, done when nothing higher is pending.

### Render phases

Each render pass shows phases on the timeline:

- **Update**: what caused the new render pass.
- **Render**: React calls component render functions; the rendered subtree appears on the Components track with the same color scheme.
- **Commit**: changes are submitted to the DOM and layout effects run, like [`useLayoutEffect`](/reference/react/hooks/useLayoutEffect.md).
- **Remaining Effects**: passive effects run, usually after paint, where [`useEffect`](/reference/react/hooks/useEffect.md) runs. One exception: for discrete events like clicks, this phase can run before paint.

### Cascading updates

If an update is scheduled during a render pass, React may discard completed work and start a new pass, a common performance regression. In development builds, React shows which component scheduled the update (general or cascading). Click the "Cascading update" entry to see an enhanced stack trace, including the method that scheduled the update.

## Components

Visualizes component durations as a flamegraph, where each entry covers a component's render plus all descendant children. Effect durations are a separate flamegraph with a color scheme matching the Scheduler phase.

- Not all effects are shown by default. To avoid clutter and overhead, only effects of 0.05ms or longer, or those that triggered an update, are displayed.
- Extra events during render and effects: **Mount** and **Unmount** (subtree mounted or unmounted), and **Reconnect** and **Disconnect** (the [`<Activity>`](/reference/react/components/Activity.md)-limited equivalents).
- **Changed props**: in development builds, click a component render entry to inspect prop changes and identify unnecessary renders.

## Server

Development-only tracks for server work.

- **Server Requests**: visualizes all Promises that end up in a React Server Component, including `fetch` and async Node.js file operations. React combines Promises started inside third-party code into a single span (for example one `getUser` span instead of many internal `fetch` spans). Click a span for the creation stack trace and the resolved value. Rejected Promises show in red with their rejected value.
- **Server Components**: visualizes the durations of Server Components and the Promises they awaited, as a flamegraph; darker color means longer duration. To see all I/O, use the Server Requests track. There is always a "Primary" track; if React renders Server Components concurrently it adds "Parallel" tracks, capping at the last Parallel track once more than 8 render concurrently.

# Pitfalls

- Profiling instrumentation adds overhead, so it is disabled in production by default.
- Server Components and Server Requests tracks exist only in development builds.

# Related

- Wrap subtrees to surface them in profiling builds with [`<Profiler>`](/reference/react/components/Profiler.md).
- Background on the render and commit phases: [Render and Commit](/adding-interactivity/render-and-commit.md).
- Server work originates from [Server Components](/reference/rsc/server-components.md).

# Citations

[1] [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks)
