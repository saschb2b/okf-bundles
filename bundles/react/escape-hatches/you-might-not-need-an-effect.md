---
type: Guide
title: You Might Not Need an Effect
description: When to remove unnecessary Effects by calculating during render, handling logic in events, and using keys, memoization, and external store Hooks.
resource: https://react.dev/learn/you-might-not-need-an-effect
tags: [react, effects, useEffect, useMemo, performance]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Effects are an escape hatch for stepping outside React to synchronize with external systems. When there is no external system, for example updating state when props or state change, you usually do not need an Effect. Removing unnecessary Effects makes code simpler, faster, and less error-prone. This page lists the common cases and their better solutions. It complements [Synchronizing with Effects](synchronizing-with-effects.md) and the rest of [Escape Hatches](escape-hatches.md). The relevant Hook when an Effect is genuinely needed is [useEffect](/reference/react/hooks/useEffect.md).

# Two cases where you do not need an Effect

- **Transforming data for rendering.** Do not store derived data in state and sync it with an Effect; that triggers an extra render pass. Calculate it during rendering instead.

  ```js
  // 🔴 redundant state plus Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => { setFullName(firstName + ' ' + lastName); }, [firstName, lastName]);
  // ✅ calculate during render
  const fullName = firstName + ' ' + lastName;
  ```
- **Handling user events.** Logic caused by a specific interaction belongs in the event handler, where you know what happened, not in an Effect that runs after render.

The rule: ask why the code runs. If it runs because the component was displayed, use an Effect. If it runs because of a particular interaction, use an event handler.

# Recipes

- **Caching expensive calculations.** Wrap the calculation in `useMemo` instead of storing it in state via an Effect. It re-runs only when its dependencies change. (React Compiler can do this automatically.) Measure with `console.time` before memoizing; usually it is not expensive.

  ```js
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  ```
- **Resetting all state on a prop change.** Do not clear state in an Effect. Pass a different `key` so React treats it as a different component and resets its state and that of its children.

  ```js
  <Profile userId={userId} key={userId} />
  ```
- **Adjusting some state on a prop change.** Prefer calculating during render (for example derive `selection` from a stored `selectedId`). If you must, set state directly during rendering, guarded by a condition comparing to the previous prop, rather than in an Effect.

  ```js
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) { setPrevItems(items); setSelection(null); }
  ```
- **Sharing logic between event handlers.** Extract a shared function called from both handlers, not an Effect that reacts to state.
- **Sending a POST request.** Keep "because the component displayed" requests (analytics on mount) in an Effect. Move "because the user did X" requests (form submit) into the event handler.
- **Chains of computations.** Do not chain Effects that each set state to trigger the next. Calculate what you can during render and set the rest in the event handler. Chained Effects are slow and fragile.
- **Initializing the application.** For once-per-app-load logic, guard with a module-level `didInit` flag or run it during module initialization, not in a top-level Effect (which runs twice in development).
- **Notifying parent components.** Update both child and parent state in the same event handler, or lift state up so the parent fully controls the child, instead of calling `onChange` from an Effect.
- **Passing data to the parent.** Let the parent fetch and pass data down. Do not push data up from a child Effect; it makes the data flow hard to trace.
- **Subscribing to an external store.** Use [useSyncExternalStore](/reference/react/hooks/useSyncExternalStore.md) instead of an Effect that manually subscribes and `setState`s.

  ```js
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  ```
- **Fetching data.** Fetching may stay an Effect (it should stay synchronized with `query`/`page`), but add cleanup to ignore stale responses and avoid race conditions. Better still, extract it into a custom Hook or use a framework's built-in fetching.

  ```js
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => { if (!ignore) setResults(json); });
    return () => { ignore = true; };
  }, [query, page]);
  ```

# Recap

- If you can calculate something during render, you do not need an Effect.
- To cache expensive calculations, use `useMemo` instead of `useEffect`.
- To reset a whole component tree's state, pass a different `key`.
- To reset a bit of state on a prop change, set it during rendering.
- Code that runs because a component was displayed belongs in Effects; the rest belongs in events.
- To update several components' state, do it in a single event.
- When trying to keep state variables in different components in sync, lift state up.
- You can fetch data with Effects, but add cleanup to avoid race conditions.

# Citations

[1] [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
