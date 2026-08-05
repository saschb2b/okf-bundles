# The trust layer

v0.1 answered "what does the agent need to know?" v0.2 answers "should it believe this, and is it still true?" Every field here is optional and none can make a bundle non-conformant.

- [Why trust became a field](why-trust-is-a-field.md) - An agent-written corpus has nobody to blame, so the consumer has to judge each concept on explicit signals. Also names what the layer does not cover: signing and prompt injection are open upstream, not answered.

# Provenance

- [sources](sources.md) - What a concept derives from, with per-source credibility signals and a footnote join key for single claims.
- [generated and verified](generated-and-verified.md) - Who wrote it and who confirmed it, kept separate on purpose.
- [The actor convention](actor-convention.md) - One identity syntax for every by and author field, and the one rule that keeps the trust layer honest.

# Judgement

- [Trust tiers](trust-tiers.md) - Three tiers a consumer derives from verified, never declared by the producer.
- [status and stale_after](lifecycle.md) - Knowledge with a lifecycle and an expiry date, both checkable without an LLM.

# Computations

- [Attested Computation](attested-computation.md) - A sanctioned computation an agent may run but never author, with a deterministic checker that rules on the run.
- [Verification versus attestation](attestation-versus-verification.md) - One confirms a definition, the other confirms a single run. Both are needed.

# Next

- [Doing it](../practice/) - Authoring, consuming, validating, shipping.
