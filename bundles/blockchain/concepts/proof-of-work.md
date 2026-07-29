---
type: Consensus Mechanism
title: Proof of work
description: Sybil resistance by spending energy: producers race to find a hash below a target.
tags: [consensus, proof-of-work, mining, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin whitepaper, section 4 (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/
    title: "Proof-of-work (Ethereum.org docs)"
---

# What it is

Proof of work makes block production costly by requiring producers ("miners") to find a nonce such that the [block](/concepts/block.md) header's [hash](/concepts/cryptographic-hash.md) falls below a target. Because the hash is one-way, the only way to find such a nonce is brute-force trial, so a valid block is proof that real energy was spent. This is how proof of work provides the [Sybil resistance](/concepts/consensus.md) an open network needs.

# Key properties

- **Difficulty adjusts** to keep block time roughly constant as total hash power changes.
- **Security scales with cost.** Rewriting history means redoing the work of every block since, so an attacker needs a majority of hash power (a **51% attack**) to reliably out-produce the honest chain.
- **[Finality](/concepts/finality.md) is probabilistic.** More confirmations mean exponentially more work an attacker would have to beat.
- **Energy is the cost, and the point.** The expenditure is what is hard to fake; critics see it as waste, proponents as the price of permissionless security.

# In practice

Bitcoin's [mining](/bitcoin/mining.md) is the canonical example: double-SHA-256, a ~10-minute target, and difficulty retargeting every 2016 blocks. Ethereum used proof of work until it switched to [proof of stake](/concepts/proof-of-stake.md) at [the Merge](/ethereum/proof-of-stake.md). The tradeoffs between the two are laid out in [PoW vs PoS](/comparison/pow-vs-pos.md).
