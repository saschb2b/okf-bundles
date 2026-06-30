# React Hooks

Built-in Hooks let function components use state, effects, context, refs, and other React features. Hooks can only be called at the top level of components or custom Hooks (see [Rules of Hooks](/reference/rules/rules-of-hooks.md)).

## State Hooks

- [useState](useState.md) - Declare a state variable you can update directly.
- [useReducer](useReducer.md) - Declare state with update logic moved into a reducer function.

## Context Hooks

- [useContext](useContext.md) - Read and subscribe to a context from a parent provider.

## Ref Hooks

- [useRef](useRef.md) - Hold a mutable value that is not used for rendering, often a DOM node.
- [useImperativeHandle](useImperativeHandle.md) - Customize the handle exposed by a ref.

## Effect Hooks

- [useEffect](useEffect.md) - Synchronize a component with an external system.
- [useLayoutEffect](useLayoutEffect.md) - Fire before the browser repaints, to measure layout.
- [useInsertionEffect](useInsertionEffect.md) - Inject styles before layout effects fire (for CSS-in-JS libraries).

## Performance Hooks

- [useMemo](useMemo.md) - Cache the result of an expensive calculation.
- [useCallback](useCallback.md) - Cache a function definition between re-renders.
- [useTransition](useTransition.md) - Mark a state update as a non-blocking Transition.
- [useDeferredValue](useDeferredValue.md) - Defer updating a part of the UI to keep it responsive.

## Other Hooks

- [useActionState](useActionState.md) - Manage state driven by a form action.
- [useOptimistic](useOptimistic.md) - Show an optimistic state while an async action is pending.
- [useDebugValue](useDebugValue.md) - Add a label to a custom Hook in React DevTools.
- [useId](useId.md) - Generate a unique, stable ID for accessibility attributes.
- [useSyncExternalStore](useSyncExternalStore.md) - Subscribe to an external store.
- [useEffectEvent](useEffectEvent.md) - Extract non-reactive logic out of an Effect into an Effect Event.
