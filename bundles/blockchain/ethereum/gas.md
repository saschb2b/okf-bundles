---
type: Chain Mechanism
title: Ethereum gas and EIP-1559
description: Metered computation priced in gas, with a burned base fee plus a priority tip since the London upgrade.
resource: https://ethereum.org/en/developers/docs/gas/
tags: [ethereum, gas, eip-1559, fees]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://ethereum.org/en/developers/docs/gas/
    title: "Gas and fees (Ethereum.org docs)"
  - resource: https://eips.ethereum.org/EIPS/eip-1559
    title: "EIP-1559 (eips.ethereum.org)"
---

# Gas: pricing computation

Because the [EVM](/ethereum/evm.md) runs arbitrary [smart contracts](/concepts/smart-contract.md), Ethereum meters work in **gas**, "the unit that measures the amount of computational effort required to execute specific operations." Gas exists to price computation and resist spam and infinite loops (the halting-problem defense). It is Ethereum's form of the shared [fee](/concepts/gas-and-fees.md) concept, but it prices computation rather than Bitcoin's bytes. [1]

- Denominations: 1 ETH = 10^9 gwei = 10^18 wei (protocol constants). [1]
- A basic ETH transfer costs **21,000 gas**; contract calls cost more, per opcode. [1]

# EIP-1559: base fee plus tip

Since the **London** upgrade (August 2021), EIP-1559 splits the fee: [2]

- A protocol-set **base fee** that is **burned** (removed from supply), which is the mechanism behind [ether's dynamic monetary policy](/ethereum/ether-monetary-policy.md).
- A user-set **priority fee (tip)** paid to the block proposer.
- Total fee = `gas used x (base fee + priority fee)`.

The base fee adjusts by at most ±12.5% per block (denominator 8), rising when a block is above its gas target and falling when below; blocks may reach 2x the target (elasticity multiplier 2). [2] These are protocol constants, giving more predictable fees than a blind first-price auction.

# Why it matters

Metered gas is the direct consequence of choosing a Turing-complete [EVM](/ethereum/evm.md): Bitcoin needs no equivalent because [Script](/bitcoin/script.md) cannot loop. The fee market also concentrates [MEV](/concepts/mempool.md) on Ethereum, since ordering contract calls is profitable.
