---
type: API Reference
title: useEffect
description: React Hook that synchronizes a component with an external system by running setup and cleanup tied to a dependency list.
resource: https://react.dev/reference/react/useEffect
tags: [react, hook, effects, lifecycle, synchronization]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useEffect` lets you synchronize a component with an external system.

```js
useEffect(setup, dependencies?)
```

Call it at the top level of your component to declare an Effect.

```jsx
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]);
}
```

## Parameters

- `setup`: The function with your Effect's logic. It may optionally return a cleanup function. When the component mounts, React runs setup. After every re-render with changed dependencies, React first runs cleanup (if provided) with the old values, then runs setup with the new values. After the component unmounts, React runs cleanup.
- `dependencies` (optional): The list of all reactive values referenced inside `setup` (props, state, and every variable and function declared in the component body). The list must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React compares each dependency with `Object.is`. If you omit this argument, the Effect re-runs after every commit. An empty array `[]` means the Effect runs only after the initial mount.

## Returns

`useEffect` returns `undefined`.

# Usage

- Connect to an external system. Set up the connection in setup and tear it down in cleanup, listing the reactive values it uses. See [synchronizing with Effects](/escape-hatches/synchronizing-with-effects.md).
- Update state based on previous state from an Effect. Use an updater function so you can drop the state from the dependencies.
  ```js
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []); // count is not a dependency
  ```
- Remove unnecessary object and function dependencies. Move the object or function creation inside the Effect so only the reactive values remain dependencies.
- Read the latest props and state from an Effect. Wrap the non-reactive logic in [useEffectEvent](/reference/react/hooks/useEffectEvent.md) so values it reads do not have to be dependencies. See [separating events from Effects](/escape-hatches/separating-events-from-effects.md).
  ```jsx
  const onVisit = useEffectEvent(visitedUrl => logVisit(visitedUrl, shoppingCart.length));
  useEffect(() => { onVisit(url); }, [url]);
  ```
- Before reaching for an Effect, check whether you need one at all. See [you might not need an Effect](/escape-hatches/you-might-not-need-an-effect.md) and [removing Effect dependencies](/escape-hatches/removing-effect-dependencies.md).

# Caveats

- It is a Hook, so call it only at the top level of your component or your own Hooks, never inside loops or conditions.
- If you are not trying to synchronize with an external system, you probably do not need an Effect.
- When Strict Mode is on, React runs one extra development-only setup and cleanup cycle before the first real setup. This stress-tests that your cleanup mirrors your setup. Implement the cleanup function if this surfaces a problem.
- Object or function dependencies defined inside the component can cause the Effect to re-run more often than needed. Remove unnecessary object and function dependencies, or extract state updates and non-reactive logic out of the Effect.
- If an Effect was not caused by an interaction, React generally lets the browser paint the updated screen before running it. For visual work where the delay flickers, use [useLayoutEffect](/reference/react/hooks/useLayoutEffect.md) instead.
- If an Effect was caused by an interaction (like a click), React may run it before the browser paints, so the result can be observed by the event system. To defer work until after paint, use `setTimeout`.
- Even when caused by an interaction, React may let the browser repaint before processing the state updates inside your Effect. To block repaint, use [useLayoutEffect](/reference/react/hooks/useLayoutEffect.md) instead.
- Effects only run on the client. They do not run during server rendering.

# Citations

[1] [useEffect](https://react.dev/reference/react/useEffect)
