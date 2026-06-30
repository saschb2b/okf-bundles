---
type: API Reference
title: logger
description: Configures a custom callback to receive React Compiler events for tracking behavior and debugging.
resource: https://react.dev/reference/react-compiler/logger
tags: [react, react-compiler, configuration, debugging]
timestamp: 2026-06-30T12:00:00Z
---

# Reference

`logger` provides custom logging for React Compiler events during compilation.

```js
{
  logger: {
    logEvent(filename, event) {
      console.log(`[Compiler] ${event.kind}: ${filename}`);
    }
  }
}
```

## Type

```
{
  logEvent: (filename: string | null, event: LoggerEvent) => void;
} | null
```

## Default value

`null`

## Methods

- `logEvent`: called for each compiler event with the filename and event details.

## Event types

| `event.kind` | Meaning |
| --- | --- |
| `CompileSuccess` | Function successfully compiled. |
| `CompileError` | Function skipped due to errors. |
| `CompileDiagnostic` | Non-fatal diagnostic information. |
| `CompileSkip` | Function skipped for other reasons. |
| `PipelineError` | Unexpected compilation error. |
| `Timing` | Performance timing information. |

# Usage

- **Basic logging.** Switch on `event.kind` to track successes and failures.

  ```js
  logEvent(filename, event) {
    switch (event.kind) {
      case 'CompileSuccess': console.log(`Compiled: ${filename}`); break;
      case 'CompileError': console.log(`Skipped: ${filename}`); break;
      default: {}
    }
  }
  ```

- **Detailed error logging.** On `CompileError`, read `event.detail` for `reason`, `description`, `loc.start` (`line`, `column`), and `suggestions`.

  ```js
  if (event.kind === 'CompileError') {
    console.error(`Reason: ${event.detail.reason}`);
    if (event.detail.loc) {
      const { line, column } = event.detail.loc.start;
      console.error(`Location: Line ${line}, Column ${column}`);
    }
  }
  ```

# Caveats

- Event structure may change between versions.
- Large codebases generate many log entries.

This option is set in the React Compiler config. For debugging compiled code, see [the React Compiler guide](/react-compiler/react-compiler.md).

# Citations

[1] [logger](https://react.dev/reference/react-compiler/logger)
