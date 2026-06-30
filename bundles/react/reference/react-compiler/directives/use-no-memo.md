---
type: Directive
title: "use no memo"
description: A directive that prevents a function from being optimized by React Compiler.
resource: https://react.dev/reference/react-compiler/directives/use-no-memo
tags: [react, react-compiler, directive, opt-out]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`"use no memo"` prevents a function from being optimized by React Compiler. Place it at the very beginning of the function body.

```js
function MyComponent() {
  "use no memo";
  // ...
}
```

When a function contains `"use no memo"`, the compiler skips it entirely, leaving it exactly as written, as if the compiler were not enabled. It is a temporary escape hatch for debugging or for code that does not work correctly with the compiler.

## Precedence

This directive takes precedence over all compilation modes and other directives.

- In `all` mode: the function is skipped despite the global setting.
- In `infer` mode: the function is skipped even if heuristics would optimize it.

# Usage

- **Function level.** Placed at the start of a function body, it skips that function.
- **Module level.** Placed at the top of a file, it skips all functions in that module. A function-level `"use no memo"` overrides the module-level directive.

  ```js
  "use no memo";
  // All functions in this file are skipped by the compiler
  ```

- **Debugging compiler issues.** Temporarily disable optimization to isolate a problem, for example a Rules of React violation that was not statically detected.

  ```js
  function ProblematicComponent({ data }) {
    "use no memo"; // TODO: Remove after fixing issue #123
    // ...
  }
  ```

- **Third-party integration.** Wrap a function that calls a library hook with side effects the compiler might optimize incorrectly.

# Caveats

- Must be at the very beginning of the function body, before any other code (comments are OK).
- Must use double or single quotes, not backticks.
- Must match `"use no memo"` exactly, or its alias `"use no forget"`.
- Takes precedence over all compilation modes and other directives.
- Intended as a temporary debugging tool, not a permanent solution.

# Best practices

- A directive placed after code is too late and has no effect. It must come first.
- Always document why optimization is disabled, for example a `// TODO: Remove after fixing ...` comment, so the opt-out can be removed later.

# See also

- To opt in instead, use [`"use memo"`](/reference/react-compiler/directives/use-memo.md).
- For an overview, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] ["use no memo"](https://react.dev/reference/react-compiler/directives/use-no-memo)
