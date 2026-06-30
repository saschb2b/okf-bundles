---
type: Guide
title: Writing Markup with JSX
description: How to add HTML-like markup to JavaScript with the JSX syntax extension and its three rules.
resource: https://react.dev/learn/writing-markup-with-jsx
tags: [react, jsx, markup, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. There are other ways to write components, but most React developers prefer the conciseness of JSX and most codebases use it. JSX and React are separate things: JSX is a syntax extension, React is a JavaScript library, and you can use either without the other, but they are usually used together.

# JSX puts markup into JavaScript

For many years content lived in HTML, design in CSS, and logic in JavaScript, often in separate files. As the Web became interactive, logic increasingly drove content, so JavaScript took charge of the HTML. In React, rendering logic and markup live together in the same place: components. Keeping a button's logic and markup together keeps them in sync on every edit, while unrelated markup (a button versus a sidebar) stays isolated, so each is safer to change on its own.

Each React component is a JavaScript function that may return markup. React represents that markup with JSX. JSX looks like HTML but is stricter and can display dynamic information.

# The three rules of JSX

JSX is stricter than HTML. Pasting valid HTML straight into a component will not work until you satisfy these rules.

## 1. Return a single root element

To return multiple elements from a component, wrap them in a single parent tag, such as a `<div>`. If you do not want an extra wrapper node in the DOM, use a Fragment, written as empty tags `<>` and `</>`. Fragments group elements without leaving a trace in the browser HTML tree.

```jsx
return (
  <>
    <h1>Hedy Lamarr's Todos</h1>
    <img src="..." alt="Hedy Lamarr" className="photo" />
    <ul>...</ul>
  </>
);
```

Multiple tags must be wrapped because JSX compiles to plain JavaScript objects, and you cannot return two objects from a function without wrapping them in an array. The same applies to two JSX tags.

## 2. Close all the tags

JSX requires every tag to be explicitly closed. Self-closing tags like `<img>` become `<img />`, and tags like `<li>oranges` must be written `<li>oranges</li>`.

```jsx
<img src="..." alt="Hedy Lamarr" className="photo" />
<ul>
  <li>Invent new traffic lights</li>
  <li>Rehearse a movie scene</li>
</ul>
```

## 3. camelCase most of the things

JSX attributes become keys of JavaScript objects, and JavaScript variable names cannot contain dashes or be reserved words. So many HTML and SVG attributes are written in camelCase: `stroke-width` becomes `strokeWidth`, and because `class` is reserved you write `className` instead (named after the DOM property).

```jsx
<img src="..." alt="Hedy Lamarr" className="photo" />
```

For historical reasons, `aria-*` and `data-*` attributes keep their HTML dashes.

# Pitfalls

- A return that wraps two or more sibling tags without a single parent or Fragment will not compile.
- An unclosed tag (`<img>` without `/`, or `<li>` without `</li>`) is a syntax error in JSX.
- Using `class` instead of `className`, or a dashed attribute name, is wrong. React prints a console message with a likely correction.

# Pro tip

Converting attributes in existing markup by hand is tedious. Use an HTML-to-JSX converter such as transform.tools to translate existing HTML and SVG, but still understand the rules so you can write JSX yourself.

# Recap

- React components group rendering logic with markup because they are related.
- JSX is similar to HTML with a few differences. You can use a converter if you need to.
- Error messages will often point you toward fixing your markup.

# Citations

[1] [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
