---
type: API Reference
title: <title>
description: The built-in browser title component for the document title, which React always hoists into the document head.
resource: https://react.dev/reference/react-dom/components/title
tags: [react, react-dom, metadata, seo, head]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Specifies the document title. Rendered from any component, React always places it in the document `<head>`.

```jsx
<title>My Blog</title>
```

## Props

`<title>` supports all [common element props](/reference/react-dom/components/common.md).

- `children`: Text only. Becomes the document title. Custom components are allowed as long as they render only text.

## Special rendering behavior

React always places the `<title>` element in the document `<head>`, regardless of where it is rendered. Two exceptions:

- Inside an `<svg>`, where it is an accessibility annotation for the graphic, not the document title.
- With an `itemProp` prop, where it is metadata about a page item, not the document title.

# Usage

- Set the document title by rendering `<title>` with text children from any component.
- Use variables via string interpolation, not multiple JSX children.

```jsx
<title>{`Results page ${pageNumber}`}</title>
```

`<title>Results page {pageNumber}</title>` is wrong: it passes a two-element array as children and errors.

# Caveats

- Render only one `<title>` at a time. If several render simultaneously, React puts them all in `<head>` and the behavior of browsers and search engines is undefined.

# Citations

[1] [<title>](https://react.dev/reference/react-dom/components/title)
