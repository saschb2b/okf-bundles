---
type: Chain Overview
title: Cardano
description: A research-first proof-of-stake blockchain that extends the UTXO model to smart contracts via EUTXO.
resource: https://cardano.org/
tags: [cardano, overview]
timestamp: 2026-07-07T16:00:00Z
---

# What Cardano is

Cardano is a proof-of-stake blockchain founded by Charles Hoskinson and built by IOHK (now IOG), with the Byron mainnet launched in September 2017. Its distinguishing method is research-first engineering: peer-reviewed protocols and formal methods, implemented in Haskell, aiming to be a "third-generation" chain addressing scalability, interoperability, and sustainability. [1]

# Where it sits between Bitcoin and Ethereum

Cardano is interesting precisely because it does not sit at either pole of the [design-philosophy](/comparison/design-philosophy.md) axis:

- Like Bitcoin, it uses a [UTXO ledger](/concepts/utxo-model.md), but **extends** it ([EUTXO](/cardano/eutxo.md)) so it can run [smart contracts](/concepts/smart-contract.md), which plain Bitcoin cannot.
- Like Ethereum, it is [proof of stake](/concepts/proof-of-stake.md), but via a different, provably secure design ([Ouroboros](/cardano/ouroboros.md)) with no slashing and no lock-up.

# The design in one view

- **[Ouroboros](/cardano/ouroboros.md).** Peer-reviewed [proof of stake](/concepts/proof-of-stake.md); liquid staking by delegation.
- **[EUTXO](/cardano/eutxo.md).** The [UTXO model](/concepts/utxo-model.md) extended with datums and scripts.
- **[Native tokens](/cardano/native-tokens.md).** Multi-asset ledger; tokens are first-class, no contract needed to mint.
- **[Plutus](/cardano/plutus.md).** Haskell-based [smart contracts](/concepts/smart-contract.md) in the EUTXO model.
- **[Monetary policy](/cardano/monetary-policy.md).** A 45 billion ADA cap with a reserve-and-treasury model.
- **[Governance](/cardano/governance.md)** and the **[hard fork combinator](/cardano/hard-fork-combinator.md).** On-chain governance and smooth, non-splitting [forks](/concepts/fork.md), traced through its [hard-fork history](/cardano/hard-forks.md).

# Development eras

Cardano's roadmap is organized into five eras named after historical figures: **Byron** (foundation), **Shelley** (decentralization/staking), **Goguen** (smart contracts), **Basho** (scaling), and **Voltaire** (governance). Each is delivered incrementally through [hard forks](/cardano/hard-forks.md). [1]

# Citations

[1] [Cardano (cardano.org)](https://cardano.org/)
