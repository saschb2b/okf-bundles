---
type: Chain Overview
title: Bitcoin
description: The first blockchain: peer-to-peer electronic cash secured by proof of work, with a fixed 21M supply.
resource: https://bitcoin.org/bitcoin.pdf
tags: [bitcoin, overview]
timestamp: 2026-07-07T16:00:00Z
---

# What Bitcoin is

Bitcoin is the original blockchain, introduced in the 2008 whitepaper "Bitcoin: A Peer-to-Peer Electronic Cash System" by the pseudonymous Satoshi Nakamoto, with the genesis block mined January 3, 2009. Its stated purpose is electronic cash sent directly between parties "without going through a financial institution," solving the double-spend problem with a [proof-of-work](/concepts/proof-of-work.md) chain instead of a trusted third party. [1]

# The design in one view

Bitcoin makes a set of deliberate, conservative choices, each an instance of a shared [primitive](/concepts/consensus.md):

- **[Mining](/bitcoin/mining.md).** Double-SHA-256 [proof of work](/concepts/proof-of-work.md), a ~10-minute block target, difficulty retargeting every 2016 blocks.
- **[Monetary policy](/bitcoin/monetary-policy.md).** A hard ~21 million cap and a halving [issuance schedule](/concepts/native-token.md); sound money by protocol.
- **[UTXO transactions](/bitcoin/utxo-transactions.md).** The [UTXO accounting model](/concepts/utxo-model.md), no protocol-level balances.
- **[Script](/bitcoin/script.md).** Intentionally limited, non-Turing-complete [scripting](/concepts/smart-contract.md), a security choice.
- **[Upgrades](/bitcoin/upgrades.md) and [Lightning](/bitcoin/lightning-network.md).** Conservative soft forks (SegWit, Taproot) and off-chain scaling.

# The philosophy

Every choice favors trust-minimization, censorship resistance, and predictable scarcity over flexibility. That is what most distinguishes it from Ethereum, as drawn out in [design philosophy](/comparison/design-philosophy.md). Start from any concept above; each links back to the shared primitive it implements.

# Citations

[1] [Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)](https://bitcoin.org/bitcoin.pdf)
