---
type: Chain Mechanism
title: Cardano governance (Voltaire)
description: On-chain governance under CIP-1694: DReps, a Constitutional Committee, SPOs, a constitution, and a treasury.
resource: https://docs.cardano.org/about-cardano/governance-overview
tags: [cardano, governance, voltaire, cip-1694]
timestamp: 2026-07-07T16:00:00Z
---

# On-chain governance by CIP-1694

Cardano's Voltaire era makes protocol change a matter of on-chain voting, defined by **CIP-1694** and activated in two [hard forks](/cardano/hard-forks.md): **Chang** (bootstrap, 2024-09-01) and **Plomin** (full, 2025-01-29). [1][2]

# Three governing bodies

Governance actions are decided by three bodies, and the threshold depends on the action's stakes:

- **DReps (Delegated Representatives).** ADA holders delegate voting power to a DRep (or vote directly, abstain, or vote no-confidence). Voting weight is by ADA stake, drawing on the same [liquid stake](/cardano/ouroboros.md) used for consensus.
- **Constitutional Committee (CC).** Checks each action against the Cardano constitution.
- **Stake Pool Operators (SPOs).** Vote on a subset of actions.

Most actions need **two of the three** bodies; **initiating a [hard fork](/cardano/hard-fork-combinator.md) or changing security-relevant parameters requires all three**. [3]

# The constitution and the treasury

An interim constitution governed the bootstrap phase; the updated **Cardano Constitution was ratified in late January 2025**, approved by DReps (well above the 75% threshold, sources cite ~85%) and the CC. [4] Spending from the on-chain **[treasury](/cardano/monetary-policy.md)** is itself a governance action requiring DRep and CC approval, which is how protocol-funded development is authorized.

# Why it matters

Voltaire is what let the [van Rossem hard fork](/cardano/hard-forks.md) be the first triggered by the community rather than the founding entity. Combined with the [hard fork combinator](/cardano/hard-fork-combinator.md), it gives Cardano a distinct answer to the [fork](/concepts/fork.md) and upgrade-governance question: change is proposed, voted, and enacted on-chain, then applied without a chain split. That contrasts with Bitcoin's off-chain [soft-fork](/bitcoin/upgrades.md) social consensus and Ethereum's core-developer-coordinated roadmap.

# Citations

[1] [CIP-1694 (cips.cardano.org)](https://cips.cardano.org/cip/CIP-1694)
[2] [Cardano hard forks (cardano.org)](https://cardano.org/hardforks/)
[3] [Governance overview (docs.cardano.org)](https://docs.cardano.org/about-cardano/governance-overview)
[4] [Updated Cardano Constitution: ratification outcome (Intersect, 2025)](https://www.intersectmbo.org/news/updated-cardano-constitution-ratification-outcome-and-effective-date)
