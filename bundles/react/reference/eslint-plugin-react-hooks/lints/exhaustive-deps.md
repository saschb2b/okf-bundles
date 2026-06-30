---
type: Lint Rule
title: exhaustive-deps
description: Validates that dependency arrays for React Hooks contain every value the Hook references.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
tags: [react, eslint, hooks, lint, dependencies]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Dependency arrays passed to `useEffect`, `useMemo`, and `useCallback` that omit a value referenced inside the Hook. A missing dependency means React will not re-run the effect or recompute the value when that value changes, producing a stale closure that uses outdated props or state.

The rule often fires when you try to "trick" React about dependencies to control when an effect runs. The dependency array describes which values the effect uses so React knows when to re-synchronize. Fighting the linter usually means the code needs restructuring rather than a suppressed warning. See [Removing Effect Dependencies](/escape-hatches/removing-effect-dependencies.md).

# Examples

Invalid, missing dependencies:

```js
// Missing 'count'
useEffect(() => {
  console.log(count);
}, []);

// Missing 'sortOrder'
useMemo(() => {
  return items.sort(sortOrder);
}, [items]);
```

Valid, all dependencies included:

```js
useEffect(() => {
  console.log(count);
}, [count]);
```

# Troubleshooting

- A function dependency causes an infinite loop because a new function is created every render. Usually you do not need the effect: call the function from the event handler, or derive during render. If the effect is genuinely needed, stabilize the function with `useCallback`, or move the logic straight into the effect.
- Running an effect "only once" while it reads a value: include the dependency (recommended), or use a `useRef` guard inside the effect if you truly must run once.

# Options

Configure custom effect hooks through shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later). This setting is shared across all `react-hooks` rules. See the [config](config.md) concept.

```js
{
  "settings": {
    "react-hooks": {
      "additionalEffectHooks": "(useMyEffect|useCustomEffect)"
    }
  }
}
```

For backward compatibility a rule-level option also exists. If set, it takes precedence over the shared setting.

```js
{
  "rules": {
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useMyCustomHook|useAnotherHook)"
    }]
  }
}
```

# Citations

[1] [exhaustive-deps](https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps)
