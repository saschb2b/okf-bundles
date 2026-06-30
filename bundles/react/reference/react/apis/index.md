# React APIs

- [act](act.md) - Test helper that applies pending React updates before you make assertions.
- [addTransitionType](addTransitionType.md) - Specifies the cause of a transition so animations can be customized by type.
- [cache](cache.md) - Caches the result of a data fetch or computation, for use in React Server Components.
- [cacheSignal](cacheSignal.md) - Returns an AbortSignal that aborts when the cache() lifetime ends, for cancelling in-flight work.
- [captureOwnerStack](captureOwnerStack.md) - Reads the current Owner Stack in development and returns it as a string for debugging.
- [createContext](createContext.md) - Creates a context that components can provide or read to pass data deep without prop drilling.
- [lazy](lazy.md) - Defers loading a component's code until it is rendered for the first time.
- [memo](memo.md) - Skips re-rendering a component when its props are unchanged.
- [startTransition](startTransition.md) - Marks a state update as a Transition so part of the UI renders in the background without blocking.
- [use](use.md) - Reads the value of a Promise or context, callable inside loops and conditionals.
- [experimental_taintObjectReference](experimental_taintObjectReference.md) - Prevents a specific object instance from being passed to a Client Component.
- [experimental_taintUniqueValue](experimental_taintUniqueValue.md) - Prevents unique values like passwords, keys, or tokens from being passed to Client Components.
