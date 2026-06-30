---
type: Guide
title: Installation
description: Overview of the ways to start using React, from trying it online to creating an app or adding it to an existing project.
resource: https://react.dev/learn/installation
tags: [react, installation, getting-started, setup]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React is designed for gradual adoption: use as little or as much as you need. You can try it online with no install, create a new app with a recommended framework, build an app from scratch, or add React to an existing project. This page is the landing page for the installation section and points to the right path for each goal.

# Try React

No install is needed to experiment. Most react.dev pages embed editable sandboxes, and several online sandboxes support React: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), and [CodePen](https://codepen.io/pen?template=QWYVwWN). To try React locally, download a single self-contained HTML page and open it in your editor and browser.

A minimal component looks like this:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />;
}
```

# Choosing a path

Each option below has its own concept in this folder.

- Start a new app with a recommended framework. See [Creating a React App](/installation/creating-a-react-app.md).
- Build your own setup with a build tool when a framework is not a good fit. See [Build a React App from Scratch](/installation/build-a-react-app-from-scratch.md).
- Add interactive React components to a site or app you already have. See [Add React to an Existing Project](/installation/add-react-to-an-existing-project.md).

# Pitfalls

- Do not use Create React App. It has been deprecated. See the [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) post for details and migration guidance.

# Next steps

Read the Quick Start guide for a tour of the core React concepts you will use daily. See [Quick Start](/get-started/quick-start.md).

# Citations

[1] [Installation](https://react.dev/learn/installation)
