---
type: Guide
title: Using TypeScript
description: How to add TypeScript to a React project and type components, Hooks, DOM events, children, and style props.
resource: https://react.dev/learn/typescript
tags: [react, typescript, hooks, types, props]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

TypeScript adds type definitions to JavaScript. It supports JSX out of the box. Add `@types/react` and `@types/react-dom` for full React Web support. Files containing JSX must use the `.tsx` extension.

# Installation

All production grade React frameworks support TypeScript: follow the framework specific guide (Next.js, Remix, Gatsby, Expo). To add TypeScript to an existing React project:

```bash
npm install --save-dev @types/react @types/react-dom
```

Required `tsconfig.json` compiler options:

- `dom` must be in `lib` (included by default if no `lib` is specified).
- `jsx` must be a valid option; `preserve` suffices for most apps. For a library, consult the `jsx` docs on which value to choose.

# Typing components

Provide types for a component's props for correctness checking and inline editor docs. Inline is simplest for one or two props:

```tsx
function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}
```

For more fields, use an `interface` or `type`:

```tsx
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}
```

Props should be an object type described with `type` or `interface`. Union types describe a prop that can be one of several types.

# Typing Hooks

The `@types/react` definitions include types for the built in Hooks, so they often work with no extra setup via inferred types. Provide an explicit type argument when inference is not enough.

## useState

Type is inferred from the initial value. The setter accepts that type or a function returning it. This Hook is documented at [/reference/react/hooks/useState.md](/reference/react/hooks/useState.md).

```ts
// Inferred as boolean
const [enabled, setEnabled] = useState(false);

// Explicit type argument
const [enabled, setEnabled] = useState<boolean>(false);
```

An explicit type argument is most useful for union types:

```ts
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
```

Group related state as an object and describe the possibilities via object types:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

## useReducer

Reducer types are inferred from the initial state. Prefer setting the type on the initial state over passing a type argument. This Hook is documented at [/reference/react/hooks/useReducer.md](/reference/react/hooks/useReducer.md).

```tsx
import { useReducer } from 'react';

interface State { count: number }

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] };

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset": return initialState;
    case "setCount": return { ...state, count: action.value };
    default: throw new Error("Unknown action");
  }
}

const [state, dispatch] = useReducer(stateReducer, initialState);
```

Key annotations: `interface State` (state shape), `type CounterAction` (the dispatchable actions), `const initialState: State` (also the default state type for the Hook), and the reducer's argument and return types. A more explicit alternative passes a type argument to `useReducer`.

## useContext

The context value type is inferred from the value passed to `createContext`:

```tsx
type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");
const useGetTheme = () => useContext(ThemeContext);
```

When there is no sensible default, use `null` and type as `ContextShape | null`. Eliminate the `| null` for consumers by having the Hook do a runtime check and throw if absent:

```ts
const Context = createContext<ComplexObject | null>(null);

const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) throw new Error("useGetComplexObject must be used within a Provider");
  return object;
};
```

## useMemo

The result type is inferred from the return value of the first parameter; you can pass an explicit type argument. React Compiler can memoize automatically, reducing the need for manual `useMemo`.

```ts
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```

## useCallback

Returns a stable function reference while dependencies are unchanged. The function type is inferred from its return value. React Compiler can memoize automatically. In TypeScript strict mode you must type the callback's parameters, since the type cannot be fully inferred from parameters alone. You can use the `*EventHandler` types:

```ts
const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
  setValue(event.currentTarget.value);
}, [setValue]);
```

# Useful types

The `@types/react` package exports an expansive set of types (see React's folder in DefinitelyTyped). Common ones below.

## DOM events

Event types are often inferred from the handler. When extracting a function, set the event type explicitly:

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.currentTarget.value);
}
```

Hover over the handler in your editor to discover the right event type. For an event not in the list, use `React.SyntheticEvent`, the base type for all events.

## Children

- `React.ReactNode`: a union of all types accepted as children in JSX (broad, includes strings and numbers).
- `React.ReactElement`: only JSX elements, not JavaScript primitives.

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactNode; // or React.ReactElement
}
```

You cannot use the type system to require a specific element type (for example, only `<li>` children).

## Style props

Use `React.CSSProperties` for the object passed to the `style` prop. It enables validation and autocomplete:

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

# Further learning

- The TypeScript handbook (official language documentation).
- The TypeScript release notes (new features in depth).
- React TypeScript Cheatsheet (community maintained, covers edge cases).
- TypeScript Community Discord for questions.

# Citations

[1] [Using TypeScript](https://react.dev/learn/typescript)
