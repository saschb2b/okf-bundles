---
type: Guide
title: Lifecycle of Reactive Effects
description: How an Effect's lifecycle of start and stop synchronization differs from a component's, and why reactive values must be dependencies.
resource: https://react.dev/learn/lifecycle-of-reactive-effects
tags: [react, effects, useEffect, dependencies, reactive-values]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

An Effect has a different lifecycle from a component. A component mounts, updates, and unmounts. An Effect can only do two things: start synchronizing something and later stop synchronizing it. This start/stop cycle can happen many times while the component stays mounted, whenever the props and state the Effect depends on change. Think about each Effect independently of the component's lifecycle. This builds on [Synchronizing with Effects](synchronizing-with-effects.md) and is part of [Escape Hatches](escape-hatches.md); the Hook is [useEffect](/reference/react/hooks/useEffect.md).

# The lifecycle of an Effect

The Effect body specifies how to start synchronizing; the returned cleanup specifies how to stop.

```js
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect(); // start synchronizing
  return () => connection.disconnect(); // stop synchronizing
}, [roomId]);
```

Synchronization may need to happen more than once. If `roomId` changes from `"general"` to `"travel"`, the old Effect no longer matches the UI. React re-synchronizes: it runs the cleanup with the old value (disconnect from `"general"`), then runs the Effect with the new value (connect to `"travel"`). On unmount it runs the cleanup one final time.

Think from the Effect's perspective as non-overlapping periods (connected to general until disconnected, then connected to travel until disconnected) rather than as component mount/update/unmount callbacks. Each Effect should describe one independent synchronization process. Do not bundle unrelated logic (like an analytics call) into a connection Effect; write separate Effects so re-synchronizing one does not re-run the other.

# How React verifies and re-synchronizes

In development with Strict Mode, React forces an extra start/stop cycle immediately after mount to verify your cleanup works, like opening and closing a door to test the lock. In practice an Effect re-synchronizes when a value it reads, declared in the dependency array, changes. React compares each dependency with `Object.is` against the previous render; any difference triggers a re-synchronization.

# Effects react to reactive values

Props, state, and any values declared inside the component body are reactive: they are computed during rendering and participate in the data flow, so they can change on a re-render. Every reactive value an Effect reads must be a dependency.

```js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // both are reactive
}
```

- A value defined outside the component (a module constant) is not reactive and need not be a dependency.
- An empty `[]` means the Effect uses no reactive values. From the component's view it runs on mount and cleans up on unmount.
- Values calculated from props or state (for example `const serverUrl = selectedServerUrl ?? settings.defaultServerUrl`) are also reactive.

# What can and cannot be a dependency

- Mutable values are not reactive and cannot be dependencies. `location.pathname` can change outside React's data flow without re-rendering; read it via [useSyncExternalStore](/reference/react/hooks/useSyncExternalStore.md) instead.
- `ref.current` cannot be a dependency because mutating it does not re-render. The ref object itself (from [useRef](/reference/react/hooks/useRef.md)) is stable and may be a dependency.
- Stable values like the `set` function from `useState` and the `useRef` object never change, so they may be omitted from the list.

# What to do when you do not want to re-synchronize

The linter checks that every reactive value used by the Effect is declared. Never suppress it. Instead, prove the value is not reactive or restructure:

- Move constants outside the component or inside the Effect so they are not reactive.
- If the Effect synchronizes nothing, it may be unnecessary (see [You Might Not Need an Effect](you-might-not-need-an-effect.md)).
- If it synchronizes several things, split it up.
- To read the latest value without reacting to it, extract an Effect Event (see [Separating Events from Effects](separating-events-from-effects.md)).
- Avoid object and function dependencies created during render (see [Removing Effect Dependencies](removing-effect-dependencies.md)).

# Pitfalls

- The linter only knows when dependencies are wrong, not the best fix. If adding a suggested dependency causes a loop, change the code so the value is not reactive; do not ignore the linter.
- Suppressing `react-hooks/exhaustive-deps` lets stale values leak in and produces hard-to-find bugs.

# Summary

- Each Effect has a separate lifecycle from its component.
- Each Effect describes one synchronization process that can start and stop.
- Think from the Effect's perspective (how to start and stop), not the component's (mount, update, unmount).
- Values declared in the component body are reactive and can change over time.
- Reactive values used by an Effect must be dependencies so it re-synchronizes when they change.
- The linter flags missing dependencies, and every flag is legitimate; there is always a way to fix the code.

# Citations

[1] [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)
