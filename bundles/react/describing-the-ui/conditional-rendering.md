---
type: Guide
title: Conditional Rendering
description: How to render different JSX depending on conditions using if, the logical AND, and the ternary operator.
resource: https://react.dev/learn/conditional-rendering
tags: [react, conditional-rendering, jsx, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Components often need to display different content depending on conditions. React uses ordinary JavaScript control flow for this: `if` statements, the logical AND operator `&&`, and the conditional (ternary) operator `? :`. Choose the form that reads most clearly for each case.

# Conditionally returning JSX

Use `if` / `else` to return entirely different JSX trees from a component.

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}
```

# Returning null to render nothing

A component may return `null` to render nothing. This is valid but uncommon. It is usually clearer to omit or include the component in the parent's JSX instead of returning `null` from the child.

```jsx
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

# Ternary operator (? :)

The conditional operator gives a compact expression you can embed directly in JSX, including wrapping JSX on both branches.

```jsx
return <li className="item">{isPacked ? name + ' ✅' : name}</li>;
```

```jsx
{isPacked ? (
  <del>{name + ' ✅'}</del>
) : (
  name
)}
```

# Logical AND operator (&&)

Use `&&` to render JSX when a condition is true and nothing otherwise. A common case is showing a badge or message only when present.

```jsx
return <li className="item">{name} {isPacked && '✅'}</li>;
```

# Conditionally assigning to a variable

For more complex logic, build the content in a variable with an `if` statement, then embed the variable in JSX. This is the most verbose form but also the most flexible.

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + ' ✅';
  }
  return <li className="item">{itemContent}</li>;
}
```

# Pitfalls

- Do not put a number on the left of `&&`. If the left side is `0`, React renders `0` instead of nothing. Write `messageCount > 0 && <p>New messages</p>`, not `messageCount && <p>...</p>`.
- If conditional markup becomes deeply nested, extract child components to keep it readable.

# Recap

- React handles control flow with plain JavaScript.
- Conditionally return different JSX with `if`, or return `null` to render nothing.
- For short conditions, the `? :` and `&&` shortcuts are idiomatic in JSX.
- For complex logic, build content in a variable with `if`, then embed it.
- Extract child components when conditional markup gets too nested.

# Citations

[1] [Conditional Rendering](https://react.dev/learn/conditional-rendering)
