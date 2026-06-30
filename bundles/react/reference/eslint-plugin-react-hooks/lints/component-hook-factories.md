---
type: Lint Rule
title: component-hook-factories
description: Flags higher-order functions that define nested components or Hooks instead of declaring them at the module level.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories
tags: [react, eslint, hooks, lint, components]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Factory functions that return a component or a Hook, and components or Hooks defined inside other functions. Components and Hooks should be defined at the module level.

Defining them inside other functions creates a new instance on every call. React treats each instance as a different component type, so it destroys and recreates the whole subtree, losing all state and hurting performance.

# Examples

Invalid:

```js
// Factory function creating components
function createComponent(defaultValue) {
  return function Component() { /* ... */ };
}

// Component defined inside component
function Parent() {
  function Child() { /* ... */ }
  return <Child />;
}

// Hook factory function
function createCustomHook(endpoint) {
  return function useData() { /* ... */ };
}
```

Valid:

```js
// Component at module level
function Component({ defaultValue }) { /* ... */ }

// Custom Hook at module level
function useData(endpoint) { /* ... */ }
```

# Troubleshooting

If you reach for a factory to produce customized components, pass JSX as `children` (or pass props) instead of generating components:

```js
function Button({ color, children }) {
  return <button style={{ backgroundColor: color }}>{children}</button>;
}

function App() {
  return (
    <>
      <Button color="red">Red</Button>
      <Button color="blue">Blue</Button>
    </>
  );
}
```

# Related

Closely related to [static-components](static-components.md), which flags components recreated every render.

# Citations

[1] [component-hook-factories](https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories)
