---
type: Guide
title: Removing Effect Dependencies
description: Make Effects re-run less often by changing the code so unnecessary dependencies fall away, never by suppressing the dependency linter.
resource: https://react.dev/learn/removing-effect-dependencies
tags: [react, effects, useEffect, dependencies, useEffectEvent]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

The linter verifies that every reactive value your Effect reads is in its dependency list, keeping the Effect synchronized with the latest props and state. Unnecessary dependencies can make an Effect run too often or loop infinitely. You cannot choose dependencies: the list describes the code. To change the list, change the code, never suppress the linter. This follows [Separating Events from Effects](separating-events-from-effects.md) and [Lifecycle of Reactive Effects](lifecycle-of-reactive-effects.md) within [Escape Hatches](escape-hatches.md). The Hooks are [useEffect](/reference/react/hooks/useEffect.md) and [useEffectEvent](/reference/react/hooks/useEffectEvent.md).

# Dependencies should match the code

Leave the array empty and the linter suggests the correct dependencies. To remove a dependency, prove it is not reactive. For example, move a constant outside the component so it cannot change on a re-render, and it no longer needs to be a dependency. The workflow: change the code, then adjust the dependencies to match; if you dislike the list, change the code again.

# Why suppressing the linter is dangerous

Suppressing `react-hooks/exhaustive-deps` lies to React about what the Effect depends on and causes subtle bugs. A classic case: an interval Effect with `[]` keeps using the `onTick` from the initial render, so a counter always sees the original `count` and `increment`. Treat the dependency lint error as a compilation error.

# Recipes for removing dependencies

- **Should this code be in an event handler?** If logic runs in response to a specific interaction (a form submit sending a POST and notification), move it to the handler. It is then non-reactive and will not re-run when an unrelated value like `theme` changes.
- **Is the Effect doing several unrelated things?** Split it. Fetching `cities` by `country` and `areas` by `city` are two synchronization processes; one Effect for each, so changing `city` does not re-fetch cities.
- **Are you computing the next state from current state?** Pass an updater function so the Effect need not read the state. This removes the dependency and stops needless re-synchronization.

  ```js
  connection.on('message', msg => setMessages(msgs => [...msgs, msg]));
  // no need for messages in the dependency array
  ```
- **Do you want to read a value without reacting to it?** Extract that line into an Effect Event. Reading `isMuted` (to play a sound) inside an Effect Event means toggling mute does not reconnect the chat.

  ```js
  const onMessage = useEffectEvent(msg => {
    setMessages(m => [...m, msg]);
    if (!isMuted) playSound(); // reads latest isMuted, not a dependency
  });
  ```
  The same applies to an event handler received as a prop (`onReceiveMessage`): wrap it in an Effect Event so a new function identity on every parent render does not re-synchronize the Effect.

# Avoiding object and function dependencies

Objects and functions created during render are different on every render (`Object.is` returns false even for equal contents), so they re-synchronize the Effect each time. Avoid them as dependencies:

- **Move static objects and functions outside the component.** If they do not depend on props or state, they are not reactive.
- **Move dynamic objects and functions inside the Effect.** Create `options` inside the Effect so only primitives like `roomId` remain reactive.

  ```js
  useEffect(() => {
    const options = { serverUrl, roomId };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  ```
- **Read primitive values from objects outside the Effect.** Destructure `const { roomId, serverUrl } = options` and depend on those primitives, so an unintentionally re-created object prop does not reconnect.
- **Calculate primitive values from functions.** For a prop function, call it outside the Effect (only safe for pure functions) and depend on the primitives it returns; for an event handler, wrap it in an Effect Event instead.

# Recap

- Dependencies should always match the code; to change them, edit the code.
- Never suppress the linter; it leads to confusing bugs.
- To remove a dependency, prove to the linter it is not necessary.
- Move interaction-specific code to an event handler.
- Split an Effect that re-runs for different reasons into several Effects.
- To update state from previous state, pass an updater function.
- To read the latest value without reacting to it, extract an Effect Event.
- Objects and functions created at different times are considered different; avoid them as dependencies by moving them outside the component or inside the Effect, or by extracting primitives.

# Citations

[1] [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
