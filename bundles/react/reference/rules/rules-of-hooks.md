---
type: Rule
title: Rules of Hooks
description: Hooks must be called only at the top level and only from React functions, never conditionally or from regular JavaScript functions.
resource: https://react.dev/reference/rules/rules-of-hooks
tags: [react, rules, hooks, lint]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Hooks are JavaScript functions whose names start with `use`, but they carry placement restrictions. Two rules: call Hooks only at the top level, and call them only from React functions. The [`eslint-plugin-react-hooks`](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks.md) lint catches violations.

# Only call Hooks at the top level

Call Hooks at the top level of a function component or a custom Hook, before any early `return`. Do not call them inside loops, conditions, nested functions, or `try`/`catch`/`finally`.

```js
function Counter() {
  const [count, setCount] = useState(0);        // Good: top level of a component
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth); // Good: top level of a custom Hook
}
```

Do **not** call Hooks in any of these cases:

- Inside conditions or loops.
- After a conditional `return` statement.
- In event handlers.
- In class components.
- Inside functions passed to `useMemo`, `useReducer`, or `useEffect`.
- Inside `try`/`catch`/`finally` blocks.

```js
function Bad({ cond }) {
  if (cond) {
    const theme = useContext(ThemeContext); // Bad: inside a condition, move it out
  }
}
```

Calling Hooks in a consistent order on every render is what lets React associate state with each Hook call. Custom Hooks **may** call other Hooks, since they too only run while a component renders.

# Only call Hooks from React functions

Call Hooks from function components or from custom Hooks, never from regular JavaScript functions. This keeps all stateful logic visible from the component's source.

```js
function FriendList() {
  const [onlineStatus, setOnlineStatus] = useOnlineStatus(); // Good
}

function setOnlineStatus() {              // Bad: not a component or custom Hook
  const [onlineStatus, setOnlineStatus] = useOnlineStatus();
}
```

# Related rules

- React, not you, calls components and Hooks: [React calls Components and Hooks](/reference/rules/react-calls-components-and-hooks.md). Calling components directly or passing Hooks around makes these rules easy to break.
- Render purity underpins consistent Hook ordering: [Components and Hooks must be pure](/reference/rules/components-and-hooks-must-be-pure.md).
- Conceptual background: [Keeping Components Pure](/describing-the-ui/keeping-components-pure.md).
- Lint that enforces this rule: [rules-of-hooks](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks.md).

# Citations

[1] [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
