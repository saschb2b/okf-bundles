---
type: Primitive
title: Forks
description: Divergences in the chain or its rules, from momentary reorgs to permanent protocol splits.
tags: [fork, governance, upgrade, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://en.bitcoin.it/wiki/Softfork
    title: "Soft fork and hard fork (Bitcoin Wiki)"
  - resource: https://ethereum.org/en/history/
    title: "Ethereum upgrades and forks (Ethereum.org docs)"
---

# Two very different meanings

"Fork" covers two things that are worth separating.

**Temporary forks (reorgs).** Two valid [blocks](/concepts/block.md) can be found at nearly the same time, so the network briefly holds two candidate tips. The [consensus](/concepts/consensus.md) fork-choice rule resolves this: one branch wins and the other's blocks are orphaned. This is normal and is why [finality](/concepts/finality.md) takes time.

**Protocol forks (rule changes).** A change to the protocol rules, governance in action:

- **Soft fork.** A tightening of the rules that old nodes still accept as valid, so it is backward compatible. Bitcoin's [SegWit and Taproot](/bitcoin/upgrades.md) were soft forks.
- **Hard fork.** A change old nodes reject, so all nodes must upgrade. If part of the community refuses, the chain splits permanently into two coins (Bitcoin/Bitcoin Cash in 2017; Ethereum/Ethereum Classic after the 2016 DAO fork).

# Why it matters

Forks are how a decentralized system with no central authority upgrades itself, and how disputes ultimately get resolved: by whoever runs the software. The contrasting upgrade cultures, Bitcoin's conservative soft-fork norm versus Ethereum's scheduled hard-fork roadmap, are part of the [design-philosophy comparison](/comparison/design-philosophy.md). Cardano adds a third stance: its [hard fork combinator](/cardano/hard-fork-combinator.md) makes hard forks routine and non-splitting, coordinated through [on-chain governance](/cardano/governance.md) rather than social consensus.
