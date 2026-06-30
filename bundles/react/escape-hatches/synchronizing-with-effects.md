---
type: Guide
title: Synchronizing with Effects
description: Use Effects to run code after rendering that synchronizes a component with an external system, and how to add dependencies and cleanup.
resource: https://react.dev/learn/synchronizing-with-effects
tags: [react, effects, useEffect, cleanup, dependencies]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Some components must synchronize with external systems: control a non-React widget, set up a server connection, or send an analytics log when a component appears. Effects let you run code after rendering so you can synchronize your component with a system outside of React. Effects run at the end of a commit, after the screen updates. Effects are an escape hatch within [Escape Hatches](escape-hatches.md); the Hook is [useEffect](/reference/react/hooks/useEffect.md). If your code only adjusts state based on other state with no external system, see [You Might Not Need an Effect](you-might-not-need-an-effect.md).

# Effects vs events

- **Rendering code** lives at the top of your component, computing JSX from props and state. It must be pure: only calculate, no side effects.
- **Event handlers** are nested functions that do things in response to a specific interaction (a click, a keystroke). They contain side effects caused by that action.
- **Effects** specify side effects caused by rendering itself, not by a particular event. Connecting to a server should happen whenever the component is shown, regardless of which interaction caused it, so it is an Effect. Sending a chat message is caused by clicking Send, so it is an event.

# How to write an Effect

Three steps: declare the Effect, specify its dependencies, and add cleanup if needed.

## Step 1: Declare an Effect

Import `useEffect` and call it at the top level. By default the code runs after every commit (after the screen reflects that render). Use this to move a side effect out of rendering. For example, a `VideoPlayer` cannot call `play()`/`pause()` during render (the DOM node may not exist and rendering must stay pure), so wrap it in an Effect.

```js
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) ref.current.play();
    else ref.current.pause();
  });
  return <video ref={ref} src={src} loop playsInline />;
}
```

Setting state inside an Effect with no dependency array causes an infinite loop: the Effect runs, sets state, which re-renders, which runs the Effect again.

## Step 2: Specify the Effect dependencies

By default an Effect runs after every render, which is often wrong (slow, or re-triggers animations). Pass an array of dependencies as the second argument so React skips re-running when they are unchanged.

```js
useEffect(() => {
  if (isPlaying) ref.current.play();
  else ref.current.pause();
}, [isPlaying]); // re-runs only when isPlaying changes
```

- `useEffect(fn)` with no array: runs after every render.
- `useEffect(fn, [])`: runs only on mount.
- `useEffect(fn, [a, b])`: runs on mount and when `a` or `b` changed (compared with `Object.is`).

You cannot choose your dependencies. The linter requires every reactive value the Effect reads. If you do not want a dependency, change the Effect code so it no longer needs it. Stable values like a `ref` object and the `set` function from `useState` never change, so they may be omitted.

## Step 3: Add cleanup if needed

Return a cleanup function. React calls it before the Effect runs again and once when the component unmounts. Without cleanup, connections, subscriptions, or timers pile up.

```js
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => connection.disconnect(); // cleanup
}, []);
```

In development with Strict Mode, React mounts the component, immediately remounts it, so you see connect, disconnect, connect. This is intentional: it stress-tests that your cleanup works. The fix is never to "run once" via a ref guard, but to implement cleanup so setup then cleanup then setup is indistinguishable from a single setup.

# Common patterns

- **Controlling non-React widgets.** Sync a value like a map zoom level. Often no cleanup is needed if calling twice is harmless. For APIs that throw on a double call (like `dialog.showModal()`), add cleanup that closes/undoes.
- **Subscribing to events.** Add the listener in the Effect, remove it in cleanup.

  ```js
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```
- **Triggering animations.** Animate in, reset to the initial value in cleanup.
- **Fetching data.** Use an `ignore` flag (or abort) in cleanup so a stale response does not overwrite the current one. This fixes race conditions when the dependency changes.

  ```js
  useEffect(() => {
    let ignore = false;
    fetchTodos(userId).then(json => { if (!ignore) setTodos(json); });
    return () => { ignore = true; };
  }, [userId]);
  ```

# Not an Effect

- **Initializing the application.** Logic that must run once per app load belongs outside components (for example guarded by `if (typeof window !== 'undefined')`), not in an Effect.
- **Buying a product.** A POST like buying is caused by a button click, not by rendering. Put it in the event handler. If remounting would break the logic, that usually reveals a real bug.

# Pitfalls

- Effects that set their own dependency state without an array loop forever.
- Do not "fix" the development double-run with a `useRef` guard; it hides the missing cleanup but the underlying bug (piling up connections) remains.
- Fetching directly in Effects has downsides (no server run, network waterfalls, no caching, race-condition boilerplate). Prefer a framework's built-in fetching or a client cache like TanStack Query or useSWR.

# Recap

- Unlike events, Effects are caused by rendering itself, not a particular interaction.
- Effects synchronize a component with an external system.
- By default Effects run after every render, including the initial one.
- React skips an Effect when all dependencies are unchanged since the last render.
- You cannot choose dependencies; they follow the code inside the Effect.
- An empty `[]` array corresponds to mounting.
- In Strict Mode React mounts components twice in development to stress-test Effects.
- If remounting breaks your Effect, implement a cleanup function. React calls it before the next run and on unmount.

# Citations

[1] [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
