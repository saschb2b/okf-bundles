---
type: Bundle Overview
title: Blockchain bundle at a glance
description: Shared blockchain primitives plus per-chain concepts, so the differences between chains fall out of the graph.
tags: [blockchain, bitcoin, ethereum, overview]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
---

# What this bundle is

A curated, cross-linked knowledge base for understanding the most important blockchains together, not in isolation. The design principle: the ideas every chain shares live once as chain-agnostic **[primitives](/concepts/consensus.md)**, and each chain describes only its own choices, linking back to the primitive it implements. The result is that "where and why the chains differ" is visible in the graph itself.

# How to read it

- **[Shared concepts](/concepts/cryptographic-hash.md).** The primitives every chain builds on: [hashing](/concepts/cryptographic-hash.md), [signatures](/concepts/public-key-cryptography.md), [Merkle trees](/concepts/merkle-tree.md), [blocks](/concepts/block.md), [transactions](/concepts/transaction.md), [consensus](/concepts/consensus.md) with [proof of work](/concepts/proof-of-work.md) and [proof of stake](/concepts/proof-of-stake.md), the [UTXO](/concepts/utxo-model.md) and [account](/concepts/account-model.md) models, [mempool](/concepts/mempool.md), [finality](/concepts/finality.md), [forks](/concepts/fork.md), [smart contracts](/concepts/smart-contract.md), [gas and fees](/concepts/gas-and-fees.md), [nodes](/concepts/node.md), the [native token](/concepts/native-token.md), and the [scalability trilemma](/concepts/scalability-trilemma.md).
- **Per-chain concepts.** [Bitcoin](/bitcoin/overview.md), [Ethereum](/ethereum/overview.md), and [Cardano](/cardano/overview.md), each a folder of specific choices linking back to the shared primitives.
- **Comparisons.** The payoff: [UTXO vs account](/comparison/utxo-vs-account.md), [proof of work vs proof of stake](/comparison/pow-vs-pos.md), and the overall [design philosophy](/comparison/design-philosophy.md).

# The one-line contrast

Bitcoin is minimalist [sound money](/bitcoin/monetary-policy.md); Ethereum is a programmable [world computer](/ethereum/overview.md); Cardano is a research-first chain that keeps Bitcoin's [UTXO lineage](/cardano/eutxo.md) while adding Ethereum-style programmability under a different [proof-of-stake design](/cardano/ouroboros.md). Almost every technical difference is downstream of these stances, as [design philosophy](/comparison/design-philosophy.md) draws out. The bundle is built to extend: adding a chain means adding a folder that links into the same shared primitives.

# A note on accuracy

Technical facts are cited to primary sources (the Bitcoin whitepaper and BIPs, ethereum.org and the EIPs). Fast-moving or demand-dependent values (Ethereum's net issuance, roadmap dates) are flagged as such rather than asserted as constants.
