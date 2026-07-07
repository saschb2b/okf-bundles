---
type: Chain Mechanism
title: Plutus and Cardano smart contracts
description: Haskell-based on-chain scripts that validate spending in the EUTXO model, with Marlowe and newer languages.
resource: https://docs.cardano.org/
tags: [cardano, plutus, smart-contract, marlowe]
timestamp: 2026-07-07T16:00:00Z
---

# How contracts work on Cardano

Cardano's [smart contracts](/concepts/smart-contract.md) are **validator scripts** in the [EUTXO](/cardano/eutxo.md) model, not stateful objects that mutate global memory. When a [transaction](/concepts/transaction.md) tries to spend a script-locked output, the validator runs with three inputs, the output's **datum**, the spender's **redeemer**, and the transaction context, and returns true or false. This is a fundamentally different shape from an [Ethereum](/ethereum/evm.md) contract call. [1]

# The languages

- **Plutus** is the on-chain platform: validators are written in Haskell and compiled to **Plutus Core**, the low-level on-chain language. The Haskell lineage reflects Cardano's formal-methods philosophy.
- **Marlowe** is a domain-specific language for financial contracts, designed so non-programmers can express and reason about agreements safely.
- Newer languages such as **Aiken** have grown up to make EUTXO contract development more approachable.

# Contrast with the EVM

Ethereum's [EVM](/ethereum/evm.md) is a Turing-complete state machine where contracts hold and mutate their own storage. Cardano's model instead validates state transitions expressed as UTXO spends, which yields the [determinism and predictable fees](/cardano/eutxo.md) EUTXO is built for, but requires developers to think in terms of outputs and validators rather than mutable contract state. The two approaches are the smart-contract face of the broader [design-philosophy](/comparison/design-philosophy.md) split.

Programmability arrived with the **Alonzo** [hard fork](/cardano/hard-forks.md), which brought Plutus to mainnet.

# Citations

[1] [Learn about Plutus (docs.cardano.org)](https://docs.cardano.org/about-cardano/learn/plutus/)
