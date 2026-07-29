---
type: Accounting Model
title: Account model
description: A global state of balances that transactions mutate directly, the natural fit for stateful smart contracts.
tags: [account, accounting, ethereum, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/developers/docs/accounts/
    title: "Accounts (Ethereum.org docs)"
  - resource: https://ethereum.org/en/developers/docs/intro-to-ethereum/
    title: "Intro to Ethereum (Ethereum.org docs)"
---

# What it is

In the **account model**, the ledger is a global map from accounts to state (a balance, and for contracts also code and storage). A [transaction](/concepts/transaction.md) names a sender and recipient and mutates their entries directly: debit here, credit there. This mirrors how a bank ledger works, and unlike the [UTXO model](/concepts/utxo-model.md) there are explicit balances at the protocol level.

# Properties

- **Natural stateful contracts.** Because accounts hold persistent storage, an evolving [smart contract](/concepts/smart-contract.md) has a home for its state. This is why programmable chains favor the account model.
- **Replay protection via nonce.** Each account carries an incrementing **nonce** so the same transaction cannot be applied twice.
- **Simpler mental model, harder parallelism.** Balances are easy to reason about, but shared mutable state makes transactions that touch the same account inherently ordered.

# In practice, and the contrast

Ethereum is the canonical account chain, with two account kinds detailed in [Ethereum accounts](/ethereum/accounts.md). The tradeoffs against Bitcoin's UTXO approach, for privacy, parallelism, and programmability, are drawn out in [UTXO vs account](/comparison/utxo-vs-account.md).
