---
type: Guide
title: Render and Commit
description: The three steps React takes to display components, trigger, render, and commit, and why rendering does not always touch the DOM.
resource: https://react.dev/learn/render-and-commit
tags: [react, rendering, dom, commit]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Before components are displayed on screen, they must be rendered by React. The process has three steps, like ordering food in a restaurant: triggering a render (delivering the order), rendering the component (preparing it), and committing to the DOM (placing it on the table). Understanding this helps explain how your code executes.

# Step 1: Trigger a render

A component renders for two reasons:

1. Its initial render.
2. Its (or an ancestor's) state has been updated.

The initial render calls `createRoot` with the target DOM node, then `root.render` with your component.

```js
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<Image />);
```

After the initial render, updating state with the [useState](/reference/react/hooks/useState.md) setter automatically queues a render.

# Step 2: React renders your components

Rendering is React calling your components.

- Initial render: React calls the root component.
- Re-renders: React calls the function component whose state update triggered the render.

The process is recursive. If a component returns another component, React renders that one next, and so on, until there are no more nested components.

## Rendering must be pure

A component must be a pure calculation:

- Same inputs, same output: given the same inputs it returns the same JSX.
- It minds its own business: it does not change objects or variables that existed before rendering.

Otherwise you get confusing bugs. In Strict Mode, React calls each component function twice to surface mistakes from impure functions.

## Performance note

Rendering all components nested within an updated component is not optimal if the updated component is high in the tree. There are opt-in solutions in the Performance section, but do not optimize prematurely.

# Step 3: React commits changes to the DOM

After rendering, React modifies the DOM:

- Initial render: React uses `appendChild()` to put all created nodes on screen.
- Re-renders: React applies the minimal operations needed to match the latest output.

React only changes a DOM node if there is a difference between renders. For example, an `<input>` that stays in the same place in the JSX keeps its typed value across re-renders, because React only updates the parts that changed (such as an `<h1>` text).

# Epilogue: browser paint

After React updates the DOM, the browser repaints the screen. This step is called painting (rather than browser rendering) to avoid confusion with React's render step.

# Recap

- Any screen update in a React app happens in three steps: trigger, render, commit.
- Use Strict Mode to find mistakes in your components.
- React does not touch the DOM if the rendering result is the same as last time.

# Citations

[1] [Render and Commit](https://react.dev/learn/render-and-commit)
