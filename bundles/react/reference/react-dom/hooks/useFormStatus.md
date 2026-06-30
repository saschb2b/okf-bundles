---
type: API Reference
title: useFormStatus
description: A react-dom Hook that exposes the pending state and submitted data of the parent form, so child components like a submit button can react to an in-flight submission.
resource: https://react.dev/reference/react-dom/hooks/useFormStatus
tags: [react, react-dom, hooks, forms, actions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```js
const { pending, data, method, action } = useFormStatus();
```

Call `useFormStatus` from a component rendered inside a `<form>` to read the status of that form's last submission. It is imported from `react-dom`. It pairs with the action props on [`<form>`](/reference/react-dom/components/form.md).

## Parameters

`useFormStatus` does not take any parameters.

## Returns

A `status` object with:

- `pending`: boolean. `true` while the parent `<form>` is submitting, otherwise `false`.
- `data`: an object implementing the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface holding the data being submitted. `null` when there is no active submission or no parent `<form>`.
- `method`: `'get'` or `'post'`, reflecting the parent form's HTTP method. Defaults to `'get'` unless the form sets `method`.
- `action`: a reference to the function passed to the parent form's `action` prop. `null` if there is no parent `<form>`, or if `action` is a URI string or absent.

# Usage

## Display a pending state during submission

Call the Hook in a child component (such as a submit button) and read `pending` to disable the button or swap its label while the form submits.

```js
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
```

The `Submit` component must be rendered inside the `<form action={...}>` whose status you want.

## Read the form data being submitted

Use `data` to show what the user is submitting, for example an optimistic confirmation message.

```js
function UsernameForm() {
  const { pending, data } = useFormStatus();
  return (
    <p>{data ? `Requesting ${data.get("username")}...` : ""}</p>
  );
}
```

# Caveats

- Must be called from a component rendered inside a `<form>`.
- Only reports status for a parent `<form>`. It does not report status for a `<form>` rendered in the same component that calls the Hook, nor for child forms.

# Troubleshooting

- `status.pending` is never `true`: the calling component is not nested inside a `<form>`, or the `<form>` is rendered in the same component as the Hook call. Move the Hook into a child of the `<form>`.

# Citations

[1] [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
