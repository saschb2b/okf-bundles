---
type: Primitive
title: The scalability trilemma
description: The claim that a blockchain struggles to maximize decentralization, security, and scalability at once.
tags: [trilemma, scalability, decentralization, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# The idea

The scalability trilemma, popularized by Vitalik Buterin, holds that a blockchain wants three things and can easily have only two at full strength:

- **Decentralization.** Many independent [nodes](/concepts/node.md), each cheap enough for ordinary users to run.
- **Security.** Costly to attack, via [proof of work](/concepts/proof-of-work.md) or [proof of stake](/concepts/proof-of-stake.md).
- **Scalability.** High transaction throughput.

The tension: the naive way to scale (bigger [blocks](/concepts/block.md), more computation per block) raises the cost of running a node, which pushes out small operators and erodes decentralization.

# How the two chains respond

- **Bitcoin** prioritizes decentralization and security, keeping blocks small so nodes stay cheap, and pushes throughput to layer 2 like the [Lightning Network](/bitcoin/lightning-network.md).
- **Ethereum** keeps L1 conservative and scales through [layer-2 rollups](/ethereum/layer-2-rollups.md) that execute off-chain while inheriting L1 security, with [data blobs](/ethereum/layer-2-rollups.md) making that data cheap.

Both, notably, answer the trilemma by moving scale off the base layer rather than enlarging it, a shared strategic conclusion from different starting philosophies. The contrast is drawn out in [PoW vs PoS](/comparison/pow-vs-pos.md) and [design philosophy](/comparison/design-philosophy.md).

# Citations

[1] [The scalability trilemma (Ethereum.org docs)](https://ethereum.org/en/developers/docs/scaling/)
[2] [Vitalik Buterin on the trilemma (Ethereum Foundation)](https://vitalik.eth.limo/general/2021/04/07/sharding.html)
