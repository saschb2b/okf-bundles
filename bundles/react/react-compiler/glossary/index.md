# React Compiler Glossary

Standalone definitions of the load-bearing internal terms used across the [React Compiler deep dive](../how-it-works.md). Each term has its own concept so the pipeline and runtime concepts can link to a definition instead of re-explaining it.

- [HIR (High-level Intermediate Representation)](hir.md) - The control-flow-graph representation the compiler analyzes: basic blocks, instructions, Places, and SSA form with phi nodes.
- [Effect and Mutability Model](mutability-model.md) - The per-instruction effect kinds, aliasing analysis, mutable ranges, and the freeze point that makes memoization sound.
- [Reactive Scope](reactive-scope.md) - The unit of memoization: a group of values created and mutated together plus the reactive inputs they depend on.
