---
type: Chain History
title: Cardano hard fork history
description: Every activated Cardano hard fork from Byron (2017) to van Rossem (June 2026), with dates and headline features.
resource: https://cardano.org/hardforks/
tags: [cardano, hard-forks, upgrades, history]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://cardano.org/hardforks/
    title: "Cardano hard forks (cardano.org, accessed 2026-07-07)"
  - resource: https://crypto.news/cardano-van-rossem-hard-fork-reaches-mainnet-governance/
    title: "van Rossem reaches mainnet through governance (crypto.news, June 2026)"
  - resource: https://icobench.com/news/cardano-van-rossem-hard-fork-live-ada-holders/
    title: "van Rossem hard fork live (icobench, June 2026)"
---

# How to read this

Each row is a protocol-version upgrade delivered through the [hard fork combinator](/cardano/hard-fork-combinator.md), so every one is an in-place upgrade of a single continuous chain, not a split. The forks advance Cardano through its five [development eras](/cardano/overview.md). Dates and epochs are from the official hard-forks page. [1]

# Activated hard forks

| # | Fork | Activated | Protocol | Era | Headline features |
|---|------|-----------|----------|-----|-------------------|
| 1 | **Byron** | 2017-09-29 | 1.0 | Byron | Mainnet launch; ADA introduced on a federated network |
| 2 | **Shelley** | 2020-07-29 | 2.0 | Shelley | [Staking and decentralization](/cardano/ouroboros.md); federated to community-run pools |
| 3 | **Allegra** | 2020-12-16 | 3.0 | Allegra | Token locking (timelocks); a prerequisite for smart contracts |
| 4 | **Mary** | 2021-03-01 | 4.0 | Mary | [Native multi-asset tokens](/cardano/native-tokens.md) |
| 5 | **Alonzo** | 2021-09-12 | 5.0 | Alonzo | [Plutus smart contracts](/cardano/plutus.md); dApps enabled |
| 6 | **Lobster** | 2021-10-22 | 6.0 | Alonzo | Parameter update raising block and script limits |
| 7 | **Vasil** | 2022-09-22 | 7.0 | Babbage | Plutus V2, diffusion pipelining, reference inputs and scripts |
| 8 | **Valentine** | 2023-02-14 | 8.0 | Babbage | Further Plutus and performance work (SECP256k1 built-ins) |
| 9 | **Chang** | 2024-09-01 | 9.0 | Conway | First batch of [CIP-1694 governance](/cardano/governance.md) (bootstrap phase) |
| 10 | **Plomin** | 2025-01-29 | 10.0 | Conway | Second batch of CIP-1694 governance (full governance) |
| 11 | **van Rossem** | 2026-06-18 | 11.0 | Conway | Cleaner ledger rules, VRF key uniqueness, updated reference-input rules, Plutus performance, new cryptographic built-ins |

Date notes: **Chang** is sometimes written as "August 2024" in prose; the official protocol-bump date is 2024-09-01. [1] **van Rossem** was listed as tentative "June 2026" on the official page and activated on mainnet 2026-06-18 at 21:45 UTC (ratified 2026-06-13). [2][3]

# Why van Rossem is a milestone

van Rossem is the **first Cardano hard fork initiated entirely through on-chain [Voltaire governance](/cardano/governance.md)**, ratified by the three-body process (DReps voting ~68.57% of stake in favor, a 5-of-7 Constitutional Committee sign-off, and stake-pool operators) rather than triggered by the founding entity IOG. [2][3] It marks the point where the community, not the original developers, drives protocol change. It is named in memory of governance contributor Max van Rossem.

# What is not yet scheduled

As of this snapshot the official page lists no activated fork beyond 11.0. Research-stage consensus upgrades like **Ouroboros Leios and Peras** ([throughput and finality](/cardano/ouroboros.md)) are not yet assigned a protocol-version hard-fork date. [1]
