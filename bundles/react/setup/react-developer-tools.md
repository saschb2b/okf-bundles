---
type: Guide
title: React Developer Tools
description: How to install React Developer Tools to inspect components, edit props and state, and find performance problems.
resource: https://react.dev/learn/react-developer-tools
tags: [react, devtools, debugging, profiler]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React Developer Tools inspects React components, edits props and state, and identifies performance problems. The easiest path is the browser extension; other browsers and React Native have their own setups.

# Browser extension

Install the extension for your browser:

- Chrome (Chrome Web Store)
- Firefox (addons.mozilla.org)
- Edge (Edge Add-ons)

On any website built with React you will then see the Components and Profiler panels.

# Safari and other browsers

For browsers without an extension (for example, Safari), install the `react-devtools` npm package:

```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

Open the standalone devtools from the terminal:

```bash
react-devtools
```

Connect your site by adding this tag to the start of the `<head>`, then reload:

```html
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

# Mobile (React Native)

For apps built with React Native, use React Native DevTools, the built in debugger that deeply integrates React Developer Tools. All features work identically to the browser extension, including native element highlighting and selection.

# Pitfalls

- For React Native versions earlier than 0.76, use the standalone build of React DevTools by following the Safari and other browsers steps above.

# Citations

[1] [React Developer Tools](https://react.dev/learn/react-developer-tools)
