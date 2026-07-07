---
type: Primitive
title: Merkle tree
description: A hash tree that summarizes many transactions into one root, enabling compact proofs of inclusion.
tags: [cryptography, data-structure, merkle, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

A Merkle tree pairs up [hashes](/concepts/cryptographic-hash.md) of [transactions](/concepts/transaction.md), hashes each pair, and repeats until a single **Merkle root** remains. That root goes into the [block](/concepts/block.md) header, committing to every transaction in the block with one 32-byte value.

# Why it matters

- **Tamper evidence.** Changing any transaction changes the root, so the block header alone commits to the full transaction set.
- **Compact inclusion proofs.** A **Merkle proof** shows a transaction is in a block using only the sibling hashes along one path (log n hashes), not the whole block. This is what lets lightweight clients verify payments without downloading everything (Bitcoin's SPV, "simplified payment verification").

# Where the chains differ

Bitcoin's block header contains one Merkle root over its transactions. Ethereum uses a richer structure, a **Merkle Patricia trie**, and its block header commits to multiple roots: the transactions, the receipts, and the global [account state](/ethereum/accounts.md). That state root is what lets Ethereum prove the balance or storage of any account at a given block.

# Citations

[1] [Bitcoin whitepaper, section 7 (Nakamoto, 2008)](https://bitcoin.org/bitcoin.pdf)
[2] [Merkle Patricia Trie (Ethereum.org docs)](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
