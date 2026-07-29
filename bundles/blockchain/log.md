## 2026-07-29

- **Migration (OKF v0.1 to v0.2)**: Root `index.md` now declares `okf_version: "0.2"`. Every concept's `timestamp` became `generated: { by, at }` with the datetime carried over unchanged and the actor named honestly as `claude-code/unrecorded` (agent-written; the specific model was never recorded per concept). Every `# Citations` body section became `sources` frontmatter entries with `resource` and `title`, and the body section was dropped. Deliberately not done: no `verified` events were backfilled, because none happened, and no blanket `status` or `stale_after` was added. Knowledge unchanged; run by `scripts/migrate-okf-v02.mjs`. Validator-clean under `--strict`.

## 2026-07-07

* **Update**: Added the `cardano/` chain folder (9 concepts): overview, Ouroboros, EUTXO, native tokens, Plutus, ADA monetary policy, the hard fork combinator, Voltaire governance, and the full hard-fork history through van Rossem (2026-06-18). Made `comparison/utxo-vs-account` three-way with EUTXO, added a Cardano section to `comparison/design-philosophy`, and threaded Cardano into the shared `proof-of-stake` and `fork` primitives. Extended the root index and overview.
* **Creation**: Started the blockchain bundle. Scaffolded the shared `concepts/` primitives layer and the first two chain folders, `bitcoin/` and `ethereum/`, plus a `comparison/` area for explicit contrasts. Design: chain-agnostic primitives live once; each chain links back to them so the differences fall out of the graph.
