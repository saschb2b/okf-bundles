---
type: Primitive
title: Native token and monetary policy
description: The chain's built-in asset that pays for security and fees, governed by a protocol-defined issuance schedule.
tags: [token, issuance, monetary-policy, primitive]
timestamp: 2026-07-07T16:00:00Z
---

# What it is

Each chain has a **native token** (BTC, ETH) that is not a [smart contract](/concepts/smart-contract.md) but a protocol-level asset. It pays [transaction fees](/concepts/gas-and-fees.md), rewards [block producers](/concepts/node.md), and in [proof of stake](/concepts/proof-of-stake.md) is the capital that secures the chain. Its issuance is set by code, not by a central bank, which is the point.

# Two monetary philosophies

- **Fixed, disinflationary supply** (Bitcoin). A hard cap of ~21 million BTC, issued via a [block subsidy](/bitcoin/monetary-policy.md) that halves every 210,000 blocks until issuance ends near 2140. Scarcity is guaranteed by protocol; the pitch is "sound money."
- **Dynamic, no cap** (Ethereum). ETH issuance funds validator rewards and has no fixed ceiling, but [EIP-1559](/ethereum/gas.md) burns the base fee, so net supply can shrink when demand is high, the [ether-monetary-policy](/ethereum/ether-monetary-policy.md) "ultrasound money" framing. Supply is a dynamic balance of issuance and burn.

# Why it matters

Monetary policy is a chain's economic identity as much as a technical parameter, and the fixed-vs-dynamic split is one of the sharpest contrasts in [design philosophy](/comparison/design-philosophy.md). It also determines the long-run [security budget](/concepts/gas-and-fees.md): what pays for block production once subsidies fade.

# Citations

[1] [Controlled supply (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Controlled_supply)
[2] [ETH supply and issuance (Ethereum.org)](https://ethereum.org/en/roadmap/merge/issuance/)
