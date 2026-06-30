# Legacy React APIs

These are legacy and deprecated React APIs. They are still supported but not recommended in new code. Each concept notes what to use instead.

- [Children](Children.md) - Legacy API for manipulating and transforming the children prop. Prefer exposing components, array props, or render props.
- [cloneElement](cloneElement.md) - Legacy API that clones an element with overridden props and children. Prefer render props, context, or a custom Hook.
- [Component](Component.md) - Legacy base class for class components. Prefer function components with Hooks (useState, useEffect, useContext).
- [createElement](createElement.md) - Legacy API that creates an element without JSX. Prefer writing JSX.
- [createRef](createRef.md) - Legacy API that creates a ref object for class components. Function components should use useRef.
- [forwardRef](forwardRef.md) - Legacy API that forwards a ref to a child. In React 19 pass ref as a prop; it will be deprecated.
- [isValidElement](isValidElement.md) - Legacy API that checks whether a value is a React element. Rarely needed.
- [PureComponent](PureComponent.md) - Legacy base class that skips re-renders on shallow-equal props and state. Prefer a function component wrapped in memo.
