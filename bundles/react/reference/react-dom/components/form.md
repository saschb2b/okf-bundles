---
type: API Reference
title: <form>
description: The built-in browser form component, with React action props that run submission in a Transition and support Server Functions, pending state, and optimistic updates.
resource: https://react.dev/reference/react-dom/components/form
tags: [react, react-dom, forms, actions, server-functions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```jsx
<form action={search}>
  <input name="query" />
  <button type="submit">Search</button>
</form>
```

## Props

`<form>` supports all [common element props](/reference/react-dom/components/common.md).

- `action`: A URL string or a function.
  - A URL behaves like a standard HTML form.
  - A function handles submission in a [Transition](/reference/react/hooks/useTransition.md), following the Action prop pattern. It may be async and is called with a single [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) argument.
  - Can be overridden per-button by a `formAction` on a `<button>`, `<input type="submit">`, or `<input type="image">`.

# Usage

## Handle submission with an event handler

`onSubmit` works in every React version and gives direct access to the submit event. Call `e.preventDefault()` to stop the page reload, then read fields with `new FormData(e.target)`.

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get("query");
}
```

`onSubmit` does not support Server Functions and does not track pending state.

## Handle submission with an action prop

Passing a function to `action` runs it in a Transition, so `e.preventDefault()` is not needed. After a successful action, uncontrolled fields in the form reset. React tracks pending state, sends thrown errors to the nearest error boundary, and lets the form work with [useActionState](/reference/react/hooks/useActionState.md) and [useOptimistic](/reference/react/hooks/useOptimistic.md).

```jsx
function search(formData) {
  const query = formData.get("query");
}
<form action={search}>...</form>
```

## Handle submission with a Server Function

Pass a function marked [`'use server'`](/reference/rsc/use-server.md) to `action`. This enables submission before JS loads or with JS disabled (progressive enhancement when the `<form>` is rendered by a Server Component). Pass extra data via hidden fields, or by binding arguments with `.bind(null, productId)`.

```jsx
async function addToCart(formData) {
  'use server'
  await updateCart(formData.get('productId'));
}
```

## Display a pending state

Call [useFormStatus](/reference/react-dom/hooks/useFormStatus.md) inside a component rendered within the `<form>` and read `pending`.

```jsx
function Submit() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>;
}
```

## Optimistically update form data

Use [useOptimistic](/reference/react/hooks/useOptimistic.md) to show the expected result immediately, before the background request completes, then reconcile when the server confirms.

```jsx
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage) => [...state, { text: newMessage, sending: true }]
);
```

## Handle submission errors

Wrap the `<form>` in an error boundary. If the action throws, the boundary fallback is shown.

## Display an error without JavaScript

For progressive enhancement: render the `<form>` from a Client Component, pass a Server Function to `action`, and use [useActionState](/reference/react/hooks/useActionState.md) so the returned state holds the error message.

```jsx
const [message, signupAction] = useActionState(signup, null);
<form action={signupAction}>...{!!message && <p>{message}</p>}</form>
```

## Handle multiple submission types

Give buttons different `formAction` functions so one form supports several actions (for example Publish vs. Save draft).

```jsx
<form action={publish}>
  <button type="submit">Publish</button>
  <button formAction={save}>Save draft</button>
</form>
```

# Caveats

- When a function is passed to `action` or `formAction`, the HTTP method is always POST regardless of the `method` prop.

# Citations

[1] [<form>](https://react.dev/reference/react-dom/components/form)
