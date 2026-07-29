---
type: Chain Mechanism
title: Bitcoin Script
description: A stack-based, intentionally non-Turing-complete language for expressing spending conditions.
resource: https://en.bitcoin.it/wiki/Script
tags: [bitcoin, script, smart-contract]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://en.bitcoin.it/wiki/Script
    title: "Script (Bitcoin Wiki)"
  - resource: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    title: "BIP341: Taproot (bitcoin/bips)"
---

# What it is

Bitcoin Script is a **stack-based, Forth-like** language executed to validate whether a [transaction](/bitcoin/utxo-transactions.md) may spend an output. It is Bitcoin's form of a [smart contract](/concepts/smart-contract.md), but deliberately constrained. [1]

# Deliberately not Turing-complete

Script has conditionals but **no loops and no unbounded recursion**, so every script provably halts. [1] This is the key design decision: it eliminates infinite-loop and denial-of-service risk and keeps validation cheap and predictable, which is why Bitcoin needs no [gas](/concepts/gas-and-fees.md) metering. The price is expressiveness: it cannot represent arbitrary programs the way Ethereum's [EVM](/ethereum/evm.md) can.

- **Can express:** signature checks, multisignature (M-of-N), hash-preimage locks, absolute and relative timelocks (CLTV/CSV), and combinations, enabling escrows and payment channels. [1]
- **Cannot express:** loops, arbitrary evolving state, or reading external data.

# Common output types

- **P2PKH**, pay to a [public-key hash](/concepts/public-key-cryptography.md), the original standard.
- **P2SH**, pay to a script hash, revealed at spend time; made complex contracts and multisig practical.
- **P2WPKH**, the [SegWit](/bitcoin/upgrades.md) native form, moving the signature to the witness.
- **P2TR**, [Taproot](/bitcoin/upgrades.md), spendable by a single Schnorr signature (key path) or a revealed script branch. [1]
