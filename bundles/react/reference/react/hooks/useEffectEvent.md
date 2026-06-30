---
type: API Reference
title: useEffectEvent
description: React Hook that creates an Effect Event, a non-reactive function callable from Effects that always reads the latest props and state.
resource: https://react.dev/reference/react/useEffectEvent
tags: [react, hook, effects, events]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`useEffectEvent` lets you separate events from Effects.

```js
const onEvent = useEffectEvent(callback)
```

Call it at the top level of your component to create an Effect Event: a function you call from an Effect that always reads the latest committed values without making those values dependencies.

```jsx
import { useEffectEvent, useEffect } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
}
```

## Parameters

- `callback`: A function containing the logic for your Effect Event. It can accept any number of arguments and return any value. When you call the returned Effect Event function, the `callback` always accesses the latest committed values from render at the time of the call.

## Returns

An Effect Event function with the same type signature as your `callback`. You can call it inside [useEffect](/reference/react/hooks/useEffect.md), [useLayoutEffect](/reference/react/hooks/useLayoutEffect.md), [useInsertionEffect](/reference/react/hooks/useInsertionEffect.md), or from within other Effect Events in the same component.

# Usage

- Use an event inside an Effect. Move the non-reactive logic (the part that reads values that should not restart the Effect) into an Effect Event, then call it from the Effect. The values it reads stay out of the dependency array.
  ```jsx
  const onConnected = useEffectEvent(() => {
    if (!muted) showNotification('Connected!');
  });
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', onConnected);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // muted is not a dependency
  ```
- Use a timer or event listener with the latest values. Read the freshest state inside an Effect Event so an interval or listener set up once still sees current values.
- Use Effect Events in custom Hooks. Wrap a passed-in callback in `useEffectEvent` so a Hook like `useInterval` always calls the latest callback without re-subscribing. See [separating events from Effects](/escape-hatches/separating-events-from-effects.md).
  ```jsx
  function useInterval(callback, delay) {
    const onTick = useEffectEvent(callback);
    useEffect(() => {
      if (delay === null) return;
      const id = setInterval(() => onTick(), delay);
      return () => clearInterval(id);
    }, [delay]);
  }
  ```

# Caveats

- It is a Hook, so call it only at the top level of your component or your own Hooks, never inside loops or conditions.
- Effect Events can only be called from inside Effects or other Effect Events. Do not call them during rendering or pass them to other components or Hooks. The `eslint-plugin-react-hooks` linter enforces this.
- Do not use `useEffectEvent` just to avoid specifying dependencies. That hides bugs and makes code harder to understand. Use it only for logic that is genuinely an event fired from Effects.
- Effect Event functions do not have a stable identity. Their identity intentionally changes on every render. This acts as a runtime assertion: if your code wrongly depends on the function identity, the Effect re-runs every render and the bug becomes obvious.

# Citations

[1] [useEffectEvent](https://react.dev/reference/react/useEffectEvent)
