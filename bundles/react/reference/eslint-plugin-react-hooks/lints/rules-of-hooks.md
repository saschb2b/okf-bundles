---
type: Lint Rule
title: rules-of-hooks
description: Validates that components and Hooks follow the Rules of Hooks, calling Hooks only at the top level of React functions.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
tags: [react, eslint, hooks, lint, purity]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Violations of the [Rules of Hooks](/reference/rules/rules-of-hooks.md). React relies on Hooks being called in the same order on every render to associate state with each call. Calling Hooks conditionally or in loops loses that mapping, causing state mismatches and "Rendered fewer/more hooks than expected" errors.

Flagged patterns:

- Hooks in conditions (`if`/`else`, ternary, `&&`/`||`).
- Hooks in loops (`for`, `while`, `do-while`).
- Hooks after an early return.
- Hooks in callbacks or event handlers.
- Hooks in async functions.
- Hooks in class methods.
- Hooks at module level.

# Special case: the use Hook

The `use` Hook is exempt from the order rule. It may be called conditionally and in loops:

```js
// `use` can be conditional
if (shouldFetch) {
  const data = use(fetchPromise);
}

// `use` can be in loops
for (const promise of promises) {
  results.push(use(promise));
}
```

`use` still cannot be wrapped in `try`/`catch`, and must be called inside a component or Hook.

# Examples

Invalid:

```js
// Hook in condition
if (isLoggedIn) {
  const [user, setUser] = useState(null);
}

// Hook after early return
if (!data) return <Loading />;
const [processed, setProcessed] = useState(data);
```

Valid:

```js
function Component({ isSpecial, shouldFetch, fetchPromise }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  if (!isSpecial) return null;

  if (shouldFetch) {
    const data = use(fetchPromise); // `use` may be conditional
    return <div>{data}</div>;
  }

  return <div>{name}: {count}</div>;
}
```

# Troubleshooting

- Conditional data fetching: call the Hook unconditionally and put the condition inside, for example `useEffect(() => { if (isLoggedIn) fetchUserData(); }, [isLoggedIn])`.
- Conditional state initialization: always call `useState`, and pick the initial value conditionally, for example `useState(userType === 'admin' ? adminPerms : userPerms)`.

# Options

You can configure custom effect hooks through shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later), so `useEffectEvent` and similar event functions may be called from custom effect hooks. See the [config](config.md) concept.

```js
{
  "settings": {
    "react-hooks": {
      "additionalEffectHooks": "(useMyEffect|useCustomEffect)"
    }
  }
}
```

# Related

This lint enforces the conceptual rule documented at [Rules of Hooks](/reference/rules/rules-of-hooks.md), which is part of the broader [Rules of React](/reference/rules/index.md).

# Citations

[1] [rules-of-hooks](https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks)
