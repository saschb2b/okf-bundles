---
type: API Reference
title: PureComponent
description: Legacy base class like Component that skips re-renders when props and state are unchanged via a shallow comparison. Class components are not recommended in new code; prefer a function component wrapped in memo.
resource: https://react.dev/reference/react/PureComponent
tags: [react, legacy, class-components, performance, api]
timestamp: 2026-06-30T12:00:00Z
---

# Legacy notice

`PureComponent` is a legacy base class. Class components are still supported but not recommended in new code. Prefer defining components as functions and, where you need the same optimization, wrapping them in [memo](/reference/react/apis/memo.md). A migration section is below.

# Reference

`PureComponent` is like [Component](/reference/react/legacy/Component.md) but skips re-renders when the new props and state are the same as the old ones. Extend it instead of `Component`.

```js
import { PureComponent } from 'react';

class Greeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

`PureComponent` is a subclass of `Component` and supports all the `Component` APIs. Extending it is equivalent to defining a `shouldComponentUpdate` that shallowly compares props and state.

# Usage

- Skip unnecessary re-renders for a class component. React normally re-renders a component when its parent re-renders. Extending `PureComponent` lets React skip the re-render as long as the new props and state are shallowly equal to the old ones. For example, a `Greeting` that receives only `name` re-renders when `name` changes but not when an unrelated `address` state changes.

# Caveats

- The component must have pure rendering logic: same output for the same props, state, and context. `PureComponent` asserts this on your behalf.
- It still re-renders when a context it consumes changes, even if props and state are unchanged.
- The comparison is shallow; it does not deeply compare nested objects or arrays.

# Alternatives

- Migrate to a function component wrapped in `memo`. Convert the class to a function (see [Component](/reference/react/legacy/Component.md) migration), then wrap it in [memo](/reference/react/apis/memo.md).

```jsx
import { memo } from 'react';

const Greeting = memo(function Greeting({ name }) {
  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

- Unlike `PureComponent`, `memo` does not compare state. In function components, calling a [useState](/reference/react/hooks/useState.md) setter with the same value already prevents re-renders by default, even without `memo`.

# Citations
[1] [PureComponent](https://react.dev/reference/react/PureComponent)
