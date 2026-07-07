---
type: Primitive
title: Mempool
description: The pool of validated but unconfirmed transactions waiting to be included in a block.
tags: [mempool, fees, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

When a [transaction](/concepts/transaction.md) is broadcast, each [node](/concepts/node.md) validates it and holds it in a **memory pool (mempool)** of pending transactions. Block producers select from the mempool when they build the next [block](/concepts/block.md), typically choosing the transactions offering the highest [fee](/concepts/gas-and-fees.md) per unit of space.

# Why it matters

The mempool is where the **fee market** happens. When demand for block space exceeds supply, users bid up fees to be included sooner, and low-fee transactions wait. It is also the surface for phenomena like fee estimation, replace-by-fee, and, on smart-contract chains, **MEV** (maximal extractable value), where producers reorder or insert transactions for profit.

# Where the chains differ

Bitcoin's mempool holds [UTXO](/concepts/utxo-model.md) transactions ranked by satoshis per virtual byte. Ethereum's holds [account-model](/concepts/account-model.md) transactions ranked by fee under [EIP-1559](/ethereum/gas.md), and its rich contract interactions make MEV a much larger concern. There is no single global mempool; each node's view differs slightly.

# Citations

[1] [Bitcoin developer guide: transactions](https://developer.bitcoin.org/devguide/transactions.html)
[2] [Transactions and the mempool (Ethereum.org docs)](https://ethereum.org/en/developers/docs/transactions/)
