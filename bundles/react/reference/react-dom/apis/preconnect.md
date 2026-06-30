---
type: API Reference
title: preconnect
description: A react-dom resource hint that asks the browser to open a connection to a server you expect to load resources from, speeding up later loads.
resource: https://react.dev/reference/react-dom/preconnect
tags: [react, react-dom, resource-hints, performance, preloading]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```js
import { preconnect } from 'react-dom';

preconnect("https://example.com");
```

Hints to the browser to open a connection to the given server. If the browser acts on it, resources from that server load faster.

## Parameters

- `href`: a string. The URL of the server you want to connect to.

## Returns

`preconnect` returns nothing.

# Usage

## Preconnect when rendering

Call it while rendering a component when you know its children will load resources from a host.

```js
function AppRoot() {
  preconnect("https://example.com");
  return ...;
}
```

## Preconnect in an event handler

Call it before transitioning to a page or state that needs the host, starting the connection earlier than the new render would.

```js
function CallToAction() {
  const onClick = () => {
    preconnect('https://example.com');
    startWizard();
  };
  return <button onClick={onClick}>Start Wizard</button>;
}
```

# Caveats

- Multiple calls with the same server behave like a single call.
- In the browser, callable in any situation: rendering, an Effect, an event handler.
- During server-side rendering or Server Components, it only has an effect when called while rendering a component or in an async context originating from rendering. Other calls are ignored.
- If you know the specific resources, prefer the resource preloading APIs like [`preload`](/reference/react-dom/apis/preload.md) or [`preinit`](/reference/react-dom/apis/preinit.md), which start loading right away.
- No benefit to preconnecting to the page's own host, already connected.
- When speculatively connecting to many domains, [`prefetchDNS`](/reference/react-dom/apis/prefetchDNS.md) may be better, since many preconnections add overhead.

# Citations

[1] [preconnect](https://react.dev/reference/react-dom/preconnect)
