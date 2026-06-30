---
type: Guide
title: Incremental Adoption
description: Strategies to roll out React Compiler gradually using Babel overrides, annotation-mode opt-in, and runtime gating feature flags.
resource: https://react.dev/learn/react-compiler/incremental-adoption
tags: [react, react-compiler, adoption, babel, feature-flags]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React Compiler can be adopted incrementally so you can try it on specific parts of a codebase before rolling it out everywhere. Starting small builds confidence, lets you verify behavior and measure performance, surfaces edge cases, makes Rules of React violations manageable one area at a time, and supports A/B tests of the real-world impact.

# Three approaches

1. Babel overrides: apply the compiler to specific directories.
2. Opt-in with `"use memo"`: only compile components and hooks that explicitly opt in.
3. Runtime gating: control compilation with feature flags.

All three let you test the compiler on part of the app before full rollout.

# Directory-based adoption with Babel overrides

Babel's `overrides` option applies different plugins to different parts of the codebase, ideal for adopting directory by directory.

Start with one directory:

```js
// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: './src/modern/**/*.{js,jsx,ts,tsx}',
      plugins: ['babel-plugin-react-compiler'],
    },
  ],
};
```

Expand coverage by adding directories to `test` (it accepts an array) and keep legacy code on different plugins. You can also pass per-override compiler options as the second element of the plugin tuple: `['babel-plugin-react-compiler', { /* options */ }]`.

# Opt-in mode with "use memo"

For maximum control, set `compilationMode: 'annotation'` so only functions that opt in with `"use memo"` get compiled. See [compilationMode](/reference/react-compiler/compilationMode.md) and the [use memo directive](/reference/react-compiler/directives/use-memo.md).

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', { compilationMode: 'annotation' }],
  ],
};
```

Add the directive at the start of each function you want compiled:

```js
function TodoList({ todos }) {
  "use memo"; // Opt this component into compilation
  const sortedTodos = todos.slice().sort();
  return <ul>{sortedTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>;
}

function useSortedData(data) {
  "use memo"; // Opt this hook into compilation
  return data.slice().sort();
}
```

In annotation mode you must add `"use memo"` to every component and custom hook you want optimized, and remember to add it to new ones. This gives precise control while you evaluate impact.

# Runtime feature flags with gating

The `gating` option controls compilation at runtime via feature flags, useful for A/B tests or rolling out by user segment. See [gating](/reference/react-compiler/gating.md). The compiler wraps optimized code in a runtime check: if the gate returns `true`, the optimized version runs, otherwise the original runs.

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        source: 'ReactCompilerFeatureFlags',
        importSpecifierName: 'isCompilerEnabled',
      },
    }],
  ],
};
```

Implement the flag module:

```js
// ReactCompilerFeatureFlags.js
export function isCompilerEnabled() {
  return getFeatureFlag('react-compiler-enabled');
}
```

# Troubleshooting adoption

- Use `"use no memo"` to temporarily exclude a problematic component (see [/reference/react-compiler/directives/use-no-memo.md](/reference/react-compiler/directives/use-no-memo.md)).
- Check the [debugging guide](debugging.md) for common issues.
- Fix Rules of React violations the [ESLint plugin](/reference/eslint-plugin-react-hooks/lints/config.md) reports.
- Consider `compilationMode: 'annotation'` for a more gradual rollout.

# Next steps

- The [configuration guide](/reference/react-compiler/compilationMode.md) for more options.
- [Debugging techniques](debugging.md).
- The full [API reference](/reference/react-compiler/) for all compiler options.

# Citations

[1] [Incremental Adoption](https://react.dev/learn/react-compiler/incremental-adoption)
