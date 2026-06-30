---
type: API Reference
title: panicThreshold
description: Determines whether React Compiler errors fail the build or are skipped so the build continues.
resource: https://react.dev/reference/react-compiler/panicThreshold
tags: [react, react-compiler, configuration, build]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`panicThreshold` controls how the React Compiler handles errors during compilation: skip the offending component or fail the build.

```js
{
  panicThreshold: 'none' // Recommended
}
```

## Type

```
'none' | 'critical_errors' | 'all_errors'
```

## Default value

`'none'`

## Options

| Value | Behavior |
| --- | --- |
| `'none'` (default, recommended) | Skip components that cannot be compiled and continue building. |
| `'critical_errors'` | Fail the build only on critical compiler errors. |
| `'all_errors'` | Fail the build on any compiler diagnostic. |

# Usage

- **Production (recommended).** Always use `'none'`, the default. Builds never fail due to compiler issues, uncompilable components run normally, the maximum number of components get optimized, and deployments stay stable.

  ```js
  { panicThreshold: 'none' }
  ```

- **Development debugging.** Temporarily raise the threshold to surface issues, gated on the environment, and pair it with [a custom logger](/reference/react-compiler/logger.md).

  ```js
  const isDevelopment = process.env.NODE_ENV === 'development';
  { panicThreshold: isDevelopment ? 'critical_errors' : 'none' }
  ```

# Caveats

- Production builds should always use `'none'`.
- Build failures prevent your application from building.
- With `'none'`, the compiler automatically detects and skips problematic code.
- Higher thresholds are only useful during development for debugging.

This option is set in the React Compiler config. For an overview, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [panicThreshold](https://react.dev/reference/react-compiler/panicThreshold)
