---
type: Chain Mechanism
title: Bitcoin mining and difficulty
description: Bitcoin's proof of work: double-SHA-256, a ~10-minute target, and difficulty retargeting every 2016 blocks.
resource: https://en.bitcoin.it/wiki/Difficulty
tags: [bitcoin, mining, proof-of-work, difficulty]
timestamp: 2026-07-07T16:00:00Z
---

# How mining works

Bitcoin implements [proof of work](/concepts/proof-of-work.md). A miner assembles candidate transactions from the [mempool](/concepts/mempool.md) into a [block](/concepts/block.md) and varies a nonce until the header's **double SHA-256** [hash](/concepts/cryptographic-hash.md) is below the current target. Finding such a nonce is brute-force and costly; verifying it is instant. [1]

# Key parameters

| Parameter | Value | Rule type |
|-----------|-------|-----------|
| Block-time target | ~10 minutes | Target/average, not a hard rule; steered only over the long run [1] |
| Difficulty retarget | Every 2016 blocks (~2 weeks at target) | Hard consensus rule; clamped to a 0.25x to 4x change per period [1] |
| Hash function | SHA-256, applied twice | Protocol [1] |

The ~10-minute figure is an average: actual inter-block times follow a roughly exponential distribution. Only the 2016-block retarget interval is a hard rule, adjusting difficulty up when blocks came too fast and down when too slow. [1]

# The fork-choice and its failure mode

Nodes follow the chain with the greatest cumulative work ([Nakamoto consensus](/concepts/consensus.md)), so [finality](/concepts/finality.md) is probabilistic and strengthens with each confirmation (~6 is the common settlement convention). A miner with a majority of hash power can mount a **51% attack** to reorder recent blocks and double-spend, but [full nodes](/concepts/node.md) still reject invalid blocks, so an attacker cannot forge signatures, steal arbitrary coins, or change the [supply cap](/bitcoin/monetary-policy.md). [1]

# Citations

[1] [Difficulty (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Difficulty)
[2] [Bitcoin whitepaper, sections 4-5 (Nakamoto, 2008)](https://bitcoin.org/bitcoin.pdf)
