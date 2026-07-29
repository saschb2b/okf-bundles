---
type: Playbook
title: Migration Playbook
description: A field-tested sequence for adopting React Compiler incrementally, why the one-big-PR approach fails, and how to enable it per framework.
resource: https://react.dev/learn/react-compiler/incremental-adoption
tags: [react, react-compiler, adoption, migration, next.js, vite, react-native]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://react.dev/learn/react-compiler/incremental-adoption
    title: "Incremental Adoption"
  - resource: https://react.dev/learn/react-compiler/installation
    title: "Installation"
  - resource: https://react.dev/blog/2025/10/07/react-compiler-1
    title: "React Compiler v1.0"
  - resource: https://saschb2b.com/blog/react-compiler-year-in-review
    title: "The React Compiler at Eighteen Months"
---

# The one rule: do not migrate in one big PR

The failure pattern is jumping straight to deleting all your [`useMemo`](/reference/react/hooks/useMemo.md), [`useCallback`](/reference/react/hooks/useCallback.md), and [`memo`](/reference/react/apis/memo.md) calls in a single change. That PR is enormous, touches every file, cannot be reviewed meaningfully, breaks in ways that are hard to bisect, and sits open for weeks going stale. This is the PR trap. The compiler is designed for incremental adoption; use it. Most of the value lands in the early steps, before you remove a single line of manual memoization.

# The sequence

Each step is landable on its own and improves the codebase even if you stop there.

1. **Update React.** Move to a version that supports the compiler (React 19 is the default target; 17 and 18 work via [`target`](/reference/react-compiler/target.md) and `react-compiler-runtime`).
2. **Turn on the ESLint rules and clean up.** Add [`eslint-plugin-react-hooks`](linting.md) v6+ with the `recommended` preset and fix what it flags. This needs no compiler and improves code quality by itself. Expect [iterative cleanup](linting.md), not one pass.
3. **Enable the compiler in annotation mode on leaf components.** Set [`compilationMode: 'annotation'`](/reference/react-compiler/compilationMode.md) and opt individual functions in with `"use memo"`. Start at the leaves where blast radius is smallest. See [incremental adoption](incremental-adoption.md) for directory-scoped Babel overrides and runtime gating as alternatives.
4. **Switch to inference mode.** Move to the default `'infer'` mode and let the compiler decide which functions to handle across the app. Verify with the DevTools "Memo sparkle" and the [`logger`](/reference/react-compiler/logger.md).
5. **Remove manual memoization.** Only now, and gradually, delete the hand-written `useMemo`/`useCallback`/`memo` the compiler has made redundant. Leave the ones that exist for correctness (a memoized value used as an effect dependency) until you have tested. Removing memoization can change compiler output, so test as you go.
6. **Consider strict enforcement.** Where you want violations to fail loudly rather than silently skip, tighten the lint rules to `error` so a bail becomes a CI failure instead of a quiet performance cliff.

Steps 1 and 2 deliver real value with zero compiler risk, which is why they go first. The mistake is skipping to step 5.

# Per-framework how-tos

Full setup for each build tool is in [installation](installation.md); the short version:

- **Next.js.** Enable the compiler in `next.config.js` (`reactCompiler: true`). v15.3.1+ runs it through swc for best performance; recent versions also bundle the lint rules transitively. See the [Next.js reactCompiler docs](https://nextjs.org/docs/app/api-reference/next-config-js/reactCompiler).
- **Vite.** With `@vitejs/plugin-react` v6+, use `reactCompilerPreset()` via `@rolldown/plugin-babel`. On older versions pass the Babel plugin through the React plugin.
- **Expo and React Native.** Expo SDK 54+ enables the compiler by default in new apps; otherwise follow [Expo's guide](https://docs.expo.dev/guides/react-compiler/). Bare React Native uses Babel through Metro, so follow the Babel setup.
- **React Router.** Add `vite-plugin-babel` with `babel-plugin-react-compiler` in the Babel config (include `@babel/preset-typescript` if you use TypeScript).
- **Webpack / Rspack / Rsbuild / Metro.** Community loader for Webpack; Rspack, Rsbuild, and Metro drive the Babel plugin through their own docs.

# What to hold onto during migration

- Keep `"use no memo"` for genuinely problematic components, but track the count as tech debt to burn down (see [production experience](production-experience.md)).
- Do not remove memoization that exists for correctness without testing; that is the main source of runtime regressions ([debugging](debugging.md)).
- Library authors ship pre-compiled code so consumers get the benefit without compiling `node_modules`; see [compiling libraries](/reference/react-compiler/compiling-libraries.md).

# Related

- [Incremental adoption](incremental-adoption.md): the Babel-overrides, annotation, and gating mechanics behind steps 3 and 4.
- [Installation](installation.md): full per-framework build configuration.
- [Linting for the compiler](linting.md): step 2 in depth.
- [Production experience](production-experience.md): why incremental beats big-bang.
