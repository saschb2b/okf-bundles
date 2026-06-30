---
type: Guide
title: JavaScript in JSX with Curly Braces
description: How to reference JavaScript variables, calls, and objects inside JSX using curly braces.
resource: https://react.dev/learn/javascript-in-jsx-with-curly-braces
tags: [react, jsx, javascript, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

JSX keeps rendering logic and content together. When you need a little JavaScript logic or a dynamic property inside markup, use curly braces `{ }` to open a window to JavaScript. JSX is built on top of [writing markup with JSX](/describing-the-ui/writing-markup-with-jsx.md), adding the ability to embed expressions.

# Passing strings with quotes

To pass a string attribute, use single or double quotes:

```jsx
<img className="avatar" src="https://..." alt="Gregorio Y. Zara" />
```

To specify a value dynamically, replace the quotes with curly braces so the attribute reads a JavaScript variable:

```jsx
const avatar = 'https://...';
const description = 'Gregorio Y. Zara';
return <img className="avatar" src={avatar} alt={description} />;
```

Note the difference: `className="avatar"` passes the literal string `avatar` as a CSS class, while `src={avatar}` reads the value of the JavaScript variable named `avatar`.

# Curly braces: a window into JavaScript

Any JavaScript expression works between curly braces, both plain variables and function calls.

```jsx
const name = 'Gregorio Y. Zara';
return <h1>{name}'s To Do List</h1>;
```

```jsx
return <h1>To Do List for {formatDate(today)}</h1>;
```

## Where you can use curly braces

You can use curly braces in only two places inside JSX:

1. As text directly inside a JSX tag: `<h1>{name}'s To Do List</h1>` works, but `<{tag}>...</{tag}>` does not.
2. As attributes immediately after the `=` sign: `src={avatar}` reads the variable, but `src="{avatar}"` passes the literal string `"{avatar}"`.

# Double curlies: objects in JSX

Objects in JavaScript are also written with curly braces. To pass an object inside JSX you wrap it in another pair of braces: `person={{ name: "Hedy Lamarr", inventions: 5 }}`. The most common case is inline `style`, which takes an object:

```jsx
<ul style={{ backgroundColor: 'black', color: 'pink' }}>
  <li>Improve the videophone</li>
</ul>
```

The `{{` and `}}` are not special syntax: they are a JavaScript object inside JSX curly braces. Inline `style` properties are written in camelCase, so HTML `background-color: black` becomes `backgroundColor: 'black'`.

# Objects and curly braces together

You can move several expressions into one object and reference its properties in JSX. This keeps the markup simple.

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: { backgroundColor: 'black', color: 'pink' }
};

return (
  <div style={person.theme}>
    <h1>{person.name}'s Todos</h1>
  </div>
);
```

# Pitfalls

- Rendering a whole object as a child throws `Objects are not valid as a React child`. Render a specific property instead: use `{person.name}`, not `{person}`.
- Inline `style` uses camelCase keys, not HTML's dashed property names.
- A quoted attribute does not interpolate variables: `src="{baseUrl}{id}.jpg"` passes a literal string. Build the value as an expression: `src={baseUrl + id + '.jpg'}`, or move it into a helper like `getImageUrl(person)`.

# Recap

- JSX attributes inside quotes are passed as strings.
- Curly braces bring JavaScript logic and variables into your markup.
- They work inside JSX tag content or immediately after `=` in attributes.
- `{{` and `}}` is not special syntax: it is a JavaScript object inside JSX curly braces.

# Citations

[1] [JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
