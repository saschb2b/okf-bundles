---
type: Lint Rule
title: unsupported-syntax
description: Flags syntax that React Compiler cannot statically analyze, such as eval and with.
resource: https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax
tags: [react, eslint, lint, compiler, syntax]
timestamp: 2026-06-30T12:00:00Z
---

# What it flags

Syntax that React Compiler does not support because it cannot be statically analyzed. The compiler needs to understand code at compile time to optimize it, and features like `eval` and `with` make that impossible, so components using them cannot be optimized. You can still use this syntax outside React, for example in a standalone utility function.

# Examples

Invalid:

```js
// eval cannot be analyzed
const result = eval(code);

// `with` changes scope dynamically
with (Math) {
  return <div>{sin(PI / 2)}</div>;
}
```

Valid:

```js
// Normal, analyzable property access
const value = props[propName];

// Standard Math methods
return <div>{Math.sin(Math.PI / 2)}</div>;
```

# Troubleshooting

To evaluate dynamic input, use a dedicated safe parser rather than `eval`:

```js
import { evaluate } from 'mathjs';

function Calculator({ expression }) {
  const [result, setResult] = useState(null);
  const calculate = () => {
    try {
      setResult(evaluate(expression));
    } catch (error) {
      setResult('Invalid expression');
    }
  };
  return <button onClick={calculate}>Calculate</button>;
}
```

Never use `eval` with user input, it is a security risk. Use dedicated parsing libraries for math expressions, JSON, or templates.

# Citations

[1] [unsupported-syntax](https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax)
