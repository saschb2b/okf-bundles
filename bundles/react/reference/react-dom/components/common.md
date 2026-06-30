---
type: API Reference
title: Common components (e.g. <div>)
description: The shared props, events, ref callbacks, and the React event object supported by every built-in browser component.
resource: https://react.dev/reference/react-dom/components/common
tags: [react, react-dom, dom, events, props]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

All built-in browser components (`<div>`, `<span>`, `<img>`, and the rest) accept a shared set of props and events, plus a few React-specific extras.

```jsx
<div className="wrapper">Some content</div>
```

## Special React props

These props exist only in React, not in plain HTML:

- `children`: A React node (element, string, number, portal, `null`, `undefined`, boolean, or an array). The content inside the component, usually written as nested JSX.
- `dangerouslySetInnerHTML`: An object `{ __html: '<p>...</p>' }`. Overrides `innerHTML`. Dangerous: untrusted HTML opens an XSS hole. See the usage section below.
- `ref`: A ref object from [useRef](/reference/react/hooks/useRef.md) or [createRef](/reference/react/legacy/createRef.md), a ref callback function, or a legacy string ref. Filled with the DOM element.
- `suppressContentEditableWarning`: A boolean. Silences the warning when an element has both `children` and `contentEditable={true}`.
- `suppressHydrationWarning`: A boolean. Silences server/client mismatch warnings one level deep. An escape hatch for unavoidable cases like timestamps.
- `style`: An object of CSS styles in camelCase, for example `{ fontWeight: 'bold', margin: 20 }`. Numbers get `px` appended unless the property is unitless. Prefer `className` for static styles.

## Standard DOM props

All built-in components also accept the standard DOM attributes, using DOM property names where they differ from HTML. Notable ones:

- `className` (HTML `class`) and `htmlFor` (HTML `for`) use the DOM names.
- Accessibility: `aria-*` (names identical to HTML), `role`.
- Identity and structure: `id` (generate with [useId](/reference/react/hooks/useId.md) to avoid clashes), `is`, `slot`, `itemProp`.
- Text and input behavior: `autoCapitalize`, `contentEditable`, `dir`, `enterKeyHint`, `inputMode`, `lang`, `spellCheck`, `translate`.
- Interaction: `accessKey`, `draggable`, `hidden`, `tabIndex`, `title`.
- `data-*` attributes attach arbitrary string data.

## Custom attributes

Any custom prop (for example `mycustomprop="value"`) is passed through as an attribute. The name must be lowercase and not start with `on`. The value is stringified. `null` or `undefined` removes the attribute. Useful when integrating third-party libraries.

## Event handler props

Every built-in component accepts event handler props. Each has a capture-phase variant with the `Capture` suffix (for example `onClickCapture`). The groups:

| Group | Representative handlers |
| --- | --- |
| Mouse | `onClick`, `onAuxClick`, `onDoubleClick`, `onMouseDown/Up/Enter/Leave/Move/Over/Out` |
| Pointer | `onPointerDown/Up/Enter/Leave/Move/Cancel/Out`, `onGotPointerCapture`, `onLostPointerCapture` |
| Touch | `onTouchStart/End/Move/Cancel` |
| Keyboard | `onKeyDown`, `onKeyUp`, `onKeyPress` (deprecated) |
| Focus | `onFocus`, `onBlur` (both bubble in React, unlike the DOM) |
| Input and change | `onBeforeInput`, `onSelect` (React extends `onSelect` to `contentEditable` and empty selections) |
| Clipboard | `onCopy`, `onCut`, `onPaste` |
| Composition (IME) | `onCompositionStart/End/Update` |
| Drag | `onDrag`, `onDragStart/End/Enter/Over/Leave/Drop` (call `e.preventDefault()` in `onDragOver` to allow drop) |
| Scroll and wheel | `onScroll` (does not bubble), `onWheel` |
| Context menu | `onContextMenu` |
| Animation | `onAnimationStart/End/Iteration` |
| Transition | `onTransitionEnd` |
| Form-specific (`<form>` only) | `onReset`, `onSubmit` |
| Dialog-specific (`<dialog>` only) | `onCancel`, `onClose` (bubble in React) |
| Details-specific (`<details>` only) | `onToggle` (bubbles in React) |
| Resource (`<img>`, `<iframe>`, `<link>`, etc.) | `onLoad`, `onError` (bubble in React) |
| Media (`<audio>`, `<video>`) | `onPlay`, `onPause`, `onEnded`, `onTimeUpdate`, `onVolumeChange`, `onWaiting`, and many more (all bubble in React) |

