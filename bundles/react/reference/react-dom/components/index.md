# React DOM Components

React's built-in browser components: their props, React-specific behavior, and caveats.

## Form components

- [Common components (e.g. <div>)](common.md) - Shared props, events, ref callbacks, and the React event object for all built-in components.
- [<form>](form.md) - Form with React action props that submit in a Transition and support Server Functions, pending state, and optimistic updates.
- [<input>](input.md) - Input element, controlled vs uncontrolled, value/checked/onChange, and the full prop list.
- [<option>](option.md) - A selectable option inside a select box.
- [<select>](select.md) - Select box, controlled vs uncontrolled, multiple selection, and reading values on submit.
- [<textarea>](textarea.md) - Multiline text input, controlled vs uncontrolled, with no children.
- [<progress>](progress.md) - Determinate or indeterminate progress indicator.

## Document metadata and resource components

- [<link>](link.md) - External resources and metadata, with head-hoisting, stylesheet precedence, deduplication, and Suspense.
- [<meta>](meta.md) - Document metadata that React always hoists into the document head.
- [<script>](script.md) - Inline and external scripts, with head-hoisting and deduplication for async external scripts.
- [<style>](style.md) - Inline CSS, with head-hoisting, precedence ordering, and deduplication by href.
- [<title>](title.md) - The document title, which React always hoists into the document head.
