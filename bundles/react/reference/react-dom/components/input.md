---
type: API Reference
title: <input>
description: The built-in browser input component, covering controlled vs uncontrolled inputs, value/checked/onChange, and the full prop list.
resource: https://react.dev/reference/react-dom/components/input
tags: [react, react-dom, forms, controlled-components, input]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```jsx
<input name="myInput" />
```

## Props

`<input>` supports all [common element props](/reference/react-dom/components/common.md).

### Making it controlled

Pass one of these (then an `onChange` is required):

- `value`: A string. For a text input, controls its text. For a radio button, specifies its form data.
- `checked`: A boolean. For a checkbox or radio, controls whether it is selected.

### Uncontrolled initial values

- `defaultValue`: A string. Initial value for a text input.
- `defaultChecked`: A boolean. Initial state for checkbox and radio.

### General props (controlled or uncontrolled)

- Form behavior: `name`, `form`, `disabled`, `readOnly`, `required`, `autoComplete`, `autoFocus`.
- Form-action overrides (for `type="submit"` and `type="image"`): `formAction` (see [<form>](/reference/react-dom/components/form.md)), `formEnctype`, `formMethod`, `formNoValidate`, `formTarget`.
- Validation and constraints: `pattern`, `min`, `max`, `minLength`, `maxLength`, `step`, `multiple`.
- Type-specific: `type` (text, checkbox, radio, file, image, number, email, etc.), `accept` and `capture` (file), `alt`, `src`, `height`, `width` (image), `list` (datalist id), `placeholder`, `size`, `dirname`.
- Events: `onChange` (required for controlled; fires on every keystroke), `onInput` (idiomatically use `onChange` instead), `onInvalid` (bubbles in React), `onSelect` (React extends it to empty selections and edits), plus their `Capture` variants.
- `children`: `<input>` does not accept children.

# Usage

- Different input types: render `<input />` (text by default), or pass `type="checkbox"`, `type="radio"`, etc.
- Label an input by nesting it in a `<label>`, or link with matching `id` and `htmlFor` (generate the id with [useId](/reference/react/hooks/useId.md)).
- Provide initial values with `defaultValue` (text) or `defaultChecked` (checkbox, radio).
- Read values on submit with an uncontrolled form: call `e.preventDefault()` in `onSubmit` and use `new FormData(e.target)`. Give each input a `name`.
- Control an input with state: pass `value` plus an `onChange` that calls `setState(e.target.value)`. For checkboxes read `e.target.checked`.

```jsx
<input value={firstName} onChange={e => setFirstName(e.target.value)} />
```

- Optimize re-rendering on every keystroke: move the input and its state into its own component, or use [useDeferredValue](/reference/react/hooks/useDeferredValue.md) when other UI depends on the value.

# Caveats

- Checkboxes need `checked` / `defaultChecked`, not `value` / `defaultValue`.
- A string `value` (or boolean `checked`) makes the input controlled.
- An input cannot be both controlled and uncontrolled, and cannot switch between them over its lifetime.
- Every controlled input needs an `onChange` that synchronously updates its backing value.
- The controlled `value` must always be a string (use `value={someValue ?? ''}`), never `null` or `undefined`.

# Troubleshooting

- Input does not update when typing: you passed `value` without `onChange`. Add `onChange`, switch to `defaultValue`, or set `readOnly`.
- Checkbox does not update on click: same cause; read `e.target.checked` (not `value`) in the handler.
- Caret jumps to the start: update state synchronously to exactly `e.target.value`, never transformed (`.toUpperCase()`) or async (`setTimeout`).
- "Changing an uncontrolled input to be controlled": keep `value` a string the whole lifetime; initialize state to `''` rather than `null`/`undefined`.

# Citations

[1] [<input>](https://react.dev/reference/react-dom/components/input)
