---
type: API Reference
title: preinitModule
description: A react-dom API that eagerly fetches and evaluates an ESM module, so it runs as soon as it downloads.
resource: https://react.dev/reference/react-dom/preinitModule
tags: [react, react-dom, resource-hints, performance, esm]
timestamp: 2026-06-30T12:00:00Z
---

React-based frameworks often handle resource loading for you, so you might not need this API directly.

# Reference

```js
import { preinitModule } from 'react-dom';

preinitModule("https://example.com/module.js", {as: "script"});
```

Hints the browser to start downloading and executing the given ESM module. A preinited module runs when it finishes downloading. To download without evaluating, use [`preloadModule`](/reference/react-dom/apis/preloadModule.md). For a non-module script, use [`preinit`](/reference/react-dom/apis/preinit.md).

## Parameters

- `href`: a string. The URL of the module to download and execute.
- `options`: an object with:
  - `as`: required string. Must be `'script'`.
  - `crossOrigin`: a string. The CORS policy: `anonymous` or `use-credentials`.
  - `integrity`: a string. A cryptographic hash to verify the module's authenticity.
  - `nonce`: a string. A cryptographic nonce to allow the module under a strict Content Security Policy.

## Returns

`preinitModule` returns nothing.

# Usage

## Preinit a module when rendering

Call it while rendering when the component or its children will use the module and you accept it taking effect immediately on download.

```js
function AppRoot() {
  preinitModule("https://example.com/module.js", {as: "script"});
  return ...;
}
```

## Preinit a module in an event handler

Call it before transitioning to a page or state that needs the module.

```js
function CallToAction() {
  const onClick = () => {
    preinitModule("https://example.com/module.js", {as: "script"});
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

[1] [preinitModule](https://react.dev/reference/react-dom/preinitModule)
