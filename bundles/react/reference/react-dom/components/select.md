---
type: API Reference
title: <select>
description: The built-in browser select component, covering controlled vs uncontrolled select boxes, multiple selection, and reading values on submit.
resource: https://react.dev/reference/react-dom/components/select
tags: [react, react-dom, forms, controlled-components, select]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```jsx
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

## Props

`<select>` supports all [common element props](/reference/react-dom/components/common.md).

### Making it controlled

- `value`: A string (or array of strings when `multiple={true}`). Controls which option is selected; each value must match an `<option>`'s `value`. Requires an `onChange` handler.

### Uncontrolled initial value

- `defaultValue`: A string (or array for `multiple={true}`). The initially selected option(s).

### Other props (controlled or uncontrolled)

- `children`: Accepts [<option>](/reference/react-dom/components/option.md), `<optgroup>`, and `<datalist>`, or your own components that render them. Each rendered `<option>` must have a `value`.
- `multiple`: A boolean. Enables multiple selection.
- Form behavior: `name`, `form`, `disabled`, `required`, `autoComplete`, `autoFocus`, `size` (preferred visible item count for multiple selects).
- Events: `onChange` (required for controlled; fires when the user picks an option), `onInput` (use `onChange` instead), `onInvalid` (bubbles in React), plus their `Capture` variants.

# Usage

- Label a select by nesting it in a `<label>`, or link with matching `id` and `htmlFor` (use [useId](/reference/react/hooks/useId.md)).
- Set the initial selection with `defaultValue` on the `<select>` (not `selected` on an option). For `multiple`, pass an array.
- Enable multiple selection with `multiple={true}`.
- Read values on submit: `e.preventDefault()` in `onSubmit`, then `new FormData(e.target)`. Multiple selects appear as separate name-value pairs, not in `Object.fromEntries`.
- Control a select with state: pass `value` plus an `onChange` that calls `setState(e.target.value)`. For multiple, map `e.target.selectedOptions` to their values.

```jsx
<select value={selectedFruit} onChange={e => setSelectedFruit(e.target.value)}>
  <option value="apple">Apple</option>
</select>
```

# Caveats

- The `selected` attribute on `<option>` is not supported. Use `defaultValue` (uncontrolled) or `value` (controlled) on the `<select>`.
- A `value` prop makes the select controlled.
- A select cannot be both controlled and uncontrolled, and cannot switch between them over its lifetime.
- Every controlled select needs an `onChange` that synchronously updates its backing value.

# Citations

[1] [<select>](https://react.dev/reference/react-dom/components/select)
