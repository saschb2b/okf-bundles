---
type: Directive
title: "'use server'"
description: The "use server" directive marks server-side async functions that can be called from client-side code.
resource: https://react.dev/reference/rsc/use-server
tags: [react, rsc, directive, server-functions, security]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`'use server'` marks server-side functions that the client can call. Add it at the top of an async function body to make that function callable by the client (these are [Server Functions](/reference/rsc/server-functions.md)), or at the top of a file to mark all of that file's exports as Server Functions.

```js
async function addToCart(data) {
  'use server';
  // ...
}
```

Calling a Server Function from the client makes a network request that includes a serialized copy of the arguments; any return value is serialized back to the client.

## Caveats

- Must be at the very beginning of the function or module, above all other code including imports (comments before the directive are fine). Use single or double quotes, not backticks.
- Only usable in server-side files. The resulting Server Functions can be passed to Client Components via props.
- To import a Server Function into [client code](/reference/rsc/use-client.md), the directive must be at the module level.
- Only async functions, since the underlying network calls are always asynchronous.
- Always treat arguments as untrusted input and authorize every mutation.
- Should be called in a [Transition](/reference/react/hooks/useTransition.md). Functions passed to [`<form action>`](/reference/react-dom/components/form.md) or `formAction` are wrapped in a transition automatically.
- Designed for server-state mutations, not data fetching: frameworks typically process one action at a time and do not cache return values.

# Security considerations

Arguments are fully client-controlled, so treat them as untrusted: validate and escape as appropriate, and confirm the logged-in user is allowed to perform the action. To prevent sending sensitive data back to the client, use the experimental taint APIs [`experimental_taintUniqueValue`](/reference/react/apis/experimental_taintUniqueValue.md) and [`experimental_taintObjectReference`](/reference/react/apis/experimental_taintObjectReference.md).

# Serializable arguments and return values

Arguments cross the network, so they must be serializable.

- Supported arguments: primitives, globally-registered symbols (`Symbol.for`), serializable iterables (String, Array, Map, Set, TypedArray, ArrayBuffer), Date, FormData instances, plain objects with serializable properties, other Server Functions, and Promises.
- Not supported: React elements / JSX, non-Server-Function functions (including component functions), classes and class instances (or null-prototype objects), non-globally-registered symbols, and events from event handlers.
- Return values follow the same serialization rules as [serializable props](/reference/rsc/use-client.md) for a boundary Client Component.

# Usage

## Server Functions in forms

Pass a Server Function to a [`<form action>`](/reference/react-dom/components/form.md). React supplies the form's `FormData` as the first argument and progressively enhances the form (it can submit before the JS bundle loads).

```jsx
async function requestUsername(formData) {
  'use server';
  const username = formData.get('username');
  // ...
}

<form action={requestUsername}>
  <input type="text" name="username" />
  <button type="submit">Request</button>
</form>
```

## Handling return values in forms

To update the UI from the result while keeping progressive enhancement, use [`useActionState`](/reference/react/hooks/useActionState.md) (a client Hook).

```jsx
'use client';
const [state, action] = useActionState(requestUsername, null, 'n/a');
```

## Calling outside a form

Server Functions are server endpoints callable anywhere in client code. Outside a form, call them inside a [Transition](/reference/react/hooks/useTransition.md) so you can show loading state, [optimistic updates](/reference/react/hooks/useOptimistic.md), and handle errors. Read a return value by awaiting the returned promise.

```jsx
const onClick = () => {
  startTransition(async () => {
    const currentCount = await incrementLike();
    setLikeCount(currentCount);
  });
};
```

# Related

- The functions this directive creates: [Server Functions](/reference/rsc/server-functions.md).
- Where they run: [Server Components](/reference/rsc/server-components.md). The client-side counterpart directive is [`"use client"`](/reference/rsc/use-client.md).
- Pending state and forms: [`useActionState`](/reference/react/hooks/useActionState.md), [`useTransition`](/reference/react/hooks/useTransition.md).

# Citations

[1] ['use server' directive](https://react.dev/reference/rsc/use-server)
