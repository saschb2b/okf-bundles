---
type: API Reference
title: resume
description: Resumes rendering a prerendered React tree to a Readable Web Stream from a postponed state.
resource: https://react.dev/reference/react-dom/server/resume
tags: [react, react-dom, server, ssr, streaming, web-streams]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`resume` streams a pre-rendered React tree to a Readable Web Stream, continuing from a postponed state produced by a prerender API. It is the resume layer of partial prerendering.

```js
import { resume } from 'react-dom/server';

const stream = await resume(reactNode, postponedState, options?)
```

Runtime: Web Streams API. For Node.js, use [resumeToPipeableStream](/reference/react-dom/server/resumeToPipeableStream.md) instead.

## Parameters

- `reactNode`: The React node you called `prerender` with, for example `<App />`. It is expected to represent the entire document, so the component should render the `<html>` tag.
- `postponedState`: The opaque `postpone` object returned from a prerender API (such as [prerender](/reference/react-dom/static/prerender.md)), loaded from wherever you stored it (redis, a file, S3).
- `options` (optional): An object with streaming options.
  - `nonce`: A nonce string to allow scripts for `script-src` Content-Security-Policy.
  - `signal`: An abort signal to abort server rendering and render the rest on the client.
  - `onError`: A callback fired on any server error, recoverable or not. Defaults to `console.error`. If overridden to log crash reports, still call `console.error`.

## Returns

A Promise:

- If `resume` produced a shell, resolves to a Readable Web Stream that can be piped to a Writable Web Stream.
- If an error happens in the shell, the Promise rejects with that error.

The returned stream has an additional property:

- `allReady`: A Promise that resolves when all rendering is complete. `await stream.allReady` for crawlers and static generation, at the cost of progressive loading.

# Usage

- Load the stored postponed state, resume, and pipe the result.

```js
async function handler(request, writable) {
  const postponed = await getPostponedState(request);
  const resumeStream = await resume(<App />, postponed);
  return resumeStream.pipeTo(writable);
}
```

`resume` is the second layer of a three-layer strategy: prerender produces HTML and a postponed state, `resume` completes rendering once data is available, then [hydrateRoot](/reference/react-dom/client/hydrateRoot.md) attaches event handlers on the client.

# Caveats

- This API depends on Web Streams. For Node.js, use [resumeToPipeableStream](/reference/react-dom/server/resumeToPipeableStream.md).
- Does not accept `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Pass those to the `prerender` call that generates the `postponedState`, or inject bootstrap content into the writable stream manually.
- Does not accept `identifierPrefix`, since the prefix must be the same in `prerender` and `resume`.
- Only provide `nonce` to `resume` if you are not providing scripts to prerender, since `nonce` cannot be passed to prerender.
- Re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered components (component and all children finished) are skipped entirely.

# Citations

[1] [resume](https://react.dev/reference/react-dom/server/resume)
