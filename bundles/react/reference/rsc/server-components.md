---
type: API Reference
title: Server Components
description: Server Components render ahead of time, before bundling, in an environment separate from the client app or SSR server.
resource: https://react.dev/reference/rsc/server-components
tags: [react, rsc, server-components, ssr, async]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Server Components are a type of component that renders ahead of time, before bundling, in an environment separate from the client app and the SSR server. They run once at build time on CI, or per request on a web server. They are React 19 stable, but the underlying bundler/framework APIs do not follow semver and may break between 19.x minors (pin a React version or use Canary).

Key facts:

- There is **no directive for Server Components**. They are the default. `"use server"` is for Server Functions, not Server Components. The client boundary is marked by [`"use client"`](/reference/rsc/use-client.md).
- Server Components are not sent to the browser; only their rendered output is.
- They can be `async` functions and `await` data in render.
- They cannot use state or interactive APIs (no `useState`, no event handlers, most Hooks unavailable).

# Usage

## Server Components without a server (build time)

Render once at build time to read the filesystem or fetch static content, then SSR to HTML and serve from a CDN. Expensive libraries (for example `marked`, `sanitize-html`) stay out of the client bundle.

```jsx
async function Page({ page }) {
  const content = await file.readFile(`${page}.md`); // runs during build-time render
  return <div>{sanitizeHtml(marked(content))}</div>;
}
// Client only ever sees: <div><!-- html for markdown --></div>
```

This removes the client-side fetch waterfall and keeps static content visible on first paint.

## Server Components with a server (per request)

Run on a web server during a request to access the data layer directly, without building an API. This avoids client-server fetch waterfalls.

```jsx
async function Note({ id }) {
  const note = await db.notes.get(id); // loads during render, on the server
  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}
```

The model combines the request/response simplicity of multi-page apps with the interactivity of single-page apps.

## Adding interactivity

Server Components cannot hold state, so compose them with Client Components marked [`"use client"`](/reference/rsc/use-client.md). A Server Component can render and pass props (including JSX as `children`) to a Client Component.

```jsx
// Server Component
async function Notes() {
  const notes = await db.notes.getAll();
  return notes.map(note => <Expandable key={note.id}><p note={note} /></Expandable>);
}
```

```jsx
// Client Component
"use client";
export default function Expandable({ children }) {
  const [expanded, setExpanded] = useState(false);
  return <div><button onClick={() => setExpanded(!expanded)}>Toggle</button>{expanded && children}</div>;
}
```

## Async components

`await` inside an async Server Component suspends rendering until the promise resolves, with streaming Suspense support across the server/client boundary. You can start a promise on the server and resolve it on the client with the [`use`](/reference/react/apis/use.md) API. Async components are not supported on the client, so resolve promises there with `use`.

```jsx
// Server: await high-priority data, start (do not await) low-priority data
async function Page({ id }) {
  const note = await db.notes.get(id);
  const commentsPromise = db.comments.get(note.id);
  return <div>{note}<Suspense fallback={<p>Loading...</p>}><Comments commentsPromise={commentsPromise} /></Suspense></div>;
}
```

```jsx
// Client: resume the server-started promise with use()
"use client";
import { use } from 'react';
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(c => <p>{c}</p>);
}
```

# Caveats

- The RSC bundler/framework APIs are not semver-stable in React 19.x.
- Server Components have no client-side state, no event handlers, and cannot use most Hooks (their output is a list of components for the client, and they do not persist in memory after render).
- Async components are server-only; on the client use [`use`](/reference/react/apis/use.md).

# Related

- Mark the client boundary with [`"use client"`](/reference/rsc/use-client.md).
- Define callable server endpoints with [Server Functions](/reference/rsc/server-functions.md) and the [`"use server"`](/reference/rsc/use-server.md) directive.
- Suspend high-priority data with [`<Suspense>`](/reference/react/components/Suspense.md); resolve promises on the client with [`use`](/reference/react/apis/use.md).

# Citations

[1] [Server Components](https://react.dev/reference/rsc/server-components)