## The React event object

Handlers receive a React event object (a "synthetic event") that mirrors the standard DOM `Event` but smooths over browser inconsistencies.

```jsx
<button onClick={e => console.log(e)} />
```

- Standard properties: `bubbles`, `cancelable`, `currentTarget`, `defaultPrevented`, `eventPhase`, `isTrusted`, `target`, `timeStamp`.
- React extra: `nativeEvent`, the original browser event. Some React events do not map directly (in `onMouseLeave`, `e.nativeEvent` is a `mouseout`).
- Methods: `preventDefault()`, `stopPropagation()`, plus React extras `isDefaultPrevented()`, `isPropagationStopped()`, `persist()`, `isPersistent()` (the last two are React Native only).

Typed handler variants carry the event's extra fields: `MouseEvent` (clientX/Y, button, modifier keys), `KeyboardEvent` (key, code, repeat), `PointerEvent` (pointerId, pressure, tiltX/Y), `TouchEvent` (touches, changedTouches), `WheelEvent` (deltaX/Y/Z), `FocusEvent` (relatedTarget), `DragEvent` (dataTransfer), `ClipboardEvent` (clipboardData), `CompositionEvent` (data), `AnimationEvent` (animationName, elapsedTime), `TransitionEvent` (propertyName), `InputEvent` (data), `UIEvent` (detail, view).

## The ref callback function

Instead of a ref object, you can pass a function to `ref`. React calls it with the DOM node on attach, and calls the returned cleanup function on detach.

```jsx
<div ref={(node) => {
  console.log('Attached', node);
  return () => console.log('Clean up', node);
}} />
```

- React 19 added cleanup functions. For backward compatibility, if you return nothing, React calls the callback again with `null` on detach (this fallback will be removed in a future version).
- A new callback function on every render is detached (previous called with `null` or its cleanup) and re-attached each render. Pass a stable function to avoid this.
- In Strict Mode, React runs an extra dev-only setup plus cleanup cycle before the first real setup.

# Usage

- Apply CSS with `className` (static) and `style` (dynamic, when values come from JS). Build conditional class strings yourself, or with a helper like `classnames`.
- Manipulate a DOM node: declare a ref with [useRef](/reference/react/hooks/useRef.md), pass it as `ref`, and read `ref.current` after render to call methods like `focus()`.
- Set raw HTML with `dangerouslySetInnerHTML={{ __html: markup }}`. Only ever with trusted, sanitized data, since arbitrary HTML can run scripts (XSS).
- Handle mouse, pointer, focus, and keyboard events with the corresponding `on*` props. Focus events bubble in React, so use `e.currentTarget`, `e.target`, and `e.relatedTarget` to tell parent from child focus.

# Caveats

- You cannot pass both `children` and `dangerouslySetInnerHTML` on the same element.
- Some events (`onAbort`, `onLoad`) do not bubble in the browser but do bubble in React.
- `e.currentTarget`, `eventPhase`, `target`, and `type` reflect your React tree, not React's internal root-level delegation. For polyfilled events `e.type` may differ from `e.nativeEvent.type`.

# Citations

[1] [Common components (e.g. <div>)](https://react.dev/reference/react-dom/components/common)
