---
type: Chain Mechanism
title: Bitcoin UTXO transactions
description: How Bitcoin transactions consume prior outputs and create new ones, with change and implicit fees.
resource: https://developer.bitcoin.org/devguide/transactions.html
tags: [bitcoin, utxo, transactions, fees]
timestamp: 2026-07-07T16:00:00Z
---

# Bitcoin's realization of the UTXO model

Bitcoin is the canonical [UTXO chain](/concepts/utxo-model.md). A [transaction](/concepts/transaction.md) has inputs and outputs:

- **Inputs** each reference a specific earlier unspent output by transaction id and index, and supply a signature ([Script](/bitcoin/script.md)) proving the right to spend it.
- **Outputs** are new UTXOs, each locked to a condition (usually a [public-key hash](/concepts/public-key-cryptography.md)).
- Outputs are consumed **whole**, so a payment smaller than the input returns the remainder as an explicit **change output**. [1]

There is no account or balance in the protocol; a wallet's balance is just the sum of UTXOs it can spend. [1]

# Fees and the mempool

The fee is implicit: **fee = total inputs minus total outputs**, with no named fee field. Miners rank transactions by fee rate (satoshis per virtual byte), so when the [mempool](/concepts/mempool.md) is congested, fee rates rise and low-fee transactions wait. This is the [fee market](/concepts/gas-and-fees.md) in its simplest form, pricing bytes rather than computation. [2]

# Why this shape

Independent, single-use outputs make validation parallel and replay trivial to prevent, and they favor address reuse avoidance for privacy. The cost is that expressing evolving contract state is awkward, which is one reason Bitcoin keeps [scripting](/bitcoin/script.md) limited. The tradeoffs against Ethereum's [account model](/concepts/account-model.md) are in [UTXO vs account](/comparison/utxo-vs-account.md).

# Citations

[1] [Transactions (Bitcoin developer guide)](https://developer.bitcoin.org/devguide/transactions.html)
[2] [Transaction fees (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Transaction_fees)
