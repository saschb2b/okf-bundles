---
type: Comparison
title: Proof of work vs proof of stake
description: How Bitcoin's energy-based and Ethereum's capital-based consensus differ in cost, finality, and risk.
tags: [comparison, proof-of-work, proof-of-stake, consensus]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/
    title: "Proof-of-work (Ethereum.org docs)"
  - resource: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/
    title: "Proof-of-stake (Ethereum.org docs)"
---

# Same job, different scarce resource

Both mechanisms solve [Sybil resistance](/concepts/consensus.md), tying block-production rights to a costly resource so fake identities gain nothing. They differ in which resource. [Proof of work](/concepts/proof-of-work.md) (Bitcoin) spends **energy**; [proof of stake](/concepts/proof-of-stake.md) (Ethereum, since [the Merge](/ethereum/proof-of-stake.md)) locks up **capital**.

# Side by side

| Dimension | Proof of work ([Bitcoin mining](/bitcoin/mining.md)) | Proof of stake ([Ethereum](/ethereum/proof-of-stake.md)) |
|-----------|-------------------------------------------------------|-----------------------------------------------------------|
| Scarce resource | Computation / energy | Staked [tokens](/concepts/native-token.md) |
| Cost to attack | Acquire majority hash power | Acquire and risk majority of stake |
| Attacker's downside | Keeps the hardware | Stake is slashed (destroyed) |
| [Finality](/concepts/finality.md) | Probabilistic (confirmations) | Economic / near-deterministic (~2 epochs) |
| Energy use | High, by design | Low |
| Main critiques | Energy waste, miner centralization | Capital centralization, "nothing at stake," weaker censorship resistance |

# The substantive tradeoff

Proof of stake makes attacks self-punishing (an attacker's stake is destroyed, where a proof-of-work attacker keeps the hardware) and gives explicit [finality](/concepts/finality.md), at far lower energy cost. Proof of work's defenders argue that anchoring security in physical energy and simple rules is more robust and credibly neutral, and that it avoids the reflexivity of securing a chain with its own token. The choice tracks each chain's [design philosophy](/comparison/design-philosophy.md): Bitcoin's conservatism versus Ethereum's willingness to re-engineer the base layer.
