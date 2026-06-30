---
type: API Reference
title: target
description: Specifies which React major version the compiler should generate runtime code for.
resource: https://react.dev/reference/react-compiler/target
tags: [react, react-compiler, configuration, runtime]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`target` specifies which React version the compiler generates code for.

```js
{
  target: '19' // or '18', '17'
}
```

## Type

```
'17' | '18' | '19'
```

## Default value

`'19'`

## Valid values

| Value | Requirement |
| --- | --- |
| `'19'` (default) | Target React 19. No additional runtime required. |
| `'18'` | Target React 18. Requires the `react-compiler-runtime` package. |
| `'17'` | Target React 17. Requires the `react-compiler-runtime` package. |

# Usage

- **React 19 (default).** No special config. The compiled output imports React 19's built-in runtime.

  ```js
  import { c as _c } from 'react/compiler-runtime';
  ```

- **React 17 or 18.** Two steps. Install the polyfill runtime, then set `target`.

  ```bash
  npm install react-compiler-runtime@latest
  ```

  ```js
  { target: '18' } // or '17'
  ```

  The compiled output then imports the standalone polyfill.

  ```js
  import { c as _c } from 'react-compiler-runtime';
  ```

# Caveats

- Always use string values, not numbers (`'17'`, not `17`).
- Do not include patch versions (`'18'`, not `'18.2.0'`).
- React 19 includes built-in compiler runtime APIs. React 17 and 18 require installing `react-compiler-runtime@latest`.
- The runtime package must be a project dependency (not `devDependencies`, not global), since it is needed at runtime.
- `target` must match your React major version. A mismatch causes errors like "Cannot find module 'react/compiler-runtime'".

# Troubleshooting

- Verify your React version with `npm why react`.
- To confirm the correct runtime is used, check the import: `react/compiler-runtime` means the built-in (React 19), `react-compiler-runtime` means the standalone polyfill (React 17/18).

Library authors targeting older React versions should also read [the compiling libraries guide](/reference/react-compiler/compiling-libraries.md). For an overview, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [target](https://react.dev/reference/react-compiler/target)
