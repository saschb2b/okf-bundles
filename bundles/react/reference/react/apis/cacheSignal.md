---
type: API Reference
title: cacheSignal
description: Returns an AbortSignal that aborts when the cache() lifetime ends, for cancelling in-flight work.
resource: https://react.dev/reference/react/cacheSignal
tags: [react, server-components, caching, abort-signal]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`cacheSignal` lets you know when the [cache](/reference/react/apis/cache.md) lifetime is over. It is currently only used with [Server Components](/reference/rsc/server-components.md).

```js
const signal = cacheSignal();
```

Call `cacheSignal` during rendering to get an `AbortSignal`. React aborts the signal when rendering finishes, which lets you cancel in-flight work that is no longer needed. Rendering is considered finished when React has successfully completed rendering, the render was aborted, or the render has failed.

## Parameters

This function does not accept any parameters.

## Returns

An `AbortSignal` if called during rendering. Otherwise `cacheSignal()` returns `null`.

# Usage

- Cancel in-flight requests by passing the signal to `fetch` (or anything that accepts an `AbortSignal`).

```js
import {cache, cacheSignal} from 'react';
const dedupedFetch = cache(fetch);
async function Component() {
  await dedupedFetch(url, { signal: cacheSignal() });
}
```

- Ignore errors after rendering finishes: when a function throws, check `cacheSignal()?.aborted` to distinguish a cancellation from a real error, and only log or handle the real ones.

```js
try {
  return await queryDatabase(id);
} catch (x) {
  if (!cacheSignal()?.aborted) logError(x);
  return null;
}
```

# Caveats

- `cacheSignal` is for Server Components only for now. In Client Components it always returns `null`. In the future it will also fire when a client cache refreshes or invalidates, so do not assume it is always null on the client.
- If called outside of rendering it returns `null`, signalling that the current scope is not cached forever.
- You cannot use `cacheSignal` to abort async work started outside of rendering. A request started at module scope will not actually be aborted when the component's rendering finishes.

# Citations
[1] [cacheSignal](https://react.dev/reference/react/cacheSignal)
