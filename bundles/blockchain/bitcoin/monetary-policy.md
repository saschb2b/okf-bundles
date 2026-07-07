---
type: Chain Mechanism
title: Bitcoin monetary policy
description: A hard ~21 million cap issued via a block subsidy that halves every 210,000 blocks until ~2140.
resource: https://en.bitcoin.it/wiki/Controlled_supply
tags: [bitcoin, monetary-policy, halving, supply]
timestamp: 2026-07-07T16:00:00Z
---

# The fixed-supply schedule

Bitcoin's [native token](/concepts/native-token.md) has a supply set entirely by protocol. Each [block](/concepts/block.md) mints new BTC (the "subsidy"), paid to the [miner](/bitcoin/mining.md), and that subsidy **halves every 210,000 blocks** (~4 years). The result is a hard cap of ~21 million BTC. [1]

| Parameter | Value |
|-----------|-------|
| Max supply | ~21,000,000 BTC (precisely ~20,999,999.98, from satoshi truncation) [1] |
| Halving interval | Every 210,000 blocks (~4 years), a hard rule [1] |
| Smallest unit | 1 satoshi = 1e-8 BTC (100,000,000 sats per BTC) [2] |
| Issuance ends | ~block 6,930,000, around year 2140 [1] |

# Halving history

50 BTC (2009) to 25 (2012) to 12.5 (2016) to 6.25 (2020) to **3.125 BTC** at block 840,000 in April 2024, the current subsidy. The next halving, to 1.5625 BTC, is expected around 2028. [3]

# Why it matters

Predictable, disinflationary scarcity is the core of Bitcoin's "sound money" thesis and the sharpest contrast with Ethereum's uncapped, dynamic [ether policy](/ethereum/ether-monetary-policy.md), a difference explored in [design philosophy](/comparison/design-philosophy.md). As the subsidy trends to zero, [transaction fees](/concepts/gas-and-fees.md) must become the security budget that pays miners.

# Citations

[1] [Controlled supply (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Controlled_supply)
[2] [Satoshi (unit) (Bitcoin Wiki)](https://en.bitcoin.it/wiki/Satoshi_(unit))
[3] [Halving at block 840,000 (Bitcoin.com News, 2024)](https://news.bitcoin.com/halving-milestone-block-840000-mined-ushering-in-a-new-chapter-as-bitcoin-miners-face-shrinking-rewards/)
