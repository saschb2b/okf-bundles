---
type: Primitive
title: Public-key cryptography and digital signatures
description: Keypairs and signatures let a holder prove ownership and authorize transactions without revealing the secret key.
tags: [cryptography, signatures, keys, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/accounts/
    title: "Accounts (Ethereum.org docs)"
---

# What it is

Every user holds a **keypair**: a private key kept secret and a public key derived from it. A **digital signature** made with the private key can be verified by anyone using the public key, proving the signer holds the private key without revealing it. Blockchains use this to authorize spending.

- **Private key -> public key** is one-way: the public key is safe to publish.
- **Address** is typically a [hash](/concepts/cryptographic-hash.md) of the public key, a shorter public identifier.
- A **signature** binds a specific message (a [transaction](/concepts/transaction.md)) to the key, so it cannot be reused for a different transaction.

# Why it matters

Ownership on a blockchain is simply control of a private key. Spending a coin means producing a valid signature over a transaction; [nodes](/concepts/node.md) verify the signature against the public key before accepting it. There is no account recovery: lose the key, lose the funds.

# Where the chains differ

Both Bitcoin and Ethereum use **ECDSA over the secp256k1 curve**. Bitcoin added **Schnorr signatures** with the [Taproot upgrade](/bitcoin/upgrades.md), enabling signature aggregation and better privacy. Ethereum's [accounts](/ethereum/accounts.md) come in two forms, one controlled directly by a key (an externally owned account) and one controlled by [contract code](/concepts/smart-contract.md).
