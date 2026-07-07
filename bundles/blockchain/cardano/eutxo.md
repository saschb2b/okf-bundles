---
type: Chain Mechanism
title: Extended UTXO (EUTXO)
description: Cardano's ledger model: Bitcoin's UTXO extended with datums and scripts to run smart contracts deterministically.
resource: https://docs.cardano.org/
tags: [cardano, eutxo, utxo, smart-contract]
timestamp: 2026-07-07T16:00:00Z
---

# The third accounting model

Cardano keeps Bitcoin's [UTXO model](/concepts/utxo-model.md), a ledger of discrete unspent outputs, but **extends** it so it can support [smart contracts](/concepts/smart-contract.md), which plain Bitcoin [Script](/bitcoin/script.md) cannot. This makes EUTXO a genuine third option alongside Bitcoin's plain UTXO and Ethereum's [account model](/concepts/account-model.md). [1]

# What "extended" adds

A plain UTXO carries a value and a lock. EUTXO adds two things to each output:

- **Datum.** Arbitrary data attached to an output, giving it persistent state, the piece plain UTXO lacks for contracts.
- **Validator script.** A [Plutus](/cardano/plutus.md) script that guards spending, receiving the datum, a **redeemer** (the spender's input), and the transaction context, and deciding yes or no.

A [transaction](/concepts/transaction.md) still consumes outputs and creates new ones; a contract is just a script-locked output whose validator must approve the spend.

# Why choose this over the account model

The point is to gain programmability **without** giving up UTXO's advantages:

- **Determinism.** Because a transaction's inputs fully determine its outcome, validity and fees can be checked **off-chain before submission**. A transaction cannot "fail on-chain and still cost gas" the way an Ethereum [contract call](/ethereum/evm.md) can. Fees are predictable.
- **Parallelism.** Independent UTXOs validate in parallel, as in Bitcoin.
- **Local state.** State lives in outputs rather than in global mutable [accounts](/ethereum/accounts.md), which changes how contracts are architected (and is less natural for some globally-shared-state patterns).

The three-way contrast is drawn out in [UTXO vs account](/comparison/utxo-vs-account.md).

# Citations

[1] [The Extended UTXO model (docs.cardano.org)](https://docs.cardano.org/about-cardano/learn/eutxo-explainer/)
