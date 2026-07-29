---
type: Chain Mechanism
title: Lightning Network
description: Bitcoin's layer-2 scaling via bidirectional off-chain payment channels settled on the base chain.
resource: https://lightning.network/lightning-network-paper.pdf
tags: [bitcoin, lightning, layer-2, scaling]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://lightning.network/lightning-network-paper.pdf
    title: "The Bitcoin Lightning Network (Poon & Dryja, 2016)"
---

# What it is

The Lightning Network is Bitcoin's main layer-2, proposed by Joseph Poon and Thaddeus Dryja (2015/2016). Two parties fund a 2-of-2 multisig channel with one on-chain [transaction](/bitcoin/utxo-transactions.md), then exchange an unbounded number of instant, low-fee payments **off-chain**, settling to the base chain only when they open or close the channel. [1]

# How it stays safe

- **Penalty mechanism.** Old channel states are deterred by a rule that lets a cheated counterparty claim the cheater's entire balance, so publishing a stale state is self-defeating. [1]
- **Routing via HTLCs.** Payments hop across connected channels using hash-time-locked contracts, so two parties need not share a direct channel. This leans on the timelock primitives in [Bitcoin Script](/bitcoin/script.md), which [SegWit](/bitcoin/upgrades.md) made practical by fixing malleability.
- **Inherited security.** Channels ultimately settle on the base chain, so Lightning borrows Bitcoin's [proof-of-work](/concepts/proof-of-work.md) security for final settlement.

# Why it matters

Lightning is Bitcoin's answer to the [scalability trilemma](/concepts/scalability-trilemma.md): rather than enlarge blocks and raise [node](/concepts/node.md) costs, it moves high-volume, low-value payments off the base layer. This mirrors, from a different starting point, Ethereum's choice to scale via [layer-2 rollups](/ethereum/layer-2-rollups.md).
