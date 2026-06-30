---
type: API Reference
title: useDeferredValue
description: React Hook that defers updating a part of the UI, keeping a stale value on screen while a new value renders in the background.
resource: https://react.dev/reference/react/useDeferredValue
tags: [react, hook, performance, concurrent, suspense]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useDeferredValue` defers updating a part of the UI.

```js
const deferredValue = useDeferredValue(value, initialValue?)
```

Call it at the top level of your component to get a deferred version of a value.

```jsx
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

## Parameters

- `value`: The value you want to defer. It can have any type.
- `initialValue` (optional): A value to use during the initial render of the component. If omitted, `useDeferredValue` does not defer during the initial render, because there is no previous version of `value` to render instead.

## Returns

The current value. On the initial render this is `initialValue` (if given) or the value you provided. During updates, React first re-renders with the old value (returning the old value), then re-renders in the background with the new value (returning the updated value).

# Usage

- Show stale content while fresh content loads. Pass the deferred value to a component that may suspend, wrapped in [Suspense](/reference/react/components/Suspense.md). The user keeps seeing the old result until the new data is ready instead of a fallback.
  ```jsx
  const deferredQuery = useDeferredValue(query);
  // <Suspense fallback={<h2>Loading...</h2>}>
  //   <SearchResults query={deferredQuery} />
  // </Suspense>
  ```
- Indicate stale content. Compare `value !== deferredValue` to dim or style the stale results while the new ones load.
  ```jsx
  <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
    <SearchResults query={deferredQuery} />
  </div>
  ```
- Defer re-rendering a slow part of the UI. Pass the deferred value to an expensive component and wrap that component in [memo](/reference/react/apis/memo.md) so it re-renders in the background without blocking the input.

# Caveats

- When an update is inside a Transition, `useDeferredValue` always returns the new `value` and does not spawn a deferred render, since the update is already deferred.
- Pass either primitive values (strings, numbers) or objects created outside of rendering. Creating a new object during render and passing it in makes it different on every render and causes unnecessary background re-renders.
- When the received value differs (by `Object.is`), React schedules a background re-render with the new value in addition to the current render with the previous value. The background re-render is interruptible: a new update to `value` restarts it from scratch.
- It is integrated with [Suspense](/reference/react/components/Suspense.md). If the background update suspends, the user keeps seeing the old deferred value rather than a fallback.
- It does not by itself prevent extra network requests.
- It adds no fixed delay. React starts the background re-render as soon as the original render finishes. Updates from events such as typing interrupt and take priority over it.
- The background re-render does not fire Effects until it commits to the screen. If it suspends, its Effects run after the data loads and the UI updates.

# Citations

[1] [useDeferredValue](https://react.dev/reference/react/useDeferredValue)
