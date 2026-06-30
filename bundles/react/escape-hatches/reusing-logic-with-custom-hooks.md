---
type: Guide
title: Reusing Logic with Custom Hooks
description: Write your own Hooks to share stateful logic between components, naming and structuring them, and when to extract one.
resource: https://react.dev/learn/reusing-logic-with-custom-hooks
tags: [react, custom-hooks, effects, useEffectEvent, reuse]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React has built-in Hooks like `useState`, `useContext`, and `useEffect`, but you can write your own for specific needs: fetching data, tracking online status, connecting to a chat room. A custom Hook lets components share stateful logic (not state itself) so their code expresses intent rather than implementation. This is the last topic in [Escape Hatches](escape-hatches.md). Custom Hooks often wrap [useEffect](/reference/react/hooks/useEffect.md), and event handlers passed to them are best wrapped in [useEffectEvent](/reference/react/hooks/useEffectEvent.md).

# Extracting a custom Hook

When two components duplicate the same state and Effect (for example subscribing to `online`/`offline` events), move the duplicated code into a function and return the value the components need.

```js
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```

Now `const isOnline = useOnlineStatus();` works in any component. The component describes what it wants (the online status), not how to get it.

# Naming conventions

- Component names start with a capital letter and return JSX.
- Hook names start with `use` followed by a capital letter (`useOnlineStatus`). Hooks may return any value.
- A function that calls at least one Hook must itself be a Hook (use the `use` prefix). A function that calls no Hooks should not use the prefix (`getSorted`, not `useSorted`), so it can be called conditionally.

The linter (when configured for React) enforces that only Hooks and components call other Hooks.

# Custom Hooks share stateful logic, not state

Each call to a custom Hook is fully independent. Calling `useOnlineStatus()` in two components gives two separate states that happen to match because they sync to the same external value. Calling `useFormInput('Mary')` and `useFormInput('Poppins')` declares two separate `value` states. To share the state itself, [lift it up and pass it down](/managing-state/sharing-state-between-components.md) instead.

# Passing reactive values between Hooks

Custom Hook code re-runs on every render, so it always receives the latest props and state and must be pure. You can feed the output of one Hook into another.

```js
function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

The component passes the latest `roomId` and `serverUrl` on each render, so the Effect inside reconnects when they change.

## Passing event handlers to custom Hooks

Let callers customize behavior by accepting a handler. To avoid the handler becoming a dependency that reconnects on every render, wrap it in an Effect Event.

```js
function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);
  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.on('message', msg => onMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // onMessage need not be a dependency
}
```

# When to use custom Hooks

Some duplication is fine; do not extract a Hook for every small repeated line. But whenever you write an Effect, consider wrapping it in a custom Hook to make the data flow explicit (feed a `url` in, get `data` out) and to prevent others from adding unnecessary dependencies.

- Name the Hook after a concrete high-level use case: `useData(url)`, `useChatRoom(options)`, `useMediaQuery(query)`. If you cannot name it clearly, the Effect may be too coupled to extract.
- Avoid custom "lifecycle" wrappers like `useMount`, `useEffectOnce`, `useUpdateEffect`. They do not fit the React paradigm and hide bugs from the linter.

# Custom Hooks help you migrate to better patterns

Wrapping Effects in custom Hooks lets you swap the implementation without touching components. For example, reimplement `useOnlineStatus` with [useSyncExternalStore](/reference/react/hooks/useSyncExternalStore.md) and no component changes. As React adds APIs (like `use` for data fetching), Hook-wrapped Effects are easier to upgrade.

# There is more than one way to do it

How you draw boundaries is up to you. A fade-in can live in a `useFadeIn` Hook, be split into a `useAnimationLoop` Hook, moved into a plain JavaScript class that becomes the external system, or replaced entirely by a CSS animation with no Hook at all. The more coordination Effects need, the more it helps to move logic out of Effects completely.

# Recap

- Custom Hooks let you share logic between components.
- Custom Hook names start with `use` followed by a capital letter.
- Custom Hooks share stateful logic, not state itself.
- You can pass reactive values from one Hook to another, and they stay up to date.
- All Hooks re-run every time the component re-renders.
- Custom Hook code must be pure, like component code.
- Wrap event handlers received by custom Hooks into Effect Events.
- Do not create custom Hooks like `useMount`; keep their purpose specific.
- It is up to you where to draw the boundaries of your code.

# Citations

[1] [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
