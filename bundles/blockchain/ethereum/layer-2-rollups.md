---
type: Chain Mechanism
title: Layer-2 rollups and blobs
description: Ethereum's scaling strategy: execute off-chain, post data to L1, and inherit its security.
resource: https://ethereum.org/en/developers/docs/scaling/
tags: [ethereum, layer-2, rollups, eip-4844, danksharding]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/developers/docs/scaling/
    title: "Scaling and rollups (Ethereum.org docs)"
  - resource: https://ethereum.org/en/roadmap/dencun/
    title: "Dencun upgrade (Ethereum.org)"
  - resource: https://ethereum.org/en/roadmap/scaling/
    title: "Scaling roadmap (Ethereum.org)"
---

# Scale off-chain, secure on-chain

Ethereum's primary answer to the [scalability trilemma](/concepts/scalability-trilemma.md) is **layer-2 rollups**: they batch many transactions off-chain and post the data to L1. Because that data lands in L1 [blocks](/concepts/block.md), rollups **inherit Ethereum's security** rather than bootstrapping their own. [1] This keeps the base layer conservative and cheap to run a [node](/concepts/node.md) on, while throughput grows on top, the same off-base-layer strategy as Bitcoin's [Lightning Network](/bitcoin/lightning-network.md), reached from a different direction.

# Two rollup types

- **Optimistic rollups** assume batches are valid and rely on **fraud proofs** during a challenge window. [1]
- **ZK (validity) rollups** run computation off-chain and submit a **validity proof** to L1, so correctness is proven rather than assumed. [1]

# Blobs: EIP-4844

The **Dencun** upgrade (activated March 13, 2024) shipped **EIP-4844 / proto-danksharding**, adding a blob-carrying transaction type. Blobs are cheap, temporary data (retained ~18 days) that rollups use instead of permanent calldata, since over 90% of a rollup user's cost was data storage. [2] Cutting that cost is why blobs sharply lowered L2 fees, and, as a side effect, reduced the L1 base-fee burn noted in [ether monetary policy](/ethereum/ether-monetary-policy.md).

# The road ahead

**Danksharding** is the full form, adding data-availability sampling to scale blob capacity far further. [3] The scaling work sits within Ethereum's broader roadmap (Vitalik's canonical phases: the Merge, Surge, Scourge, Verge, Purge, Splurge), though the live roadmap is now organized around goals and dated upgrades (Dencun, Pectra, and later Fusaka) rather than those phase labels. [3]
