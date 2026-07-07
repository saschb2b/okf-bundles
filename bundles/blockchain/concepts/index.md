# Shared concepts

Chain-agnostic primitives every blockchain builds on. Each chain's folder links back to these.

# Cryptography

- [Cryptographic hash function](cryptographic-hash.md) - One-way digests: the glue of chaining, mining, and Merkle trees.
- [Public-key cryptography and digital signatures](public-key-cryptography.md) - Keypairs and signatures that prove ownership and authorize transactions.
- [Merkle tree](merkle-tree.md) - A hash tree summarizing transactions into one root, enabling compact proofs.

# Data structures

- [Block and the blockchain](block.md) - Batches of transactions chained by hash into an append-only ledger.
- [Transaction](transaction.md) - A signed, authorized state change moving value or invoking code.

# Consensus

- [Distributed consensus](consensus.md) - Agreeing on one history without a central authority; Sybil resistance and Nakamoto consensus.
- [Proof of work](proof-of-work.md) - Sybil resistance by spending energy.
- [Proof of stake](proof-of-stake.md) - Sybil resistance by capital at risk.
- [Finality](finality.md) - Probabilistic vs economic irreversibility.

# Accounting

- [UTXO model](utxo-model.md) - Discrete unspent coins, no protocol-level balances.
- [Account model](account-model.md) - A global state of balances that transactions mutate.

# Execution and economics

- [Smart contract](smart-contract.md) - On-chain code, from limited scripts to general computation.
- [Gas and transaction fees](gas-and-fees.md) - Pricing scarce block space and computation.
- [Native token and monetary policy](native-token.md) - The built-in asset and its issuance schedule.

# Network

- [Mempool](mempool.md) - The pool of validated but unconfirmed transactions.
- [Node](node.md) - A participant that stores the chain and validates every rule.
- [Forks](fork.md) - Temporary reorgs and permanent protocol splits.
- [The scalability trilemma](scalability-trilemma.md) - Decentralization, security, scalability: pick the balance.
