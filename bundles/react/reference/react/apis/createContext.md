---
type: API Reference
title: createContext
description: Creates a context that components can provide or read to pass data deep without prop drilling.
resource: https://react.dev/reference/react/createContext
tags: [react, context, state-management, provider]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`createContext` lets you create a context that components can provide or read. Reading context is covered in the guide on [passing data deeply with context](/managing-state/passing-data-deeply-with-context.md).

```js
const SomeContext = createContext(defaultValue)
```

Call `createContext` outside of any components to create a context.

## Parameters

- `defaultValue`: The value the context has when there is no matching provider above the reader. Specify `null` if there is no meaningful default. It is a static last-resort fallback and never changes over time.

## Returns

A context object. The object itself holds no information; it represents which context other components read or provide. Its members:

- `SomeContext` lets you provide the context value to components.
- `SomeContext.Consumer` is an alternative and rarely used way to read the context value.
- `SomeContext.Provider` is a legacy way to provide the context value before React 19.

# Provider

Wrap components in a context provider to set the value for everything inside. Starting in React 19 you can render `<SomeContext>` directly as a provider; in older versions use `<SomeContext.Provider>`.

```jsx
<ThemeContext value={theme}>
  <Page />
</ThemeContext>
```

## Props

- `value`: The value passed to all components reading this context inside this provider, of any type. A reader receives the value of the innermost matching provider above it.

# Consumer

`SomeContext.Consumer` is the older, legacy way to read context with a render-prop function. Newly written code should read context with [useContext](/reference/react/hooks/useContext.md) instead.

```jsx
<ThemeContext.Consumer>
  {theme => <button className={theme} />}
</ThemeContext.Consumer>
```

## Props

- `children`: A function. React calls it with the current context value (resolved the same way [useContext](/reference/react/hooks/useContext.md) does) and renders its result, re-running it whenever the context changes.

# Usage

- Create context by calling `createContext` outside any component, then read it with [useContext](/reference/react/hooks/useContext.md). By default readers get the default value, which is not useful alone.
- Provide dynamic values by wrapping the tree in a provider whose `value` comes from state. When the value changes, React re-renders the components reading that context.
- Import and export context from a dedicated file when components in different files need the same context, so they share one context object.

# Caveats

- The argument to `createContext` is only the default value and never changes. To make context change over time, add state and wrap components in a provider, as shown in [updating data passed via context](/reference/react/hooks/useContext.md).

# Citations
[1] [createContext](https://react.dev/reference/react/createContext)
