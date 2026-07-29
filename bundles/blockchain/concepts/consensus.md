---
type: Primitive
title: Distributed consensus
description: How mutually distrusting nodes agree on one ordered history without a central authority.
tags: [consensus, byzantine, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin whitepaper, sections 4-5 (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/
    title: "Consensus mechanisms (Ethereum.org docs)"
---

# The problem

A blockchain is a network of [nodes](/concepts/node.md) with no central coordinator. They must all agree on the same ordered set of [transactions](/concepts/transaction.md) despite unreliable networks and some participants who may be faulty or malicious. This is the **Byzantine fault tolerance** problem: reach agreement when some actors lie.

# Sybil resistance is the key idea

Anyone can spin up unlimited identities on an open network, so voting per identity is meaningless. A blockchain instead ties influence to a scarce, costly resource, so faking many participants gains nothing:

- **[Proof of work](/concepts/proof-of-work.md)** ties influence to computational work (energy).
- **[Proof of stake](/concepts/proof-of-stake.md)** ties influence to capital at risk (staked [tokens](/concepts/native-token.md)).

# Nakamoto consensus

Bitcoin's contribution, **Nakamoto consensus**, combines proof of work with a fork-choice rule: nodes follow the chain with the most accumulated work (the "longest" / heaviest chain). Agreement is **probabilistic**, strengthening with each confirmation, as covered in [finality](/concepts/finality.md). Honest majority of the resource guarantees safety; a [51% attack](/concepts/proof-of-work.md) is the failure mode.

Ethereum's [proof-of-stake consensus](/ethereum/proof-of-stake.md) instead adds explicit **finality gadgets** that let the network mark blocks as economically irreversible. The two approaches are contrasted in [PoW vs PoS](/comparison/pow-vs-pos.md).
