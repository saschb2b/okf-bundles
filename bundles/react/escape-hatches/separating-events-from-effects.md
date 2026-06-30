---
type: Guide
title: Separating Events from Effects
description: Choose between event handlers and Effects, and extract non-reactive logic into Effect Events so some values do not re-trigger an Effect.
resource: https://react.dev/learn/separating-events-from-effects
tags: [react, effects, useEffectEvent, events, reactive-values]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Event handlers re-run only when you perform the same interaction again. Effects re-synchronize when a value they read changes. Sometimes you want a mix: an Effect that reacts to some values but not others. Effect Events let you extract non-reactive logic from an Effect so it always reads the latest props and state without making them dependencies. This continues [Lifecycle of Reactive Effects](lifecycle-of-reactive-effects.md) within [Escape Hatches](escape-hatches.md). The Hooks are [useEffect](/reference/react/hooks/useEffect.md) and the Effect Event Hook [useEffectEvent](/reference/react/hooks/useEffectEvent.md).

# Choosing between event handlers and Effects

Ask why the code needs to run.

- **Event handlers run in response to specific interactions.** Sending a message happens because the user clicked Send, so it is an event handler. `sendMessage(message)` should run only on that click.
- **Effects run whenever synchronization is needed.** Staying connected to the selected chat room must happen regardless of which interaction brought the user there, so it is an Effect.

# Reactive values and reactive logic

Props, state, and variables declared in the component body are reactive values; they can change on a re-render.

- **Logic inside event handlers is not reactive.** It reads reactive values without reacting to their changes. It runs again only on the same interaction.
- **Logic inside Effects is reactive.** Every reactive value an Effect reads must be a dependency, and a change to it re-runs the Effect.

So `sendMessage(message)` belongs in a handler (a change to `message` is not a request to send), while `createConnection(serverUrl, roomId)` belongs in an Effect (a change to `roomId` should reconnect).

# Extracting non-reactive logic with Effect Events

When you want part of an Effect to not be reactive, use `useEffectEvent`. Suppose you show a notification on connect using the current `theme`. If `theme` is an Effect dependency, switching theme reconnects the chat, which is wrong.

```js
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme); // non-reactive, reads latest theme
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // theme is no longer a dependency
}
```

`onConnected` is an Effect Event. Its logic is not reactive and always sees the latest props and state. Effect Events must be omitted from the dependency array.

# Reading latest props and state with Effect Events

Effect Events fix patterns where you would otherwise suppress the linter. To log a page visit with the current cart size, where `url` should be reactive but `numberOfItems` should not:

```js
const onVisit = useEffectEvent(visitedUrl => {
  logVisit(visitedUrl, numberOfItems); // reads latest numberOfItems, not reactive
});

useEffect(() => {
  onVisit(url);
}, [url]); // reactive to url only
```

Pass the reactive value (`url`) as an argument from the Effect rather than reading it inside the Effect Event. This keeps `url` in the dependencies, and with async code (a `setTimeout`) the argument captures the `url` that triggered the Effect while reads inside the Event see the latest values.

# Pitfalls

- **Never suppress the dependency linter.** Suppressing it stops React from warning you about new reactive dependencies and produces stale-value bugs (for example a `handleMove` listener forever seeing the initial `canMove`). Use an Effect Event instead.
- `useEffectEvent` is not always the answer. Apply it only to the lines you do not want to be reactive.

# Limitations of Effect Events

- Only call them from inside Effects.
- Never pass them to other components or Hooks. Declare an Effect Event next to the Effect that uses it (for example inside a custom Hook like `useTimer`, not passed in from the caller).

# Recap

- Event handlers run in response to specific interactions; Effects run whenever synchronization is needed.
- Logic inside event handlers is not reactive; logic inside Effects is reactive.
- Move non-reactive logic from Effects into Effect Events.
- Only call Effect Events from inside Effects.
- Do not pass Effect Events to other components or Hooks.

# Citations

[1] [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)
