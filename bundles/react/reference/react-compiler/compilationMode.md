---
type: API Reference
title: compilationMode
description: Controls the strategy the React Compiler uses to decide which functions it will optimize.
resource: https://react.dev/reference/react-compiler/compilationMode
tags: [react, react-compiler, configuration, compilationMode]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`compilationMode` controls how the React Compiler selects which functions to compile.

```js
{
  compilationMode: 'infer' // or 'annotation', 'syntax', 'all'
}
```

## Type

```
'infer' | 'syntax' | 'annotation' | 'all'
```

## Default value

`'infer'`

## Options

| Value | Behavior |
| --- | --- |
| `'infer'` (default) | Heuristics detect React code: functions with the `"use memo"` directive, plus functions named like components (PascalCase) or hooks (`use` prefix) that create JSX and/or call other hooks. |
| `'annotation'` | Only compile functions explicitly marked with `"use memo"`. Ideal for incremental adoption. |
| `'syntax'` | Only compile components and hooks written with Flow's `component` and `hook` syntax. |
| `'all'` | Compile all top-level functions. Not recommended, may compile non-React functions. |

# Usage

- **Default inference.** `'infer'` works for codebases that follow React naming conventions. A PascalCase function returning JSX or a `use`-prefixed function calling hooks gets compiled; a plain utility like `calculateTotal` does not.
- **Incremental adoption.** Use `'annotation'` and mark each function to compile with the `"use memo"` directive. See [the use-memo directive](/reference/react-compiler/directives/use-memo.md).

  ```js
  function ExpensiveList(props) {
    "use memo";
    return <ul>{props.items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
  }
  ```

- **Flow syntax.** Use `'syntax'` with Flow's `component Button(...)` and `hook useCounter(...)` declarations. Does not work with TypeScript.
- **Opting out.** Regardless of mode, a function with the `"use no memo"` directive is always skipped. See [the use-no-memo directive](/reference/react-compiler/directives/use-no-memo.md).

# Caveats

- `'infer'` mode requires React naming conventions to detect a function. A lowercase name (`button`) or a function that neither creates JSX nor calls a hook is not compiled.
- `'all'` mode may hurt performance by compiling utility functions.
- `'syntax'` mode requires Flow and will not work with TypeScript.
- A `"use no memo"` directive always skips compilation, in every mode.

This option is set in the React Compiler config. For an overview of adopting the compiler, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [compilationMode](https://react.dev/reference/react-compiler/compilationMode)
