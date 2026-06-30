---
type: API Reference
title: <style>
description: The built-in browser style component for inline CSS, with React's head-hoisting, precedence ordering, and deduplication by href.
resource: https://react.dev/reference/react-dom/components/style
tags: [react, react-dom, stylesheets, css, head]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

Adds inline CSS. In certain cases React hoists the element to the document `<head>` and deduplicates identical styles.

```jsx
<style>{`p { color: red; }`}</style>
```

## Props

`<style>` supports all [common element props](/reference/react-dom/components/common.md).

- `children`: A string, required. The contents of the stylesheet.
- `precedence`: A string. Ranks the `<style>` in the `<head>`; earlier-discovered values rank lower, later ones higher, and higher can override lower. Same-precedence stylesheets group together whether `<link>`, `<style>`, or loaded via [preinit](/reference/react-dom/apis/preinit.md).
- `href`: A string. Lets React deduplicate styles with the same `href`.
- `media`: A media query restricting the stylesheet.
- `nonce`: A cryptographic nonce for strict CSP.
- `title`: Names an alternative stylesheet.

Not recommended: `blocking` (use Suspense for finer control).

## Special rendering behavior

React can move `<style>` to the `<head>`, deduplicate identical stylesheets, and [suspend](/reference/react/components/Suspense.md) while loading. To opt in, provide `href` and `precedence`. React deduplicates styles with the same `href`.

# Usage

Render an inline stylesheet within a component that depends on it. Give it a unique `href` (for deduplication) and a `precedence` (for ordering). Inline stylesheets do not trigger Suspense boundaries while loading, even if they load async resources like fonts.

```jsx
<style href={"PieChart-" + JSON.stringify(colors)} precedence="medium">
  {stylesheet}
</style>
```

# Caveats

- With the special treatment, React ignores prop changes after render (warns in development).
- When using `precedence`, React drops all extraneous props beyond `href` and `precedence`.
- React may leave the style in the DOM after the rendering component unmounts.

# Citations

[1] [<style>](https://react.dev/reference/react-dom/components/style)
