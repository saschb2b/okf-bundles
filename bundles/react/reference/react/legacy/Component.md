---
type: API Reference
title: Component
description: Legacy base class for class components. Class components are still supported but not recommended in new code. Prefer function components with Hooks (useState, useEffect, useContext).
resource: https://react.dev/reference/react/Component
tags: [react, legacy, class-components, lifecycle, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`Component` is the legacy base class for class components. Class components are still supported, but React does not recommend them in new code. Prefer function components with Hooks: use `useState` for state, `useEffect` for lifecycle, `useContext` for context, and `memo` or `useMemo` for performance. A migration section is at the end.

# Reference

Extend `Component` and define a `render` method. Only `render` is required.

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

## Instance properties

- `this.props`: the props passed to the component.
- `this.state`: component state, an object. Never mutate it directly; call `setState`.
- `this.context`: the context value, available when you set `static contextType`.

## `render()`

Required. Returns JSX or any valid React node (elements, strings, numbers, portals, `null`, `undefined`, `true`, `false`, or arrays of nodes). Must be pure: same output for the same props, state, and context, with no side effects. Not called if `shouldComponentUpdate` returns `false`. In Strict Mode (development) it runs twice and one result is discarded.

## `setState(nextState, callback?)`

Requests a state update and a re-render.

```js
this.setState({ name: e.target.value });
this.setState(prevState => ({ age: prevState.age + 1 }));
```

- `nextState`: an object to shallow-merge into state, or an updater function `prevState => partialState`.
- optional `callback`: runs after the update commits.
- Does not change state immediately; reading `this.state` right after still shows the old value. Updates can batch. Use the updater form when the next state depends on the previous.

## `forceUpdate(callback?)`

Forces a re-render, skipping `shouldComponentUpdate`. Avoid it; reading from props and state in `render` is preferred. Needing it usually signals a design problem.

# Lifecycle methods

- `constructor(props)`: runs before mount. Call `super(props)` first. The only place to assign `this.state` directly. Do not call `setState` or cause side effects here. Runs twice in Strict Mode (development), and runs on the server during server rendering.
- `componentDidMount()`: runs after the component is added to the screen. Good for data fetching, subscriptions, and DOM manipulation. In Strict Mode (development) React mounts, unmounts, then mounts again.
- `componentDidUpdate(prevProps, prevState, snapshot?)`: runs after a re-render, not on initial render. Wrap logic in conditions comparing previous and current props/state to avoid infinite loops.
- `componentWillUnmount()`: runs before removal from the screen. Mirror `componentDidMount` to cancel fetching and remove subscriptions.
- `getSnapshotBeforeUpdate(prevProps, prevState)`: runs right before the DOM is updated, to capture DOM info like scroll position. Its return value is passed to `componentDidUpdate` as `snapshot`.
- `shouldComponentUpdate(nextProps, nextState, nextContext)`: return `false` to skip a re-render. A performance optimization only; consider `PureComponent` instead. Do not use deep equality or `JSON.stringify`.
- `componentDidCatch(error, info)`: runs when a child throws during rendering, to log errors. `info.componentStack` holds the stack. Does not catch errors in event handlers, server rendering, the boundary itself, or async code.
- `static getDerivedStateFromError(error)`: runs when a child throws, returning state to show a fallback. Must be pure; for side effects also implement `componentDidCatch`.
- `static getDerivedStateFromProps(props, state)`: runs before every `render`, returning a state update or `null`. Has no access to the instance. Often there are simpler alternatives (side effects in `componentDidUpdate`, memoization, controlled or uncontrolled components).

## Deprecated lifecycle methods

- `UNSAFE_componentWillMount()`, `UNSAFE_componentWillReceiveProps(nextProps, nextContext)`, `UNSAFE_componentWillUpdate(nextProps, nextState)`. Do not use in new code. Move side effects to `componentDidMount` or `componentDidUpdate`, re-compute data with memoization, reset state with a `key` or by deriving with `static getDerivedStateFromProps`, and read DOM info with `getSnapshotBeforeUpdate`. The unprefixed `componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate` are deprecated; the `rename-unsafe-lifecycles` codemod updates them.

# Static properties

- `static contextType`: the single context the component reads via `this.context`. Equivalent to `useContext` in function components.
- `static defaultProps`: default values for undefined or missing props (but not `null` props).

# Error boundaries

A class implementing `static getDerivedStateFromError` and/or `componentDidCatch` is an error boundary.

```js
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { logErrorToMyService(error, info.componentStack); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
```

Error boundaries do not catch errors in event handlers, server side rendering, the boundary itself, or async code (except inside `startTransition`).

# Migration to function components

Prefer function components with Hooks. The mappings:

- `this.props` becomes the function parameter.
- `this.state` and `this.setState` become [useState](/reference/react/hooks/useState.md).
- `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` become a single [useEffect](/reference/react/hooks/useEffect.md) with a cleanup return.
- `static contextType` and `this.context` become [useContext](/reference/react/hooks/useContext.md).
- `shouldComponentUpdate` and `PureComponent` become [memo](/reference/react/apis/memo.md) or [useMemo](/reference/react/hooks/useMemo.md).

```jsx
// Class
class Greeting extends Component {
  render() { return <h1>Hello, {this.props.name}!</h1>; }
}
// Function
function Greeting({ name }) { return <h1>Hello, {name}!</h1>; }
```

The shallow-comparing subclass is [PureComponent](/reference/react/legacy/PureComponent.md). For refs in class components, see [createRef](/reference/react/legacy/createRef.md).

# Citations
[1] [Component](https://react.dev/reference/react/Component)
