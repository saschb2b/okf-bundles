---
type: API Reference
title: preload
description: A react-dom API that eagerly fetches a resource such as a stylesheet, font, or external script that you expect to use, without evaluating it.
resource: https://react.dev/reference/react-dom/preload
tags: [react, react-dom, resource-hints, performance, preloading]
timestamp: 2026-06-30T12:00:00Z
---

React-based frameworks often handle resource loading for you, so you might not need this API directly.

# Reference

```js
import { preload } from 'react-dom';

preload("https://example.com/font.woff2", {as: "font"});
```

Hints the browser to start downloading the resource so it is cached for later use. Unlike [`preinit`](/reference/react-dom/apis/preinit.md), it downloads but does not execute or insert the resource. For ESM modules, use [`preloadModule`](/reference/react-dom/apis/preloadModule.md).

## Parameters

- `href`: a string. The URL of the resource to download.
- `options`: an object with:
  - `as`: required string. The resource type. Possible values: `audio`, `document`, `embed`, `fetch`, `font`, `image`, `object`, `script`, `style`, `track`, `video`, `worker`.
  - `crossOrigin`: a string. The CORS policy: `anonymous` or `use-credentials`. Required when `as` is `"fetch"`.
  - `referrerPolicy`: a string. The Referrer header to send: `no-referrer-when-downgrade` (default), `no-referrer`, `origin`, `origin-when-cross-origin`, or `unsafe-url`.
  - `integrity`: a string. A cryptographic hash to verify the resource's authenticity.
  - `type`: a string. The MIME type of the resource.
  - `nonce`: a string. A cryptographic nonce to allow the resource under a strict Content Security Policy.
  - `fetchPriority`: a string. Suggested fetch priority: `auto` (default), `high`, or `low`.
  - `imageSrcSet`: a string. Only with `as: "image"`. The source set of the image.
  - `imageSizes`: a string. Only with `as: "image"`. The sizes of the image.

## Returns

`preload` returns nothing.

# Usage

## Preload when rendering

Call it while rendering when the component or its children will use the resource.

```js
function AppRoot() {
  preload("https://example.com/script.js", {as: "script"});
  preload("https://example.com/style.css", {as: "style"});
  preload("https://example.com/font.woff2", {as: "font"});
  return ...;
}
```

When preloading a stylesheet, also preload the fonts it references so the browser can start fetching them sooner. To start executing a script or inserting a stylesheet immediately, use [`preinit`](/reference/react-dom/apis/preinit.md) instead.

## Preload an image

Use `imageSrcSet` and `imageSizes` so the browser fetches the correctly sized image.

```js
preload("/banner.png", {
  as: "image",
  imageSrcSet: "/banner512.png 512w, /banner1024.png 1024w",
  imageSizes: "(max-width: 512px) 512px, 1024px",
});
```

## Preload in an event handler

Call it before transitioning to a page or state that needs the resource.

```js
function CallToAction() {
  const onClick = () => {
    preload("https://example.com/wizardStyles.css", {as: "style"});
    startWizard();
  };
  return <button onClick={onClick}>Start Wizard</button>;
}
```

# Caveats

- Multiple equivalent calls behave like a single call. Two calls are equivalent if they share the same `href`, except that with `as: "image"` they must also share the same `imageSrcSet` and `imageSizes`.
- In the browser, callable in any situation: rendering, an Effect, an event handler.
- During server-side rendering or Server Components, it only has an effect when called while rendering a component or in an async context originating from rendering. Other calls are ignored.

# Citations

[1] [preload](https://react.dev/reference/react-dom/preload)
