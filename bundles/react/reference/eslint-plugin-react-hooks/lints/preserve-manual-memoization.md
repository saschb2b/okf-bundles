---
type: Lint Rule
title: preserve-manual-memoization
description: Flags incomplete dependencies in manual memoization that prevent React Compiler from understanding your data flow.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization
tags: [react, eslint, lint, compiler, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Manual memoization (`useMemo`, `useCallback`, `React.memo`) with incomplete dependencies. React Compiler preserves your existing manual memoization and will only compile a component or Hook when its inference matches or exceeds what you wrote by hand. Incomplete dependencies stop the compiler from understanding the data flow and applying further optimizations.

The compiler assumes you memoized for a reason and will not remove your memoization. It just needs complete dependencies to reason about the rest.

# Examples

Invalid:

```js
// Missing 'filter'
const filtered = useMemo(() => data.filter(filter), [data]);

// Missing 'value'
const handleClick = useCallback(() => onUpdate(value), [onUpdate]);
```

Valid:

```js
// Complete dependencies
const filtered = useMemo(() => data.filter(filter), [data, filter]);

// Or let the compiler handle it: no manual memoization needed
const filtered = data.filter(filter);
```

# Troubleshooting

With React Compiler you can usually remove manual memoization entirely and let the compiler optimize, for example computing `[...items].sort(...)` directly during render instead of wrapping it in `useMemo`.

# Related

Mirrors the dependency completeness checked by [exhaustive-deps](exhaustive-deps.md), here in service of the compiler.

# Citations

[1] [preserve-manual-memoization](https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization)
