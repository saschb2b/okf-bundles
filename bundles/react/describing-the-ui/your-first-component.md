---
type: Guide
title: Your First Component
description: How to define and use a React component, a JavaScript function that returns JSX markup.
resource: https://react.dev/learn/your-first-component
tags: [react, components, jsx, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Components are a core concept of React and the foundation for building UI. A React component is a reusable UI element: your markup, CSS, and JavaScript combined into a custom tag you can compose, order, and nest like built-in HTML tags. Under the hood a component is just a JavaScript function that returns markup, so you build whole pages by reusing components you already wrote.

# Defining a component

A component is a JavaScript function that you sprinkle with markup. Three pieces define it.

```jsx
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

- **Export the component.** The `export default` prefix is standard JavaScript (not React-specific). It marks the main function in a file so other files can import it.
- **Define the function.** `function Profile() { }` defines a function. Its name must start with a capital letter.
- **Add markup.** The function returns JSX, an HTML-like syntax that embeds markup in JavaScript. A return on one line needs no parentheses; multi-line markup must be wrapped in parentheses.

```jsx
return (
  <div>
    <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

# Using a component

Once defined, a component can be nested inside other components. React distinguishes your components from HTML tags by casing.

```jsx
function Profile() {
  return <img src="..." alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

- Lowercase tags like `<section>` are HTML tags.
- Capitalized tags like `<Profile />` tell React to use your component.
- A component that renders another is the parent; the rendered one is the child. You can reuse a component as many times as you like.

# Components all the way down

A React app begins at a root component, usually created automatically (for example `pages/index.js` in a CodeSandbox or Next.js project). Most apps use components all the way down: not just buttons but sidebars, lists, and complete pages. React-based frameworks go further and also generate HTML from your components so content can show before JavaScript loads. You can also use React for just part of an existing HTML page, giving you many root components instead of one.

# Pitfalls

- **Capitalize component names.** React components are regular JavaScript functions, but their names must start with a capital letter or they will not work.
- **Wrap multi-line return in parentheses.** Without parentheses, any code on the lines after `return` is ignored due to automatic semicolon insertion.
- **Never nest component definitions.** Defining a component inside another component is very slow and causes bugs. Declare every component at the top level. When a child needs data from a parent, [pass it by props](/describing-the-ui/passing-props-to-a-component.md) instead of nesting definitions.

```jsx
export default function Gallery() {
  // ...
}

// Declare components at the top level, not nested.
function Profile() {
  // ...
}
```

# Recap

- React lets you create components, reusable UI elements for your app.
- In a React app, every piece of UI is a component.
- React components are regular JavaScript functions except that their names always begin with a capital letter and they return JSX markup.

# Citations

[1] [Your First Component](https://react.dev/learn/your-first-component)
