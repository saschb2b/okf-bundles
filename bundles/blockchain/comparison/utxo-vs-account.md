---
type: Comparison
title: UTXO vs account model
description: How Bitcoin's coin-based ledger and Ethereum's balance-based state lead to different capabilities.
tags: [comparison, utxo, account, accounting]
timestamp: 2026-07-07T16:00:00Z
---

# The fork in the road

The deepest structural difference between chains is how each represents "who owns what." Bitcoin uses the [UTXO model](/concepts/utxo-model.md): a ledger of discrete unspent coins. Ethereum uses the [account model](/concepts/account-model.md): a global map of balances and contract state. Cardano takes a third path, [Extended UTXO (EUTXO)](/cardano/eutxo.md), which keeps UTXO's shape but adds enough to run smart contracts. Everything downstream, privacy, parallelism, and smart contracts, follows from this choice.

# Side by side

| Dimension | UTXO ([Bitcoin](/bitcoin/utxo-transactions.md)) | EUTXO ([Cardano](/cardano/eutxo.md)) | Account ([Ethereum](/ethereum/accounts.md)) |
|-----------|--------------------------------|--------------------------|--------------------------|
| Unit of value | Discrete unspent outputs, spent whole | Outputs plus datum and script | Mutable account balances |
| Protocol-level balance | None; sum of spendable UTXOs | None; sum of UTXOs | Explicit `balance` field |
| Replay protection | A UTXO is spendable once | A UTXO is spendable once | Incrementing account nonce |
| Parallelism | High; independent UTXOs | High; independent UTXOs | Lower; shared state serializes |
| Privacy | Better; fresh address per output | Better; fresh address per output | Weaker; reused addresses link activity |
| Stateful contracts | Not supported; limited [Script](/bitcoin/script.md) | Supported via datums and [Plutus](/cardano/plutus.md) validators | Native; per-account storage suits the [EVM](/ethereum/evm.md) |
| Fees / outcome at submit | Predictable | Predictable (local determinism) | Non-deterministic; a call can fail mid-execution and still cost gas |

# Why it matters

The account model exists largely because Ethereum wanted rich [smart contracts](/concepts/smart-contract.md), and persistent account storage is the natural home for evolving contract state. Bitcoin accepted plain UTXO's inability to express contracts as the price of parallelism, privacy, and a smaller attack surface, fitting its minimalist [design philosophy](/comparison/design-philosophy.md). Cardano's EUTXO is the interesting middle: it argues you can have programmability **and** UTXO's determinism (validity and exact fees known before you submit), at the cost of a less familiar, output-centric way of architecting state. Neither is "better"; each is coherent with the chain's goals.

# Citations

[1] [Transactions (Bitcoin developer guide)](https://developer.bitcoin.org/devguide/transactions.html)
[2] [Accounts (Ethereum.org docs)](https://ethereum.org/en/developers/docs/accounts/)
