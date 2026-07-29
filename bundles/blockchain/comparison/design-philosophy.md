---
type: Comparison
title: Bitcoin vs Ethereum design philosophy
description: Sound money and minimalism versus a programmable, evolving world computer, and why their choices cohere.
tags: [comparison, philosophy, bitcoin, ethereum]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/what-is-ethereum/
    title: "What is Ethereum? (Ethereum.org)"
  - resource: https://bitcoin.org/bitcoin.pdf
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)"
---

# One sentence each

Bitcoin optimizes for **sound money and minimalism**: do one thing, settle value, and change as little as possible so the rules stay credible. Ethereum optimizes for **general programmability**: be a platform for arbitrary applications, and evolve the protocol aggressively to get there. Almost every concrete difference is downstream of this split.

# How the choices line up

| Question | Bitcoin | Ethereum |
|----------|---------|----------|
| Core purpose | Peer-to-peer electronic cash | Programmable "world computer" |
| Programmability | Limited [Script](/bitcoin/script.md), non-Turing-complete, by choice | Turing-complete [EVM](/ethereum/evm.md) |
| Accounting | [UTXO](/bitcoin/utxo-transactions.md) | [Accounts](/ethereum/accounts.md) and global state |
| Consensus | [Proof of work](/bitcoin/mining.md) | [Proof of stake](/ethereum/proof-of-stake.md) |
| Money | Fixed [21M cap](/bitcoin/monetary-policy.md), disinflationary | Uncapped, [issuance minus burn](/ethereum/ether-monetary-policy.md) |
| Upgrades | Conservative [soft forks](/bitcoin/upgrades.md), rare | Scheduled hard-fork [roadmap](/ethereum/layer-2-rollups.md) |
| Scaling | Off-chain [Lightning](/bitcoin/lightning-network.md) | Off-chain [rollups](/ethereum/layer-2-rollups.md) |

# Where Cardano sits

Cardano is useful precisely because it refuses the binary. It keeps Bitcoin's [UTXO lineage](/cardano/eutxo.md) (so it inherits determinism and predictable fees) but extends it to run [Plutus smart contracts](/cardano/plutus.md), and it is [proof of stake](/concepts/proof-of-stake.md) like Ethereum but via a peer-reviewed [Ouroboros](/cardano/ouroboros.md) design with no slashing or lock-up. Its distinctive value is a third stance on the money-versus-platform and the upgrade-governance axes: a [fixed 45B supply](/cardano/monetary-policy.md) near Bitcoin's "sound money" pole, combined with formal, [on-chain governance](/cardano/governance.md) and non-splitting [hard forks](/cardano/hard-fork-combinator.md) that are more structured than either Bitcoin's social soft-fork consensus or Ethereum's core-team roadmap. It shows the two poles are ends of a spectrum, not the only options.

# The through-line

The pattern is coherence, not superiority: Bitcoin's limited scripting, UTXO ledger, fixed supply, and soft-fork caution all serve credibility and minimal change; Ethereum's Turing-complete EVM, account state, dynamic money, and roadmap all serve programmability and iteration; Cardano's EUTXO, peer-reviewed consensus, and on-chain governance serve a research-first bid to have programmability without giving up UTXO's guarantees. Read against the shared [primitives](/concepts/consensus.md), all three are the same idea, a decentralized ledger secured by [Sybil-resistant consensus](/concepts/consensus.md), placed differently along the [scalability trilemma](/concepts/scalability-trilemma.md) and the money-versus-platform axis. That is exactly what the specific comparisons, [UTXO vs account](/comparison/utxo-vs-account.md) and [PoW vs PoS](/comparison/pow-vs-pos.md), make concrete.
