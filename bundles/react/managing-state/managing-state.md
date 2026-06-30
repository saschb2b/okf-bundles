---
type: Guide
title: Managing State
description: Section landing page for organizing state, keeping update logic maintainable, and sharing state between distant components in React.
resource: https://react.dev/learn/managing-state
tags: [react, state, architecture, hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

As an application grows, be intentional about how state is organized and how data flows between components. Redundant or duplicate state is a common source of bugs. This chapter covers structuring state well, keeping state update logic maintainable, and sharing state between distant components.

# In this section

Read these concepts in order. They build on one another.

- [Reacting to Input with State](reacting-to-input-with-state.md): Describe UI as visual states and switch between them in response to input, rather than mutating the UI directly.
- [Choosing the State Structure](choosing-the-state-structure.md): Five principles for shaping state so it stays in sync and avoids impossible states.
- [Sharing State Between Components](sharing-state-between-components.md): Lift state up to a common parent so two components change together.
- [Preserving and Resetting State](preserving-and-resetting-state.md): Control when React keeps a component's state and when it resets it, using tree position and `key`.
- [Extracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.md): Consolidate complex update logic in a single reducer function. Built on [useReducer](/reference/react/hooks/useReducer.md).
- [Passing Data Deeply with Context](passing-data-deeply-with-context.md): Share information with any component below without prop drilling. Built on [useContext](/reference/react/hooks/useContext.md) and [createContext](/reference/react/apis/createContext.md).
- [Scaling Up with Reducer and Context](scaling-up-with-reducer-and-context.md): Combine a reducer with context to manage state of a complex screen across the whole tree.

# Key points

- Describe the UI you want for each visual state and trigger state changes in response to input. Do not modify the UI from code directly.
- State should not contain redundant or duplicated information. Calculate values during render instead of storing them.
- When two components must change together, remove state from both, move it to their closest common parent, and pass it down via props. This is "lifting state up".
- React preserves the parts of the tree that match up with the previous render. Pass a different `key` to force a component to reset its state.
- For many state updates spread across many event handlers, consolidate the logic into a reducer. Event handlers dispatch actions; the reducer specifies how state updates.
- Context lets a parent make information available to any component in the tree below it, no matter how deep, without passing it explicitly through props.
- Combine a reducer (for update logic) with context (for distribution) to manage complex state across distant components.

# Recap

Head to [Reacting to Input with State](reacting-to-input-with-state.md) to read this chapter page by page. If you already know these topics, continue to Escape Hatches.

# Citations

[1] [Managing State](https://react.dev/learn/managing-state)
