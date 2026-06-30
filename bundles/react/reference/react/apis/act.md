---
type: API Reference
title: act
description: A test helper that applies pending React updates before you make assertions.
resource: https://react.dev/reference/react/act
tags: [react, testing, act, assertions]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`act` is a test helper that ensures all updates tied to a "unit" of interaction (render, user event, data fetch) are processed and applied to the DOM before you assert. The name comes from the Arrange-Act-Assert pattern.

```js
await act(async actFn)
```

Use `act` with `await` and an `async` function. The sync version works in many cases but not all, and React plans to deprecate and remove it. Libraries like React Testing Library wrap their helpers in `act` for you, reducing boilerplate.

## Parameters

- `async actFn`: An async function wrapping the renders or interactions under test. Any updates triggered inside `actFn` are added to an internal act queue, then flushed together to apply changes to the DOM. Because it is async, React also runs code crossing an async boundary and flushes any scheduled updates.

## Returns

`act` does not return anything.

# Usage

- Render a component in a test by wrapping the render in `act()`, so the component and its effects are applied before assertions.

```js
import {act} from 'react';
import ReactDOMClient from 'react-dom/client';

await act(() => {
  ReactDOMClient.createRoot(container).render(<Counter />);
});
expect(container.querySelector('p').textContent).toBe('You clicked 0 times');
```

- Dispatch events in a test by wrapping the dispatch in a second `act()`, so updates from the event are applied before assertions.

```js
await act(async () => {
  button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});
```

- Dispatching DOM events only works when the container is attached to the document with `document.body.appendChild(container)`.

# Caveats

- `act` requires `global.IS_REACT_ACT_ENVIRONMENT = true` in your test environment. Without it you get the error "The current testing environment is not configured to support act(...)". Frameworks like React Testing Library set this flag for you.

# Citations
[1] [act](https://react.dev/reference/react/act)
