---
type: Lint Rule
title: refs
description: Flags reading or writing ref.current during render, which produces stale or uninitialized values.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/refs
tags: [react, eslint, lint, refs, render]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Reading or writing `ref.current` during render. Refs hold values that are not used for rendering, and changing a ref does not trigger a re-render. Touching `ref.current` during render breaks React's expectations: the ref may not be initialized yet, and its value can be stale or inconsistent.

# How refs are detected

A value is inferred as a ref when it is:

- Returned from `useRef()` or `React.createRef()`, for example `const scrollRef = useRef(null)`.
- An identifier named `ref` or ending in `Ref` that reads from or writes to `.current`, for example `buttonRef.current = node`.
- Passed through a JSX `ref` prop, for example `<input ref={inputRef} />`.

Once a value is marked as a ref, the inference follows it through assignments, destructuring, and helper calls.

# Examples

Invalid:

```js
// Reading ref during render
const value = ref.current;

// Modifying ref during render
ref.current = value;
```

Valid:

```js
// Read refs in effects or handlers
useEffect(() => {
  if (ref.current) console.log(ref.current.offsetWidth);
});

// Lazy initialization is allowed
if (ref.current === null) {
  ref.current = expensiveComputation();
}
```

For UI values that should drive rendering, use state instead of a ref.

# Troubleshooting

If the lint flags a plain object that happens to have a `.current` property, the name heuristic is treating `ref.current` or `fooRef.current` as a real ref. Rename the variable (for example `box`) so the compiler stops inferring it as a ref, or move the mutable value into state.

# Related

See [Referencing Values with Refs](/escape-hatches/referencing-values-with-refs.md) and [useRef](/reference/react/hooks/useRef.md) for why a ref must not be read or written during render.

# Citations

[1] [refs](https://react.dev/reference/eslint-plugin-react-hooks/lints/refs)
