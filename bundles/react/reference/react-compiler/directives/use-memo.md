---
type: Directive
title: "use memo"
description: A directive that marks a function for React Compiler optimization.
resource: https://react.dev/reference/react-compiler/directives/use-memo
tags: [react, react-compiler, directive, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`"use memo"` marks a function for React Compiler optimization. Place it at the very beginning of the function body.

```js
function MyComponent() {
  "use memo";
  // ...
}
```

When a function contains `"use memo"`, the compiler analyzes and optimizes it at build time, memoizing values and components to prevent unnecessary re-computations and re-renders.

## Behavior by compilation mode

The effect depends on the [`compilationMode`](/reference/react-compiler/compilationMode.md) setting.

| Mode | Effect of `"use memo"` |
| --- | --- |
| `annotation` | Required. Only functions with the directive are optimized. |
| `infer` | Forces optimization, overriding the naming heuristics. |
| `all` | Redundant. Everything is optimized by default. |

# Usage

- **Annotation mode.** The directive is required for any function you want optimized. A function without it is not compiled.
- **Gradual adoption.** Start in `annotation` mode and optimize stable leaf components first, then move up the tree as you verify behavior.

  ```js
  function Button({ onClick, children }) {
    "use memo";
    // ...
  }
  ```

- **Babel config.** Set the mode alongside the plugin.

  ```js
  module.exports = {
    plugins: [['babel-plugin-react-compiler', { compilationMode: 'annotation' }]]
  };
  ```

# Caveats

- Must be at the very beginning of the function body, before any other code (comments are OK).
- Must use double or single quotes, not backticks, and match `"use memo"` exactly.
- Only the first directive in a function is processed; additional directives are ignored.
- The effect depends on your `compilationMode`.

# When you do not need it

In most cases you do not need `"use memo"`. It is mainly for `annotation` mode. In `infer` mode the compiler detects components and hooks by naming pattern (PascalCase for components, `use` prefix for hooks), so if a function is not being compiled, fix its naming rather than forcing it with the directive. To confirm optimization, check the compiled output or look for the Memo badge in React DevTools.

# See also

- To opt out instead, use [`"use no memo"`](/reference/react-compiler/directives/use-no-memo.md).
- To configure which functions are compiled, see [`compilationMode`](/reference/react-compiler/compilationMode.md).
- For an overview, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] ["use memo"](https://react.dev/reference/react-compiler/directives/use-memo)
