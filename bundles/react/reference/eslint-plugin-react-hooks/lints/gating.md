---
type: Lint Rule
title: gating
description: Validates the React Compiler gating-mode configuration used to adopt the compiler incrementally.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/gating
tags: [react, eslint, lint, compiler, gating]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

An invalid [gating-mode](/reference/react-compiler/gating.md) configuration. Gating mode lets you adopt React Compiler gradually by marking specific components for optimization behind a feature flag. The rule ensures the gating config is shaped correctly so the compiler knows which components to process.

# Key requirements

- The `gating` value must be an object, not a string or other type.
- When `gating` is used, both fields are required:
  - `importSpecifierName`: the exported function name used for feature flagging.
  - `source`: the module name where that function is exported.
- Omit the `gating` field entirely to compile all components without gating.

# Examples

Invalid:

```js
// Missing the required 'source' field
gating: {
  importSpecifierName: '__experimental_useCompiler'
}

// Wrong type: should be an object, not a string
gating: '__experimental_useCompiler'
```

Valid:

```js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        importSpecifierName: 'isCompilerEnabled', // exported function name
        source: 'featureFlags'                    // module name
      }
    }]
  ]
};

// featureFlags.js
export function isCompilerEnabled() { /* ... */ }
```

Omitting `gating` compiles all components.

# Citations

[1] [gating](https://react.dev/reference/eslint-plugin-react-hooks/lints/gating)
