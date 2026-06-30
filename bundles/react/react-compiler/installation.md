---
type: Guide
title: Installation
description: How to install React Compiler and configure it for Babel, Vite, Next.js, React Router, Webpack, Expo, Metro, Rspack, and Rsbuild, plus how to verify it works.
resource: https://react.dev/learn/react-compiler/installation
tags: [react, react-compiler, installation, babel, vite]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

This guide installs and configures React Compiler in a React app. It works best with React 19 but also supports React 17 and 18 (see [version compatibility](/reference/react-compiler/target.md)). The compiler ships a Babel plugin that integrates with your build pipeline.

# Install

Install as a devDependency:

```bash
npm install -D babel-plugin-react-compiler@latest
```

Yarn and pnpm equivalents: `yarn add -D babel-plugin-react-compiler@latest`, `pnpm install -D babel-plugin-react-compiler@latest`.

# Basic setup

React Compiler works by default with no configuration. Configure it only for special cases, for example targeting React below 19, via the [compiler options reference](/reference/react-compiler/compilationMode.md). Setup depends on your build tool.

Pitfall: React Compiler must run first in your Babel plugin pipeline. It needs the original source for proper analysis, so it must process code before other transforms.

## Babel

Update `babel.config.js`:

```js
module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // must run first!
    // ... other plugins
  ],
};
```

## Vite

With `@vitejs/plugin-react` v6.0.0 or later, use the `reactCompilerPreset` (install `@rolldown/plugin-babel`):

```js
// vite.config.js
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
```

In `@vitejs/plugin-react@6.0.0` the inline Babel option was removed. On older versions you can pass the plugin via `react({ babel: { plugins: ['babel-plugin-react-compiler'] } })`. Alternatively use `@rolldown/plugin-babel` directly with `babel({ plugins: ['babel-plugin-react-compiler'] })`.

## Next.js

See the [Next.js reactCompiler docs](https://nextjs.org/docs/app/api-reference/next-config-js/reactCompiler).

## React Router

Install `vite-plugin-babel` and add the compiler's Babel plugin:

```js
// vite.config.js
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { reactRouter } from "@react-router/dev/vite";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
});
```

## Other build tools

- Webpack: community loader at [react-compiler-webpack](https://github.com/SukkaW/react-compiler-webpack).
- Expo: see [Expo's React Compiler docs](https://docs.expo.dev/guides/react-compiler/).
- Metro (React Native): uses Babel via Metro, so follow the Babel section above.
- Rspack: see [Rspack's docs](https://rspack.dev/guide/tech/react#react-compiler).
- Rsbuild: see [Rsbuild's docs](https://rsbuild.dev/guide/framework/react#react-compiler).

# ESLint integration

The compiler ships an ESLint rule that flags code it cannot optimize. When the rule reports an error, the compiler skips optimizing that one component or hook and keeps optimizing the rest, so you can fix violations at your own pace. Install with `npm install -D eslint-plugin-react-hooks@latest`. The compiler rules are in the `recommended-latest` preset; see how to configure the plugin at [/reference/eslint-plugin-react-hooks/lints/config.md](/reference/eslint-plugin-react-hooks/lints/config.md). The rule identifies [Rules of React](/reference/rules/rules-of-hooks.md) violations, shows which components cannot be optimized, and gives fix-it messages.

# Verify your setup

## React DevTools

Components the compiler optimized show a "Memo sparkle" badge in React DevTools. Install the [React Developer Tools](/setup/react-developer-tools.md) extension, open your app in development, open DevTools, and look for the sparkle emoji next to component names. When working, components show the badge, expensive calculations are memoized automatically, and no manual `useMemo` is required.

## Build output

You can also confirm the compiler ran by checking the build output for injected memoization logic:

```js
import { c as _c } from "react/compiler-runtime";
export default function MyApp() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div>Hello World</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}
```

# Troubleshooting

To temporarily opt a problematic component out, add the `"use no memo"` directive (see [/reference/react-compiler/directives/use-no-memo.md](/reference/react-compiler/directives/use-no-memo.md)):

```js
function ProblematicComponent() {
  "use no memo";
  // Component code here
}
```

Fix the underlying issue and remove the directive once resolved. For more help, see the [debugging guide](debugging.md).

# Next steps

- [React version compatibility](/reference/react-compiler/target.md) for React 17 and 18.
- [Configuration options](/reference/react-compiler/compilationMode.md) to customize the compiler.
- [Incremental adoption strategies](incremental-adoption.md) for existing codebases.
- [Debugging techniques](debugging.md) for troubleshooting.
- [Compiling libraries](/reference/react-compiler/compiling-libraries.md) for shipping compiled code.

# Citations

[1] [Installation](https://react.dev/learn/react-compiler/installation)
