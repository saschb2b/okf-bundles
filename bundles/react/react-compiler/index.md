# React Compiler

The learn-side guide to React Compiler, the build-time tool that automatically memoizes your components and hooks so you can skip most manual `useMemo`, `useCallback`, and `memo`. For the configuration options and directives, see the [React Compiler reference](/reference/react-compiler/index.md).

## Guide

- [React Compiler](react-compiler.md) - Landing page orienting you across introduction, installation, incremental adoption, and debugging.
- [Introduction](introduction.md) - What the compiler is, what it optimizes, whether to adopt it, and how it interacts with existing manual memoization.
- [Installation](installation.md) - Install the compiler and wire it into Babel, Vite, Next.js, React Router, Webpack, Expo, Metro, Rspack, and Rsbuild, then verify it works.
- [Incremental Adoption](incremental-adoption.md) - Roll the compiler out gradually with Babel overrides, annotation-mode opt-in, and runtime gating flags.
- [Debugging and Troubleshooting](debugging.md) - Tell compiler errors from runtime issues, recognize common breaking patterns, and report bugs.

## Deep dive

- [How the Compiler Works](how-it-works.md) - The build-time pipeline: lowering to an HIR control-flow graph, SSA, type and mutability inference, reactive scope inference, and codegen.
- [Memoization Model and the Cache Runtime](memoization-model.md) - Reactive scopes, the per-component `_c` cache and its slots, why the output beats manual memoization, and why re-render cascades stop.
- [Glossary](glossary/index.md) - Standalone homes for the load-bearing internal terms: [HIR](glossary/hir.md), the [effect and mutability model](glossary/mutability-model.md), and [reactive scope](glossary/reactive-scope.md).

## Adoption and practice

- [Adoption Timeline](adoption-timeline.md) - The arc from React Conf 2024 through beta, RC, 1.0, and the late-2025 ecosystem reckoning.
- [Production Experience](production-experience.md) - The boring compounding wins and the silent opt-out failure mode teams reported.
- [Linting for the Compiler](linting.md) - How `eslint-plugin-react-hooks` keeps code compiler-clean and which rules matter most.
- [Migration Playbook](migration-playbook.md) - An incremental adoption sequence, why the one-big-PR approach fails, and per-framework setup.
- [The Rust Port](rust-port.md) - The React team's official Rust reimplementation: same HIR and passes, rewritten for build speed and native `swc`/`oxc`/Rspack integration.
- [Roadmap and Directional Signals](roadmap.md) - Where the compiler is heading after 1.0: finer control, compiler-aware Server Components, DevTools, React Native, and non-Babel backends.
