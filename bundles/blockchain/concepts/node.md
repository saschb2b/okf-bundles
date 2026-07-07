---
type: Primitive
title: Node
description: A participant that stores the chain and independently validates every rule, the basis of decentralization.
tags: [node, decentralization, validation, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

A node is a computer running the chain's software. It holds a copy of the ledger, receives new [transactions](/concepts/transaction.md) and [blocks](/concepts/block.md), and independently checks every [consensus](/concepts/consensus.md) rule before accepting them. Crucially, a full node **trusts no one**: it verifies signatures, supply, and validity itself rather than believing a peer.

# Roles

- **Full node.** Validates and stores everything; the ultimate enforcer of the rules. A [51% attack](/concepts/proof-of-work.md) cannot make a full node accept an invalid transaction (an inflated supply, a forged signature); it can only reorder valid ones.
- **Block producer.** A [miner](/bitcoin/mining.md) (proof of work) or [validator](/ethereum/proof-of-stake.md) (proof of stake) that also proposes new blocks.
- **Light client.** Verifies [Merkle proofs](/concepts/merkle-tree.md) without storing the full chain, trading some assurance for low resource use.

# Why it matters

The number and distribution of independent full nodes is what "decentralization" concretely means: the more cheaply an ordinary user can run one, the harder the network is to capture or censor. Keeping node requirements low is a core value, and one arm of the [scalability trilemma](/concepts/scalability-trilemma.md), which is why chains resist simply raising block sizes.

# Citations

[1] [Bitcoin full node (Bitcoin.org)](https://bitcoin.org/en/full-node)
[2] [Nodes and clients (Ethereum.org docs)](https://ethereum.org/en/developers/docs/nodes-and-clients/)
