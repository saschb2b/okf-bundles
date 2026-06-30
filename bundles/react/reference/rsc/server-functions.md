---
type: API Reference
title: Server Functions
description: Server Functions let Client Components call async functions that execute on the server, marked with the "use server" directive.
resource: https://react.dev/reference/rsc/server-functions
tags: [react, rsc, server-functions, actions, forms]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Server Functions let Client Components call async functions that run on the server. They are defined with the [`"use server"`](/reference/rsc/use-server.md) directive and used within [React Server Components](/reference/rsc/server-components.md). They are React 19 stable, but the underlying bundler/framework APIs are not semver-stable in 19.x (pin a version or use Canary).

Mechanics:

- Marking a function `"use server"` makes the framework create a server reference and pass it to the client. Calling it on the client sends a network request to execute it on the server and returns the serialized result.
- They can be defined in a Server Component and passed as props, or imported directly into a Client Component from a `"use server"` module.

Terminology: until September 2024 all Server Functions were called "Server Actions". A Server Function is a Server Action only when passed to an `action` prop or called inside an action. Not all Server Functions are Server Actions.

# Usage

## From a Server Component

Define with `"use server"` and pass the reference to a Client Component as a prop.

```jsx
function EmptyNote() {
  async function createNoteAction() {
    'use server';
    await db.notes.create();
  }
  return <Button onClick={createNoteAction} />;
}
```

On the client the prop is a server reference (`{$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}`); calling it triggers the request.

## Imported into a Client Component

A `"use server"` module's exports can be imported directly into client code.

```jsx
"use server";
export async function createNote() {
  await db.notes.create();
}
```

## With Actions (outside a form)

Wrap the call in a [`useTransition`](/reference/react/hooks/useTransition.md) to access `isPending` and handle errors.

```jsx
"use client";
const submitAction = async () => {
  startTransition(async () => {
    const { error } = await updateName(name);
    if (error) setError(error);
  });
};
```

## With form actions

Pass a Server Function to a [`<form action>`](/reference/react-dom/components/form.md). React supplies the form's `FormData` as the first argument, progressively enhances the form (it can submit before the JS bundle loads), and resets the form on success.

```jsx
<form action={updateName}>
  <input type="text" name="name" />
</form>
```

## With useActionState

For the common case of pending state plus last response, call the Server Function via [`useActionState`](/reference/react/hooks/useActionState.md). React replays form submissions entered before hydration finishes.

```jsx
const [state, submitAction, isPending] = useActionState(updateName, { error: null });
```

A third argument (a permalink) enables progressive enhancement: if the form is submitted before the JS bundle loads, React redirects to that URL.

```jsx
const [, submitAction] = useActionState(updateName, null, `/name/update`);
```

# Caveats

- Arguments are serialized and sent over the network, so they must be serializable. Supported: primitives, globally-registered symbols, serializable iterables (String, Array, Map, Set, TypedArray, ArrayBuffer), Date, FormData, plain objects with serializable properties, other Server Functions, and Promises. Not supported: JSX/React elements, non-Server-Function functions, classes and class instances, non-global symbols, and events.
- Arguments are fully client-controlled. Always treat them as untrusted: validate, escape, and authorize every mutation. To block leaking sensitive data, use experimental taint APIs ([`experimental_taintUniqueValue`](/reference/react/apis/experimental_taintUniqueValue.md), [`experimental_taintObjectReference`](/reference/react/apis/experimental_taintObjectReference.md)).
- They are designed for server-state mutations, not data fetching. Frameworks typically process one action at a time and do not cache return values.
- Reading a return value requires `await` of the returned promise.

# Related

- The enabling directive: [`"use server"`](/reference/rsc/use-server.md).
- Where they are used: [Server Components](/reference/rsc/server-components.md) and the client boundary [`"use client"`](/reference/rsc/use-client.md).
- Pending state and replay: [`useActionState`](/reference/react/hooks/useActionState.md), [`useTransition`](/reference/react/hooks/useTransition.md), [`useOptimistic`](/reference/react/hooks/useOptimistic.md).

# Citations

[1] [Server Functions](https://react.dev/reference/rsc/server-functions)
