---
type: Project
title: The okf skill
description: An agent skill that carries the spec, twelve commands, narrow methods, implicit bookkeeping, and a zero-dependency validator.
tags: [ecosystem, tooling, skill, agent]
resource: https://github.com/saschb2b/skills
generated:
  by: claude-code/opus-5
  at: 2026-08-05T12:00:00Z
sources:
  - id: skill
    resource: https://github.com/saschb2b/skills
    title: "saschb2b/skills, the okf skill"
    author: human:sascha
    last_modified: 2026-08-05
---

# Install

```sh
npx skills@latest add saschb2b/skills --skill okf
```

The skill exists so your agent knows the spec and you do not have to.

# What it gives an agent

`Twelve commands`
: `/okf init, add, attest, migrate, enrich, export, link, index, log, validate, health, retrieve, consume`. Each is one procedure with the files it touches.

`Narrow methods`
: A router that picks the smallest method fitting the request, with the boundaries enforced. Inspect is read-only. Revise cannot change meaning. Enrich permits sourced additions. Repair requires a reproducible defect. Loading every method at once wastes context and combines incompatible boundaries.

`Implicit mode`
: The part that matters most in practice. Edit a bundle and the bookkeeping stays current: [`generated`](/trust/generated-and-verified.md) refreshed, [`log.md`](/spec/log-file.md) appended, [indexes](/spec/index-file.md) regenerated, [links](/spec/cross-linking.md) added. This is the discipline described in [authoring a bundle](/practice/authoring-a-bundle.md), automated.

`A validator with zero dependencies`
: `okf-validate.mjs`. Errors on [the one rule](/spec/conformance.md), warns on the guidance, `--strict` for producers. See [validation](/practice/validation.md).

# Why a skill rather than a library

A library would need an SDK, which the [design principles](/spec/design-principles.md) rule out. A skill is instructions plus one script: the agent reads the spec and writes plain files, so nothing it produces depends on the skill being installed. A bundle authored with it is readable by an agent that has never heard of it.

It is also the clean division of labour between the two formats. This skill carries the method and no domain facts, and the bundles it writes carry the facts and no method. See [skills and procedures](/approaches/skills-and-procedures.md).

# Related

- [OKF Studio](/ecosystem/okf-studio.md) is the graphical counterpart for the same bundles.
- [okf-bundles](/ecosystem/okf-bundles-repo.md) is the corpus authored with this skill.

