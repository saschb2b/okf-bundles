---
type: Playbook
title: Validation
description: What the checker errors on, what it warns on, what --strict gates, and what no checker can tell you.
tags: [practice, validation, tooling, producer]
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "The okf skill: okf-validate.mjs, a zero-dependency conformance checker"
    author: human:sascha
    last_modified: 2026-08-05
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF v0.2 specification, section 11"
    author: team:google-cloud
    last_modified: 2026-07-24
---

# Run it

```sh
node okf-validate.mjs path/to/bundle
node okf-validate.mjs path/to/bundle --strict
```

Zero dependencies, so it runs anywhere Node runs.[^skill]

# Three levels

`Errors (exit 1)`
: The [one hard rule](/spec/conformance.md). A concept missing frontmatter, or missing a non-empty `type`.

`Warnings`
: The soft guidance. A non-ISO date in `log.md`, a link whose target file is absent, an actor that is not `producer/version`, `human:id` or `process:id`, and the graph connectivity report.

`--strict, the producer gate`
: Turns the guidance into failures. On a bundle declaring `"0.2"` it also checks for leftover `timestamp` or `# Citations`, a `sources` entry with no `resource`, a `generated` with no `by`, an out-of-range `status`, and an [Attested Computation](/trust/attested-computation.md) with no `runtime` or no computation.

Nothing v0.2 added can ever be an error, because all of it is optional. A v0.1 bundle validates clean either way.

# The connectivity check

Among the warnings the checker reports **orphans** (a concept with no concept-to-concept link in or out) and **broken concept links** (a link whose target is not a concept, including a link into a reserved `index.md`). `--strict` fails on both, because an agent traversing the bundle cannot reach an orphan or cross a broken link, so either is missing context by construction. See [graph hygiene](/practice/graph-hygiene.md).

# What it cannot tell you

The checker verifies shape. It says nothing about whether the knowledge is right, whether the bundle covers its source, or whether a `verified` event reflects a review that happened. A thin stub of a fifty-page site passes clean.

So a green run is necessary and not sufficient. Pair it with the coverage gate in [authoring a bundle](/practice/authoring-a-bundle.md), and remember that the trust fields are self-reported: the format makes trust *checkable by a consumer*, not *enforced by a validator*.

# Related

- [Conformance](/spec/conformance.md) is what the checker implements.
- [The okf skill](/ecosystem/okf-skill.md) ships the checker and wraps it in `/okf validate`.

[^skill]: The okf skill: okf-validate.mjs, a zero-dependency conformance checker.
