---
type: API Reference
title: useDebugValue
description: React Hook that adds a readable label to a custom Hook in React DevTools.
resource: https://react.dev/reference/react/useDebugValue
tags: [react, hook, devtools, debugging, custom-hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useDebugValue` adds a label to a custom Hook in React DevTools.

```js
useDebugValue(value, format?)
```

Call it at the top level of your custom Hook to display a readable debug value.

```js
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

## Parameters

- `value`: The value to display in React DevTools. It can have any type.
- `format` (optional): A formatting function. When the component is inspected, React DevTools calls it with `value` as the argument and displays the returned value (any type). If omitted, the original `value` is displayed. Because it runs only on inspection, you can defer expensive formatting.

## Returns

`useDebugValue` does not return anything.

# Usage

- Add a label to a custom Hook. Call `useDebugValue` inside the Hook so components that use it show a label like `OnlineStatus: "Online"` when inspected in DevTools.
- Defer formatting of a debug value. Pass a formatting function as the second argument so the expensive formatting runs only when the component is inspected.
  ```js
  useDebugValue(date, date => date.toDateString());
  ```

# Caveats

- It is most valuable for custom Hooks that are part of shared libraries and have a complex internal data structure that is hard to inspect. Do not add debug values to every custom Hook.

# Related

Adds a label to the [custom Hooks](/escape-hatches/reusing-logic-with-custom-hooks.md) you build, shown next to them in React DevTools.

# Citations

[1] [useDebugValue](https://react.dev/reference/react/useDebugValue)
