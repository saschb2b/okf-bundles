---
type: Primitive
title: Block and the blockchain
description: A batch of transactions cryptographically chained to its predecessor, forming an append-only ledger.
tags: [data-structure, block, ledger, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

A **block** bundles a set of [transactions](/concepts/transaction.md) with a header. The header contains a [Merkle root](/concepts/merkle-tree.md) over those transactions and the [hash](/concepts/cryptographic-hash.md) of the previous block. Because each block commits to its predecessor's hash, the blocks form a chain: the **blockchain**, an append-only ledger where rewriting an old block would require redoing every block after it.

# Why the chaining matters

The back-reference is what makes history expensive to alter. Combined with [consensus](/concepts/consensus.md), it means that to change a past transaction an attacker must out-produce the honest network from that point forward, which is what [proof of work](/concepts/proof-of-work.md) or [proof of stake](/concepts/proof-of-stake.md) makes costly. This is the source of a blockchain's immutability.

# Where the chains differ

- **Block time.** Bitcoin targets ~10 minutes per block via [difficulty adjustment](/bitcoin/mining.md); Ethereum produces a block every ~12-second slot under [proof of stake](/ethereum/proof-of-stake.md).
- **Contents.** A Bitcoin block is essentially a list of [UTXO](/concepts/utxo-model.md) transactions. An Ethereum block also carries the result of executing [smart contracts](/concepts/smart-contract.md), updating a global [state](/ethereum/accounts.md).
- **Size limits.** Bitcoin caps block weight; Ethereum meters blocks by a [gas](/concepts/gas-and-fees.md) limit rather than bytes.

New blocks first circulate as candidates and draw from the [mempool](/concepts/mempool.md) of pending transactions.

# Citations

[1] [Bitcoin whitepaper (Nakamoto, 2008)](https://bitcoin.org/bitcoin.pdf)
[2] [Blocks (Ethereum.org docs)](https://ethereum.org/en/developers/docs/blocks/)
