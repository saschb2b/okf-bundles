---
type: API Reference
title: cache
description: Caches the result of a data fetch or computation, for use in React Server Components.
resource: https://react.dev/reference/react/cache
tags: [react, server-components, caching, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`cache` lets you cache the result of a data fetch or computation. It is only for use with [Server Components](/reference/rsc/server-components.md).

```js
const cachedFn = cache(fn);
```

Call `cache` outside of any components to create a memoized version of a function. On a cache hit it returns the stored result; on a cache miss it calls `fn`, stores the result, and returns it. `fn` runs only on a cache miss.

## Parameters

- `fn`: The function to cache results for. It can take any arguments and return any value.

## Returns

A cached (memoized) version of `fn` with the same type signature. Calling it checks the cache by the arguments; a hit returns the stored value, a miss calls `fn`, stores, and returns. `cache` does not call `fn` itself.

# Usage

- Cache an expensive computation to skip duplicate work. Define the memoized function in a dedicated module and import it across components so they share one cache.

```js
import {cache} from 'react';
import calculateUserMetrics from 'lib/user';

const getUserMetrics = cache(calculateUserMetrics);
```

- Share a snapshot of data by wrapping a data-fetching function. Multiple components calling it with the same key make one request and share the result. Arguments act as the cache key. Async rendering is only supported in Server Components.

```js
const getTemperature = cache(async (city) => await fetchTemperature(city));
```

- Preload data by calling the memoized function early without awaiting it, kicking off the async work while other rendering proceeds, then awaiting it later from the cache.
- Pair with [cacheSignal](/reference/react/apis/cacheSignal.md) to abort the cached work when React has finished rendering.
- Choose between APIs: use [useMemo](/reference/react/hooks/useMemo.md) for an expensive computation in a Client Component across renders, `cache` to share work across Server Components and to memoize data fetches, and [memo](/reference/react/apis/memo.md) to skip re-rendering a component when its props are unchanged.

# Caveats

- React invalidates the cache for all memoized functions on each server request.
- Each call to `cache` creates a new function. Calling `cache` with the same function twice yields different memoized functions that do not share a cache.
- `cachedFn` caches errors too. If `fn` throws for some arguments, the error is cached and re-thrown for those same arguments.
- `cache` is for Server Components only.
- Calling the memoized function outside of a component evaluates `fn` but does not read or update the cache, because cache access is provided through context.
- React checks cache hits with shallow equality (`Object.is`) of arguments. Pass primitives or the same object reference, not freshly created objects, or you will miss the cache.

# Citations
[1] [cache](https://react.dev/reference/react/cache)
