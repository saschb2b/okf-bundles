---
type: Rule
title: React calls Components and Hooks
description: React, not your code, is responsible for calling components and Hooks; never invoke them directly or pass Hooks around as values.
resource: https://react.dev/reference/rules/react-calls-components-and-hooks
tags: [react, rules, components, hooks, render]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React orchestrates rendering: you describe what to render in JSX, and React decides when to call your component functions and Hooks. Two rules follow. Never call a component function directly, and never pass a Hook around as a regular value. Letting React call your code is what enables state, reconciliation, and developer tooling.

# Never call component functions directly

Use components only in JSX. Let React call them.

```jsx
function BlogPost() {
  return <Layout><Article /></Layout>; // Good: component used in JSX
}

function BlogPost() {
  return <Layout>{Article()}</Layout>; // Bad: never call a component directly
}
```

Calling a component directly (especially in a loop or conditionally) makes it easy to violate the [Rules of Hooks](/reference/rules/rules-of-hooks.md).

Why React must be the caller:

- **Components gain more than function behavior**, like local state via Hooks tied to the component's identity in the tree.
- **Component types participate in reconciliation.** React knows the tree's structure and will not wrongly reuse `<Feed>` as `<Profile>`.
- **React can improve UX**, for example yielding to the browser between component calls so a large tree does not block the main thread.
- **Better debugging.** First-class components enable rich devtools.
- **More efficient reconciliation.** React skips components that do not need re-rendering.

# Never pass around Hooks as regular values

Hooks must only be called inside components or other Hooks, always as a direct function call, never passed as a value. This preserves local reasoning and lets React optimize your component.

## Do not dynamically mutate a Hook

Hooks should be static. Do not build higher-order Hooks.

```js
function ChatInput() {
  const useDataWithLogging = withLogging(useData); // Bad: higher-order Hook
  const data = useDataWithLogging();
}
```

Instead, write a new static Hook that inlines the desired logic.

```js
function ChatInput() {
  const data = useDataWithLogging(); // Good: a concrete, static Hook
}
```

## Do not dynamically use Hooks

Do not pass a Hook as a prop or otherwise inject it dynamically.

```jsx
function ChatInput() {
  return <Button useData={useDataWithLogging} />; // Bad: Hook passed as prop
}
```

Inline the Hook call into the component that uses it.

```jsx
function Button() {
  const data = useDataWithLogging(); // Good: Hook called directly
}
```

Dynamic Hook usage increases complexity, inhibits local reasoning, and makes it easy to break the Rules of Hooks (conditional calls). For tests, mock the server to return canned data, or prefer end-to-end tests, rather than mocking components.

# Related rules

- Hook placement restrictions: [Rules of Hooks](/reference/rules/rules-of-hooks.md).
- Why render must stay pure for React to call code repeatedly: [Components and Hooks must be pure](/reference/rules/components-and-hooks-must-be-pure.md).
- Conceptual background on render-as-formula: [Keeping Components Pure](/describing-the-ui/keeping-components-pure.md).
- Lint enforcement: [rules-of-hooks](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks.md).

# Citations

[1] [React calls Components and Hooks](https://react.dev/reference/rules/react-calls-components-and-hooks)
