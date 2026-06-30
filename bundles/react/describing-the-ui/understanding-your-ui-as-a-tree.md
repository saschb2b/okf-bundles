---
type: Guide
title: Understanding Your UI as a Tree
description: Why modeling your UI as a render tree and a module dependency tree helps debug performance and bundle size.
resource: https://react.dev/learn/understanding-your-ui-as-a-tree
tags: [react, render-tree, performance, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React, like many UI libraries, models UI as a tree. Thinking of your app as a tree clarifies the relationships between components and helps you reason about later topics like performance and state management. Two trees matter: the render tree (component relationships in a single render) and the module dependency tree (import relationships between files).

# UI as a tree

Trees model relationships between items, and UI is commonly represented as a tree. Browsers use trees for HTML (the DOM) and CSS (the CSSOM), and mobile platforms use trees for their view hierarchy. React builds its own UI tree from your components to manage and model their relationships, then uses it to render to the DOM (or another platform).

# The render tree

A core feature of components is composing them from other components, which creates parent and child relationships. When React renders an app, it models these relationships as a render tree.

```jsx
export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
```

- Each node represents a component. Arrows point from parent to child.
- The root node is the app's [root component](/describing-the-ui/importing-and-exporting-components.md), here `App`, which React renders first.
- The render tree contains only components, not the HTML tags they emit. React is platform agnostic, so the same tree applies whether it renders to the web, mobile, or desktop.

A render tree represents a single render pass. With [conditional rendering](/describing-the-ui/conditional-rendering.md), a parent can render different children depending on its data, so the render tree may differ from one pass to the next. For example, a generator might render `<FancyText>` or `<Color>` based on `inspiration.type`.

Render trees help identify two useful categories:

- Top-level components sit near the root. They affect the rendering performance of everything beneath them and often hold the most complexity.
- Leaf components sit at the bottom with no children, and are often re-rendered frequently.

# The module dependency tree

As you break components and logic into separate files, you create JS modules that export components, functions, or constants. The import relationships between those modules form a module dependency tree. Each node is a module; each branch is an `import` statement.

Compared with the render tree of the same app:

- Nodes represent modules, not components.
- Non-component modules (for example `inspirations.js`) appear in this tree but never in the render tree.
- A module can sit in a different place than its component does in the render tree. For instance a module imported by `App.js` may render as a child of another component when it is passed as [JSX children](/describing-the-ui/passing-props-to-a-component.md), because the receiving component renders it without importing it.

Dependency trees are used by bundlers to decide which modules to ship to the client. As an app grows, so does its bundle, and large bundles delay the time to paint. Inspecting the dependency tree helps debug bundle size and find what to optimize.

# Recap

- Trees are a common way to represent relationships between entities and are often used to model UI.
- Render trees represent the nested relationships between React components across a single render.
- With conditional rendering and different props, the render tree may change across renders.
- Render trees help identify top-level and leaf components, which is useful for understanding and debugging rendering performance.
- Dependency trees represent the module import relationships in a React app.
- Build tools use dependency trees to bundle the code needed to ship an app, so they help debug large bundle sizes.

# Citations

[1] [Understanding Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree)
