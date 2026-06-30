---
type: API Reference
title: resumeAndPrerenderToNodeStream
description: Continues an aborted prerendered React tree to static HTML via a Node.js Stream.
resource: https://react.dev/reference/react-dom/static/resumeAndPrerenderToNodeStream
tags: [react, react-dom, static, ssg, nodejs]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`resumeAndPrerenderToNodeStream` continues a prerendered React tree to static HTML using a Node.js Stream, picking up from a postponed state. It is the Node.js resume-into-static-HTML layer of partial prerendering (SSG), as opposed to [resumeToPipeableStream](/reference/react-dom/server/resumeToPipeableStream.md), which resumes into a streaming SSR response.

```js
import { resumeAndPrerenderToNodeStream } from 'react-dom/static';

const { prelude, postponed } = await resumeAndPrerenderToNodeStream(reactNode, postponedState, options?)
```

Runtime: Node.js Streams only. For Web Streams environments (Deno, modern edge runtimes), use [resumeAndPrerender](/reference/react-dom/static/resumeAndPrerender.md) instead.

## Parameters

- `reactNode`: The React node you called `prerender` (or a previous `resumeAndPrerenderToNodeStream`) with, for example `<App />`. It is expected to represent the entire document, so the component should render the `<html>` tag.
- `postponedState`: The opaque `postpone` object returned from a prerender API (such as [prerenderToNodeStream](/reference/react-dom/static/prerenderToNodeStream.md)), loaded from wherever you stored it (redis, a file, S3).
- `options` (optional): An object with streaming options.
  - `signal`: An abort signal to abort server rendering and render the rest on the client.
  - `onError`: Callback fired on any server error, recoverable or not. Defaults to `console.error`. If overridden to log crash reports, still call `console.error`.

## Returns

A Promise that resolves on success to an object with:

- `prelude`: A Node.js Stream of HTML. Send it in chunks or read it entirely into a string.
- `postponed`: A JSON-serializable, opaque object passable to [resumeToPipeableStream](/reference/react-dom/server/resumeToPipeableStream.md) or `resumeAndPrerenderToNodeStream` if this call is aborted.

On failure, the Promise rejects. Use that to output a fallback shell.

# Usage

- Load the stored postponed state, continue the prerender, and pipe the prelude. On the client, call [hydrateRoot](/reference/react-dom/client/hydrateRoot.md).

```js
async function handler(request, writable) {
  const postponedState = getPostponedState(request);
  const { prelude } = await resumeAndPrerenderToNodeStream(<App />, JSON.parse(postponedState));
  prelude.pipe(writable);
}
```

`resumeAndPrerenderToNodeStream` behaves like [prerender](/reference/react-dom/static/prerender.md) but continues a previously started prerender that was aborted. It can itself be aborted and continued again with another `resumeAndPrerenderToNodeStream`, or resumed with [resume](/reference/react-dom/server/resume.md).

# Caveats

- This API is specific to Node.js. For Web Streams, use [resumeAndPrerender](/reference/react-dom/static/resumeAndPrerender.md).
- `nonce` is not an available option when prerendering, since a nonce must be unique per request and would be insecure under CSP if baked into the prerender.
- Like all prerender APIs, it waits for all data to load before resolving. To stream as content loads, use [renderToReadableStream](/reference/react-dom/server/renderToReadableStream.md).

# Citations

[1] [resumeAndPrerenderToNodeStream](https://react.dev/reference/react-dom/static/resumeAndPrerenderToNodeStream)
