# React Hooks lints

The individual lint rules shipped by `eslint-plugin-react-hooks`. Each flags one anti-pattern that violates the Rules of React or breaks memoization.

- [component-hook-factories](component-hook-factories.md) - Flags higher-order functions that define nested components or Hooks instead of declaring them at the module level.
- [config](config.md) - Validates React Compiler configuration options so typos or wrong value types fail loudly.
- [error-boundaries](error-boundaries.md) - Flags try/catch used to handle rendering errors that only Error Boundaries can catch.
- [exhaustive-deps](exhaustive-deps.md) - Validates that Hook dependency arrays contain every value the Hook references.
- [gating](gating.md) - Validates the React Compiler gating-mode configuration used to adopt the compiler incrementally.
- [globals](globals.md) - Flags assignment to or mutation of global variables during render.
- [immutability](immutability.md) - Flags direct mutation of props, state, and other immutable values.
- [incompatible-library](incompatible-library.md) - Flags library APIs that are incompatible with manual or automatic memoization.
- [preserve-manual-memoization](preserve-manual-memoization.md) - Flags incomplete dependencies in manual memoization that block React Compiler.
- [purity](purity.md) - Flags calls to known-impure functions during render, such as Math.random and Date.now.
- [refs](refs.md) - Flags reading or writing ref.current during render.
- [rules-of-hooks](rules-of-hooks.md) - Validates that Hooks are called only at the top level of React functions.
- [set-state-in-effect](set-state-in-effect.md) - Flags synchronous setState inside effects that cause an avoidable extra render.
- [set-state-in-render](set-state-in-render.md) - Flags unconditional setState during render, which can cause infinite loops.
- [static-components](static-components.md) - Flags components defined inside other components, which reset state every render.
- [unsupported-syntax](unsupported-syntax.md) - Flags syntax React Compiler cannot statically analyze, such as eval and with.
- [use-memo](use-memo.md) - Flags useMemo callbacks with no return value.
