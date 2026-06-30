---
type: API Reference
title: <progress>
description: The built-in browser progress component for rendering determinate or indeterminate progress indicators.
resource: https://react.dev/reference/react-dom/components/progress
tags: [react, react-dom, progress, ui]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

```jsx
<progress value={0.5} />
```

## Props

`<progress>` supports all [common element props](/reference/react-dom/components/common.md). Additionally:

- `value`: A number between `0` and `max`, or `null` for indeterminate progress. How much is done.
- `max`: A number. The maximum `value`. Defaults to `1`.

# Usage

Pass a `value` between `0` and `max`. Omit `max` to default it to `1`. Pass `value={null}` for an indeterminate state when the duration is unknown.

```jsx
<progress value={0.7} />          {/* determinate */}
<progress value={75} max={100} /> {/* determinate, explicit max */}
<progress value={null} />         {/* indeterminate */}
```

# Citations

[1] [<progress>](https://react.dev/reference/react-dom/components/progress)
