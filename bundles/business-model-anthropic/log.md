## 2026-07-29

- **Migration (OKF v0.1 to v0.2)**: Root `index.md` now declares `okf_version: "0.2"`. Every concept's `timestamp` became `generated: { by, at }` with the datetime carried over unchanged and the actor named honestly as `claude-code/unrecorded` (agent-written; the specific model was never recorded per concept). Every `# Citations` body section became `sources` frontmatter entries with `resource` and `title`, and the body section was dropped. Deliberately not done: no `verified` events were backfilled, because none happened, and no blanket `status` or `stale_after` was added. Knowledge unchanged; run by `scripts/migrate-okf-v02.mjs`. Validator-clean under `--strict`.

## 2026-07-07

* **Creation**: Started the Anthropic business-model bundle. Scaffolded the root index and the revenue, market, distribution, moat, economics, and strategy domains.
