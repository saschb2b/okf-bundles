---
type: Timeline
title: Adoption Timeline
description: The React Compiler arc from React Conf 2024 through public beta, the RC, the 1.0 stable release, and the late-2025 ecosystem reckoning.
resource: https://react.dev/blog/2025/10/07/react-compiler-1
tags: [react, react-compiler, history, timeline, adoption, rules-of-react]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://react.dev/blog/2025/10/07/react-compiler-1
    title: "React Compiler v1.0"
  - resource: https://react.dev/blog/2024/10/21/react-compiler-beta-release
    title: "React Compiler (Beta)"
  - resource: https://blog.logrocket.com/react-compiler-rc/
    title: "React Compiler RC: What it means for React devs"
  - resource: https://saschb2b.com/blog/react-compiler-year-in-review
    title: "The React Compiler at Eighteen Months: The Arc, the Debates, and What's Next"
---

# The arc in one line

The compiler's story is not a performance benchmark, it is a change in what "correct React" means: the [Rules of React](/reference/rules/components-and-hooks-must-be-pure.md) went from aspirational guidance to a build-time contract, and the ecosystem spent a year and a half adjusting.

# Milestones

| Date | Event | What it meant |
| --- | --- | --- |
| May 2024 | Announced and open-sourced at React Conf 2024 | The compiler entered the `facebook/react` repo. Already running in production at Meta. |
| Oct 21, 2024 | Public beta, alongside React 19 | First broad "go try it" moment. Framework integrations (Next.js, Vite, Expo) started landing. |
| Apr 21, 2025 | Release Candidate | Compiler lint rules merged into [`eslint-plugin-react-hooks`](/react-compiler/linting.md) v6, retiring the standalone `eslint-plugin-react-compiler`. Signaled API stability. |
| Oct 7, 2025 | 1.0 stable, at React Conf 2025 | SemVer commitment, `recommended` presets ship the rules, Expo SDK 54+ on by default. Meta reported up to 12% faster loads and navigations and some interactions 2.5x faster, memory neutral. |
| Late 2025 onward | The ecosystem reckoning | The question shifted from "should we adopt this?" to "what do we do about the code that breaks it?" |
| Jun 9, 2026 | Official [Rust port](rust-port.md) merged (experimental) | Same HIR and passes, rewritten in Rust for build speed and native `swc`/`oxc`/Rspack integration. Roughly 3x faster as a Babel plugin; experimental Next.js support in 16.3. |

# The three acts

## Launch hype (late 2024)

The compiler shipped with the framing that manual memoization was about to become optional. Default-on with opt-out emerged as the standard adoption pattern for new apps. The expectation many held was dramatic, postable benchmark numbers.

## The surprisingly quiet middle (mid 2025)

Those benchmark posts largely never came. Early adopters instead reported subtle, unglamorous wins: fewer re-render bugs caught in review, fewer "why is this slow" regressions, and codebases that stopped accreting memoization boilerplate. The compiler was doing its job precisely by being boring. This is covered in [production experience](production-experience.md).

## The ecosystem transformation (late 2025)

As adoption widened, the interesting failures were not in application code but in libraries. Enabling the compiler surfaced components and hooks across the ecosystem that had always violated the Rules of React and had merely gotten away with it because nothing enforced the rules before.

The reframing that stuck: the compiler did not break those libraries, it revealed they had been broken all along. Pre-Rules libraries that relied on mutation during render, unstable references, or reading refs in render were now visibly incompatible. The summary that circulated: greenfield is solved, brownfield is a project.

# Why the reckoning was inevitable

Automatic memoization is only sound if the code follows the rules the [pipeline](how-it-works.md) assumes. For years those rules were a style guide with no teeth. The compiler is the first tool that makes violating them have a visible, build-time consequence, so a year of adoption was really a year of the ecosystem discovering where it had quietly been non-conformant. That is the durable legacy: not the speedups, but the retirement of a whole category of memoization-dependency bugs and the hardening of the rules into something enforceable. See the [outlook](roadmap.md) for where this is heading next.

# Related

- [Production experience](production-experience.md): the boring wins and silent failures teams actually reported.
- [Roadmap](roadmap.md): directional signals for what comes after 1.0.
- [Introduction](introduction.md): the compiler as it is documented today.
- [Rules of React](/reference/rules/components-and-hooks-must-be-pure.md): the contract that became enforceable.
