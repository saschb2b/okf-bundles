---
type: Guide
title: Add React to an Existing Project
description: How to add interactive React components to an existing website or app, by subroute or by page region.
resource: https://react.dev/learn/add-react-to-an-existing-project
tags: [react, integration, vite, createRoot, existing-project]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

You do not have to rewrite an existing project in React. You can add React to your existing stack and render interactive components anywhere. There are three approaches: own a full subroute with a React framework, render React into parts of an existing page, or integrate React Native into an existing native mobile app.

# Prerequisites

You need [Node.js](https://nodejs.org/en/) installed for local development. You can try React online or with a plain HTML page, but realistically the JavaScript tooling you will want requires Node.js.

# Using React for an entire subroute

To implement all routes under a path (for example `example.com/some-app/`) fully with React:

1. Build the React part using one of the [React-based frameworks](/installation/creating-a-react-app.md).
2. Set `/some-app` as the base path in the framework's config (for example Next.js `basePath`, or Gatsby `pathPrefix`).
3. Configure your server or proxy so all requests under `/some-app/` are handled by the React app.

This lets the React part benefit from the framework's best practices. If you cannot or do not want to run JavaScript on the server, serve the static HTML/CSS/JS export at the subpath instead.

# Using React for a part of an existing page

To render interactive React components somewhere on a page built with another technology (Rails, Backbone, and similar), take two steps.

## Step 1: Set up a modular JavaScript environment

A modular environment lets you write components in individual files and use npm packages, including React itself. How you set it up depends on your project:

- If your app already uses `import` statements, reuse that setup. If writing `<div />` in your JS causes a syntax error, you need to [transform with Babel](https://babeljs.io/setup) and enable the [Babel React preset](https://babeljs.io/docs/babel-preset-react) for JSX.
- If your app has no module compilation setup, add [Vite](https://vite.dev/). The Vite community maintains integrations with backends including Rails, Django, and Laravel.

To check that it works, install React and render a test component at the top of your main JS file:

```bash
npm install react react-dom
```

```js
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

If the page content is replaced by "Hello, world", it works.

## Step 2: Render React components anywhere on the page

You do not actually want to clear the page, so delete the test code. Instead, add a unique `id` to any HTML tag where you want a component, find it with `document.getElementById`, and pass it to [`createRoot`](/reference/react-dom/client/createRoot.md):

```html
<nav id="navigation"></nav>
```

```jsx
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

The original HTML is preserved, and the React component renders inside the targeted element. JSX syntax is covered in [Writing Markup with JSX](/describing-the-ui/writing-markup-with-jsx.md).

It is common to start with small interactive components and gradually move upward until the whole page is React. If you reach that point, migrate to [a React framework](/installation/creating-a-react-app.md) to get the most out of React.

# Using React Native in an existing native app

[React Native](https://reactnative.dev/) can be integrated incrementally into an existing Android (Java or Kotlin) or iOS (Objective-C or Swift) app. Follow the [React Native integration guide](https://reactnative.dev/docs/integration-with-existing-apps) to add a React Native screen.

# Citations

[1] [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project)
