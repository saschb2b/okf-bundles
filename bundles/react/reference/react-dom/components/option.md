---
type: API Reference
title: <option>
description: The built-in browser option component for rendering a selectable option inside a select box.
resource: https://react.dev/reference/react-dom/components/option
tags: [react, react-dom, forms, select, option]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Renders an option inside a [<select>](/reference/react-dom/components/select.md) box.

```jsx
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

## Props

`<option>` supports all [common element props](/reference/react-dom/components/common.md). Additionally:

- `value`: The value submitted with the parent `<select>` in a form when this option is selected.
- `disabled`: A boolean. If `true`, the option is not selectable and appears dimmed.
- `label`: A string. The displayed meaning of the option. Defaults to the text inside the option.

# Usage

Render a `<select>` containing `<option>` components, each with a `value` representing the data submitted with the form.

```jsx
<select name="selectedFruit">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</select>
```

# Caveats

- React does not support the `selected` attribute on `<option>`. Set the initial selection on the parent instead: `<select defaultValue>` for uncontrolled, or `<select value>` for controlled (see [<select>](/reference/react-dom/components/select.md)).

# Citations

[1] [<option>](https://react.dev/reference/react-dom/components/option)
