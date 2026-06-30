---
type: API Reference
title: Activity
description: Hide and restore the UI and internal state of children, with pre-rendering and selective hydration.
resource: https://react.dev/reference/react/Activity
tags: [react, component, activity, state, hydration]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`<Activity>` hides and restores the UI and internal state of its children.

```jsx
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

When hidden, React visually hides children with `display: none` and destroys their Effects, cleaning up active subscriptions. While hidden, children still re-render in response to new props, but at lower priority than visible content. When visible again, React reveals the children with their previous state restored and re-creates their Effects. Activity is effectively a mechanism for background activity: content likely to reappear is maintained rather than discarded, while staying free of unwanted side effects.

## Props

- `children`: The UI to show and hide.
- `mode`: `'visible'` or `'hidden'`. Defaults to `'visible'` if omitted.

# Usage

- Restore the state of hidden components: instead of conditionally mounting and unmounting (which destroys state), wrap in `<Activity>` so React saves state for later restoration.
- Restore the DOM of hidden components: because hiding uses `display: none`, the children's DOM is preserved, so ephemeral state such as text typed into a `<textarea>` survives hiding and is restored.
- Pre-render content likely to become visible: a hidden Activity still renders its children at lower priority, without mounting their Effects, so code and Suspense-enabled data can load ahead of time. Only Suspense-enabled data sources are fetched during pre-rendering: Suspense-enabled frameworks (Relay, Next.js), [lazy](/reference/react/apis/lazy.md), and reading a cached Promise with [use](/reference/react/apis/use.md). Activity does not detect data fetched inside an Effect.
- Speed up interactions during page load: Activity boundaries participate in Selective Hydration, dividing the tree into independent units so, for example, tab buttons become interactive before the tab contents mount. Always-visible Activity boundaries can also improve hydration performance.

# Caveats

- If an Activity is inside a [ViewTransition](/reference/react/components/ViewTransition.md) and becomes visible from a [startTransition](/reference/react/apis/startTransition.md) update, it activates the ViewTransition's `enter` animation; becoming hidden activates `exit`.
- A hidden Activity that renders only text produces no DOM output, because there is no element to apply visibility to. The same component as visible renders the text.
- Hidden components keep their DOM, so DOM-level side effects persist. For example a `<video>` keeps playing when hidden; add a `useLayoutEffect` cleanup that pauses it. Use `useLayoutEffect` (not `useEffect`) since the cleanup ties to the UI being visually hidden. The common cases needing cleanup are `<video>`, `<audio>`, and `<iframe>`.
- When hidden, all children's Effects are cleaned up; conceptually the children unmount while state is saved. If you rely on an Effect mounting to clean up side effects, move that work into the Effect's cleanup function instead.
- Use [StrictMode](/reference/react/components/StrictMode.md) to eagerly discover Effects lacking proper cleanup.

# Citations

[1] [Activity](https://react.dev/reference/react/Activity)
