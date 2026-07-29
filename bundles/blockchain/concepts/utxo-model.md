---
type: Accounting Model
title: UTXO model
description: A ledger of discrete unspent coins consumed and recreated by each transaction, with no protocol-level balances.
tags: [utxo, accounting, bitcoin, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin whitepaper, section 9 (Nakamoto, 2008)"
  - resource: https://developer.bitcoin.org/devguide/transactions.html
    title: "Bitcoin developer guide: transactions"
---

# What it is

In the **unspent transaction output (UTXO)** model, the ledger is a set of discrete coins. A [transaction](/concepts/transaction.md) consumes ("spends") one or more existing UTXOs as inputs and creates new UTXOs as outputs. A UTXO is spent entirely, so any excess returns to the sender as a "change" output. There is no notion of an account balance at the protocol level; a wallet's balance is just the sum of the UTXOs it can spend.

# Properties

- **Statelessness of coins.** Each UTXO is independent, which makes validation parallelizable and replay trivial to prevent (a UTXO can only be spent once).
- **Privacy.** New addresses per output make linking harder than a single reused account.
- **Awkward for rich state.** Expressing an evolving contract's state is unnatural, which is why UTXO chains keep [scripting](/bitcoin/script.md) limited.

# In practice, and the contrast

Bitcoin is the canonical UTXO chain; see [Bitcoin's UTXO transactions](/bitcoin/utxo-transactions.md). The alternative is the [account model](/concepts/account-model.md) used by Ethereum, where transactions mutate balances directly. The two are compared, with their consequences for privacy, scaling, and smart contracts, in [UTXO vs account](/comparison/utxo-vs-account.md).
