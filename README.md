<div align="center">

# Sascha's Knowledge Bundles

**Expert knowledge, packaged as portable bundles your AI agent can read.**

[![Open Knowledge Format](https://img.shields.io/badge/format-OKF%20v0.1-0969da)](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
[![License](https://img.shields.io/badge/license-MIT-0969da)](./LICENSE)

</div>

A small, growing collection of knowledge bundles in the [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog) (OKF), Google's vendor-neutral spec for the context an AI agent needs. Each bundle is just markdown files with YAML frontmatter, kept in version control, readable by any agent with no SDK and no lock-in. Most are distilled from posts on [saschb2b.com/blog](https://saschb2b.com/blog): the same expert practice, shaped so an agent can read it directly instead of re-deriving it.

Where my [skills](https://github.com/saschb2b/skills) tell an agent _how to do_ something, these bundles tell it _what is true_ about a domain: the concepts, the patterns, the anti-patterns, and the sources behind them.

## Contents

- [What is an OKF bundle?](#what-is-an-okf-bundle)
- [Bundles](#bundles)
- [How an agent uses a bundle](#how-an-agent-uses-a-bundle)
- [Validate](#validate)
- [Authoring your own](#authoring-your-own)
- [License](#license)

## What is an OKF bundle?

A bundle is a directory of markdown _concept_ documents. Each concept is YAML frontmatter (one required field, `type`) plus a structural markdown body. A root `index.md` declares the format version and links the concepts into a graph an agent can navigate by progressive disclosure. That is the whole format: just markdown, just files, just frontmatter. The contract is the format, so any producer can write a bundle and any consumer (an agent, a viewer, a search index) can read it.

Read the spec: [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md). Background: [How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/).

## Bundles

| Bundle                                          | What it covers                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ticket-writing](./bundles/ticket-writing/index.md)** | Writing and slicing agile work items. Four ticket smells (the Iceberg, the Siamese Twins, the Tapper, the Boulder), the techniques that cure them (INVEST, vertical slicing, SPIDR, story splitting, spikes, Three Amigos, Example Mapping), the concepts behind them (planning fallacy, cone of uncertainty, curse of knowledge, flow metrics), two ready-to-run playbooks, and the primary sources. Distilled from [Ticket Smells](https://saschb2b.com/blog/ticket-smells). |

Start any bundle at its `index.md`, or read [bundles/ticket-writing/overview.md](./bundles/ticket-writing/overview.md) for the guided tour.

## How an agent uses a bundle

Point your agent at a bundle (clone the repo, or give it the raw GitHub URL of a bundle's `index.md`) and ask it to read the bundle to answer a question. A well-behaved consumer:

1. Starts at the bundle-root `index.md` and descends only the branches the question needs.
2. Follows links to assemble the relationship graph (a smell to its cure, a technique to the concept behind it).
3. Tolerates anything optional that is missing. The only hard guarantee is that every concept declares a `type`.

```bash
git clone https://github.com/saschb2b/okf-bundles
```

## Validate

Every bundle here is conformant to OKF v0.1. To check after editing:

```bash
node scripts/check-bundles.mjs                  # validate every bundle in the repo
node scripts/okf-validate.mjs bundles/ticket-writing   # validate one bundle
```

The checker errors only on the hard requirement (a concept missing frontmatter or a `type`) and warns on soft guidance (a broken cross-link, a non-ISO log date), mirroring how a permissive consumer reads a bundle.

## Authoring your own

The structure is reusable:

1. Create a folder under `bundles/` (`bundles/<bundle>/`).
2. Add a root `bundles/<bundle>/index.md` whose frontmatter declares `okf_version: "0.1"`. It is the only `index.md` allowed frontmatter.
3. Group concepts by domain in subfolders (`concepts/`, `techniques/`, and so on). Each concept is a markdown file whose frontmatter carries a non-empty `type`; body it with `#` sections and a `# Citations` block.
4. Link concepts with bundle-absolute links (`/techniques/invest.md`) and name the relationship in the prose.
5. Add a `log.md` and a row in the [Bundles](#bundles) table, then run `node scripts/check-bundles.mjs`.

See [CLAUDE.md](./CLAUDE.md) for the full conventions.

## License

MIT.
