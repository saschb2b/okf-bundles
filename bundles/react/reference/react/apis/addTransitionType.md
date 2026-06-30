---
type: API Reference
title: addTransitionType
description: Specifies the cause of a transition so animations can be customized by type.
resource: https://react.dev/reference/react/addTransitionType
tags: [react, transitions, animation, view-transitions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`addTransitionType` lets you specify the cause of a transition. It is only available in React's Canary and Experimental channels.

```js
startTransition(() => {
  addTransitionType('my-transition-type');
  setState(newState);
});
```

Call it inside the scope of [startTransition](/reference/react/apis/startTransition.md) to associate a type string with the transition.

## Parameters

- `type`: The type of transition to add. Any string.

## Returns

`addTransitionType` does not return anything.

# Usage

- Indicate the cause of a transition by calling `addTransitionType` inside `startTransition`. React associates the string as one of the causes of the transition.

```js
import { startTransition, addTransitionType } from 'react';

startTransition(() => {
  addTransitionType('submit-click');
  action();
});
```

- Customize animations with browser view transition types: when a [ViewTransition](/reference/react/components/ViewTransition.md) activates from a transition, React adds all transition types as browser view transition types on the element, so you can scope CSS by `:root:active-view-transition-type(my-transition-type)`.
- Customize animations with View Transition Class: pass an object to a `ViewTransition` prop mapping type to class, for example `enter={{'my-transition-type': 'my-transition-class'}}`. If multiple types match they are joined. If none match the special "default" entry is used. A value of "none" wins and disables the ViewTransition. These can be combined with enter/exit/update/layout/share props.
- Customize animations with ViewTransition events: read the `types` array in imperative event handlers like `onUpdate={(inst, types) => { ... }}` to pick a different animation based on the cause.

# Caveats

- If multiple transitions are combined, all transition types are collected. You can also add more than one type to a single transition.
- Transition types are reset after each commit. A `<Suspense>` fallback associates the types after a `startTransition`, but revealing the content does not.

# Citations
[1] [addTransitionType](https://react.dev/reference/react/addTransitionType)
