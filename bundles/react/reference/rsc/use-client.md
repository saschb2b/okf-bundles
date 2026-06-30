---
type: Directive
title: "'use client'"
description: The "use client" directive marks a module and its dependencies as client code, creating a server-client boundary in the module tree.
resource: https://react.dev/reference/rsc/use-client
tags: [react, rsc, directive, client-components, boundary]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`'use client'` marks code that runs on the client, for use with [React Server Components](/reference/rsc/server-components.md). Place it at the top of a file to mark that module and its transitive dependencies as client code.

```jsx
'use client';
import { useState } from 'react';

export default function RichTextEditor({ timestamp, text }) {
  // ...
}
```

When a `'use client'` module is imported from a Server Component, compatible bundlers treat the import as the boundary between server-run and client-run code. Dependencies of a client module are evaluated on the client too, whether or not they carry their own directive. A single module can be evaluated on the server when imported from server code and on the client when imported from client code.

## Caveats

- `'use client'` must be at the very beginning of the file, above all imports and code (comments are fine). Use single or double quotes, not backticks.
- When a `'use client'` module is imported from another client-rendered module, the directive has no effect.
- A component defined in a `'use client'` module (or a transitive dependency of one) is always a Client Component. A component can still be evaluated on the client without its own directive.
- Client evaluation is not limited to components: all code in the client module sub-tree is sent to and run by the client.
- Values imported from a `'use client'` module into server code must be either a React component or serializable prop values, otherwise an exception is thrown.

# How it marks client code

The directive draws the boundary on the **module dependency tree**, not the render tree. Everything in the subtree rooted at a `'use client'` module becomes a Client module. During render, the framework server-renders the root and walks the tree, opting out of evaluating client-marked code; that client portion is downloaded and finished by the browser.

- **Client Components**: components in the render tree rendered on the client.
- **Server Components**: components in the render tree rendered on the server (the default).

A component can be both, depending on usage. A component definition without `'use client'` becomes a Client Component when imported and called inside a client module, and a Server Component otherwise. Because the boundary is on the module tree, a component passed as `children` to a Client Component can still be a Server Component if a server module imported and rendered it (a parent-child render relationship does not guarantee the same render environment).

# When to use it

Server Components are the default. Reach for `'use client'` when you need client features.

Advantages of staying on the server:

- Less code shipped and run by the client (only client modules are bundled).
- Direct filesystem access and low-latency data fetches.

Limitations that force a client boundary:

- No interactivity: event handlers like `onClick` must be in Client Components.
- No state and most Hooks: Server Components do not persist in memory after render.

Mark a component `'use client'` when it needs state, event handlers, browser-only APIs (web storage, audio/video, canvas, device hardware), or third-party libraries that use `createContext`, most react/react-dom Hooks (except `use` and `useId`), `forwardRef`, `memo`, `startTransition`, or client APIs. You may also force a component to be a Client Component for efficiency when its HTML output is large relative to its source (for example a long SVG path).

# Serializable types from Server to Client

Props passed from a Server Component to a Client Component must be serializable.

- Supported: primitives, globally-registered symbols (`Symbol.for`), serializable iterables (String, Array, Map, Set, TypedArray, ArrayBuffer), Date, plain objects with serializable properties, Server Functions, Client or Server Component elements (JSX), and Promises.
- Not supported: non-Server-Function functions, classes and class instances (or null-prototype objects), and non-globally-registered symbols.

# Related

- The default, server-rendered counterpart: [Server Components](/reference/rsc/server-components.md).
- The server-side directive for callable functions: [`"use server"`](/reference/rsc/use-server.md) and [Server Functions](/reference/rsc/server-functions.md).

# Citations

[1] ['use client' directive](https://react.dev/reference/rsc/use-client)
