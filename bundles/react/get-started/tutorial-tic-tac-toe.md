---
type: Tutorial
title: "Tutorial: Tic-Tac-Toe"
description: A hands-on walkthrough that builds a small tic-tac-toe game to introduce React components, props, state, lifting state up, immutability, and time travel.
resource: https://react.dev/learn/tutorial-tic-tac-toe
tags: [react, tutorial, useState, lifting-state-up, getting-started]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

This tutorial builds a playable tic-tac-toe game from scratch, learning by doing. You finish with a 3x3 board where players alternate X and O, a winner is detected automatically, and a move history lets you jump back to any earlier game state (time travel). Along the way it teaches the core React mechanics: components, props, the `useState` hook, lifting shared state to a common parent, immutable updates, and rendering lists with keys. For the underlying mental model see [Thinking in React](thinking-in-react.md); for a faster concept tour see [Quick Start](quick-start.md).

# What you build

Three components, top to bottom:

- `Square`: one clickable cell, a `<button className="square">` that shows its value.
- `Board`: the 3x3 grid. Renders nine `Square`s, owns the board state, runs click logic, and shows the status line.
- `Game`: the top-level component. Owns the move `history` and the time-travel UI.

# Major steps in order

## 1. Setup

Begin from a starter `Square` that renders a single button, then build a `Board` that returns nine buttons grouped into three `board-row` `<div>`s, wrapped in a Fragment (`<>...</>`).

## 2. Passing data with props

Extract a reusable `Square` that takes a `value` prop, and have `Board` pass each square its number. This is the parent-to-child data flow.

```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```

## 3. Making a square interactive

Give a square memory with `useState` and respond to clicks. The hook returns the current value and a setter; calling the setter re-renders.

```jsx
function Square() {
  const [value, setValue] = useState(null);
  return <button className="square" onClick={() => setValue('X')}>{value}</button>;
}
```

## 4. Lifting state up

To check for a winner and coordinate squares, the board state must live in one place. Move it out of each `Square` and into `Board` as a single `squares` array, then pass each square its `value` and an `onSquareClick` handler down as props. This is the central pattern: when sibling components need to share data, lift that state to their closest common parent.

```jsx
const [squares, setSquares] = useState(Array(9).fill(null));

function handleClick(i) {
  const nextSquares = squares.slice(); // copy, do not mutate
  nextSquares[i] = 'X';
  setSquares(nextSquares);
}
```

Immutability matters: copy the array with `.slice()` rather than assigning into the existing one. It enables undo/time travel, makes change detection cheap, and keeps debugging simple.

## 5. Taking turns

Track whose turn it is with an `xIsNext` boolean. In `handleClick`, return early if the square is already filled (do not overwrite), write `'X'` or `'O'` based on `xIsNext`, then flip it.

## 6. Declaring a winner

Add a pure `calculateWinner(squares)` helper that checks the eight winning lines and returns `'X'`, `'O'`, or `null`. Use its result to render a status line and to ignore clicks once the game is won.

```jsx
const winner = calculateWinner(squares);
const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
```

## 7. Adding time travel

Lift state one more level into a new `Game` component that stores every past board. `history` is an array of `squares` arrays and `currentMove` indexes into it; `xIsNext` and `currentSquares` are derived, not stored separately.

```jsx
const [history, setHistory] = useState([Array(9).fill(null)]);
const [currentMove, setCurrentMove] = useState(0);
const xIsNext = currentMove % 2 === 0;
const currentSquares = history[currentMove];

function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
}

function jumpTo(nextMove) {
  setCurrentMove(nextMove);
}
```

`Board` becomes fully controlled: it receives `xIsNext`, `squares`, and `onPlay` as props and calls `onPlay(nextSquares)` instead of holding its own state. Map over `history` to render one "Go to move" button per move, each calling `jumpTo`, and give every list item a `key` so React can track them.

```jsx
const moves = history.map((squares, move) => {
  const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});
```

# Key lessons

- **Components** are reusable UI building blocks; `Square`, `Board`, and `Game` nest into a tree.
- **Props** pass data from parent to child; data flows down.
- **State** with `useState` lets a component remember values across renders.
- **Lifting state up** puts shared state in the closest common parent so children stay in sync.
- **Immutability**: replace data with new copies (`.slice()`, spread) rather than mutating it.
- **Lists need keys**: a stable `key` prop helps React identify which items changed.
- **Derive, do not duplicate**: compute values like `xIsNext` and `currentSquares` from existing state instead of storing them separately.

# Citations

[1] [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
