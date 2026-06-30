---
type: Guide
title: Passing Props to a Component
description: How to configure components with props, including any JavaScript value, defaults, spread, and children.
resource: https://react.dev/learn/passing-props-to-a-component
tags: [react, props, components, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Props are how React components communicate. A parent component passes information to a child through props. Props can be any JavaScript value, including objects, arrays, functions, and JSX. They work like HTML attributes but are not limited to strings.

# Passing and reading props

Pass props as JSX attributes on the child. Read them inside the child by destructuring the single props argument.

```jsx
function Avatar({ person, size }) {
  return <img src={getImageUrl(person)} alt={person.name} width={size} height={size} />;
}

export default function Profile() {
  return <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />;
}
```

Destructuring `{ person, size }` is equivalent to taking a single `props` object and reading `props.person` and `props.size`. Use whichever form you prefer; destructuring is the common style.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
}
```

# Default values

Give a prop a default with `=` during destructuring. It applies only when the prop is missing or `undefined`. Passing `null` or `0` uses those values, not the default.

```jsx
function Avatar({ person, size = 100 }) {
  // size is 100 when the prop is omitted or undefined
}
```

# Forwarding props with spread

Use the spread syntax `{...props}` to forward every prop to a child. Use it sparingly. Frequent need for it often signals that a component should be split.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

# Passing JSX as children

JSX nested inside a component is passed automatically as the `children` prop. This is the pattern for flexible wrapper components like cards, panels, and grids.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <Avatar />
</Card>
```

The render-tree consequence is that a component receiving `children` renders them as a child without importing their module. See [understanding your UI as a tree](/describing-the-ui/understanding-your-ui-as-a-tree.md).

# Props change over time

A component can receive different props on different renders, so props are not static, but each individual props object is immutable. When a component needs to change its data in response to interaction or time, it asks the parent to pass different props. Do not try to mutate props. Use state instead, covered in [state, a component's memory](/adding-interactivity/state-a-components-memory.md).

# Pitfalls

- Props are read-only. Mutating a prop is not allowed; ask the parent for new props or use state.
- Defaults fire only for missing or `undefined` props, not for `null` or `0`.
- Overusing `{...props}` hides what a component actually consumes and often means the component should be broken up.

# Recap

- Pass props as JSX attributes; read them by destructuring inside the child.
- Props can be any JavaScript value, including objects, arrays, functions, and JSX.
- Set defaults with `=` in destructuring; forward all props with `{...props}` sparingly.
- Nested JSX arrives as the `children` prop, enabling flexible wrapper components.
- Props are read-only snapshots; for changing data, use state.

# Citations

[1] [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
