---
type: Primitive
title: Cryptographic hash function
description: A one-way function mapping arbitrary data to a fixed-size digest, the workhorse primitive of every blockchain.
tags: [cryptography, hashing, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/
    title: "Cryptographic hash functions (Ethereum.org docs)"
---

# What it is

A cryptographic hash function maps input of any size to a fixed-size output (a digest) with four properties that blockchains rely on:

- **Deterministic.** The same input always yields the same digest.
- **One-way (preimage resistant).** Given a digest, you cannot feasibly find an input that produces it.
- **Collision resistant.** You cannot feasibly find two inputs with the same digest.
- **Avalanche effect.** Changing one bit of input changes the output unpredictably and completely.

# Why blockchains depend on it

Hashing is the glue of the whole system, used in at least four places:

- **Chaining blocks.** Each [block](/concepts/block.md) commits to the previous block's hash, so altering an old block breaks every hash after it.
- **[Proof of work](/concepts/proof-of-work.md).** Mining is a search for an input whose hash falls below a target, only feasible by brute force because the function is one-way.
- **[Merkle trees](/concepts/merkle-tree.md).** Transactions are summarized into a single root hash.
- **Addresses and commitments.** [Public keys](/concepts/public-key-cryptography.md) are hashed to form addresses.

# Where the chains differ

Bitcoin uses **SHA-256** (applied twice, "double SHA-256") for block hashing, mining, and Merkle roots. Ethereum uses **Keccak-256** for hashing in the [EVM](/ethereum/evm.md) and for addresses. The choice is a design decision, not a correctness one: both are collision-resistant 256-bit functions.
