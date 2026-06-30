---
type: Lint Rule
title: error-boundaries
description: Flags try/catch used to handle rendering errors from child components, which only Error Boundaries can catch.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
tags: [react, eslint, lint, error-boundaries, suspense]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

`try`/`catch` wrapped around the rendering of child components. `try`/`catch` cannot catch errors thrown during React's rendering process. Errors thrown in render or in Hooks bubble up through the component tree, and only [Error Boundaries](/reference/react/legacy/Component.md) can catch them.

# Examples

Invalid:

```js
// Try/catch won't catch render errors
function Parent() {
  try {
    return <ChildComponent />; // If this throws, catch won't help
  } catch (error) {
    return <div>Error occurred</div>;
  }
}
```

Valid:

```js
function Parent() {
  return (
    <ErrorBoundary>
      <ChildComponent />
    </ErrorBoundary>
  );
}
```

# Troubleshooting

Do not wrap the `use` Hook in `try`/`catch`. `use` does not throw in the traditional sense, it suspends component execution. When it meets a pending promise it suspends and lets React show a fallback, so the `catch` block would never run. Handle these cases with Suspense (for the pending state) and an Error Boundary (for failures):

```js
function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent promise={fetchData()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

# Citations

[1] [error-boundaries](https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries)
