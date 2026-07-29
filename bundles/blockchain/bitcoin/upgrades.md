---
type: Chain Mechanism
title: Bitcoin upgrades: SegWit and Taproot
description: How Bitcoin evolves through conservative, backward-compatible soft forks.
resource: https://github.com/bitcoin/bips
tags: [bitcoin, segwit, taproot, soft-fork]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://github.com/bitcoin/bips
    title: "BIPs repository (bitcoin/bips)"
  - resource: https://en.wikipedia.org/wiki/SegWit
    title: "SegWit (Wikipedia)"
  - resource: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    title: "BIP341: Taproot (bitcoin/bips)"
---

# Upgrade culture: soft forks

Bitcoin changes through predominantly **backward-compatible soft forks** ([tightenings](/concepts/fork.md) old nodes still accept), adopted only with broad ecosystem consensus and proposed as BIPs. There is no central authority; activation uses mechanisms like miner signaling or user-activated deployment. This conservatism is itself a design value, contrasted with Ethereum's scheduled hard-fork roadmap in [design philosophy](/comparison/design-philosophy.md). [1]

# SegWit (2017)

Segregated Witness (BIP141) activated August 24, 2017 at block 481,824. It did two things:

- **Fixed transaction malleability** by moving signature ("witness") data outside the part covered by the transaction id, a prerequisite for safe payment channels and the [Lightning Network](/bitcoin/lightning-network.md).
- **Replaced the 1 MB block-size limit with a 4,000,000 weight-unit limit**, raising capacity while staying a soft fork (witness bytes count as 1 weight unit, other bytes as 4). [2]

# Taproot (2021)

Taproot (BIPs 340/341/342) activated November 14, 2021 at block 709,632:

- **Schnorr signatures** (BIP340) on secp256k1, which are linear and allow key/signature aggregation. This extends the [signature scheme](/concepts/public-key-cryptography.md) beyond the original ECDSA.
- **Merklized script trees** so a cooperative spend via the key path looks like an ordinary single-signature payment, improving privacy: multisig and complex [scripts](/bitcoin/script.md) become indistinguishable from simple payments. [3]
