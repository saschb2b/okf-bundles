---
type: Guide
title: Thinking in React
description: The five-step thought process for building a React UI, from breaking a mockup into components to wiring up inverse data flow.
resource: https://react.dev/learn/thinking-in-react
tags: [react, components, state, props, data-flow]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

To build a UI with React you first break it into components, then describe each component's visual states, then connect them so data flows through them. This page walks the thought process of building a searchable product data table. To implement a UI in React, you usually follow the same five steps. The running example assumes a JSON API returning product rows (category, price, stocked, name) and a designer's mockup.

# Step 1: Break the UI into a component hierarchy

Draw boxes around every component and subcomponent in the mockup and name them. Three lenses help decide the boundaries:

- Programming: use the same judgment as for creating a new function or object. Apply separation of concerns; a component should ideally be concerned with one thing and be decomposed if it grows.
- CSS: consider what you would make class selectors for (components are a bit less granular).
- Design: consider how you would organize the design's layers.

Well-structured JSON often maps naturally to the component structure, because UI and data models usually share the same information architecture (the same shape). Split the UI so each component matches one piece of the data model. The example has five components, arranged into a hierarchy by nesting:

- `FilterableProductTable` contains the entire app.
  - `SearchBar` receives the user input.
  - `ProductTable` displays and filters the list per the user input.
    - `ProductCategoryRow` displays a heading for each category.
    - `ProductRow` displays a row for each product.

The table header is kept inside `ProductTable` here as a matter of preference; if it grew complex (for example with sorting) it could become its own `ProductTableHeader`.

# Step 2: Build a static version in React

Build a version that renders the UI from the data model with no interactivity yet. The static version requires a lot of typing and little thinking; interactivity later requires a lot of thinking and little typing. Build components that reuse other components and pass data using props. Do not use state at all for the static version: state is reserved for interactivity, that is, data that changes over time.

You can build top down (start at `FilterableProductTable`) or bottom up (start at `ProductRow`). Top down is usually easier for simple examples; bottom up is easier on larger projects. The result is a library of reusable components that only return JSX. The top component takes the data model as a prop. Data flows down from the top to the leaves, which is called one-way data flow.

```jsx
function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}
```

Pitfall: at this point do not use any state values. That is the next step.

# Step 3: Find the minimal but complete representation of UI state

To make the UI interactive, let users change the underlying data model using state. Think of state as the minimal set of changing data the app must remember. Keep it DRY (Don't Repeat Yourself): find the absolute minimal representation and compute everything else on demand. For example, store list items in state but compute the item count from the array length rather than storing it separately.

The example has four pieces of data. To find which are state, ask three questions:

1. Does it remain unchanged over time? If so, it is not state.
2. Is it passed in from a parent via props? If so, it is not state.
3. Can you compute it from existing state or props? If so, it is definitely not state.

Applying this:

- The original list of products is passed in as props, so it is not state.
- The search text is state: it changes over time and cannot be computed.
- The checkbox value is state: it changes over time and cannot be computed.
- The filtered list is not state: it is computed from the product list, the search text, and the checkbox.

So only the search text and the checkbox value are state.

## Props vs state

React has two kinds of model data, and they differ:

- Props are like arguments passed to a function. A parent passes them to a child to customize its appearance, for example a `Form` passing a `color` prop to a `Button`. See [Passing Props to a Component](/describing-the-ui/passing-props-to-a-component.md).
- State is like a component's memory. It lets a component track information and change it in response to interaction, for example a `Button` tracking `isHovered`. See [State: A Component's Memory](/adding-interactivity/state-a-components-memory.md).

They work together: a parent often holds information in state and passes it down to children as props.

# Step 4: Identify where your state should live

After finding the minimal state, identify which component owns each piece (is responsible for changing it). React uses one-way data flow, so it may not be obvious. For each piece of state:

1. Identify every component that renders something based on that state.
2. Find their closest common parent, a component above them all.
3. Decide where the state lives: usually directly in the common parent, or in a component above it, or in a new component created solely to hold the state and placed above the common parent.

In the example, both pieces of state always appear together. `ProductTable` needs them to filter, and `SearchBar` needs them to display. Their common parent is `FilterableProductTable`, so the state lives there. Add state with the [useState](/reference/react/hooks/useState.md) Hook and pass the values down as props. This is the lifting-state-up pattern; see [Sharing State Between Components](/managing-state/sharing-state-between-components.md) and [Choosing the State Structure](/managing-state/choosing-the-state-structure.md).

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}
```

At this stage the form is read-only: passing a `value` prop without an `onChange` handler produces a read-only field, so editing does not work yet. That is the final step.

# Step 5: Add inverse data flow

The app renders correctly with props and state flowing down, but to change state from user input, data must flow the other way: form components deep in the tree must update the state in `FilterableProductTable`. React makes this explicit and requires a little more typing than two-way binding. Because the state is owned by `FilterableProductTable`, only it can call `setFilterText` and `setInStockOnly`, so pass those setters down to `SearchBar`, which calls them from `onChange` handlers.

```js
<SearchBar
  filterText={filterText}
  inStockOnly={inStockOnly}
  onFilterTextChange={setFilterText}
  onInStockOnlyChange={setInStockOnly} />
```

```js
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}Only show products in stock
      </label>
    </form>
  );
}
```

Now the application fully works. Learn more about handling events and updating state in the [Adding Interactivity](/adding-interactivity/adding-interactivity.md) section.

# Recap

The five steps: break the UI into a component hierarchy, build a static version with props and one-way data flow, find the minimal complete representation of state, identify which component owns each piece of state, then add inverse data flow so user input updates the owning state. From here, start a [React project](/installation/installation.md) or go deeper on the syntax in [Describing the UI](/describing-the-ui/describing-the-ui.md).

# Citations

[1] [Thinking in React](https://react.dev/learn/thinking-in-react)
