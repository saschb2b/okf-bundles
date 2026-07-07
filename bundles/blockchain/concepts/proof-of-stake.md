---
type: Consensus Mechanism
title: Proof of stake
description: Sybil resistance by capital at risk: validators stake tokens and are penalized for misbehavior.
tags: [consensus, proof-of-stake, staking, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

Proof of stake ties block-production rights to **capital locked as collateral** rather than energy spent. Validators deposit ("stake") the chain's [native token](/concepts/native-token.md); the protocol selects them to propose and attest to [blocks](/concepts/block.md) in proportion to their stake. Honest work earns rewards; provably dishonest work is punished by **slashing** the stake. That threat of losing capital is the [Sybil resistance](/concepts/consensus.md).

# Key properties

- **No energy race.** Security comes from staked value, not hardware, so the cost is financial rather than physical.
- **Explicit finality.** Many proof-of-stake designs add a finality gadget so blocks become **economically final** (irreversible unless a large fraction of stake is destroyed), a stronger guarantee than the [probabilistic finality](/concepts/finality.md) of proof of work.
- **Slashing and penalties** align incentives: an attacker's stake is at risk in a way a proof-of-work attacker's hardware is not.
- **New tradeoffs.** Critics raise "nothing at stake," capital centralization, and weaker liveness under censorship; the debate is in [PoW vs PoS](/comparison/pow-vs-pos.md).

# In practice

Ethereum's [proof-of-stake system](/ethereum/proof-of-stake.md) (adopted at the Merge) is the largest example: validators stake 32 ETH, attest each slot, and the chain finalizes roughly every two epochs. It replaced the [proof of work](/concepts/proof-of-work.md) Ethereum launched with. Cardano's [Ouroboros](/cardano/ouroboros.md) is a different realization of the same idea, notable for being peer-reviewed and for using delegated stake pools with **no slashing and no lock-up**, a reminder that "proof of stake" names a family of designs, not one mechanism.

# Citations

[1] [Proof-of-stake (Ethereum.org docs)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)
[2] [Gasper: Casper FFG + LMD-GHOST (Ethereum.org)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/)
