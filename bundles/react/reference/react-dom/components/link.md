---
type: API Reference
title: <link>
description: The built-in browser link component for external resources and document metadata, with React's head-hoisting, stylesheet precedence, deduplication, and Suspense behavior.
resource: https://react.dev/reference/react-dom/components/link
tags: [react, react-dom, metadata, stylesheets, resources]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Renders a link to external resources (stylesheets, fonts, icons) or annotates the document. Rendered from any component, React usually hoists it into the document `<head>`.

```jsx
<link rel="icon" href="favicon.ico" />
```

## Props

`<link>` supports all [common element props](/reference/react-dom/components/common.md).

- `rel`: A string, required. The [relationship](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). React treats `rel="stylesheet"` specially.
- Always applicable: `href`, `crossOrigin` (required when `as="fetch"`), `referrerPolicy`, `fetchPriority`, `hrefLang`, `integrity`, `type`.

When `rel="stylesheet"`:

- `precedence`: A string. Ranks the stylesheet in the `<head>`; values discovered earlier rank lower, later values rank higher, and higher can override lower. Same-precedence stylesheets group together whether `<link>`, inline `<style>`, or loaded via [preinit](/reference/react-dom/apis/preinit.md).
- `media`: A media query restricting the stylesheet.
- `title`: Names an alternative stylesheet.

When `rel="preload"` or `rel="modulepreload"`: `as` (resource type), `imageSrcSet`, `imageSizes` (for `as="image"`).
When `rel="icon"` or `rel="apple-touch-icon"`: `sizes`.

Props that disable special stylesheet behavior: `disabled`, `onError`, `onLoad`.
Not recommended: `blocking` (use Suspense for finer control).

## Special rendering behavior

React places the `<link>` DOM element in the document `<head>` regardless of where it is rendered, except:

- A `rel="stylesheet"` link with no `precedence` gets no special behavior.
- A link with `itemProp` is placed inline (it annotates a page item, not the document).
- A link with `onLoad` or `onError` gets no special behavior (you manage loading manually).

## Special behavior for stylesheets

When `rel="stylesheet"` with `precedence`:

- The rendering component [suspends](/reference/react/components/Suspense.md) while the stylesheet loads.
- React deduplicates: multiple links with the same `href` produce one `<link>` in the DOM.
- No special behavior if `precedence` is missing, or if `onLoad`, `onError`, or `disabled` is supplied.

# Usage

- Link related resources (icon, canonical, pingback); React hoists them to `<head>`.
- Link a stylesheet with `precedence`; the component suspends while it loads. Calling [preinit](/reference/react-dom/apis/preinit.md) can start the fetch earlier.
- Control precedence by assigning `precedence` strings; React orders by discovery order.
- Deduplicated rendering: the same stylesheet rendered from multiple components yields a single `<link>`.
- Annotate page items with `itemProp` (these are not hoisted to `<head>`).

```jsx
<link rel="stylesheet" href="sitemap.css" precedence="medium" />
```

# Caveats

- React ignores prop changes after the link is rendered (warns in development).
- React may leave the link in the DOM after the rendering component unmounts.

# Citations

[1] [<link>](https://react.dev/reference/react-dom/components/link)
