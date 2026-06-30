---
type: Guide
title: Compiling Libraries
description: How library authors compile their code with React Compiler before publishing so all users get optimized output.
resource: https://react.dev/reference/react-compiler/compiling-libraries
tags: [react, react-compiler, libraries, build]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Library authors can run React Compiler on their library code before publishing to npm. Shipping compiled code gives every user optimized output even if they do not use the compiler themselves, requires no configuration on the user's side, and keeps behavior consistent across build setups.

# Setting up compilation

Add the compiler to your library's build process.

```bash
npm install -D babel-plugin-react-compiler@latest
```

```js
// babel.config.js
module.exports = {
  plugins: ['babel-plugin-react-compiler'],
};
```

# Backwards compatibility

If your library supports React below 19, add two things.

1. Install `react-compiler-runtime` as a direct dependency, and declare React as a peer dependency.

   ```json
   {
     "dependencies": { "react-compiler-runtime": "^1.0.0" },
     "peerDependencies": { "react": "^17.0.0 || ^18.0.0 || ^19.0.0" }
   }
   ```

2. Set the [`target`](/reference/react-compiler/target.md) to the minimum React version you support.

   ```js
   { target: '17' }
   ```

# Testing strategy

Test the library both with and without compilation. Run your existing suite against the compiled output, and add a separate configuration that bypasses the compiler. This catches issues introduced by compilation and confirms the library works in all scenarios.

# Pitfalls

- **Broken on older React.** If the compiled library throws in React 17 or 18, verify `react-compiler-runtime` is installed as a dependency, that `target` matches your minimum supported version, and that the runtime is included in the published bundle.
- **Babel plugin conflicts.** Place `babel-plugin-react-compiler` early in the plugin list, disable conflicting optimizations in other plugins, and test the build output thoroughly.
- **Runtime module not found.** If users see "Cannot find module 'react-compiler-runtime'", ensure the runtime is in `dependencies` (not `devDependencies`), that your bundler includes it in the output, and that it is published to npm alongside your library.

# Recap

- Compile library code before publishing to ship optimizations to all users with no config on their side.
- For React below 19, depend on `react-compiler-runtime` and set `target` to your minimum supported version.
- Test with and without compilation, and watch for plugin ordering and missing-runtime issues.

For selective optimization, see [`compilationMode`](/reference/react-compiler/compilationMode.md). For the runtime version mapping, see [`target`](/reference/react-compiler/target.md). For an overview, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [Compiling Libraries](https://react.dev/reference/react-compiler/compiling-libraries)
