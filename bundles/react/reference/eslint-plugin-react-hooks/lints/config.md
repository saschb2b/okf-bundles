---
type: Lint Rule
title: config
description: Validates React Compiler configuration options so typos or wrong value types fail loudly instead of silently.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/config
tags: [react, eslint, lint, compiler, configuration]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

React Compiler configuration that uses unknown option names or invalid value types. Without this check, a typo or wrong type would silently disable the option. The rule validates that the configuration passed to `babel-plugin-react-compiler` is well formed.

# Examples

Invalid, unknown option name:

```js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compileMode: 'all' // Typo: should be compilationMode
    }]
  ]
};
```

Invalid, wrong option value:

```js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'everything' // Invalid: use 'all' or 'infer'
    }]
  ]
};
```

Valid:

```js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'infer',           // or 'all'
      panicThreshold: 'critical_errors'   // or 'none', 'all_errors'
    }]
  ]
};
```

# Troubleshooting

Common mistakes: a typo in an option name, the wrong value type (for example `panicThreshold: true`), or an entirely unknown option like `optimizationLevel`. Refer to the React Compiler configuration reference for the full list of valid options.

# Citations

[1] [config](https://react.dev/reference/eslint-plugin-react-hooks/lints/config)
