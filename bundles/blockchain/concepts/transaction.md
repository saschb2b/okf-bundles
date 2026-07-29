---
type: Primitive
title: Transaction
description: A signed, authorized state change: moving value or invoking code on the ledger.
tags: [transaction, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin whitepaper (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/transactions/
    title: "Transactions (Ethereum.org docs)"
---

# What it is

A transaction is a message, signed with a [private key](/concepts/public-key-cryptography.md), that requests a change to the ledger: move value, or on some chains invoke [contract code](/concepts/smart-contract.md). It is broadcast to the network, held in the [mempool](/concepts/mempool.md) until a block producer includes it in a [block](/concepts/block.md), and pays a [fee](/concepts/gas-and-fees.md) for that inclusion.

# The two accounting models

How a transaction expresses "who owns what" is one of the deepest design forks between chains:

- **[UTXO model](/concepts/utxo-model.md)** (Bitcoin). A transaction consumes prior unspent outputs and creates new ones. There are no balances at the protocol level, only a set of spendable coins.
- **[Account model](/concepts/account-model.md)** (Ethereum). A transaction debits one account and credits another, mutating a global state of balances.

The consequences of this choice are drawn out in [UTXO vs account](/comparison/utxo-vs-account.md).

# Common fields

Regardless of model, a transaction carries a signature (authorization), a fee (priority to producers), and replay protection (a UTXO can only be spent once; an account uses an incrementing nonce). Validity is checked independently by every [node](/concepts/node.md).
