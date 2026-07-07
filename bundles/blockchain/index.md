---
okf_version: "0.1"
---

# Blockchain

A curated, cross-linked knowledge base for understanding the most important blockchains together. Shared ideas live once as chain-agnostic primitives; each chain describes only its own choices, linking back to the primitive it implements. So the differences between chains fall out of the graph: Bitcoin and Ethereum both point at [consensus](concepts/consensus.md), one to [proof of work](concepts/proof-of-work.md), the other to [proof of stake](concepts/proof-of-stake.md); Cardano points at proof of stake too but via a different design, and keeps Bitcoin's UTXO lineage while extending it.

Start here: [Overview](overview.md). Covers Bitcoin, Ethereum, and Cardano; built to extend to more chains.

# Shared concepts

- [The primitives every chain builds on](concepts/index.md) - Hashing, signatures, Merkle trees, blocks, transactions, consensus (proof of work and proof of stake), the UTXO and account models, mempool, finality, forks, smart contracts, gas and fees, nodes, native tokens, and the scalability trilemma.

# Chains

- [Bitcoin](bitcoin/index.md) - Peer-to-peer electronic cash secured by proof of work, with a fixed 21M supply.
- [Ethereum](ethereum/index.md) - The programmable "world computer": smart contracts under proof of stake.
- [Cardano](cardano/index.md) - A research-first proof-of-stake chain that extends UTXO to smart contracts (EUTXO) and pioneers on-chain governance.

# Comparisons

- [Where and why the chains differ](comparison/index.md) - UTXO vs account, proof of work vs proof of stake, and the overall design philosophy.
