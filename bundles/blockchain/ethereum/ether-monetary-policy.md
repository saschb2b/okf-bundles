---
type: Chain Mechanism
title: Ether monetary policy
description: An uncapped supply set by validator issuance minus the EIP-1559 burn, the "ultrasound money" framing.
resource: https://ethereum.org/en/roadmap/merge/issuance/
tags: [ethereum, monetary-policy, issuance, ultrasound-money]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/roadmap/merge/issuance/
    title: "Issuance after the Merge (Ethereum.org)"
  - resource: https://ethereum.org/en/eth/supply/
    title: "ETH supply (Ethereum.org)"
---

# Issuance minus burn

Ether's [native-token](/concepts/native-token.md) supply has **no hard cap**, in deliberate contrast to Bitcoin's fixed [21 million](/bitcoin/monetary-policy.md). Instead, supply is a dynamic balance of two forces: [1]

- **Issuance.** Under [proof of stake](/ethereum/proof-of-stake.md), new ETH is minted only as validator rewards. The Merge cut issuance ~88%, from ~13,000 ETH/day under proof of work to ~1,700 ETH/day (these figures are approximate and depend on total ETH staked). [1]
- **Burn.** [EIP-1559](/ethereum/gas.md) burns the base fee of every transaction, removing ETH from supply in proportion to demand for block space.

Net issuance = validator issuance minus burn, so total supply grows when the chain is quiet and can shrink when it is busy. [2]

# "Ultrasound money," with a caveat

The framing that fee-burning can make ETH net-deflationary during high demand is called **"ultrasound money."** ethereum.org's illustration: an average ~16 gwei base fee for a day roughly offsets the ~1,700 ETH issued. [1] The caveat, worth stating in 2026: after [rollup](/ethereum/layer-2-rollups.md) data moved to cheap blobs, L1 base-fee burn fell, and net issuance has trended mildly positive. Treat any single "current inflation" number as time-varying, not a constant; the mechanism is fixed, the outcome is demand-dependent.

# Why it matters

Fixed scarcity versus dynamic, demand-linked supply is one of the sharpest economic contrasts between the two chains, developed in [design philosophy](/comparison/design-philosophy.md).
