---
type: Guide
title: Escape Hatches
description: Section landing for React features that step outside React to connect with external systems via refs, Effects, and custom Hooks.
resource: https://react.dev/learn/escape-hatches
tags: [react, escape-hatches, refs, effects, custom-hooks]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Some components need to control and synchronize with systems outside of React: focusing an input with a browser API, playing a non-React video player, or connecting to a remote server. Escape hatches let you step outside React and connect to external systems. Most application logic and data flow should not rely on these features. This chapter covers refs (remembering information without re-rendering), DOM access, Effects (synchronizing with external systems), and custom Hooks (sharing logic).

# In this section

- [Referencing Values with Refs](referencing-values-with-refs.md) - Remember information without triggering re-renders.
- [Manipulating the DOM with Refs](manipulating-the-dom-with-refs.md) - Access DOM elements managed by React.
- [Synchronizing with Effects](synchronizing-with-effects.md) - Synchronize components with external systems.
- [You Might Not Need an Effect](you-might-not-need-an-effect.md) - Remove unnecessary Effects from your components.
- [Lifecycle of Reactive Effects](lifecycle-of-reactive-effects.md) - How an Effect's lifecycle differs from a component's.
- [Separating Events from Effects](separating-events-from-effects.md) - Prevent some values from re-triggering Effects.
- [Removing Effect Dependencies](removing-effect-dependencies.md) - Make your Effect re-run less often.
- [Reusing Logic with Custom Hooks](reusing-logic-with-custom-hooks.md) - Share logic between components.

# Key points

- **Refs.** Use a ref to make a component "remember" information that does not trigger new renders. Created with [useRef](/reference/react/hooks/useRef.md), accessed through `ref.current`. Setting state re-renders; changing a ref does not. Good for timeout IDs, DOM elements, and other objects that do not affect render output.
- **Manipulating the DOM.** React updates the DOM to match render output, but sometimes you need direct access (focus, scroll, measure). Point a ref to a DOM node to get it.
- **Synchronizing with Effects.** Unlike event handlers, which handle particular events, Effects run code after rendering to synchronize a component with an external system. Many Effects clean up after themselves. See [useEffect](/reference/react/hooks/useEffect.md).
- **You might not need an Effect.** Effects are an escape hatch. If no external system is involved (for example, updating state when props or state change), you usually do not need one. Calculate what you can during rendering.
- **Lifecycle of reactive effects.** An Effect can only start synchronizing and later stop synchronizing. This cycle can happen multiple times when the Effect depends on props and state that change.
- **Separating events from Effects.** All code inside Effects is reactive. Code inside Effect Events is not, letting you prevent some values from re-triggering Effects.
- **Removing Effect dependencies.** The dependency list describes your code, you do not choose it. Unnecessary dependencies can cause an Effect to run too often or loop infinitely. To change the list, change the code.
- **Reusing logic with custom Hooks.** Build your own Hooks for specific needs, compose them, pass data between them, and reuse them. As an app grows you write fewer Effects by hand.

# Citations

[1] [Escape Hatches](https://react.dev/learn/escape-hatches)
