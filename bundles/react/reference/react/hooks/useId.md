---
type: API Reference
title: useId
description: React Hook that generates a unique, stable ID string suitable for accessibility attributes and matching across server and client.
resource: https://react.dev/reference/react/useId
tags: [react, hook, accessibility, ssr, id]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useId` generates a unique ID that can be passed to accessibility attributes.

```js
const id = useId()
```

Call it at the top level of your component to generate a unique ID.

```jsx
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  // ...
}
```

## Parameters

`useId` does not take any parameters.

## Returns

A unique ID string associated with this particular `useId` call in this particular component.

# Usage

- Generate unique IDs for accessibility attributes. Tie an input to its description with one generated ID across both `aria-describedby` and the description element's `id`.
  ```jsx
  const passwordHintId = useId();
  // <input aria-describedby={passwordHintId} />
  // <p id={passwordHintId}>...</p>
  ```
- Generate IDs for several related elements. Call `useId` once and append suffixes for each element rather than calling it multiple times.
  ```jsx
  const id = useId();
  // <label htmlFor={id + '-firstName'}>First Name:</label>
  // <input id={id + '-firstName'} />
  ```
- Specify a shared prefix for all generated IDs. Pass `identifierPrefix` to [createRoot](/reference/react-dom/client/createRoot.md) to avoid collisions when multiple independent React apps share a page.
  ```js
  createRoot(domNode, { identifierPrefix: 'my-app-' });
  ```
- Use the same ID prefix on client and server. Pass the same `identifierPrefix` to the server renderer (such as [renderToPipeableStream](/reference/react-dom/server/renderToPipeableStream.md)) and to [hydrateRoot](/reference/react-dom/client/hydrateRoot.md).

# Caveats

- It is a Hook, so call it only at the top level of your component or your own Hooks, never inside loops or conditions.
- Do not use `useId` to generate cache keys for [use](/reference/react/apis/use.md). The ID is stable while a component is mounted but may change during rendering. Derive cache keys from your data.
- Do not use `useId` to generate keys in a list. Keys should be generated from your data.
- It currently cannot be used in async Server Components.
- With server rendering it requires an identical component tree on the server and the client. If the trees do not match exactly, the generated IDs will not match.

# Citations

[1] [useId](https://react.dev/reference/react/useId)
