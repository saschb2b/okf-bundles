---
type: Guide
title: Adding Interactivity
description: Section landing page on writing components that handle interactions, hold state, and render different output over time.
resource: https://react.dev/learn/adding-interactivity
tags: [react, state, events, rendering]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Some things on the screen update in response to user input. In React, data that changes over time is called state. You can add state to any component and update it as needed. This section covers how to write components that handle interactions, update their state, and display different output over time.

# In this section

The topic concepts in this folder, in reading order:

- [Responding to Events](responding-to-events.md): add event handlers that run on clicks, hovers, focus, and other interactions.
- [State: A Component's Memory](state-a-components-memory.md): make components remember information across renders with the [useState](/reference/react/hooks/useState.md) Hook.
- [Render and Commit](render-and-commit.md): how React updates the UI in three steps, trigger, render, commit.
- [State as a Snapshot](state-as-a-snapshot.md): why state does not change immediately after you set it, and how each render captures a fixed snapshot.
- [Queueing a Series of State Updates](queueing-a-series-of-state-updates.md): how React batches updates, and how updater functions queue multiple changes to the same state.
- [Updating Objects in State](updating-objects-in-state.md): update an object in state by creating a copy instead of mutating it.
- [Updating Arrays in State](updating-arrays-in-state.md): update an array in state with non-mutating operations.

# Recap

- Event handlers are your own functions triggered in response to user interactions. Built-in components support built-in events like onClick, while your own components can name event handler props anything.
- A component remembers information using state, declared with the [useState](/reference/react/hooks/useState.md) Hook, which returns the current value and a setter.
- React displays UI in three steps: triggering a render, rendering the component, and committing to the DOM.
- State behaves like a snapshot: setting it does not change the variable you already have, it triggers a re-render.
- React batches state updates within an event. Pass an updater function like `setScore(s => s + 1)` to queue multiple updates to the same state.
- Do not mutate objects or arrays held in state. Create a new copy (often with spread syntax) and pass it to the setter. Libraries like Immer reduce the repetition.

# Citations

[1] [Adding Interactivity](https://react.dev/learn/adding-interactivity)
