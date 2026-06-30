---
type: API Reference
title: lazy
description: Defers loading a component's code until it is rendered for the first time.
resource: https://react.dev/reference/react/lazy
tags: [react, code-splitting, suspense, lazy-loading]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`lazy` lets you defer loading a component's code until it is rendered for the first time.

```js
const SomeComponent = lazy(load)
```

Call `lazy` outside your components to declare a lazy-loaded component.

```js
import { lazy } from 'react';
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

## Parameters

- `load`: A function returning a Promise or other thenable. React does not call `load` until the first render attempt of the returned component. After the first call, React waits for it to resolve, then renders the resolved value's `.default` as a React component. Both the Promise and its resolved value are cached, so `load` is called at most once. If the Promise rejects, React throws the rejection reason for the nearest Error Boundary to handle.

## Returns

A React component you can render. While its code is still loading, rendering it will suspend. Wrap it (or a parent) in [Suspense](/reference/react/components/Suspense.md) to show a loading indicator.

# The load function

- Parameters: `load` receives no parameters.
- Returns: a Promise or thenable that eventually resolves to an object whose `.default` is a valid React component type, such as a function, a [memo](/reference/react/apis/memo.md) component, or a [forwardRef](/reference/react/legacy/forwardRef.md) component.

# Usage

- Lazy-load a component with Suspense: replace a static import with a dynamic `import()` inside `lazy`, then wrap it in a `<Suspense>` boundary that shows a fallback while loading. The imported component must be the module's `default` export. Dynamic `import()` may require bundler or framework support.

```jsx
<Suspense fallback={<Loading />}>
  <MarkdownPreview />
</Suspense>
```

# Caveats

- Do not declare `lazy` components inside other components, which resets all state on re-renders because a new lazy component is created each render. Always declare them at the top level of your module.

# Citations
[1] [lazy](https://react.dev/reference/react/lazy)
