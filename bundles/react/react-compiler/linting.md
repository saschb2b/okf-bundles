---
type: Guide
title: Linting for the Compiler
description: How eslint-plugin-react-hooks keeps code compiler-clean, which rules matter most for the compiler, and how silent skips make lint cleanup iterative.
resource: https://react.dev/reference/eslint-plugin-react-hooks
tags: [react, react-compiler, eslint, linting, rules-of-react]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://react.dev/reference/eslint-plugin-react-hooks
    title: "eslint-plugin-react-hooks"
  - resource: https://react.dev/blog/2025/10/07/react-compiler-1
    title: "React Compiler v1.0"
  - resource: https://blog.logrocket.com/react-compiler-rc/
    title: "React Compiler RC"
---

# Why linting is the compiler's front line

The compiler skips code it cannot compile soundly rather than erroring (the "skip, don't guess" stance from the [pipeline](how-it-works.md)), so a violation shows up not as a red build but as a component that silently stops being memoized. ESLint is how you catch those violations before they cost you a silent opt-out (see [production experience](production-experience.md)). Run it in CI and the compiler mostly stops surprising you.

The rules do not require the compiler to be installed. You can turn them on first, clean up, and adopt the compiler afterward, which is exactly the recommended [migration](migration-playbook.md) order.

# One plugin, not two

As of the RC (April 2025), the compiler's rules live in `eslint-plugin-react-hooks` v6 and up, alongside the classic [rules-of-hooks](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks.md) check. The old standalone `eslint-plugin-react-compiler` is retired. Enable the rules via the plugin's presets:

- `recommended` ships the compiler-powered rules and is the default for most teams.
- `recommended-latest` tracks the newest rules.

Framework configs increasingly bundle this transitively (for example recent `eslint-config-next`), so you may already have the rules active. Configure the plugin through the [config lint](/reference/eslint-plugin-react-hooks/lints/config.md); its full rule catalog lives under the plugin's lints, the compiler-relevant ones listed next.

# The rules that matter most for the compiler

These flag the patterns that most often cause a component to bail or to depend on memoization for correctness:

- [immutability](/reference/eslint-plugin-react-hooks/lints/immutability.md): mutating props, state, or other values the compiler treats as frozen. The single most common bail cause.
- [refs](/reference/eslint-plugin-react-hooks/lints/refs.md): reading or writing `ref.current` during render, which the compiler cannot compile.
- [preserve-manual-memoization](/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization.md): incomplete manual dependency arrays that block the compiler from taking over cleanly.
- [unsupported-syntax](/reference/eslint-plugin-react-hooks/lints/unsupported-syntax.md): constructs the analysis cannot model statically, such as `eval` and `with`.
- [incompatible-library](/reference/eslint-plugin-react-hooks/lints/incompatible-library.md): library APIs that break under manual or automatic memoization, the ecosystem-reckoning rule.
- [purity](/reference/eslint-plugin-react-hooks/lints/purity.md): calling known-impure functions like `Math.random` and `Date.now` during render.
- [set-state-in-render](/reference/eslint-plugin-react-hooks/lints/set-state-in-render.md) and [set-state-in-effect](/reference/eslint-plugin-react-hooks/lints/set-state-in-effect.md): setState patterns that cause loops or avoidable extra renders.
- [static-components](/reference/eslint-plugin-react-hooks/lints/static-components.md): components defined inside other components, which reset state and defeat memoization.
- [exhaustive-deps](/reference/eslint-plugin-react-hooks/lints/exhaustive-deps.md): the long-standing dependency-array check, still relevant for the effects and manual memoization the compiler leaves in place.

The 1.0 release also promoted broader correctness rules into the recommended set, including the setState-in-render and ref-in-render checks above.

# Cleanup is iterative, not one-shot

Because a bailed component can hide downstream findings, fixing one violation often reveals the next one underneath on the same component. Expect to run lint, fix, and re-run in passes rather than clearing everything at once. This is normal and it is why the [migration playbook](migration-playbook.md) lands linting as its own early step, independent of enabling the compiler.

# Related

- [Migration playbook](migration-playbook.md): where linting sits in the adoption sequence.
- [Production experience](production-experience.md): the silent opt-outs these rules prevent.
- [Debugging](debugging.md): what to do when a runtime issue slips past the linter.
- [config lint](/reference/eslint-plugin-react-hooks/lints/config.md): validating the plugin and compiler configuration.
