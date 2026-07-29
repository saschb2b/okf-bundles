---
type: Chain Mechanism
title: Ouroboros proof of stake
description: Cardano's peer-reviewed PoS: delegated stake pools, liquid staking, and no slashing or lock-up.
resource: https://cardano.org/ouroboros/
tags: [cardano, ouroboros, proof-of-stake, staking]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://cardano.org/ouroboros/
    title: "Ouroboros (cardano.org)"
---

# What it is

Ouroboros is Cardano's [proof-of-stake](/concepts/proof-of-stake.md) protocol, notable as the first PoS design published with peer-reviewed security proofs. It has evolved through variants (Classic, BFT, Praos, Genesis), with **Praos** the production protocol. Time is divided into slots grouped into epochs, and a stake-weighted lottery selects which [validator](/concepts/node.md) may produce each [block](/concepts/block.md). [1]

# Stake pools and delegation

Rather than every holder running a validator, Cardano uses **stake pools**: operators run the infrastructure, and ADA holders **delegate** their stake to a pool to share in rewards. Selection probability is proportional to delegated stake, with **saturation** (a soft cap per pool) and **pledge** (operator's own stake) tuning the incentives toward many well-distributed pools. [1]

# What sets it apart from Ethereum's PoS

Two design choices distinguish Ouroboros from [Ethereum's proof of stake](/ethereum/proof-of-stake.md), and they are the sharpest contrasts:

- **No lock-up.** Delegated ADA is never bonded or frozen. It stays in the holder's wallet, fully liquid and spendable, while still earning rewards. Ethereum, by contrast, requires staking 32 ETH into a deposit contract.
- **No slashing.** Cardano does not destroy a misbehaving operator's stake; poor performance simply forgoes rewards. Ethereum uses slashing to punish provable faults.

These make participation lower-risk for ordinary holders, at the cost of the strong disincentives slashing provides, a tradeoff within the broader [PoW vs PoS](/comparison/pow-vs-pos.md) discussion.
