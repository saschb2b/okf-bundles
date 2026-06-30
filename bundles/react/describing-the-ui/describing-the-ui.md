---
type: Guide
title: Describing the UI
description: Section landing page for building, customizing, and conditionally displaying React components.
resource: https://react.dev/learn/describing-the-ui
tags: [react, ui, components, learn, overview]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images that you combine into reusable, nestable components. Everything on the screen, from web sites to phone apps, can be broken down into components. This section teaches you to create, customize, and conditionally display React components.

# In this section

Read these topic concepts in order:

- [Your First Component](/describing-the-ui/your-first-component.md): how to write your first React component, a JavaScript function sprinkled with markup.
- [Importing and Exporting Components](/describing-the-ui/importing-and-exporting-components.md): when and how to split components across files with imports and exports.
- [Writing Markup with JSX](/describing-the-ui/writing-markup-with-jsx.md): how to add HTML-like markup to JavaScript with the JSX syntax extension.
- [JavaScript in JSX with Curly Braces](/describing-the-ui/javascript-in-jsx-with-curly-braces.md): how to access JavaScript variables, calls, and objects from JSX using curly braces.
- [Passing Props to a Component](/describing-the-ui/passing-props-to-a-component.md): how to configure components with props, including any JavaScript value.
- [Conditional Rendering](/describing-the-ui/conditional-rendering.md): how to render different things depending on conditions using if, &&, and ? :.
- [Rendering Lists](/describing-the-ui/rendering-lists.md): how to render multiple components from a collection using map() and filter(), with keys.
- [Keeping Components Pure](/describing-the-ui/keeping-components-pure.md): how to avoid bugs by writing components as pure functions.
- [Understanding Your UI as a Tree](/describing-the-ui/understanding-your-ui-as-a-tree.md): why modeling your UI as render and dependency trees is useful.

# Recap

- React lets you create components, reusable UI elements for your app, and every piece of UI is a component.
- You can declare many components in one file, but you can also export a component into its own file and import it elsewhere.
- Each component is a JavaScript function that may contain markup, written with the JSX syntax extension. JSX looks like HTML but is stricter and can display dynamic information.
- Curly braces in JSX open a window to JavaScript, letting you reference variables and call functions.
- Components communicate through props: a parent passes information to its children. Any JavaScript value can be passed, including objects, arrays, functions, and JSX.
- Components conditionally render JSX using `if` statements, `&&`, and `? :` operators.
- You render lists with `filter()` and `map()`, specifying a `key` for each array item.
- A pure component minds its own business and returns the same output for the same inputs. Writing components as pure functions avoids a class of baffling bugs.
- React models component relationships as a render tree, and build tools model module relationships as a dependency tree.

# Citations

[1] [Describing the UI](https://react.dev/learn/describing-the-ui)
