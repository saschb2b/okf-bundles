---
type: Lint Rule
title: incompatible-library
description: Flags use of library APIs that are incompatible with memoization, whether manual or automatic via React Compiler.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
tags: [react, eslint, lint, compiler, memoization]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Usage of library APIs from a known list that are incompatible with memoization. These APIs rely on patterns React does not support, so React Compiler automatically skips components that use them to avoid breaking the app. The known list lives in React Compiler's `DefaultModuleTypeProvider.ts`.

If a value breaks with a manual `useMemo`, it also breaks the compiler's automatic optimization, since the compiler memoizes following the Rules of React. This rule surfaces those patterns early.

```js
function Form() {
  const { watch } = useForm();
  // This value will never update, even when the 'name' field changes
  const name = useMemo(() => watch('name'), [watch]);
  return <div>Name: {name}</div>; // UI appears frozen
}
```

# Why these patterns break

The core problem is "interior mutability": an object or function keeps hidden state that changes over time even though its reference stays the same. React only checks whether you handed it a different reference, not what is inside, so memoization silently goes stale. When designing an API, ask whether `useMemo` would break it. Prefer returning immutable state with explicit update functions.

# Examples

Invalid:

```js
// react-hook-form `watch` uses interior mutability
const value = watch('field');

// TanStack Table instance uses interior mutability
const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

// MobX `observer` also breaks memoization (the linter does not yet detect it)
const Component = observer(() => { /* ... */ });
```

Valid:

```js
// For react-hook-form, use `useWatch`
function Component() {
  const { register, control } = useForm();
  const watchedValue = useWatch({ control, name: 'field' });
  return (
    <>
      <input {...register('field')} />
      <div>Current value: {watchedValue}</div>
    </>
  );
}
```

# Notes

The React team is migrating these libraries to patterns that follow the Rules of React. MobX is not yet auto-detected, so if your app breaks with React Compiler you may need the `"use no memo"` directive. If a problematic API is not skipped automatically, file an issue on the React repository so it can be added to the list.

# Related

The compiler's promise to honor your existing memoization is covered by [preserve-manual-memoization](preserve-manual-memoization.md).

# Citations

[1] [incompatible-library](https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library)
