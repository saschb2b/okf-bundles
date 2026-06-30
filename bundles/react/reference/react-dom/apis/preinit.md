---
type: API Reference
title: preinit
description: A react-dom API that eagerly fetches and evaluates a stylesheet or external script, so it takes effect as soon as it downloads.
resource: https://react.dev/reference/react-dom/preinit
tags: [react, react-dom, resource-hints, performance, preloading]
timestamp: 2026-06-30T12:00:00Z
---

React-based frameworks often handle resource loading for you, so you might not need this API directly.

# Reference

```js
import { preinit } from 'react-dom';

preinit("https://example.com/script.js", {as: "script"});
```

Hints the browser to start downloading and executing the resource. A preinited script runs when it finishes downloading. A preinited stylesheet is inserted into the document, taking effect right away. To download without evaluating, use [`preload`](/reference/react-dom/apis/preload.md). For ESM modules, use [`preinitModule`](/reference/react-dom/apis/preinitModule.md).

## Parameters

- `href`: a string. The URL of the resource to download and execute.
- `options`: an object with:
  - `as`: required string. The resource type: `script` or `style`.
  - `precedence`: a string, required for stylesheets. Where to insert the sheet relative to others. Higher precedence overrides lower. Values: `reset`, `low`, `medium`, `high`.
  - `crossOrigin`: a string. The CORS policy: `anonymous` or `use-credentials`.
  - `integrity`: a string. A cryptographic hash to verify the resource's authenticity.
  - `nonce`: a string. A cryptographic nonce to allow the resource under a strict Content Security Policy.
  - `fetchPriority`: a string. Suggested fetch priority: `auto` (default), `high`, or `low`.

## Returns

`preinit` returns nothing.

# Usage

## Preinit when rendering

Call it while rendering when the component or its children will use the resource and you accept it taking effect immediately on download.

```js
function AppRoot() {
  preinit("https://example.com/script.js", {as: "script"});
  preinit("https://example.com/style.css", {as: "style", precedence: "medium"});
  return ...;
}
```

The `precedence` option (required for stylesheets) controls document order: higher precedence overrules lower.

## Preinit in an event handler

Call it before transitioning to a page or state that needs the resource.

```js
function CallToAction() {
  const onClick = () => {
    preinit("https://example.com/wizardStyles.css", {as: "style"});
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

[1] [preinit](https://react.dev/reference/react-dom/preinit)
