---
type: API Reference
title: useContext
description: React Hook that reads and subscribes to context from a component, returning the nearest provider value above it.
resource: https://react.dev/reference/react/useContext
tags: [react, hook, context, state]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useContext` reads and subscribes to context from your component.

```js
const value = useContext(SomeContext)
```

Call it at the top level of your component to read the nearest provider value above it.

```jsx
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
}
```

## Parameters

- `SomeContext`: The context you previously created with [createContext](/reference/react/apis/createContext.md). The context itself does not hold information, it represents the kind of information you can provide or read.

## Returns

The context value for the calling component: the `value` passed to the closest `SomeContext` provider above it in the tree. If there is no such provider, the returned value is the `defaultValue` you passed to `createContext`. The value is always up to date. React automatically re-renders components that read a context when it changes.

# Usage

- Pass data deeply into the tree. Read the value with `useContext`, and wrap an ancestor in the matching provider. The number of layers between provider and consumer does not matter. See [passing data deeply with context](/managing-state/passing-data-deeply-with-context.md).
  ```jsx
  function MyPage() {
    return (
      <ThemeContext value="dark">
        <Form />
      </ThemeContext>
    );
  }
  ```
- Update data passed via context. Combine it with [state](/reference/react/hooks/useState.md): hold the value in a parent state variable and pass it as the provider `value`. Calling the setter re-renders all consumers with the new value.
  ```jsx
  const [theme, setTheme] = useState('dark');
  return <ThemeContext value={theme}>{/* ... */}</ThemeContext>;
  ```
- Specify a fallback default value. Pass a meaningful default to `createContext(defaultValue)` so a component renders without breaking when no provider is present. The default never changes.
- Override context for part of the tree. Nest another provider with a different `value` to override the context below it.
- Optimize re-renders when passing objects and functions. Wrap callbacks in [useCallback](/reference/react/hooks/useCallback.md) and the context object in [useMemo](/reference/react/hooks/useMemo.md) so consumers do not re-render unless the underlying data changes.

# Caveats

- A `useContext()` call is not affected by providers returned from the same component. The matching `<Context>` provider must be above the component doing the call.
- React automatically re-renders all children that read a context, starting from the provider that received a different `value`, comparing previous and next with `Object.is`. Wrapping a consumer in [memo](/reference/react/apis/memo.md) does not stop it from receiving fresh context values.
- If your build system produces duplicate modules (for example via symlinks), context breaks. The `SomeContext` used to provide and the one used to read must be exactly the same object (`===`).
- If a consumer does not see the value, the provider may be at or below the consumer (move it above), missing entirely, or duplicated by a build issue.
- If you always get `undefined` although the default differs, you likely have a provider with no `value` prop (equivalent to `value={undefined}`) or used the wrong prop name. The prop must be called `value`. The `createContext` default applies only when there is no matching provider at all.

# Citations

[1] [useContext](https://react.dev/reference/react/useContext)
