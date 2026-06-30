---
type: Lint Rule
title: static-components
description: Flags components defined inside other components, which are recreated every render and reset their state.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components
tags: [react, eslint, lint, components, performance]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Components defined inside other components, or otherwise recreated dynamically. A component declared inside another is recreated on every render. React sees each as a brand new component type, so it unmounts the old one and mounts the new one, destroying all state and DOM nodes and triggering excessive re-rendering.

# Examples

Invalid:

```js
// New component every render, state resets
function Parent() {
  const ChildComponent = () => {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  };
  return <ChildComponent />;
}

// Dynamic component creation in render
function Parent({ type }) {
  const Component = type === 'button'
    ? () => <button>Click</button>
    : () => <div>Text</div>;
  return <Component />;
}
```

Valid:

```js
// Components at module level, referenced by render
const ButtonComponent = () => <button>Click</button>;
const TextComponent = () => <div>Text</div>;

function Parent({ type }) {
  const Component = type === 'button' ? ButtonComponent : TextComponent;
  return <Component />;
}
```

# Troubleshooting

If you define an inner component to reach the parent's local state, pass that state as props to a module-level component instead:

```js
function ThemedButton({ theme }) {
  return <button className={theme}>Click me</button>;
}

function Parent() {
  const [theme, setTheme] = useState('light');
  return <ThemedButton theme={theme} />;
}
```

Wanting an inner component to access local variables is a sign you should pass props, which also makes components more reusable and testable.

# Related

Closely related to [component-hook-factories](component-hook-factories.md), which flags factory functions that return components or Hooks.

# Citations

[1] [static-components](https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components)
