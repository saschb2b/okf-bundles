---
type: API Reference
title: <textarea>
description: The built-in browser textarea component for multiline text input, covering controlled vs uncontrolled usage and why children are not used.
resource: https://react.dev/reference/react-dom/components/textarea
tags: [react, react-dom, forms, controlled-components, textarea]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```jsx
<textarea name="postContent" />
```

## Props

`<textarea>` supports all [common element props](/reference/react-dom/components/common.md).

### Making it controlled

- `value`: A string. Controls the text inside. Requires an `onChange` handler.

### Uncontrolled initial value

- `defaultValue`: A string. The initial value. (Unlike HTML, text between tags like `<textarea>...</textarea>` is not supported.)

### Other props (controlled or uncontrolled)

- `children`: Not accepted. Use `defaultValue` for initial content.
- Size: `rows` (default `2`), `cols` (default `20`), `wrap` (`'hard'`, `'soft'`, `'off'`).
- Form behavior: `name`, `form`, `disabled`, `readOnly`, `required`, `autoComplete`, `autoFocus`, `placeholder`, `minLength`, `maxLength`.
- Events: `onChange` (required for controlled; fires on every keystroke), `onInput` (use `onChange` instead), `onInvalid` (bubbles in React), `onSelect`, plus their `Capture` variants.

# Usage

- Display a text area with `<textarea rows={4} cols={40} />`. Disable resizing with CSS `resize: none`.
- Label it by nesting in a `<label>`, or link with matching `id` and `htmlFor` (use [useId](/reference/react/hooks/useId.md)).
- Provide initial content with `defaultValue`.
- Read the value on submit: `e.preventDefault()` in `onSubmit`, then `new FormData(e.target)`. Give it a `name`.
- Control it with state: pass `value` plus an `onChange` calling `setState(e.target.value)`.

```jsx
<textarea value={postContent} onChange={e => setPostContent(e.target.value)} />
```

# Caveats

- Children (`<textarea>something</textarea>`) are not allowed; use `defaultValue`.
- A string `value` makes the text area controlled.
- A text area cannot be both controlled and uncontrolled, and cannot switch between them over its lifetime.
- Every controlled text area needs an `onChange` that synchronously updates its backing value.

# Troubleshooting

- Does not update when typing: you passed `value` without `onChange`. Add `onChange`, switch to `defaultValue`, or set `readOnly`.
- Caret jumps to the start: update state synchronously to exactly `e.target.value`, never transformed or async.
- "Changing an uncontrolled input to be controlled": keep `value` a string the whole lifetime; use `value={someValue ?? ''}`.

# Citations

[1] [<textarea>](https://react.dev/reference/react-dom/components/textarea)
