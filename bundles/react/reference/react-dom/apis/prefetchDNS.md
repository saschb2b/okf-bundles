---
type: API Reference
title: prefetchDNS
description: A react-dom resource hint that asks the browser to look up the IP address of a server you expect to load resources from.
resource: https://react.dev/reference/react-dom/prefetchDNS
tags: [react, react-dom, resource-hints, performance, preloading]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```js
import { prefetchDNS } from 'react-dom';

prefetchDNS("https://example.com");
```

Hints to the browser to resolve the DNS for the given server. If the browser acts on it, resources from that server load faster. It is lighter weight than [`preconnect`](/reference/react-dom/apis/preconnect.md), which also opens a connection.

## Parameters

- `href`: a string. The URL of the server you want to connect to.

## Returns

`prefetchDNS` returns nothing.

# Usage

## Prefetch DNS when rendering

Call it while rendering when you know the component's children will load resources from a host.

```js
function AppRoot() {
  prefetchDNS("https://example.com");
  return ...;
}
```

## Prefetch DNS in an event handler

Call it before transitioning to a page or state that will need the host.

```js
function CallToAction() {
  const onClick = () => {
    prefetchDNS('https://example.com');
    startWizard();
  };
  return <button onClick={onClick}>Start Wizard</button>;
}
```

# Caveats

- Multiple calls with the same server behave like a single call.
- In the browser, callable in any situation: rendering, an Effect, an event handler.
- During server-side rendering or Server Components, it only has an effect when called while rendering a component or in an async context originating from rendering. Other calls are ignored.
- If you know the specific resources, prefer the resource preloading APIs like [`preload`](/reference/react-dom/apis/preload.md), which start loading right away.
- No benefit to prefetching the page's own host, already resolved.
- Compared with [`preconnect`](/reference/react-dom/apis/preconnect.md), `prefetchDNS` may be better when speculatively connecting to a large number of domains, where preconnection overhead can outweigh the benefit.

# Citations

[1] [prefetchDNS](https://react.dev/reference/react-dom/prefetchDNS)
