---
type: API Reference
title: gating
description: Configures runtime feature flag gating so compiled functions are used only when a flag returns true.
resource: https://react.dev/reference/react-compiler/gating
tags: [react, react-compiler, configuration, feature-flags]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`gating` enables conditional compilation, controlling at runtime whether the optimized or original version of a function runs.

```js
{
  gating: {
    source: 'my-feature-flags',
    importSpecifierName: 'shouldUseCompiler'
  }
}
```

## Type

```
{
  source: string;
  importSpecifierName: string;
} | null
```

## Default value

`null`

## Properties

| Property | Meaning |
| --- | --- |
| `source` | Module path to import the feature flag from. |
| `importSpecifierName` | Name of the exported function to import. |

# Usage

1. Create a feature flag module that exports a named function returning a boolean.

   ```js
   // src/utils/feature-flags.js
   export function shouldUseCompiler() {
     return getFeatureFlag('react-compiler-enabled');
   }
   ```

2. Configure the compiler with `source` and `importSpecifierName`.

   ```js
   {
     gating: {
       source: './src/utils/feature-flags',
       importSpecifierName: 'shouldUseCompiler'
     }
   }
   ```

3. The compiler emits gated code that picks the optimized or original function based on the flag.

   ```js
   import { shouldUseCompiler } from './src/utils/feature-flags';

   const Button = shouldUseCompiler()
     ? function Button_optimized(props) { /* compiled */ }
     : function Button_original(props) { /* original */ };
   ```

The gating function is evaluated once at module time. Once the bundle is parsed and evaluated, the choice of component stays static for the rest of the browser session.

# Caveats

- The gating function must return a boolean.
- Both the compiled and the original versions are emitted, increasing bundle size.
- The import is added to every file that contains compiled functions.
- Use a named export that matches `importSpecifierName`, not a default export.
- `source` is resolved through module resolution, not relative to `babel.config.js`. A package name (`@myapp/feature-flags`) or an absolute path from the project root both work.

This option is set in the React Compiler config. For incremental rollout strategies, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [gating](https://react.dev/reference/react-compiler/gating)
