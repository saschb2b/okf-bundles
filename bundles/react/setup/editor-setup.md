---
type: Guide
title: Editor Setup
description: Recommended editors for React and how to set up linting and automatic formatting.
resource: https://react.dev/learn/editor-setup
tags: [react, editor, eslint, prettier, tooling]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

A well configured editor makes code clearer to read, faster to write, and can catch bugs as you type. The two features worth setting up for React are linting (find problems while writing) and formatting (auto reformat on save).

# Editors

- VS Code: one of the most popular editors, with a large extension marketplace and good GitHub integration. Most features below can be added as extensions.
- WebStorm: a JetBrains IDE designed specifically for JavaScript.
- Sublime Text: built in JSX and TypeScript support, syntax highlighting, and autocomplete.
- Vim: highly configurable editor, included as "vi" on most UNIX systems and macOS.

# Linting

Linters surface problems as you write so you can fix them early. ESLint is the popular open source linter for JavaScript.

- Install ESLint with the recommended React configuration (`eslint-config-react-app`); requires Node installed.
- In VS Code, add the official ESLint extension (`dbaeumer.vscode-eslint`).
- Enable all `eslint-plugin-react-hooks` rules. They are essential and catch the most severe bugs early. The `eslint-config-react-app` preset already includes them.

# Formatting

Prettier reformats code to preset, configurable rules (tabs to spaces, consistent indentation, quotes, etc.), ending tabs versus spaces debates. The ideal setup runs Prettier on every save.

Install the Prettier VS Code extension:

```text
1. Launch VS Code
2. Quick Open (Ctrl/Cmd+P)
3. Paste: ext install esbenp.prettier-vscode
4. Press Enter
```

## Formatting on save

```text
1. Press Ctrl/Cmd + Shift + P
2. Type "settings", hit Enter
3. Search "format on save"
4. Ensure "format on save" is ticked
```

# Pitfalls

- ESLint formatting rules can conflict with Prettier. Disable formatting rules in your ESLint preset using `eslint-config-prettier` so ESLint is used only for catching logical mistakes.
- To enforce formatting before a pull request merges, run `prettier --check` in continuous integration.

# Citations

[1] [Editor Setup](https://react.dev/learn/editor-setup)
