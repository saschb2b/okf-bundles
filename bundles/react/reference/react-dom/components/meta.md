---
type: API Reference
title: <meta>
description: The built-in browser meta component for document metadata, which React always hoists into the document head.
resource: https://react.dev/reference/react-dom/components/meta
tags: [react, react-dom, metadata, seo, head]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Adds metadata to the document. Rendered from any component, React always places it in the document `<head>`.

```jsx
<meta name="keywords" content="React, JavaScript, html" />
```

## Props

`<meta>` supports all [common element props](/reference/react-dom/components/common.md).

It should have exactly one of `name`, `httpEquiv`, `charset`, or `itemProp`, which determines what it does:

- `name`: The kind of document metadata.
- `charset`: The character set. The only valid value is `"utf-8"`.
- `httpEquiv`: A processing directive.
- `itemProp`: Metadata about a particular item within the document rather than the whole document.
- `content`: The metadata value (with `name` or `itemProp`) or directive behavior (with `httpEquiv`).

## Special rendering behavior

React always places the `<meta>` element in the document `<head>`, regardless of where it is rendered. The one exception: with an `itemProp` prop it is placed inline like any other component, since it then describes a page item, not the document.

# Usage

- Annotate the document with metadata (keywords, description, author); React hoists each `<meta>` to `<head>`.
- Annotate a specific page item with the `itemProp` prop (not hoisted to `<head>`).

```jsx
<meta name="author" content="John Smith" />
<meta name="description" content="A site map for the React website" />
```

# Citations

[1] [<meta>](https://react.dev/reference/react-dom/components/meta)
