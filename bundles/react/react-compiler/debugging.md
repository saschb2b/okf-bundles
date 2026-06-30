---
type: Guide
title: Debugging and Troubleshooting
description: How to tell compiler errors from runtime issues, recognize common breaking patterns, follow a debugging workflow, and report compiler bugs.
resource: https://react.dev/learn/react-compiler/debugging
tags: [react, react-compiler, debugging, troubleshooting, rules-of-react]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

This guide helps you identify and fix issues when using React Compiler. It covers the difference between compiler errors and runtime issues, the patterns that most often break compilation, a step-by-step debugging workflow, and how to file a compiler bug.

# Understanding compiler behavior

React Compiler is designed for code that follows the [Rules of React](/reference/rules/components-and-hooks-must-be-pure.md). When it sees code that might break those rules, it safely skips optimization rather than risk changing behavior.

- Compiler errors happen at build time and stop compilation. They are rare because the compiler skips problematic code instead of failing.
- Runtime issues happen when compiled code behaves differently than expected. Most issues you hit are runtime issues. They usually mean your code violates the Rules of React in a subtle way the compiler could not detect, so it compiled a component it should have skipped.

When debugging runtime issues, hunt for Rules of React violations in the affected components that the [ESLint rule](/reference/eslint-plugin-react-hooks/lints/config.md) did not catch. The compiler relies on your code following the rules; undetected breaks are where runtime problems come from.

# Common breaking patterns

The main way the compiler can break an app is when code relies on memoization for correctness, meaning the app depends on specific values staying referentially stable to work. Because the compiler may memoize differently than your manual approach, this can cause effects over-firing, infinite loops, or missing updates. Common scenarios:

- Effects that rely on referential equality, depending on objects or arrays keeping the same reference across renders.
- Dependency arrays that need stable references, where unstable dependencies fire effects too often or create infinite loops.
- Conditional logic based on reference checks, using referential equality for caching or optimization.

# Debugging workflow

## Compiler build errors

An unexpected compiler error that breaks your build is likely a compiler bug. Report it to [facebook/react](https://github.com/facebook/react/issues) with the error message, the offending code, and your React and compiler versions.

## Runtime issues

1. Temporarily disable compilation with `"use no memo"` to isolate whether the issue is compiler-related (see [/reference/react-compiler/directives/use-no-memo.md](/reference/react-compiler/directives/use-no-memo.md)):

```js
function ProblematicComponent() {
  "use no memo"; // Skip compilation for this component
  // ... rest of component
}
```

If the issue disappears, it is likely a Rules of React violation. You can also remove manual memoization (`useMemo`, `useCallback`, `memo`) from the component to confirm the app works without any memoization. If the bug persists with all memoization removed, you have a Rules of React violation to fix.

2. Fix issues step by step: identify the root cause (often memoization-for-correctness), test after each fix, remove `"use no memo"` once fixed, and verify the component shows the sparkle badge in React DevTools.

# Reporting compiler bugs

If you believe you found a compiler bug:

1. Verify it is not a Rules of React violation by checking with [ESLint](/reference/eslint-plugin-react-hooks/lints/config.md).
2. Create a minimal reproduction isolating the issue.
3. Test without the compiler to confirm the issue only occurs with compilation.
4. File an [issue](https://github.com/facebook/react/issues/new?template=compiler_bug_report.yml) with React and compiler versions, the minimal repro, expected vs actual behavior, and any error messages.

# Next steps

- Review the [Rules of React](/reference/rules/rules-of-hooks.md) to prevent issues.
- Check the [incremental adoption guide](incremental-adoption.md) for gradual rollout strategies.

# Citations

[1] [Debugging and Troubleshooting](https://react.dev/learn/react-compiler/debugging)
