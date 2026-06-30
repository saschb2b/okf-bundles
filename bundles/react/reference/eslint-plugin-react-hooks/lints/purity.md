---
type: Lint Rule
title: purity
description: Flags calls to known-impure functions during render, such as Math.random and Date.now, that break render purity.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/purity
tags: [react, eslint, lint, purity, side-effects]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Calls to known-impure functions during render. React components must be pure: given the same props they must return the same JSX. Functions that return a different value for the same inputs break that contract and cause hydration mismatches, incorrect memoization, and unpredictable behavior.

Common offenders:

- `Math.random()`
- `Date.now()` and `new Date()`
- `crypto.randomUUID()`
- `performance.now()`

# Examples

Invalid:

```js
// Different every render
const id = Math.random();

// Changes every render
const timestamp = Date.now();
```

Valid:

```js
// Stable ID from initial state
const [id] = useState(() => crypto.randomUUID());
```

# Troubleshooting

To show the current time, move the impure call out of render into state and an effect:

```js
function Clock() {
  const [time, setTime] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Current time: {time}</div>;
}
```

# Related

This lint enforces the conceptual rule [Components and Hooks must be pure](/reference/rules/components-and-hooks-must-be-pure.md), part of the [Rules of React](/reference/rules/rules-of-hooks.md).

# Citations

[1] [purity](https://react.dev/reference/eslint-plugin-react-hooks/lints/purity)
