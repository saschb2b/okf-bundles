---
type: Overview
title: "React: overview"
description: A guided tour of the React knowledge bundle, transformed from the official react.dev documentation into one OKF concept per page.
tags: [react, frontend, javascript, ui]
timestamp: 2026-06-30T12:00:00Z
---

# What this bundle is

The official React documentation at [react.dev](https://react.dev), restructured as an OKF bundle: one concept per documentation page, with the page's canonical URL in each concept's `resource`. It has two halves: the **Learn guide**, which teaches how React works and how to think in it, and the **API Reference**, which gives exact signatures, parameters, return values, and caveats for every documented export, from [useState](/reference/react/hooks/useState.md) to the [server rendering APIs](/reference/react-dom/server/renderToPipeableStream.md). The content is transformed and summarized, not copied; the `timestamp` and cited URL on each concept tell you how to re-check it against the live docs. For navigation by section, start at the bundle root index.

# The mental model

React UIs are built from [components](/describing-the-ui/your-first-component.md), functions that return markup written in [JSX](/describing-the-ui/writing-markup-with-jsx.md). Components receive [props](/describing-the-ui/passing-props-to-a-component.md) from their parents and keep their own memory in [state](/adding-interactivity/state-a-components-memory.md). When state changes, React [re-renders](/adding-interactivity/render-and-commit.md) the component and updates the DOM to match. Components must be [pure](/describing-the-ui/keeping-components-pure.md): same inputs, same output, no side effects during render. Side effects that synchronize with external systems go in [Effects](/escape-hatches/synchronizing-with-effects.md), and values that persist without triggering a render go in [refs](/escape-hatches/referencing-values-with-refs.md).

# Learn React

Read the four core sections in order, each starting at its landing concept:

1. [Describing the UI](/describing-the-ui/describing-the-ui.md) - Components, JSX, props, conditional rendering, lists, purity, and the render tree.
2. [Adding Interactivity](/adding-interactivity/adding-interactivity.md) - Events, state, the render-and-commit cycle, state as a snapshot, and updating objects and arrays.
3. [Managing State](/managing-state/managing-state.md) - Structuring state, sharing it by lifting it up, preserving and resetting it, [reducers](/reference/react/hooks/useReducer.md), and [context](/reference/react/apis/createContext.md).
4. [Escape Hatches](/escape-hatches/escape-hatches.md) - Refs, Effects, [why you might not need an Effect](/escape-hatches/you-might-not-need-an-effect.md), and [custom Hooks](/escape-hatches/reusing-logic-with-custom-hooks.md).

New to React entirely? Start with the [quick start](/get-started/quick-start.md) and the [tic-tac-toe tutorial](/get-started/tutorial-tic-tac-toe.md).

# When you need exact behavior

The Learn guide teaches the ideas; the API Reference pins down the contracts. The most-used entries are the Hooks, above all [useState](/reference/react/hooks/useState.md), [useEffect](/reference/react/hooks/useEffect.md), [useContext](/reference/react/hooks/useContext.md), and [useReducer](/reference/react/hooks/useReducer.md). The [Rules of React](/reference/rules/rules-of-hooks.md) and the [ESLint plugin](/reference/eslint-plugin-react-hooks/lints/exhaustive-deps.md) explain the constraints the whole model depends on.

# Provenance

Every concept cites its source react.dev page. React documentation prose is licensed CC BY 4.0 and its code samples MIT, by Meta and the React contributors. This bundle restructures and summarizes that material for agent consumption; consult the cited URL for the authoritative, current text.
