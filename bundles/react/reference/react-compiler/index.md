# React Compiler Reference

Configuration options and guides for the React Compiler. For an overview of adopting the compiler, see [the React Compiler guide](/react-compiler/react-compiler.md).

## Configuration options

- [compilationMode](compilationMode.md) - Strategy for choosing which functions the compiler optimizes (`infer`, `annotation`, `syntax`, `all`).
- [gating](gating.md) - Runtime feature flag gating, so compiled code is used only when a flag returns true.
- [logger](logger.md) - Custom callback to receive compiler events for tracking and debugging.
- [panicThreshold](panicThreshold.md) - Whether compiler errors fail the build or are skipped so the build continues.
- [target](target.md) - Which React major version (`17`, `18`, `19`) the compiler generates runtime code for.

## Guides

- [Compiling Libraries](compiling-libraries.md) - How library authors compile code before publishing so all users get optimized output.

## Subfolders

- [Directives](directives/index.md) - Source-level directives (`"use memo"`, `"use no memo"`) that opt functions into or out of compilation.
