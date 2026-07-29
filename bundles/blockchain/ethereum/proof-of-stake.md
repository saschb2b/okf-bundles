---
type: Chain Mechanism
title: Ethereum proof of stake and the Merge
description: Ethereum's PoS consensus (Gasper): 32-ETH validators, 12-second slots, and economic finality.
resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/
tags: [ethereum, proof-of-stake, the-merge, finality]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/roadmap/merge/
    title: "The Merge (Ethereum.org)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/
    title: "Proof-of-stake (Ethereum.org docs)"
  - resource: https://ethereum.org/en/roadmap/pectra/
    title: "Pectra upgrade (Ethereum.org)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/
    title: "Gasper (Ethereum.org docs)"
---

# The Merge

Ethereum launched under [proof of work](/concepts/proof-of-work.md) but switched to [proof of stake](/concepts/proof-of-stake.md) at **The Merge, executed September 15, 2022**, joining the original execution layer to the PoS **Beacon Chain** (which had launched December 1, 2020). [1] This cut issuance sharply, described in [ether monetary policy](/ethereum/ether-monetary-policy.md).

# How Ethereum's PoS works

| Parameter | Value | Type |
|-----------|-------|------|
| Slot time | 12 seconds | Protocol constant [2] |
| Epoch | 32 slots (6.4 min) | Protocol constant [2] |
| Validator stake (min) | 32 ETH | Protocol constant [2] |
| Max effective balance | 2048 ETH (opt-in, since Pectra) | Protocol constant [3] |
| Finality | ~2 epochs (~12.8 min), needs >=2/3 of staked ETH | Gasper [4] |

Each slot, one [validator](/concepts/node.md) is randomly chosen to propose a [block](/concepts/block.md) and a committee **attests** (votes on validity). Provably malicious acts, equivocating on proposals or casting contradictory attestations, trigger **slashing** that destroys part or all of the 32-ETH stake, penalties scaling with how many validators offend at once. [2]

# Economic finality (Gasper)

Ethereum's finality gadget, **Casper FFG** within the **Gasper** design, finalizes epoch-boundary checkpoints: a checkpoint is **justified** when >=2/3 of staked ETH votes for it and **finalized** when a further checkpoint is justified on top, roughly every two epochs. [4] This gives explicit [economic finality](/concepts/finality.md), stronger than Bitcoin's probabilistic settlement, the core contrast in [PoW vs PoS](/comparison/pow-vs-pos.md).
