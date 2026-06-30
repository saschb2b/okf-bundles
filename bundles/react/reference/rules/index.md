# Rules of React

The non-negotiable rules React relies on to render correctly and optimize your app.

- [Components and Hooks must be pure](components-and-hooks-must-be-pure.md) - Render must be idempotent and side-effect-free so React can safely re-run, pause, and prioritize it.
- [React calls Components and Hooks](react-calls-components-and-hooks.md) - Let React call your components; never invoke them directly or pass Hooks around as values.
- [Rules of Hooks](rules-of-hooks.md) - Call Hooks only at the top level and only from React functions, never conditionally.
