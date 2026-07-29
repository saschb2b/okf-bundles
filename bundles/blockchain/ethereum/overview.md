---
type: Chain Overview
title: Ethereum
description: A programmable blockchain, the "world computer," running smart contracts under proof of stake.
resource: https://ethereum.org/en/what-is-ethereum/
tags: [ethereum, overview]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/what-is-ethereum/
    title: "What is Ethereum? (Ethereum.org)"
---

# What Ethereum is

Ethereum is a programmable blockchain, proposed by Vitalik Buterin in a 2013 whitepaper and launched July 30, 2015. Where Bitcoin sends value, Ethereum aims to be "programmable infrastructure": a platform for [smart contracts](/concepts/smart-contract.md) and decentralized applications that "run 24/7, globally." The popular shorthand is the "world computer." [1]

# The design in one view

Ethereum takes the opposite pole from Bitcoin on several shared [primitives](/concepts/consensus.md):

- **[EVM](/ethereum/evm.md).** A Turing-complete virtual machine executing [smart-contract](/concepts/smart-contract.md) bytecode identically on every node.
- **[Accounts](/ethereum/accounts.md).** The [account model](/concepts/account-model.md) with a global state, not Bitcoin's UTXOs.
- **[Gas](/ethereum/gas.md).** Metered computation with EIP-1559 base-fee burning, over the shared [fee](/concepts/gas-and-fees.md) concept.
- **[Proof of stake](/ethereum/proof-of-stake.md).** [PoS](/concepts/proof-of-stake.md) consensus since the Merge, replacing the proof of work it launched with.
- **[Ether monetary policy](/ethereum/ether-monetary-policy.md).** An uncapped, dynamic [token](/concepts/native-token.md) supply balanced by issuance and burn.
- **[Layer-2 rollups](/ethereum/layer-2-rollups.md).** Scaling off-chain while inheriting L1 security.

# The philosophy

Every choice favors general programmability and an evolving, roadmap-driven protocol over Bitcoin's minimalism and fixed rules. That contrast is the subject of [design philosophy](/comparison/design-philosophy.md). Each concept above links back to the shared primitive it implements.
