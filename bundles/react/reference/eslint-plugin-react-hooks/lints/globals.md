---
type: Lint Rule
title: globals
description: Flags assignment to or mutation of global variables during render, which breaks render purity.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
tags: [react, eslint, lint, purity, side-effects]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Writing to or mutating a global value during render. Globals live outside React's control, so mutating them during render breaks React's assumption that rendering is pure. This is part of [side effects must run outside of render](/reference/rules/components-and-hooks-must-be-pure.md).

Consequences:

- Components behave differently in development and production.
- Fast Refresh breaks.
- The app cannot be optimized with React Compiler.

# Examples

Invalid:

```js
// Global counter
let renderCount = 0;
function Component() {
  renderCount++; // Mutating global
  return <div>Count: {renderCount}</div>;
}

// Modifying window properties
function Component({ userId }) {
  window.currentUser = userId; // Global mutation
  return <div>User: {userId}</div>;
}

// Mutating a global array or cache during render
const events = [];
function Component({ event }) {
  events.push(event);
  return <div>Events: {events.length}</div>;
}
```

Valid:

```js
// Use state for counters
function Component() {
  const [clickCount, setClickCount] = useState(0);
  return <button onClick={() => setClickCount(c => c + 1)}>Clicked: {clickCount}</button>;
}

// Use context for global values
function Component() {
  const user = useContext(UserContext);
  return <div>User: {user.id}</div>;
}

// Synchronize external globals inside an effect
function Component({ title }) {
  useEffect(() => {
    document.title = title; // OK in an effect
  }, [title]);
  return <div>Page: {title}</div>;
}
```

# Citations

[1] [globals](https://react.dev/reference/eslint-plugin-react-hooks/lints/globals)
