---
type: Chain Mechanism
title: The Ethereum Virtual Machine (EVM)
description: A Turing-complete, deterministic state machine that executes smart-contract bytecode on every node.
resource: https://ethereum.org/en/developers/docs/evm/
tags: [ethereum, evm, smart-contract]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/developers/docs/evm/
    title: "Ethereum Virtual Machine (EVM) (Ethereum.org docs)"
---

# What it is

The EVM is "a decentralized virtual environment that executes code consistently and securely across all Ethereum nodes." It is a **state machine**, not merely a ledger: it is Ethereum's realization of the general-purpose [smart contract](/concepts/smart-contract.md). [1]

- A **stack machine** with a depth of 1024 items, each a 256-bit word (protocol constants). [1]
- Contracts compile to **bytecode** run via opcodes (`ADD`, `XOR`, and so on). Execution is **deterministic**: the same initial state and transactions produce the same result on every [node](/concepts/node.md), which is what lets the whole network agree via [consensus](/concepts/consensus.md). [1]
- Three storage layers: transient storage (per-transaction), memory (temporary), and persistent storage (a [Merkle Patricia trie](/concepts/merkle-tree.md) tied to the [account](/ethereum/accounts.md)). [1]

# Turing-complete, so it needs metering

Unlike [Bitcoin Script](/bitcoin/script.md), the EVM is Turing-complete: contracts can loop and express arbitrary logic. That power is why Ethereum must meter execution with [gas](/ethereum/gas.md), so a computation cannot run forever. High-level languages **Solidity** and **Vyper** compile down to EVM bytecode, and contracts freely call one another (**composability**, or "money legos"), which is what makes decentralized applications possible. [1]

# Why it matters

The Turing-complete EVM is the single feature that most separates Ethereum's ambition from Bitcoin's, turning a ledger into an application platform, at the cost of a larger attack surface from buggy contract code. The tradeoff is examined in [design philosophy](/comparison/design-philosophy.md).
