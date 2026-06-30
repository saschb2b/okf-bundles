---
type: Guide
title: Quick Start
description: A fast introduction to the React concepts you use daily: components, JSX, styles, data, conditions, lists, events, state, and sharing data.
resource: https://react.dev/learn
tags: [react, components, jsx, state, props]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

The Quick Start page covers roughly 80 percent of the React concepts used on a daily basis. It walks through creating and nesting components, writing markup with JSX, adding styles, displaying data, conditional rendering, rendering lists, responding to events, updating the screen with state, and sharing data between components. See the deeper syntax in the [Describing the UI](/describing-the-ui/describing-the-ui.md) section and interactivity in [Adding Interactivity](/adding-interactivity/adding-interactivity.md).

# Creating and nesting components

React apps are made of components: pieces of UI with their own logic and appearance. A component is a JavaScript function that returns markup. Component names must start with a capital letter; HTML tags are lowercase. `export default` marks the file's main component. This builds on [Your First Component](/describing-the-ui/your-first-component.md) and on [importing and exporting components](/describing-the-ui/importing-and-exporting-components.md).

```js
function MyButton() {
  return <button>I'm a button</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

# Writing markup with JSX

The markup syntax is called JSX. It is optional but common. JSX is stricter than HTML: you must close tags like `<br />`, and a component cannot return multiple sibling tags. Wrap them in a shared parent such as a `<div>` or an empty `<>...</>` fragment. See [Writing Markup with JSX](/describing-the-ui/writing-markup-with-jsx.md).

```js
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

# Adding styles

Specify a CSS class with `className`, which works like the HTML `class` attribute. Write the CSS rules in a separate file.

```js
<img className="avatar" />
```

```css
.avatar {
  border-radius: 50%;
}
```

# Displaying data

JSX lets you put markup into JavaScript. Curly braces escape back into JavaScript so you can embed a variable. In attributes, use curly braces instead of quotes to read a JavaScript value. See [JavaScript in JSX with Curly Braces](/describing-the-ui/javascript-in-jsx-with-curly-braces.md).

```js
return <h1>{user.name}</h1>;
```

```js
return <img className="avatar" src={user.imageUrl} />;
```

You can put more complex expressions inside the braces, for example string concatenation. The `style={{ }}` form is just a regular `{}` object inside the `style={ }` JSX braces, useful when styles depend on JavaScript variables.

# Conditional rendering

React has no special syntax for conditions; you use regular JavaScript. Use an `if` statement to assign JSX to a variable, the ternary `?` operator inside JSX, or the shorter logical `&&` when there is no else branch. All of these also work for conditionally specifying attributes. See [Conditional Rendering](/describing-the-ui/conditional-rendering.md).

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

```js
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
<div>{isLoggedIn && <AdminPanel />}</div>
```

# Rendering lists

Use JavaScript features like the array `map()` function to render lists of components. Each list item needs a `key`: a string or number that uniquely identifies it among siblings, usually a database ID from your data. React uses keys to track inserts, deletes, and reorders. See [Rendering Lists](/describing-the-ui/rendering-lists.md).

```js
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

const listItems = products.map(product =>
  <li key={product.id}>{product.title}</li>
);

return <ul>{listItems}</ul>;
```

# Responding to events

Declare event handler functions inside your components and pass them to elements. Pass the handler down, do not call it: `onClick={handleClick}` has no parentheses. React calls the handler when the event fires. See [Responding to Events](/adding-interactivity/responding-to-events.md).

```js
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }
  return <button onClick={handleClick}>Click me</button>;
}
```

# Updating the screen

To make a component remember information and display it, add state. Import `useState` and declare a state variable. `useState` returns the current state and a setter; the convention is `[something, setSomething]`. Calling the setter with a new value triggers a re-render. Each rendered instance of a component gets its own independent state. See [State: A Component's Memory](/adding-interactivity/state-a-components-memory.md) and the [useState](/reference/react/hooks/useState.md) reference.

```js
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

# Using Hooks

Functions starting with `use` are called Hooks. `useState` is a built-in Hook; you can also write your own by combining existing ones. Hooks are more restrictive than other functions: you can only call them at the top of your components (or other Hooks). To use a Hook in a condition or a loop, extract a new component and put it there. See the [Rules of Hooks](/reference/rules/rules-of-hooks.md).

# Sharing data between components

To make components share data and always update together, move the state up to their closest common parent, then pass it down as props together with any shared event handler. The child reads the props its parent passed. This pattern is called lifting state up. See [Sharing State Between Components](/managing-state/sharing-state-between-components.md) and [Passing Props to a Component](/describing-the-ui/passing-props-to-a-component.md).

```js
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

When a button is clicked, its `onClick` prop (set to `handleClick` in `MyApp`) runs, which calls `setCount`. The new `count` is passed back down to each button, so all of them show the same value.

# Next steps

Put these basics into practice in the [Tic-Tac-Toe Tutorial](tutorial-tic-tac-toe.md), then dive deeper into syntax in the [Describing the UI](/describing-the-ui/describing-the-ui.md) section.

# Citations

[1] [Quick Start](https://react.dev/learn)
