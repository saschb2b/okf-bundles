---
type: Explainer
title: The Rust Port
description: The React team's official reimplementation of the compiler in Rust, why it exists, how it reuses the TypeScript architecture, its performance, and how build tools integrate it.
resource: https://github.com/facebook/react/pull/36173
tags: [react, react-compiler, rust, oxc, swc, build-tools, performance]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://github.com/facebook/react/pull/36173
    title: "Port React Compiler to Rust (PR #36173)"
  - resource: https://www.infoq.com/news/2026/07/meta-react-compiler-rust/
    title: "Meta Ports React Compiler to Rust for Faster Builds and Tighter Toolchain Integration (InfoQ)"
  - resource: https://oxc.rs/docs/guide/usage/transformer/react-compiler.html
    title: "oxc React Compiler transformer"
  - resource: https://github.com/swc-project/swc/issues/11751
    title: "Migrate to official Rust React Compiler (swc issue #11751)"
  - resource: https://socket.dev/blog/rolldown-pulls-rust-react-compiler-integration
    title: "Rolldown Pulls Rust React Compiler Integration (Socket)"
---

# What it is

The React team is porting the compiler from TypeScript to Rust. This is an official effort led by Joseph Savona, merged into `facebook/react` as [PR #36173](https://github.com/facebook/react/pull/36173) on June 9, 2026, and labelled an experimental, work-in-progress port. It is not one of the earlier community experiments (`sethwebster/rust-react-compiler`, `eve0415/oxc-plugin-react-compiler`); those predate and are separate from the React team's own port, which is the one build tools are now standardizing on.

As of mid 2026 it is merged but unpublished, so downstream tools vendor it rather than depending on a released package.

# Why Rust

Two motivations, both about the toolchain rather than the output:

- **Build speed.** The compiler runs on every build; making it faster shortens every developer's edit-compile loop and CI.
- **Native toolchain integration.** The high-performance JavaScript bundlers and linters (oxc, swc, Rspack) are written in Rust. A Rust compiler drops into their pipelines natively instead of forcing a Babel pass or a cross-language bridge. This is the same "Babel will not be required in the future" direction the [introduction](introduction.md) names, now with a concrete mechanism.

The generated app code is unchanged. The Rust port emits the same optimized JavaScript with the same `_c` cache described in the [memoization model](memoization-model.md); only the tool that produces it is different.

# Same architecture, rewritten

The port is a structural reimplementation, not a redesign. It keeps the [pipeline](how-it-works.md) intact: the compiler converts the AST into the same [HIR](glossary/hir.md) (a control-flow graph in SSA form) and runs the same optimization passes in sequence. What changed is the implementation substrate: arena allocation and index-based data structures in place of the TypeScript object graph.

Parity is enforced against the TypeScript compiler as the reference: all 1,725 test fixtures pass, and the React team reports intermediate compilation states matching the TypeScript version almost byte for byte. This is why the earlier deep-dive concepts stay accurate for both implementations, the HIR, the [effect and mutability model](glossary/mutability-model.md), and [reactive scopes](glossary/reactive-scope.md) are the same in Rust.

# Performance

Numbers are early and come from the React team and integrators, so treat them as directional:

- Roughly **3x faster** than the TypeScript original when run as a Babel plugin, with the isolated transformation logic reaching up to **10x** in some cases.
- Integrated into Turbopack, over **40% faster compilation** on Vercel's large `v0` Next.js app; Next.js reported **20 to 50% faster route compilation** across test apps, with experimental support arriving in Next.js 16.3.
- Native integrations avoid a serialization cost the Babel bridge pays. The public API is "Rust Babel AST plus scope info in, Rust Babel AST out"; where a tool would otherwise JSON-serialize the AST across the language boundary, removing that round trip cut transform time on a large test file from about 14.95 ms to 10.83 ms in oxc's measurements.

# How build tools integrate it

- **oxc** vendors the merged-but-unpublished port as releasable crates (`oxc-project/forked-react-compiler`) and exposes it through its transformer; `oxlint` ships a native react-compiler rule.
- **swc** migrated to the official Rust compiler.
- **Rspack** ships native support (2.1).
- **Rolldown** showed up to a 2x improvement but its maintainer withdrew the integration to clean it up first, and a separate report raised concern about a vendored binary. Adoption is real but still settling.

# Caveats

- **Experimental and unpublished.** No stable released package yet; expect churn until it is published.
- **LLM-assisted port.** The mechanical translation leaned heavily on large language models, with humans on architecture and review. Parity is verified by the fixture suite, but reviewers have flagged non-idiomatic Rust (for example `RefCell` workarounds) that may be refactored later.
- **Not a behavior change.** Because it targets byte-for-byte parity, adopting a Rust-backed integration should not change which components compile or how; if it does, that is a bug against the TypeScript reference.

# Related

- [How the compiler works](how-it-works.md): the pipeline the Rust port reimplements unchanged.
- [Roadmap](roadmap.md): where the Rust port sits among the other in-flight directions.
- [Adoption timeline](adoption-timeline.md): the port as a mid-2026 milestone.
- [Installation](installation.md): the build-tool setup this will eventually simplify.
