---
type: API Reference
title: ViewTransition
description: Animate component trees on enter, exit, update, and shared-element changes using the browser View Transition API.
resource: https://react.dev/reference/react/ViewTransition
tags: [react, component, view-transition, animation, transitions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`<ViewTransition>` (Canary and Experimental channels) animates a component tree during Transitions and Suspense reveals using the browser View Transition API.

```jsx
import { ViewTransition } from 'react';

<ViewTransition>
  <div>...</div>
</ViewTransition>
```

## Props

- `name` (optional): A string or object naming the View Transition, used for shared element transitions. If omitted, React generates a unique name per boundary to prevent unexpected animations.
- View Transition Class props, each `"auto"`, `"none"`, a class-name string, or an object: `enter`, `exit`, `update`, `share`, `default`. They select the CSS class applied to children when that animation type activates.
- View Transition Event props, each a callback: `onEnter`, `onExit`, `onShare`, `onUpdate`.

A class value of `auto` uses the browser default animation, `none` disables that type, and a string is a custom CSS class. Object values map a Transition Type to a value, with a `default` key as the fallback. If `default` is `"none"`, all other triggers are off unless explicitly listed.

## Animation triggers

React decides the type automatically:

- `enter`: the first ViewTransition inserted in this Transition.
- `exit`: the first ViewTransition deleted in this Transition.
- `update`: the boundary has DOM mutations inside it, or changes size or position because of an immediate sibling.
- `share`: a named ViewTransition in a deleted subtree and another with the same name in an inserted subtree, in the same Transition, animate from deleted to inserted. `share` takes precedence over `enter` and `exit`.

By default `<ViewTransition>` cross-fades (browser default).

## Event callbacks

Each event receives `(instance, types)` and should return a cleanup function called when the transition finishes. `instance` exposes pseudo-elements `old`, `new`, `group`, `imagePair`, and the `name` string; call `.animate()` on `old` or `new` to drive imperative animations with the Web Animations API. `types` is an `Array<string>` of Transition Types (empty if none). Only one event fires per boundary per Transition, and `onShare` takes precedence over `onEnter` and `onExit`.

# Usage

- Animate on enter and exit by placing `<ViewTransition>` before any DOM node and updating inside [startTransition](/reference/react/apis/startTransition.md).
- Animate enter and exit with [Activity](/reference/react/components/Activity.md): showing or hiding the Activity activates the wrapped ViewTransition's `enter` or `exit` while preserving state.
- Animate a shared element with the `name` prop so an unmounting tree and a mounting tree with the same name animate from one to the other; use globally unique names.
- Animate reorder of items in a list: wrap each item's content directly (no wrapper DOM element above the `<ViewTransition>`) so the `update` animation triggers per item. Use proper keys; do not use shared-element names for reorders.
- Animate from Suspense content: React waits for data, new CSS, fonts (up to 500ms), and wrapped images before animating. A fallback-to-content reveal inside one `<ViewTransition>` is an `update`; separate `<ViewTransition>`s on the fallback and content are treated as `exit` and `enter`. See [Suspense](/reference/react/components/Suspense.md).
- Opt out of an animation with `update="none"` on an inner boundary, letting children opt back in with their own `<ViewTransition>`.
- Customize animations by naming View Transition Classes per type (`enter`, `exit`, `update`, `share`) and styling `::view-transition-old(.class)` and `::view-transition-new(.class)` in CSS.
- Customize with Transition Types via [addTransitionType](/reference/react/apis/addTransitionType.md), mapping types (for example `navigation-back`) to classes, and read `types` in event callbacks to vary JavaScript animations.
- Build View Transition enabled routers by unblocking pending Navigation in `useLayoutEffect` (not `useEffect`, which deadlocks). Animations are skipped for popstate (back button) navigations; upgrade to the Navigation API to restore them.

# Caveats

- Use `name` only for shared element transitions; React auto-generates unique names otherwise.
- Plain `setState` updates immediately and does not activate `<ViewTransition>`; only updates wrapped in a Transition, `<Suspense>`, or `useDeferredValue` activate it.
- `<ViewTransition>` animates a single image that can move, scale, and cross-fade; not every nested element animates its own position, which is faster but may lose continuity. Add more boundaries manually where needed.
- `<ViewTransition>` currently works only in the DOM; React Native and other platforms are in progress.
- It activates only when placed before any DOM node. A `<div>` above the `<ViewTransition>` breaks enter and exit.
- Two mounted `<ViewTransition>` components with the same `name` throw an error; give each a unique name (for example `item-${id}`).
- Shared and reorder pairs do not form if either side is outside the viewport; such cases fall back to enter or exit (this does not apply when the same component instance changes position, which always animates as `update`).
- A `flushSync` during the transition sequence causes React to skip the animation, since it relies on completing asynchronously.
- Always return cleanup functions from event callbacks so the browser can cancel interrupted animations.
- Check `@media (prefers-reduced-motion)` to tone down or disable animations; React does not do this automatically.

# Citations

[1] [ViewTransition](https://react.dev/reference/react/ViewTransition)
