---
type: API Reference
title: flushSync
description: A react-dom escape hatch that forces React to flush pending updates inside a callback synchronously so the DOM is updated immediately.
resource: https://react.dev/reference/react-dom/flushSync
tags: [react, react-dom, rendering, synchronous, escape-hatch]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
});
// By this line, the DOM is updated.
```

Forces React to flush any pending work and update the DOM synchronously. Most of the time it can be avoided. Use it as a last resort.

## Parameters

- `callback`: a function. React calls it immediately and flushes any updates it contains synchronously. It may also flush other pending updates, Effects, or updates inside Effects. If an update suspends, fallbacks may be re-shown.

## Returns

`flushSync` returns `undefined`.

# Usage

## Flush updates for third-party integrations

Needed when integrating with browser APIs or UI libraries that expect the DOM to reflect state changes synchronously by the end of a callback. A common case is `onbeforeprint`: flush state so the print dialog sees the updated DOM.

```js
function handleBeforePrint() {
  flushSync(() => {
    setIsPrinting(true);
  });
}
// window.addEventListener('beforeprint', handleBeforePrint);
```

Without `flushSync`, React batches updates asynchronously and the print dialog would render the stale value. If your app only uses React APIs, `flushSync` should be unnecessary.

# Caveats

- Can significantly hurt performance. Use sparingly.
- May force pending Suspense boundaries to show their fallback state.
- May run pending Effects and synchronously apply their updates before returning.
- May flush updates outside the callback when necessary to flush the updates inside it (for example pending click updates).

# Troubleshooting

- Error "flushSync was called from inside a lifecycle method": React cannot flush while already rendering. This happens when called inside rendering, `useLayoutEffect`, `useEffect`, or class lifecycle methods, where it noops and warns. Move the call to an event handler (safe), or as a last-last resort defer it in a `queueMicrotask`, which is even worse for performance.

```js
function handleClick() {
  flushSync(() => {
    setSomething(newValue);
  });
}
```

# Citations

[1] [flushSync](https://react.dev/reference/react-dom/flushSync)
