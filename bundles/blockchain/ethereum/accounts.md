---
type: Chain Mechanism
title: Ethereum accounts and state
description: Externally owned and contract accounts over a global state, Ethereum's alternative to Bitcoin's UTXOs.
resource: https://ethereum.org/en/developers/docs/accounts/
tags: [ethereum, accounts, state, account-model]
timestamp: 2026-07-07T16:00:00Z
---

# Two kinds of account

Ethereum is the canonical [account-model](/concepts/account-model.md) chain, with a **global state** mapping addresses to account objects that [transactions](/concepts/transaction.md) mutate directly. There are two account types: [1]

- **Externally owned accounts (EOAs)**, controlled by [private keys](/concepts/public-key-cryptography.md); they initiate transactions and are free to create.
- **Contract accounts**, controlled by [EVM](/ethereum/evm.md) code, with no private key; they act only in response to receiving a transaction, and creating one costs [gas](/ethereum/gas.md) because it uses storage.

# Account state

Every account has four protocol-defined fields: [1]

| Field | Meaning |
|-------|---------|
| `nonce` | Count of transactions sent (EOA) or contracts created; also the replay-protection counter |
| `balance` | Wei owned by the address |
| `codeHash` | Hash of the account's EVM code (empty for an EOA) |
| `storageRoot` | Root [hash](/concepts/merkle-tree.md) of the account's persistent storage trie |

# Why this shape

Persistent per-account storage is the natural home for an evolving [smart contract](/concepts/smart-contract.md)'s state, which is why programmable chains favor accounts over [UTXOs](/concepts/utxo-model.md). The cost is that shared mutable state serializes transactions touching the same account and makes privacy weaker (a reused address links activity). The full tradeoff is in [UTXO vs account](/comparison/utxo-vs-account.md).

# Citations

[1] [Accounts (Ethereum.org docs)](https://ethereum.org/en/developers/docs/accounts/)
