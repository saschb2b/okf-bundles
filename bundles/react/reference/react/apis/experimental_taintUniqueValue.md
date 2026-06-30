---
type: API Reference
title: experimental_taintUniqueValue
description: Prevents unique values like passwords, keys, or tokens from being passed to Client Components.
resource: https://react.dev/reference/react/experimental_taintUniqueValue
tags: [react, server-components, security, tainting]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`taintUniqueValue` lets you prevent unique values such as passwords, keys, or tokens from being passed to Client Components. This API is experimental, available only in experimental React versions (`react@experimental`, `react-dom@experimental`), and only inside React Server Components. To prevent passing an object containing sensitive data, see [experimental_taintObjectReference](/reference/react/apis/experimental_taintObjectReference.md).

```js
taintUniqueValue(errMessage, lifetime, value)
```

Call it with a password, token, key, or hash to register it as something React must not allow through to the client as is.

```js
import {experimental_taintUniqueValue} from 'react';
experimental_taintUniqueValue(
  'Do not pass secret keys to the client.',
  process,
  process.env.SECRET_KEY
);
```

## Parameters

- `message`: The message displayed if `value` is passed to a Client Component. It becomes part of the thrown Error.
- `lifetime`: Any object indicating how long `value` stays tainted. The value is blocked while this object exists. Passing `globalThis` or `process` blocks it for the app's lifetime; typically it is an object whose properties contain `value`, such as the `user` object holding a session token.
- `value`: A string, bigint, or TypedArray. It must be a unique, high-entropy sequence such as a cryptographic token, private key, hash, or long password.

## Returns

`experimental_taintUniqueValue` returns `undefined`.

# Usage

- Prevent a token from reaching Client Components by tainting it with an appropriate lifetime. Use `globalThis` or `process` for values that should stay tainted for the whole app, or the encapsulating object when the value's lifespan is tied to it.

```js
export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintUniqueValue(
    'Do not pass a user session token to the client.',
    user,
    user.session.token
  );
  return user;
}
```

- Combine `server-only` with `taintUniqueValue` to keep secrets like database passwords or API tokens on the server. Abstract secret access into a helper tagged with `server-only`, then taint the actual secret so a refactor that passes it to a Client Component throws.

# Caveats

- Deriving new values from tainted values can break protection. Uppercasing, concatenating, base64-encoding, or substringing a tainted value produces an untainted value unless you call `taintUniqueValue` on it too.
- Do not use it for low-entropy values such as PIN codes or phone numbers. An attacker controlling request values could enumerate possibilities to infer the tainted value.
- Do not rely solely on tainting for security. Mistakes like using a global store outside React without the right lifetime object can untaint the value. Tainting is one layer among several in a secure app.

# Citations
[1] [experimental_taintUniqueValue](https://react.dev/reference/react/experimental_taintUniqueValue)
