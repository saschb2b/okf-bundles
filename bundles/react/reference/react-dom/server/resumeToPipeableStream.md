---
type: API Reference
title: resumeToPipeableStream
description: Resumes rendering a prerendered React tree to a pipeable Node.js Stream from a postponed state.
resource: https://react.dev/reference/react-dom/server/resumeToPipeableStream
tags: [react, react-dom, server, ssr, streaming, nodejs]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`resumeToPipeableStream` streams a pre-rendered React tree to a pipeable Node.js Stream, continuing from a postponed state produced by a prerender API. It is the Node.js resume layer of partial prerendering.

```js
import { resumeToPipeableStream } from 'react-dom/server';

const { pipe, abort } = await resumeToPipeableStream(reactNode, postponedState, options?)
```

Runtime: Node.js Streams only. For Web Streams environments (Deno, modern edge runtimes), use [resume](/reference/react-dom/server/resume.md) instead.

## Parameters

- `reactNode`: The React node you called `prerender` with, for example `<App />`. It is expected to represent the entire document, including the `<html>` tag.
- `postponedState`: The opaque `postpone` object returned from a prerender API (such as [prerenderToNodeStream](/reference/react-dom/static/prerenderToNodeStream.md)), loaded from storage (redis, file, S3).
- `options` (optional): An object with streaming options.
  - `nonce`: A nonce string for `script-src` Content-Security-Policy.
  - `signal`: An abort signal to abort server rendering.
  - `onError`: Callback fired on any server error, recoverable or not. Defaults to `console.error`.
  - `onShellReady`: Callback fired after the shell finishes. Call `pipe` here to start streaming.
  - `onShellError`: Callback fired if shell rendering errors, receiving the error. Neither `onShellReady` nor `onAllReady` will be called.

## Returns

An object with two methods:

- `pipe`: Outputs the HTML into a provided Writable Node.js Stream. Call in `onShellReady` to enable streaming, or in `onAllReady` for crawlers and static generation.
- `abort`: Aborts server rendering and renders the rest on the client.

# Usage

- Load the stored postponed state, resume, and pipe the result inside `onShellReady`.

```js
async function handler(request, response) {
  const postponed = await getPostponedState(request);
  const { pipe } = resumeToPipeableStream(<App />, postponed, {
    onShellReady: () => {
      pipe(response);
    }
  });
}
```

Resuming behaves like [renderToReadableStream](/reference/react-dom/server/renderToReadableStream.md). It pairs with a prerender call upstream and [hydrateRoot](/reference/react-dom/client/hydrateRoot.md) downstream.

# Caveats

- This API is specific to Node.js. For Web Streams, use [resume](/reference/react-dom/server/resume.md).
- Does not accept `bootstrapScripts`, `bootstrapScriptContent`, or `bootstrapModules`. Pass those to the `prerender` call instead, or inject bootstrap content into the writable stream manually.
- Does not accept `identifierPrefix`, since it must match the `prerender` call.
- Only provide `nonce` here if you are not providing scripts to prerender, since `nonce` cannot be passed to prerender.
- Re-renders from the root until it finds a component that was not fully pre-rendered. Only fully prerendered components (component and all children completed) are skipped entirely.

# Citations

[1] [resumeToPipeableStream](https://react.dev/reference/react-dom/server/resumeToPipeableStream)
