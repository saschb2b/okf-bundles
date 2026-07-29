---
type: Primitive
title: Gas and transaction fees
description: The pricing of scarce block space and computation, which funds security and resists spam.
tags: [gas, fees, primitive]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://en.bitcoin.it/wiki/Transaction_fees
    title: "Transaction fees (Bitcoin Wiki)"
  - resource: https://ethereum.org/en/developers/docs/gas/
    title: "Gas and fees (Ethereum.org docs)"
---

# Why fees exist

Block space is scarce and computation is unbounded, so every chain charges for inclusion. Fees do two jobs: they **prioritize** transactions competing for the next [block](/concepts/block.md) via the [mempool](/concepts/mempool.md), and they **fund security** by paying the [nodes](/concepts/node.md) that produce blocks, increasingly so as block subsidies shrink.

# Two fee designs

- **Fee = inputs minus outputs** (Bitcoin). There is no explicit fee field; the leftover value in a [UTXO](/concepts/utxo-model.md) transaction goes to the miner, priced in satoshis per virtual byte. Fees pay only for space, because [Script](/bitcoin/script.md) execution is trivially bounded.
- **Gas** (Ethereum). Because the [EVM](/ethereum/evm.md) runs arbitrary [smart contracts](/concepts/smart-contract.md), each operation costs **gas**, metering computation so a transaction cannot run forever (the halting-problem defense). A simple transfer costs 21,000 gas; complex contract calls cost far more. Under [EIP-1559](/ethereum/gas.md) the fee is a burned base fee plus a priority tip.

# Why it matters

Fee design shapes user experience and economics: Bitcoin prices bytes, Ethereum prices computation, and the fee market is also where [MEV](/concepts/mempool.md) lives on programmable chains. Fees are the long-run replacement for issuance in both [monetary policies](/concepts/native-token.md).
