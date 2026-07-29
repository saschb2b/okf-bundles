---
type: Primitive
title: Finality
description: The guarantee that a confirmed transaction cannot be reversed, either probabilistic or economic.
tags: [finality, settlement, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin whitepaper, section 11 (Nakamoto, 2008)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/
    title: "Proof-of-stake and finality (Ethereum.org docs)"
---

# What it is

Finality is the point at which a [transaction](/concepts/transaction.md) is considered irreversible. Because a blockchain is a distributed system that can briefly disagree (see [forks](/concepts/fork.md)), "confirmed" is a matter of degree, and the two major [consensus](/concepts/consensus.md) families offer different guarantees.

# Two kinds

- **Probabilistic finality** ([proof of work](/concepts/proof-of-work.md)). A transaction is never absolutely final; each additional [block](/concepts/block.md) mined on top ("confirmation") makes reversal exponentially less likely. Bitcoin users treat ~6 confirmations (~1 hour) as settled for high value, but the guarantee is statistical, not absolute.
- **Economic / deterministic finality** ([proof of stake](/concepts/proof-of-stake.md)). A finality gadget lets the network explicitly mark a block as final. Reversing it would require a large fraction of the total stake to be provably destroyed (slashed), making reversal economically catastrophic rather than merely unlikely. Ethereum finalizes roughly every two epochs (~13 minutes).

# Why it matters

Finality is what an exchange, a merchant, or a bridge waits for before treating a payment as done. The choice between probabilistic and economic finality is one of the substantive differences examined in [PoW vs PoS](/comparison/pow-vs-pos.md).
