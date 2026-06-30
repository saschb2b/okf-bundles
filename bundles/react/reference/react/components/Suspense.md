---
type: API Reference
title: Suspense
description: Display a fallback UI until the children of a boundary have finished loading.
resource: https://react.dev/reference/react/Suspense
tags: [react, component, suspense, loading, transitions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`<Suspense>` shows a fallback until its children finish loading.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

## Props

- `children`: The real UI to render. If `children` suspends while rendering, the boundary switches to rendering `fallback`.
- `fallback`: An alternate UI rendered while `children` has not finished loading. Any valid React node, typically a lightweight placeholder such as a spinner or skeleton. React switches to `fallback` when `children` suspends and back to `children` when the data is ready. If `fallback` itself suspends, it activates the closest parent Suspense boundary.

# Usage

- Display a fallback while content loads by wrapping the part of the tree that suspends. Only Suspense-enabled data sources trigger the boundary: data fetching with Suspense-enabled frameworks (Relay, Next.js), lazy-loading component code with [lazy](/reference/react/apis/lazy.md), and reading a cached Promise with [use](/reference/react/apis/use.md). Suspense does not detect data fetched inside an Effect or event handler.
- Reveal content together at once: by default the whole tree inside one boundary is a single unit, so if any child suspends, all of them are replaced by the fallback and appear together when ready.
- Reveal nested content as it loads by nesting Suspense boundaries; the closest parent shows the fallback for whichever level is still loading, creating a loading sequence. Do not wrap every component; boundaries should match the loading sequence you want users to experience.
- Show stale content while fresh content loads with [useDeferredValue](/reference/react/hooks/useDeferredValue.md), passing a deferred value down and optionally dimming the stale list with `opacity`.
- Prevent already-revealed content from hiding by marking the update as a Transition with [startTransition](/reference/react/apis/startTransition.md). A Transition keeps the previous content visible and only waits long enough to avoid hiding revealed content.
- Indicate that a Transition is in progress by using [useTransition](/reference/react/hooks/useTransition.md) for an `isPending` boolean.
- Reset Suspense boundaries on navigation by giving a `key` (for example `<ProfilePage key={id} />`) so different parameters are treated as different content. Suspense-integrated routers do this automatically.
- Provide a fallback for server errors and client-only content: with streaming server rendering, a thrown error finds the closest `<Suspense>` and includes its fallback in the server HTML. Throwing when `typeof window === 'undefined'` opts a component out of server rendering.

# Caveats

- React does not preserve state for renders that suspended before mounting for the first time; once loaded, it retries rendering the suspended tree from scratch.
- If a boundary was showing content and then suspends again, the `fallback` is shown again unless the update was caused by [startTransition](/reference/react/apis/startTransition.md) or [useDeferredValue](/reference/react/hooks/useDeferredValue.md).
- When React hides already-visible content because it suspended again, it cleans up [layout Effects](/reference/react/hooks/useLayoutEffect.md) in the content tree and fires them again when the content is shown, so layout-measuring Effects do not run while content is hidden.
- Suspense integrates with under-the-hood optimizations such as Streaming Server Rendering and Selective Hydration.
- During an urgent update React will not prevent the fallback; opt in with `startTransition` or `useDeferredValue`. Newly mounted Suspense boundaries always show their fallback immediately, even during a Transition.

# Citations

[1] [Suspense](https://react.dev/reference/react/Suspense)
