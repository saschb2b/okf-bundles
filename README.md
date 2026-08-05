<div align="center">

# Sascha's Knowledge Bundles

**Expert knowledge, packaged as portable bundles your AI agent can read.**

[![Open Knowledge Format](https://img.shields.io/badge/format-OKF%20v0.2-0969da)](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
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

Read the spec: [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md). Background: [How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/).

## Bundles

| Bundle                                          | What it covers                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[hello-okf](./bundles/hello-okf/index.md)** | **Start here if you are new.** The smallest bundle worth reading: five concepts answering one question a team keeps re-explaining, "how many active customers do we have?" The **metric** (what counts as active), the **policy** behind its 90-day window, the **table** it reads, the **sanctioned query** as an `Attested Computation`, and the **caveat** that makes naive counts wrong by ~8%. Flat, no subdirectories, no `verified` anywhere. Copy the directory with `cp -r` and replace the five files. Validates clean under `--strict`, so it is a proof rather than an illustration. Walked through concept by concept in [okf/practice/first-bundle.md](./bundles/okf/practice/first-bundle.md). |
| **[okf](./bundles/okf/index.md)** | The Open Knowledge Format itself, explained as a conformant OKF bundle. 63 concepts across six layers: **why context is the problem** (the context window as a desk, context assembly, the gap between world knowledge and yours, scattered surfaces, and why standards win with OSI, Xanadu, Gopher, and Markdown as evidence), **the current toolbox honestly** (prompt stuffing, fine-tuning, RAG with its four failure modes and how to run it alongside a bundle, the "bigger windows will fix it" objection, tools and MCP, Agent Skills, AGENTS.md-style briefing files, the LLM-wiki and second-brain lineage OKF descends from, data catalogs and semantic layers, knowledge graphs and ontologies, format versus protocol, OKF versus retrieval side by side), **the v0.2 spec worked through** (bundles, concept documents, concept IDs, core frontmatter, body conventions, cross-linking, index and log files, conformance, versioning, extensions, design principles, non-goals), **the trust layer** (`sources` with credibility signals, `generated` and `verified`, the three trust tiers, the actor convention, `status` and `stale_after`, attested computations, and verification versus attestation), **practice** (authoring and the bookkeeping that stops rot, consuming, progressive disclosure, validation, graph hygiene, migration from v0.1, external references, distribution, the Monday adoption path), and **the ecosystem** (Google's knowledge-catalog and sample bundles, the `okf` skill, OKF Studio, this repo at 62,000 files, how OKF stacks with `sitemap.xml`, `llms.txt` and ODSF, plus a measured August 2026 snapshot of adoption, the community tooling across five languages, the live spec debates and the governance gaps). Tracks the [v0.2 spec](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md), and cites the RAG paper, "Lost in the Middle", `agents.md`, MCP and `llms.txt` where the surrounding argument rests on published work. |
| **[ticket-writing](./bundles/ticket-writing/index.md)** | Writing and slicing agile work items. Four ticket smells (the Iceberg, the Siamese Twins, the Tapper, the Boulder), the techniques that cure them (INVEST, vertical slicing, SPIDR, story splitting, spikes, Three Amigos, Example Mapping), the concepts behind them (planning fallacy, cone of uncertainty, curse of knowledge, flow metrics), two ready-to-run playbooks, and the primary sources. Distilled from [Ticket Smells](https://saschb2b.com/blog/ticket-smells). |
| **[deutsches-recht](./bundles/deutsches-recht/index.md)** | Curated, source-cited knowledge of German law (what the law actually says), as concepts grounded in the statutory text at gesetze-im-internet.de and cited to each §. Grows area by area; covers so far: **legal method**; the **whole civil law** (all five BGB books: general part, obligations including sales, tenancy, tort, enrichment and special contracts, property, family, succession), plus **adult guardianship** (Betreuungsrecht, 2023 reform) and **commercial and company law** (HGB/GmbHG, including the 2024 MoPeG), **employment**, **residential tenancy** and **AGB control**; **criminal law** (general part, the core offences and criminal procedure StPO); **public law** (constitutional, general administrative, social); **disability and participation law** (SGB IX, AGG, BGG); **civil procedure** (ZPO, from the claim to enforcement) and **insolvency** (InsO, from the grounds for opening proceedings to discharge of residual debt); **EU law** (primacy, direct effect, the fundamental freedoms, the preliminary-ruling procedure; EUV/AEUV via EUR-Lex); **IT and IP law** (software copyright, licensing, data protection under the GDPR, the DDG telemedia duties, software and SaaS contracts); and **tax law** (the general fiscal code AO, income tax, VAT incl. the small-business rule, and company taxation). German-language; statutory rules and settled doctrine, not a substitute for a specialist check. |
| **[bgh-rechtsprechung](./bundles/bgh-rechtsprechung/index.md)** | A corpus of published Federal Court of Justice (BGH) decisions, one concept per decision (court, senate, date, docket, official citation, affected norms, and the public-domain Leitsatz/full text per § 5 UrhG). Sister bundle to deutsches-recht: that one holds the norm-organized doctrine, this one the decisions. Navigable by norm (which decisions interpret a given §), by senate/year, and by docket. Holds the published BGH corpus **2000–2026** (~60,600 decisions, all senates): 2010–2026 from the rii open data (~32,600, with structured norms), and 2000–2009 from the BGH decision database (bundesgerichtshof.de, ~27,900, extracted from PDF via a full sweep of every search page filtered by year — complete within the database's contents, ~2,100–3,300/year). Each concept carries metadata and, where present, the official Leitsatz, with the full text one link away (the slim form keeps the bundle ~170 MB rather than GBs of full text). Reproduced by `scripts/ingest-bgh-rechtsprechung.mjs`, `scripts/ingest-bgh-pdf.mjs`, and `scripts/build-rechtsprechung-index.mjs`. German-language. |
| **[business-model-anthropic](./bundles/business-model-anthropic/index.md)** | A distilled teardown of how [Anthropic](https://www.anthropic.com/) (the AI company behind Claude) makes money, as of mid-2026. Ten cross-linked concepts across six domains: **revenue** (five streams, ~80% usage-based API; per-token pricing by model tier), **market** (300,000+ business customers, coding as the standout segment; the safety-first positioning), **distribution** (direct plus cloud-marketplace resale and the hyperscaler equity-plus-compute partnerships), **moat** (frontier capability, secured multi-gigawatt compute, safety governance), **economics** (compute-dominated costs, lean headcount, margin dynamics), and **strategy** (public benefit corporation, the Long-Term Benefit Trust, the Series H at a ~$965B valuation, and the key bets). Figures are dated snapshots with source citations. The first of the `business-model-*` company teardowns. |
| **[business-model-nvidia](./bundles/business-model-nvidia/index.md)** | A distilled teardown of how NVIDIA makes money, as of mid-2026 (FY2026 ended Jan 25, 2026). Ten cross-linked concepts across the same six domains: **revenue** (market platforms, Data Center ~90% of a $215.9B FY2026; the shift from chips to rack-scale systems), **market** (hyperscaler demand and the customer-concentration risk, sovereign AI, gaming, automotive; the ~80%-share positioning), **distribution** (direct-to-hyperscaler, OEM/ODM partners, the CUDA developer flywheel, TSMC on the supply side), **moat** (CUDA lock-in, full-stack integration, annual cadence, networking, and the AMD/custom-silicon threats), **economics** (the fabless TSMC/CoWoS/HBM constraints, margins, capital returns), and **strategy** (the Hopper-Blackwell-Rubin cadence, networking, software, sovereign AI, robotics, and the OpenAI/Intel stakes, plus China export-control exposure). Figures labeled fiscal vs calendar and verified vs estimated, with source citations. |
| **[blockchain](./bundles/blockchain/index.md)** | A cross-linked knowledge base for understanding the most important blockchains **together**. Shared ideas live once as chain-agnostic **concepts** (hashing, signatures, Merkle trees, blocks, transactions, consensus with proof of work and proof of stake, the UTXO and account models, mempool, finality, forks, smart contracts, gas and fees, nodes, native tokens, the scalability trilemma); each chain describes only its own choices and links back to the primitive it implements, so **where and why the chains differ falls out of the graph**. Covers **Bitcoin** (peer-to-peer cash, proof of work, 21M cap, UTXO, Script, SegWit/Taproot, Lightning), **Ethereum** (the world computer, EVM, account model, gas/EIP-1559, proof of stake and the Merge, ETH issuance, layer-2 rollups), and **Cardano** (research-first PoS via Ouroboros, the EUTXO ledger, native tokens, Plutus, ADA's 45B cap, the hard fork combinator, Voltaire governance, and the full hard-fork history from Byron 2017 to van Rossem June 2026), plus explicit **comparisons** (UTXO vs account vs EUTXO, PoW vs PoS, design philosophy). 45 concepts, cited to primary sources (the Bitcoin whitepaper and BIPs, ethereum.org and the EIPs, cardano.org and the CIPs). Built to extend to more chains. |
| **[react](./bundles/react/index.md)** | The official React documentation ([react.dev](https://react.dev)) as an OKF bundle, one concept per page (162 in all). The **Learn guide** (get started, installation, setup, React Compiler, and the four core sections: Describing the UI, Adding Interactivity, Managing State, Escape Hatches) and the **full API Reference** (react Hooks, components, top-level and legacy APIs; react-dom components, hooks, and client, server and static rendering APIs; the React Compiler config and directives; the Rules of React and the eslint-plugin-react-hooks lints; React Server Components; React DevTools). Each concept carries its canonical react.dev URL in `resource` and a transformed, structural summary (signatures, parameters, returns, caveats) rather than a copy. React documentation prose is CC BY 4.0 and its code MIT, by Meta and the React contributors. |
| **[rezepte](./bundles/rezepte/index.md)** | A German-language recipe collection broken down to the individual ingredient and the individual technique, built so the graph reads **both ways**: a dish links its ingredients and the techniques it needs, and every ingredient links back to the dishes it appears in, so "what can I cook with what I have?" is answered by intersecting the `Wird verwendet in` sections (the method is in [Rückwärtssuche](./bundles/rezepte/guide/rueckwaertssuche.md)). **15 dishes** across six cuisines, most of them transcribed from personal Obsidian cooking notes and photos: the two curries ([Japanese](./bundles/rezepte/gerichte/japanisches-curry.md) with a homemade roux and [Indian](./bundles/rezepte/gerichte/chicken-curry-indisch.md) with coconut milk) side by side as counterparts, pan dishes (fried rice, tofu and broccoli, shrimp peanut noodles), rice dishes (paella with its socarrat, onigiri), handwork (jiaozi from scratch, sourdough rolls with a pre-bake-and-store method), batch cooking (freezer burritos, pulled beef) brownies and party pinwheels from fridge-section dough. Four layers underneath: shared **components** (curry roux, sushi rice, dumpling dough and filling), **ingredients** (one concept each, with varieties, buying, storage, kitchen handling and substitutes, in nine warengruppen), **techniques** (knife cuts, cooking methods, prep) and the **cuisines** as context. 138 concepts, 17 photos, sources cited per dish with the personal note marked `author: human:sascha`. German-language. |

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

Every bundle here is conformant to OKF v0.2. To check after editing:

```bash
node scripts/check-bundles.mjs                  # validate every bundle in the repo
node scripts/okf-validate.mjs bundles/ticket-writing   # validate one bundle
node scripts/okf-validate.mjs bundles/ticket-writing --strict   # add the producer gate
```

The checker errors only on the hard requirement (a concept missing frontmatter or a `type`) and warns on soft guidance (a broken cross-link, a non-ISO log date, an incomplete `sources` or `generated` entry), mirroring how a permissive consumer reads a bundle. Everything v0.2 added is optional, so none of it can be an error; `--strict` turns the connectivity and provenance guidance into a gate for producers.

## Authoring your own

The structure is reusable:

1. Create a folder under `bundles/` (`bundles/<bundle>/`).
2. Add a root `bundles/<bundle>/index.md` whose frontmatter declares `okf_version: "0.2"`. It is the only `index.md` allowed frontmatter.
3. Group concepts by domain in subfolders (`concepts/`, `techniques/`, and so on). Each concept is a markdown file whose frontmatter carries a non-empty `type`; body it with `#` sections, and record provenance in frontmatter: `generated: { by, at }` for who wrote it and when, `sources` for what it derives from. Do not fill `verified` unless someone actually confirmed the concept.
4. Link concepts with bundle-absolute links (`/techniques/invest.md`) and name the relationship in the prose.
5. Add a `log.md` and a row in the [Bundles](#bundles) table, then run `node scripts/check-bundles.mjs`.

See [CLAUDE.md](./CLAUDE.md) for the full conventions.

## License

MIT.
