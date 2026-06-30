---
type: Guide
title: Reacting to Input with State
description: Describe a component's visual states declaratively and switch between them in response to input, instead of manipulating the UI imperatively.
resource: https://react.dev/learn/reacting-to-input-with-state
tags: [react, state, declarative, forms]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

React provides a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, you describe the different states your component can be in and switch between them in response to input. This is similar to how designers think about UI.

# Declarative vs imperative UI

- Imperative: you write exact instructions to manipulate each UI element (enable, disable, show, hide) depending on what just happened. Like telling a driver every turn. Brittle and verbose.
- Declarative: you declare what you want to show for each state, and React figures out how to update the UI. Like telling a taxi driver the destination.

# Thinking about UI declaratively

Five steps to reimplement a UI in React:

1. Identify your component's different visual states.
2. Determine what triggers those state changes.
3. Represent the state in memory using `useState`.
4. Remove any non-essential state variables.
5. Connect the event handlers to set the state.

## Step 1: Identify visual states

Visualize all the states the user might see before adding logic. For a quiz form:

- Empty: form has a disabled Submit button.
- Typing: form has an enabled Submit button.
- Submitting: form is fully disabled, spinner shown.
- Success: Thank you message shown instead of the form.
- Error: same as Typing, plus an error message.

## Step 2: Determine state triggers

Two kinds of inputs trigger updates. In both cases you set state variables to update the UI.

- Human inputs: clicking a button, typing in a field, navigating a link. These often need [event handlers](/adding-interactivity/responding-to-events.md).
- Computer inputs: a network response arriving, a timeout completing, an image loading.

Sketch each state as a labeled circle and each change as an arrow to find bugs before implementation.

## Step 3: Represent state with useState

Use as few moving pieces as possible. Start with state that must be there, such as `answer` and `error`. If unsure, over-add boolean states first, then refine.

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
```

## Step 4: Remove non-essential state

Goal: prevent states in memory that do not represent a valid UI. Ask:

- Does this state cause a paradox? `isTyping` and `isSubmitting` cannot both be true. Combine into one `status` ('typing', 'submitting', 'success').
- Is the information already in another variable? Remove `isEmpty`; check `answer.length === 0`.
- Can you get it from the inverse of another variable? Remove `isError`; check `error !== null`.

This reduces seven booleans to three essential variables:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

To model even more precisely (a non-null `error` makes no sense once `status` is 'success'), extract the state into a [reducer](extracting-state-logic-into-a-reducer.md).

## Step 5: Connect event handlers

Wire handlers that set state. Representative final form:

```jsx
export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={status === 'submitting'}
      />
      <button disabled={answer.length === 0 || status === 'submitting'}>
        Submit
      </button>
      {error !== null && <p className="Error">{error.message}</p>}
    </form>
  );
}
```

Longer than the imperative version but far less fragile. New visual states can be added without breaking existing ones.

# Recap

- Declarative programming means describing the UI for each visual state rather than micromanaging the UI imperatively.
- When developing a component: identify all visual states, determine the human and computer triggers, model the state with `useState`, remove non-essential state to avoid bugs and paradoxes, and connect event handlers to set state.

# Citations

[1] [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)
