---
type: Chain Mechanism
title: Cardano native tokens
description: A multi-asset ledger where custom tokens are first-class citizens, minted without a smart contract.
resource: https://docs.cardano.org/
tags: [cardano, native-tokens, multi-asset]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://docs.cardano.org/about-cardano/new-to-cardano/native-tokens/
    title: "Native tokens (docs.cardano.org)"
---

# Tokens as ledger citizens

Cardano's ledger is **multi-asset**: custom tokens are handled by the ledger itself, the same way the native [ADA token](/cardano/monetary-policy.md) is, and travel inside ordinary [EUTXO](/cardano/eutxo.md) outputs. This is unlike Ethereum, where a token such as an ERC-20 is a [smart contract](/concepts/smart-contract.md) that reimplements balances and transfers in code. [1]

# Why it matters

- **No contract needed to mint or move.** Creating and transferring a token uses the same ledger rules and [transaction](/concepts/transaction.md) machinery as ADA, governed by a minting policy rather than by a bespoke contract. That removes a whole class of buggy-token-contract risk.
- **Uniform handling.** Wallets and tooling treat all assets alike, since they are ledger-level objects rather than arbitrary code.
- **Contrast with the [account model](/concepts/account-model.md).** Ethereum's token-as-contract approach is more flexible but pushes correctness and safety into user-written code; Cardano's ledger-level approach trades some flexibility for safety and predictability.

Native multi-asset support was delivered by the **Mary** [hard fork](/cardano/hard-forks.md), part of realizing the programmable-ledger vision alongside [Plutus](/cardano/plutus.md) contracts.
