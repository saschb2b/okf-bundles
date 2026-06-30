---
type: Guide
title: React Compiler
description: Landing page for the LEARN-side React Compiler guide, orienting you across introduction, installation, incremental adoption, and debugging.
resource: https://react.dev/learn/react-compiler
tags: [react, react-compiler, optimization, build-tools, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React Compiler is a build-time tool that automatically optimizes your React app by handling memoization for you. It eliminates the need for manual `useMemo`, `useCallback`, and `React.memo`. This page is the landing point for the guide and links to the rest of the React Compiler documentation in reading order.

# In this section

- Learn [what React Compiler does](introduction.md) and how it automatically optimizes your app by handling memoization, replacing manual `useMemo`, `useCallback`, and `React.memo`.
- Get started by [installing React Compiler](installation.md) and configuring it with your build tools.
- Learn [strategies for gradually adopting React Compiler](incremental-adoption.md) in an existing codebase when you are not ready to enable it everywhere.
- Use the [debugging guide](debugging.md) to tell compiler errors from runtime issues, spot common breaking patterns, and follow a systematic debugging workflow.

# Configuration and reference

For detailed configuration options and API reference, see the reference-side concepts:

- All compiler options live under [/reference/react-compiler/](/reference/react-compiler/), including [compilationMode](/reference/react-compiler/compilationMode.md), [gating](/reference/react-compiler/gating.md), [logger](/reference/react-compiler/logger.md), [panicThreshold](/reference/react-compiler/panicThreshold.md), and [target](/reference/react-compiler/target.md).
- Function-level compilation control via directives: [/reference/react-compiler/directives/use-memo.md](/reference/react-compiler/directives/use-memo.md) and [/reference/react-compiler/directives/use-no-memo.md](/reference/react-compiler/directives/use-no-memo.md).
- Shipping pre-compiled libraries: [/reference/react-compiler/compiling-libraries.md](/reference/react-compiler/compiling-libraries.md).
- The ESLint rule that flags un-optimizable code is configured at [/reference/eslint-plugin-react-hooks/lints/config.md](/reference/eslint-plugin-react-hooks/lints/config.md).

# Additional resources

Beyond these docs, the [React Compiler Working Group](https://github.com/reactwg/react-compiler) carries further information and discussion about the compiler.

# Citations

[1] [React Compiler](https://react.dev/learn/react-compiler)
