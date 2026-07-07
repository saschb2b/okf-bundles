---
type: Primitive
title: Smart contract
description: Code deployed to the chain that executes deterministically when called, enabling programmable money.
tags: [smart-contract, programmability, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

A smart contract is program code stored on the chain that runs exactly as written when a [transaction](/concepts/transaction.md) calls it. It has its own [account](/concepts/account-model.md), can hold funds, and enforces rules with no intermediary: an escrow that releases on a condition, a token, an exchange. "Code is law" in the narrow sense that the deployed code, not a company, decides the outcome.

# The spectrum of programmability

Chains differ sharply in how much computation they allow, and it is a deliberate tradeoff:

- **Limited scripting.** Bitcoin's [Script](/bitcoin/script.md) is intentionally not Turing-complete: no loops, bounded execution, small attack surface. It expresses signatures, multisig, and timelocks, but not arbitrary programs. The limitation is a security choice.
- **General computation.** Ethereum's [EVM](/ethereum/evm.md) is Turing-complete, so contracts can express arbitrary logic. This unlocks decentralized applications but requires [gas](/concepts/gas-and-fees.md) metering to bound execution and stop infinite loops.

# Why the model matters

General programmability is what turns a payment ledger into a platform, and it is the deepest reason Bitcoin and Ethereum feel like different kinds of system, a point developed in [design philosophy](/comparison/design-philosophy.md). It also enlarges the attack surface: bugs in contract code are exploitable and, because deployment is immutable, hard to fix.

# Citations

[1] [Bitcoin Script (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Script)
[2] [Introduction to smart contracts (Ethereum.org docs)](https://ethereum.org/en/developers/docs/smart-contracts/)
