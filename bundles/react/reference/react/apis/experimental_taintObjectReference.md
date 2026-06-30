---
type: API Reference
title: experimental_taintObjectReference
description: Prevents a specific object instance from being passed to a Client Component.
resource: https://react.dev/reference/react/experimental_taintObjectReference
tags: [react, server-components, security, tainting]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`taintObjectReference` lets you prevent a specific object instance, such as a `user` object, from being passed to a Client Component. This API is experimental, available only in experimental React versions (`react@experimental`, `react-dom@experimental`), and only inside React Server Components. To prevent passing a key, hash, or token, see [experimental_taintUniqueValue](/reference/react/apis/experimental_taintUniqueValue.md).

```js
experimental_taintObjectReference(message, object);
```

Call it to register an object as something React must not allow through to the client as is.

```js
import {experimental_taintObjectReference} from 'react';
experimental_taintObjectReference(
  'Do not pass ALL environment variables to the client.',
  process.env
);
```

## Parameters

- `message`: The message displayed if the object is passed to a Client Component. It becomes part of the thrown Error.
- `object`: The object to taint. Functions and class instances can be passed; they are already blocked from Client Components, but React's default error message is replaced by your `message`. When a specific Typed Array instance is tainted, other copies of it are not tainted.

## Returns

`experimental_taintObjectReference` returns `undefined`.

# Usage

- Prevent user data from reaching the client by tainting the object inside your data API. Any later attempt to pass it to a Client Component throws with your message.

```js
export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client. ' +
      'Instead, pick off the specific properties you need.',
    user,
  );
  return user;
}
```

- Protect against leaks in data fetching: rather than returning a raw object from `getUser` and rendering `<InfoCard user={user} />`, taint the object so the mistake is caught.

# Caveats

- Recreating or cloning a tainted object creates a new untainted object that may contain sensitive data. `{...user}` or `{name: user.name, ssn: user.ssn}` are not tainted. Tainting only guards against passing the object through unchanged.
- Do not rely on tainting alone for security. It does not block every derived value. A secure app uses multiple layers: well designed APIs, isolation patterns, and tainting as one layer.

# Citations
[1] [experimental_taintObjectReference](https://react.dev/reference/react/experimental_taintObjectReference)
