---
type: API Reference
title: captureOwnerStack
description: Reads the current Owner Stack in development and returns it as a string for debugging.
resource: https://react.dev/reference/react/captureOwnerStack
tags: [react, debugging, development, owner-stack]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`captureOwnerStack` reads the current Owner Stack in development and returns it as a string if available.

```js
const stack = captureOwnerStack();
```

Use a namespace import (`import * as React from 'react'`) and guard with `process.env.NODE_ENV !== 'production'`, since the export is undefined in production.

## Parameters

`captureOwnerStack` does not take any parameters.

## Returns

`string | null`. Owner Stacks are available in component render, effects (such as `useEffect`), React event handlers (such as `<button onClick={...} />`), and React error handlers (root options `onCaughtError`, `onRecoverableError`, `onUncaughtError`). If no Owner Stack is available, `null` is returned.

# Owner Stack vs Component Stack

The Owner Stack differs from the Component Stack found in `errorInfo.componentStack`. It only includes components that "created" nodes, not those that merely rendered or forwarded them:

- A component rendering `children` is not in the Owner Stack.
- DOM components (such as `fieldset`) are not Owners.
- Siblings are not included.
- The component throwing the error is omitted because it is already in the callstack.

# Usage

- Enhance a custom error overlay by capturing the Owner Stack inside a patched `console.error` and attaching it to your reported error.

```js
import { captureOwnerStack } from "react";
console.error = function patchedConsoleError(...args) {
  const ownerStack = captureOwnerStack();
  onConsoleError({ consoleMessage: args[0], ownerStack });
};
```

# Caveats

- Owner Stacks are only available in development. `captureOwnerStack` always returns `null` outside of development.
- `null` is returned when the call happened outside a React controlled function (a `setTimeout` callback, after a `fetch`, or a custom DOM event handler). Call it earlier, for example in a `useEffect` body.
- The export is only present in development builds and is `undefined` in production. Use conditional access via a namespace import.

# Citations
[1] [captureOwnerStack](https://react.dev/reference/react/captureOwnerStack)
