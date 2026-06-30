---
type: API Reference
title: preloadModule
description: A react-dom API that eagerly fetches an ESM module you expect to use, without evaluating it.
resource: https://react.dev/reference/react-dom/preloadModule
tags: [react, react-dom, resource-hints, performance, esm]
timestamp: 2026-06-30T12:00:00Z
---

React-based frameworks often handle resource loading for you, so you might not need this API directly.

# Reference

```js
import { preloadModule } from 'react-dom';

preloadModule("https://example.com/module.js", {as: "script"});
```

Hints the browser to start downloading the given ESM module so it is cached for later use. Unlike [`preinitModule`](/reference/react-dom/apis/preinitModule.md), it downloads but does not execute the module. For a non-module script, use [`preload`](/reference/react-dom/apis/preload.md).

## Parameters

- `href`: a string. The URL of the module to download.
- `options`: an object with:
  - `as`: required string. Must be `'script'`.
  - `crossOrigin`: a string. The CORS policy: `anonymous` or `use-credentials`.
  - `integrity`: a string. A cryptographic hash to verify the module's authenticity.
  - `nonce`: a string. A cryptographic nonce to allow the module under a strict Content Security Policy.

## Returns

`preloadModule` returns nothing.

# Usage

## Preload a module when rendering

Call it while rendering when the component or its children will use the module.

```js
function AppRoot() {
  preloadModule("https://example.com/module.js", {as: "script"});
  return ...;
}
```

To start executing the module immediately rather than just downloading it, use [`preinitModule`](/reference/react-dom/apis/preinitModule.md).

## Preload a module in an event handler

Call it before transitioning to a page or state that needs the module.

```js
function CallToAction() {
  const onClick = () => {
    preloadModule("https://example.com/module.js", {as: "script"});
    startWizard();
  };
  return <button onClick={onClick}>Start Wizard</button>;
}
```

# Caveats

- Multiple calls with the same `href` behave like a single call.
- In the browser, callable in any situation: rendering, an Effect, an event handler.
- During server-side rendering or Server Components, it only has an effect when called while rendering a component or in an async context originating from rendering. Other calls are ignored.

# Citations

[1] [preloadModule](https://react.dev/reference/react-dom/preloadModule)
