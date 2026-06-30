---
type: Guide
title: Responding to Events
description: How to add event handlers to JSX, pass them as props, and control event propagation and default behavior.
resource: https://react.dev/learn/responding-to-events
tags: [react, events, event-handlers, propagation]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React lets you add event handlers to your JSX. Event handlers are your own functions triggered in response to interactions like clicking, hovering, and focusing form inputs. This guide covers writing handlers, passing handling logic from a parent, and how events propagate and how to stop them.

# Adding event handlers

To add a handler, define a function and pass it as a prop to the JSX tag. Handlers are usually defined inside the component and named `handle` followed by the event name.

```jsx
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }
  return <button onClick={handleClick}>Click me</button>;
}
```

Handlers can also be inline as a function expression or an arrow function. All forms are equivalent. Inline arrows are convenient for short functions.

```jsx
<button onClick={() => alert('You clicked me!')}>Click me</button>
```

# Pass, do not call

Functions passed to event handlers must be passed, not called.

- Correct: `<button onClick={handleClick}>` passes the function, called only on click.
- Incorrect: `<button onClick={handleClick()}>` calls it immediately during render.
- Correct inline: `<button onClick={() => alert('...')}>` wraps the call so it fires later.
- Incorrect inline: `<button onClick={alert('...')}>` fires on every render.

JavaScript inside JSX `{` and `}` executes right away, which is why the calling forms fire during rendering.

# Reading props and passing handlers as props

Handlers are declared inside a component, so they can read the component's props.

```jsx
function AlertButton({ message, children }) {
  return <button onClick={() => alert(message)}>{children}</button>;
}
```

A parent can specify a child's handler by passing it as a prop. Design system components often contain styling but not behavior, so the behavior is passed down.

```jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

# Naming event handler props

Built-in components like `<button>` only support browser event names like `onClick`. For your own components, name handler props anything you like. By convention, start with `on` followed by a capital letter (for example `onSmash`, `onPlayMovie`, `onUploadImage`). App-specific names give you flexibility to change how the handler is triggered later (click, keyboard shortcut, etc.).

# Event propagation

Handlers also catch events from children. An event bubbles or propagates up the tree, starting where it happened and going up. Clicking a button runs its `onClick` first, then the parent's `onClick`.

- All events propagate in React except `onScroll`, which only fires on the JSX tag it is attached to.

## Stopping propagation

Event handlers receive an event object (by convention `e`) as their only argument. Call `e.stopPropagation()` to prevent the event from reaching parent components.

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

## Capture phase events

Add `Capture` to the event name (for example `onClickCapture`) to catch all events on child elements even if they stop propagation. Each event runs in three phases: it travels down calling all capture handlers, runs the clicked element's `onClick`, then travels up calling all `onClick` handlers. Useful for routers or analytics, rarely needed in app code.

## Passing handlers as an alternative to propagation

A child handler can run code and then explicitly call an `onClick` prop from the parent. This makes the chain of execution easy to follow, unlike automatic propagation. Prefer it when propagation is hard to trace.

# Preventing default behavior

Some browser events have default behavior. A `<form>` submit reloads the page by default. Call `e.preventDefault()` on the event object to stop it.

```jsx
<form onSubmit={e => {
  e.preventDefault();
  alert('Submitting!');
}}>
```

Do not confuse the two: `e.stopPropagation()` stops handlers on tags above from firing, while `e.preventDefault()` prevents the default browser behavior for the few events that have it.

# Can event handlers have side effects?

Yes. Event handlers are the best place for side effects. Unlike rendering functions, handlers do not need to be pure, so they are the right place to change things in response to interaction. To change information, you first need to store it, which is done with state, covered in [State: A Component's Memory](state-a-components-memory.md) and the [useState](/reference/react/hooks/useState.md) Hook.

# Recap

- Handle events by passing a function as a prop to an element like `<button>`.
- Handlers must be passed, not called: `onClick={handleClick}`, not `onClick={handleClick()}`.
- You can define a handler separately or inline.
- Handlers are defined inside a component, so they can access props.
- You can declare a handler in a parent and pass it as a prop to a child.
- You can define your own event handler props with application-specific names.
- Events propagate upward. Call `e.stopPropagation()` on the first argument to prevent that.
- Events may have unwanted default browser behavior. Call `e.preventDefault()` to prevent that.
- Explicitly calling a handler prop from a child handler is a good alternative to propagation.

# Citations

[1] [Responding to Events](https://react.dev/learn/responding-to-events)
