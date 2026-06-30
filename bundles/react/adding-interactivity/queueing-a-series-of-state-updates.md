---
type: Guide
title: Queueing a Series of State Updates
description: How React batches state updates within an event, and how updater functions queue multiple changes to the same state.
resource: https://react.dev/learn/queueing-a-series-of-state-updates
tags: [react, state, batching, updater-function]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Setting a state variable queues another render. Sometimes you want to perform multiple operations on the value before the next render. This requires understanding batching and updater functions.

# React batches state updates

Because each render's state values are fixed, calling `setNumber(number + 1)` three times with `number` at `0` is just `setNumber(0 + 1)` three times, so the counter only goes up by 1.

```jsx
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

React waits until all code in the event handlers has run before processing state updates. This is batching. It makes the app faster and avoids confusing half-finished renders where only some variables updated. React does not batch across multiple separate events like clicks. Each click is handled separately, which keeps things safe (a first click that disables a form means a second will not submit it again).

# Updating the same state multiple times before the next render

To update the same state variable multiple times before the next render, pass an updater function like `n => n + 1` instead of the next value. It tells React to do something with the state value rather than replace it.

```jsx
const [number, setNumber] = useState(0);

<button onClick={() => {
  setNumber(n => n + 1);
  setNumber(n => n + 1);
  setNumber(n => n + 1);
}}>+3</button>
```

Each `n => n + 1` is added to a queue. During the next render React walks the queue, passing the previous result as `n` to the next updater.

| queued update | `n` | returns |
|--------------|-----|---------|
| `n => n + 1` | `0` | `1` |
| `n => n + 1` | `1` | `2` |
| `n => n + 1` | `2` | `3` |

React stores `3` as the final result.

## Updating state after replacing it

```jsx
setNumber(number + 5); // replace with 5
setNumber(n => n + 1); // updater
```

| queued update | `n` | returns |
|--------------|-----|---------|
| replace with `5` | `0` (unused) | `5` |
| `n => n + 1` | `5` | `6` |

A plain value like `setNumber(5)` works like `setNumber(n => 5)` where `n` is unused.

## Replacing state after updating it

```jsx
setNumber(number + 5); // replace with 5
setNumber(n => n + 1); // updater
setNumber(42);         // replace with 42
```

| queued update | `n` | returns |
|--------------|-----|---------|
| replace with `5` | `0` (unused) | `5` |
| `n => n + 1` | `5` | `6` |
| replace with `42` | `6` (unused) | `42` |

Final result is `42`.

# How to think about what you pass the setter

- An updater function (for example `n => n + 1`) is added to the queue.
- Any other value (for example `5`) adds "replace with 5" to the queue, ignoring what is already queued.

# Pitfalls

- Updater functions run during rendering, so they must be pure: only return the result. Do not set state or run side effects inside them. In Strict Mode React runs each updater twice (discarding the second result) to help find mistakes.

# Naming conventions

Name the updater argument by the first letters of the state variable, or repeat the full name, or use a `prev` prefix.

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
setEnabled(prevEnabled => !prevEnabled);
```

# Recap

- Setting state does not change the variable in the existing render, it requests a new render.
- React processes state updates after event handlers finish running. This is batching.
- To update some state multiple times in one event, use an updater function like `setNumber(n => n + 1)`.

# Citations

[1] [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
