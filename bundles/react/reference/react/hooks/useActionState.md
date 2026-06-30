---
type: API Reference
title: useActionState
description: React Hook that updates state with the result of an Action, exposing the current state, a dispatch function, and a pending flag.
resource: https://react.dev/reference/react/useActionState
tags: [react, hook, actions, forms, state]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useActionState` lets you update state based on the result of a form Action.

```js
const [state, formAction, isPending] = useActionState(action, initialState, permalink?)
```

Call it at the top level of your component to create state that updates when a form Action is dispatched.

```jsx
import { useActionState } from 'react';

function MyComponent() {
  const [state, formAction, isPending] = useActionState(action, initialState);
  // ...
}
```

## Parameters

- `action`: The function called when the form is submitted or the action is dispatched. When called, it receives the previous state as its first argument, then the form data (or the dispatched payload) as its second argument. It returns the next state.
- `initialState`: The value the state starts at. Ignored after the first dispatch. When using Server Functions, it must be serializable.
- `permalink` (optional): A string URL the form modifies. For pages using Server Functions with progressive enhancement, if the form is submitted before the JavaScript bundle loads, the browser navigates to this URL instead of the current page. Render the same form component on the destination page.

## Returns

An array with exactly three values:

1. `state`: The current state. On the first render it equals `initialState`. After dispatch it equals the value returned by `action`.
2. `formAction`: A new action you pass to your `<form>` `action` prop or a button `formAction` prop, or call directly. It has a stable identity.
3. `isPending`: A boolean, true while a dispatched Action for this Hook is pending.

# Usage

- Use information returned by a form Action. Pass `formAction` to a `<form>`, and read `state` for the result (such as a server error message).
  ```jsx
  function Form({ action }) {
    const [message, formAction, isPending] = useActionState(action, null);
    return (
      <form action={formAction}>
        <input type="text" name="query" />
        <button type="submit" disabled={isPending}>Send</button>
        {message && <p>{message}</p>}
      </form>
    );
  }
  ```
- Define the action with `(previousState, formData)`. Read submitted fields off `formData`, do the work, and return the next state.
  ```js
  async function increment(previousState, formData) {
    return previousState + 1;
  }
  ```
- Display the pending state with the `isPending` flag, for example to disable the submit button while the Action runs.
- Combine with [useOptimistic](/reference/react/hooks/useOptimistic.md) to show an optimistic value while the Action is in flight, and with [useTransition](/reference/react/hooks/useTransition.md) (or dispatch from inside [startTransition](/reference/react/apis/startTransition.md)) when dispatching outside a form.

# Caveats

- It is a Hook, so call it only at the top level of your component or your own Hooks, never inside loops or conditions.
- The `action` function receives the previous state as its first argument. This differs from form actions used without `useActionState`, which do not get the previous state.
- When using Server Functions, `initialState` and the dispatched payload need to be serializable.
- The action is treated as a Transition. It is not invoked twice in Strict Mode.
- React queues multiple dispatched actions and runs them sequentially, each receiving the result of the previous one. If multiple actions are ongoing, React batches them.
- If you set state after an `await` inside the action, wrap that state update in an additional `startTransition`.
- The `permalink` requires that the same form component is rendered on the destination page.

# Citations

[1] [useActionState](https://react.dev/reference/react/useActionState)
