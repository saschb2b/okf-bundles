## 2026-07-29

- **Migration (OKF v0.1 to v0.2)**: Root `index.md` now declares `okf_version: "0.2"`. Every concept's `timestamp` became `generated: { by, at }` with the datetime carried over unchanged and the actor named honestly as `claude-code/unrecorded` (agent-written; the specific model was never recorded per concept). Every `# Citations` body section became `sources` frontmatter entries with `resource` and `title`, and the body section was dropped. Deliberately not done: no `verified` events were backfilled, because none happened, and no blanket `status` or `stale_after` was added. Knowledge unchanged; run by `scripts/migrate-okf-v02.mjs`. Validator-clean under `--strict`.
- **Repair (graph)**: Removed the self-link in `techniques/spike.md`, which pointed the word "spike" at its own concept. A self-link is not a graph edge, so the connectivity gate counted it as broken. Prose otherwise unchanged.

## 2026-06-30

- **Update (graph)**: Repointed 5 concept links from folder `index.md` listings to representative concepts (the overview's category links and the INVEST reference), so the bundle is graph-clean: concept-to-concept links, no orphans. Content unchanged.

## 2026-06-18

- **Creation**: Bundled ticket-writing and slicing knowledge: four ticket smells, eleven techniques, six concepts, two playbooks, and six external references. Synthesized from the verified research behind the "Ticket Smells" blog post.
