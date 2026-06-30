---
type: API Reference
title: <script>
description: The built-in browser script component for inline and external scripts, with React's head-hoisting and deduplication for async external scripts.
resource: https://react.dev/reference/react-dom/components/script
tags: [react, react-dom, scripts, resources, head]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Adds inline or external scripts. In certain cases React hoists the element to the document `<head>` and deduplicates identical scripts.

```jsx
<script src="script.js" async />
<script>{`alert("hi!")`}</script>
```

## Props

`<script>` supports all [common element props](/reference/react-dom/components/common.md). It should have either `children` or `src`:

- `children`: A string. The source code of an inline script.
- `src`: A string. The URL of an external script.

Other props:

- `async`: A boolean. Defers execution until the document is processed; preferred for performance and required for head-hoisting.
- `crossOrigin`: `anonymous` or `use-credentials`.
- `fetchPriority`: `"high"`, `"low"`, or `"auto"` (default).
- `integrity`: A cryptographic hash for authenticity.
- `noModule`: A boolean. Disables the script in ES-module-capable browsers (for fallbacks).
- `nonce`: A cryptographic nonce for strict CSP.
- `referrer`: The Referer header to send.
- `type`: Classic script, ES module, or import map.

Props that disable React's special treatment: `onError`, `onLoad`.
Not recommended: `blocking`, and `defer` (use `async` instead; `defer` is incompatible with streaming SSR).

## Special rendering behavior

React can move `<script>` to the `<head>` and deduplicate identical scripts. To opt in, provide `src` and `async={true}`. React deduplicates scripts with the same `src`. The `async` prop must be true so scripts can be moved safely.

# Usage

- External script: render `<script async src="..." onLoad={...} />`. Multiple components rendering the same `src` produce one element. Calling [preinit](/reference/react-dom/apis/preinit.md) can start the fetch earlier.
- Inline script: render `<script>` with the source as children. Inline scripts are not deduplicated or moved to `<head>`.

# Caveats

- With the special treatment, React ignores prop changes after render (warns in development).
- React may leave the script in the DOM after the rendering component unmounts (harmless, since scripts run once on insertion).

# Citations

[1] [<script>](https://react.dev/reference/react-dom/components/script)
