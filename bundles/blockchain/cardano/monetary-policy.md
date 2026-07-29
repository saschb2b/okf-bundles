---
type: Chain Mechanism
title: ADA monetary policy
description: A 45 billion ADA cap funded from a diminishing reserve that also feeds staking rewards and a treasury.
resource: https://docs.cardano.org/
tags: [cardano, ada, monetary-policy, treasury]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://docs.cardano.org/about-cardano/introduction/
    title: "Cardano monetary policy and ADA (docs.cardano.org)"
---

# The fixed cap and the reserve

Cardano's [native token](/concepts/native-token.md) is **ADA**, with a smallest unit of **1 Lovelace = 0.000001 ADA** (1 ADA = 1,000,000 Lovelace) and a hard **maximum supply of 45 billion ADA**. Like Bitcoin's [21 million cap](/bitcoin/monetary-policy.md), the ceiling is fixed by protocol, but the issuance mechanism is different. [1]

# How new ADA enters circulation

Not all 45 billion ADA were in circulation at launch. The remainder sits in a **reserve**, and each epoch a fraction of the reserve is released. That monetary expansion, plus [transaction fees](/concepts/gas-and-fees.md), is split into:

- **Staking rewards** paid to delegators and stake-pool operators (see [Ouroboros](/cardano/ouroboros.md)).
- A **treasury** that accumulates funds for ecosystem development, spent through on-chain [governance](/cardano/governance.md).

Because the reserve is drawn down by a percentage each epoch, issuance **diminishes over time** and asymptotically approaches the 45 billion cap, so rewards gradually shift from reserve-funded toward fee-funded, echoing the long-run [security-budget](/concepts/gas-and-fees.md) question Bitcoin faces.

# Why it matters

A fixed cap places Cardano nearer Bitcoin's "sound money" pole than Ethereum's uncapped, [burn-balanced supply](/ethereum/ether-monetary-policy.md), while the built-in treasury makes protocol-funded development a first-class, governed feature rather than an off-chain foundation activity.
