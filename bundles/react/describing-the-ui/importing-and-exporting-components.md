---
type: Guide
title: Importing and Exporting Components
description: How to split components across files using default and named imports and exports.
resource: https://react.dev/learn/importing-and-exporting-components
tags: [react, components, modules, imports, learn]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

The magic of components is reusability: components compose other components. As you nest more, it makes sense to split them into separate files so files stay easy to scan and components are reusable in more places. You move a component by exporting it from a new file and importing it where you use it, choosing between default and named exports.

# The root component file

Components like `Profile` and `Gallery` from [Your First Component](/describing-the-ui/your-first-component.md) start in a root component file, often `App.js`. With a file-based-routing framework such as Next.js, the root component differs per page.

# Moving a component to its own file

Three steps move a component out of the root file:

1. **Make** a new JS file for the component.
2. **Export** the function from that file, using a default or a named export.
3. **Import** it where you use it, with the matching default or named import syntax.

```jsx
// App.js
import Gallery from './Gallery.js';

export default function App() {
  return <Gallery />;
}
```

```jsx
// Gallery.js: Profile is private to this file, Gallery is the default export.
function Profile() {
  return <img src="..." alt="Alan L. Hart" />;
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

The import path can include or omit the `.js` extension (`'./Gallery.js'` or `'./Gallery'` both work); the explicit extension is closer to how native ES Modules behave.

# Default vs named exports

A file can have at most one default export but as many named exports as you like. How you export dictates how you must import; importing a default like a named export (or vice versa) is an error.

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

- With a default import you can pick any local name (`import Banana from './Button.js'` still gets the same default export).
- With a named import the name must match on both sides.
- Teams often use default exports for files that export one component, and named exports for files exporting multiple components or values. Always give components meaningful names; avoid anonymous defaults like `export default () => {}` because they make debugging harder.

# Exporting multiple components from one file

A file can have only one default export but many named exports, so add a named export alongside the default.

```jsx
// Gallery.js
export function Profile() { /* ... */ }   // named export
export default function Gallery() { /* ... */ }  // default export
```

```jsx
// App.js
import Gallery from './Gallery.js';        // default import
import { Profile } from './Gallery.js';    // named import

export default function App() {
  return <Profile />;
}
```

To reduce confusion, some teams stick to one export style per file. Do what works best for you.

# Recap

- A root component file holds the entry component (often `App.js`, or per-page with file-based routing).
- You import and export components to split them across files.
- A default export uses `export default` and is imported without curly braces under any name; a named export uses `export` and is imported with curly braces under the matching name.
- A file can have one default export and many named exports, so you can export multiple components from the same file.

# Citations

[1] [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
