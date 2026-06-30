---
type: Guide
title: Sharing State Between Components
description: Lift state up to a common parent so two components change together, and understand controlled vs uncontrolled components and single source of truth.
resource: https://react.dev/learn/sharing-state-between-components
tags: [react, state, lifting-state, props]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Sometimes you want the state of two components to always change together. Remove state from both, move it to their closest common parent, and pass it down via props. This is "lifting state up", one of the most common things you do writing React.

# Lifting state up: the three steps

To coordinate two child components, lift their shared state to a common parent:

1. Remove state from the child components.
2. Pass hardcoded data from the common parent.
3. Add state to the common parent and pass it down together with the event handlers.

## Step 1: Remove state from children

Give control of the child's value to its parent. Delete the local state and accept it as a prop instead.

```js
// Before: const [isActive, setIsActive] = useState(false);
function Panel({ title, children, isActive }) {
  // ...
}
```

The child now has no control over `isActive`; the parent does.

## Step 2: Pass hardcoded data from the parent

Locate the closest common parent of both children. It becomes the source of truth. Pass a hardcoded value down as a first step to confirm the wiring.

```jsx
<Panel title="About" isActive={true}>...</Panel>
<Panel title="Etymology" isActive={true}>...</Panel>
```

## Step 3: Add state to the common parent

Lifting state often changes what you store. To allow only one panel open at a time, store the active index instead of a boolean per panel. Pass an event handler down so the child can request a change.

```jsx
export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Panel
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >...</Panel>
      <Panel
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >...</Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
```

A child cannot set parent state directly, so the parent passes an event handler down. Using the active index instead of two flags guarantees only one panel is active.

# Controlled and uncontrolled components

- Uncontrolled: important information is driven by the component's own local state. The parent cannot influence it. Easier to use, less configuration, but less flexible to coordinate.
- Controlled: important information is driven by props from the parent. Maximally flexible, but the parent must configure it fully.

These are not strict technical terms. Most components mix local state and props. When writing a component, decide which information should be controlled (via props) and which uncontrolled (via state); you can refactor later.

# A single source of truth for each state

For each unique piece of state, choose the one component that owns it. This is the single source of truth principle. It does not mean all state lives in one place, but that each piece has a specific owner. Instead of duplicating shared state, lift it up to the common parent and pass it down. Moving state up and down as you figure out where it lives is part of the process. See [Thinking in React](/get-started/thinking-in-react.md) for more practice.

# Recap

- To coordinate two components, move their state to their common parent.
- Pass the information down through props from the common parent.
- Pass event handlers down so the children can change the parent's state.
- It is useful to consider components as controlled (driven by props) or uncontrolled (driven by state).

# Citations

[1] [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
