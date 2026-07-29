---
type: Concept
title: HIR (High-level Intermediate Representation)
description: The control-flow-graph representation the React Compiler analyzes, its basic blocks, instructions, Places, and its SSA form with phi nodes.
resource: https://yongseok.me/blog/en/react_compiler_3/
tags: [react, react-compiler, hir, cfg, ssa, internals]
generated:
  by: claude-code/unrecorded
  at: 2026-07-24T12:00:00Z
sources:
  - resource: https://yongseok.me/blog/en/react_compiler_3/
    title: "React Compiler, How Does It Work? [3] - HIR Transformation (Lowering)"
  - resource: https://github.com/facebook/react/blob/main/compiler/packages/babel-plugin-react-compiler/src/Entrypoint/Pipeline.ts
    title: "React Compiler pipeline (Pipeline.ts)"
  - resource: https://github.com/facebook/react/pull/29061
    title: "Open-source React Compiler (PR #29061)"
---

# What it is

HIR (High-level Intermediate Representation) is the form the React Compiler analyzes instead of the Babel AST. It is a control-flow graph (CFG): the program as basic blocks connected by edges. Every analysis pass in the [pipeline](../how-it-works.md), from mutability inference to [reactive scope](reactive-scope.md) inference, runs over the HIR, not over source. The `lower` pass (BuildHIR) produces it; `codegenFunction` turns the optimized result back into a Babel AST.

# Anatomy

- **Basic block** (`bb0`, `bb1`, ...): a run of straight-line instructions with no branches in the middle, ending in a single terminal. Control flow that is implicit in the AST becomes explicit edges: `if`/`else`, `switch`, loops, `try`/`catch`, and short-circuiting operators (`&&`, `||`, `?.`) all become branches between blocks.
- **Instruction**: one numbered operation, for example `LoadLocal`, `Binary`, `JSX`, `Primitive`, `PropertyLoad`.
- **Terminal**: the block's exit: an `If`, `Goto`, `Return`, `Throw`, or loop back-edge naming its successor blocks.
- **Place**: a reference to an identifier annotated with metadata the later passes fill in: its **effect** (how the instruction touches the value, see the [mutability model](mutability-model.md)), whether it is **reactive** (can differ between renders), and source location.

Making control flow explicit as a graph is what lets the compiler reason about memoization per expression rather than per component.

# Worked example

This component:

```js
function Greeting({ name, color }) {
  if (color === "red") return <div className="red">Hi {name}</div>;
  return <div>Hi {name}</div>;
}
```

lowers to roughly this HIR (register numbers and exact print form vary by version):

```
bb0:
  [1] $1  = LoadLocal color
  [2] $2  = Primitive "red"
  [3] $3  = Binary $1 === $2
  [4] If $3 then:bb1 else:bb2
bb1:
  [5] $4  = LoadLocal name
  [6] $5  = JSX <div className="red">Hi {$4}</div>
  [7] Return $5
bb2:
  [8] $6  = LoadLocal name
  [9] $7  = JSX <div>Hi {$6}</div>
  [10] Return $7
```

Lowering also models JavaScript hoisting explicitly (a `const` referenced by an inner closure is declared early with a `DeclareContext HoistedConst` instruction) so the static graph matches runtime semantics.

# SSA form and phi nodes

Right after lowering, `enterSSA` rewrites the HIR into Static Single Assignment form: every variable is assigned exactly once, reassignments become new numbered identifiers, and where control-flow paths rejoin a **phi node** merges the competing definitions. Given:

```js
let label = "guest";
if (user) label = user.name;
return label;
```

SSA produces two definitions and a phi at the join:

```
bb0:
  [1] label$1 = Primitive "guest"
  [2] If user then:bb1 else:bb2
bb1:
  [3] label$2 = LoadLocal user.name
  Goto bb2
bb2:
  [4] label$3 = Phi [bb0: label$1, bb1: label$2]
  [5] Return label$3
```

`label$3` being a distinct identity is what lets the compiler track that its value depends on `user`, without confusing it with the initial `"guest"`. SSA removes the ambiguity of "which value does this name hold here," a precondition for every dataflow analysis that follows. `eliminateRedundantPhi` then drops phis that turned out unnecessary.

# Related

- [How the compiler works](../how-it-works.md): the full pass sequence that consumes this representation.
- [Effect and mutability model](mutability-model.md): the effect metadata attached to each `Place`.
- [Reactive scope](reactive-scope.md): the memoization units inferred over the HIR.
