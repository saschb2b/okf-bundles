---
type: Pricing Model
title: Anthropic pricing model
description: Per-token API pricing by model tier, caching and batch discounts, and subscription prices.
resource: https://platform.claude.com/docs/en/about-claude/pricing
tags: [anthropic, pricing, api, subscriptions, tokens]
timestamp: 2026-07-07T16:00:00Z
---

# Two price surfaces

Anthropic prices the same models two ways: metered per-token for the API (what most revenue runs through, see [revenue streams](/revenue/revenue-streams.md)) and flat monthly for subscriptions and seats. The per-token surface is what lets buyers match model to task, a core [strategic bet](/strategy/key-bets.md).

# API pricing, per million tokens (MTok)

[1]

| Model | Input | Output | Cache read (hit) |
|-------|-------|--------|------------------|
| Claude Opus 4.8 | $5 | $25 | $0.50 |
| Claude Opus 4.7 / 4.6 / 4.5 | $5 | $25 | $0.50 |
| Claude Sonnet 5 (intro, through Aug 31 2026) | $2 | $10 | $0.20 |
| Claude Sonnet 5 (from Sep 1 2026) | $3 | $15 | $0.30 |
| Claude Sonnet 4.6 / 4.5 | $3 | $15 | $0.30 |
| Claude Haiku 4.5 | $1 | $5 | $0.10 |
| Claude Fable 5 | $10 | $50 | $1 |

Retired Opus 4.1/4 were $15/$75. Opus 4.7+, Fable 5, and Sonnet 5 use a newer tokenizer that emits roughly 30% more tokens per unit of text, which raises effective cost independent of the headline rate.

# Discount and metering mechanics

- **Prompt caching.** Cache read costs 0.1x input (about 90% cheaper). A 5-minute cache write costs 1.25x input, a 1-hour write 2x input. [1]
- **Batch API.** 50% off both input and output for asynchronous work. [1]
- **Server tools.** Web search $10 per 1,000 searches; web fetch free; code execution gives 1,550 free container-hours per month, then $0.05/hour. [1]
- **Long context.** A 1M-token window is included at standard pricing on Fable 5, Opus 4.6+, Sonnet 5, and Sonnet 4.6.

These mechanics push effective revenue-per-token below the headline rate, which matters for the margin story in the [cost structure](/economics/cost-structure.md).

# Subscription and seat pricing

[2]

| Plan | Price | Notes |
|------|-------|-------|
| Free | $0/mo | Web, iOS, Android, desktop |
| Pro | $20/mo ($17 annual) | Includes Claude Code, Cowork, Design, Science |
| Max 5x | $100/mo | 5x Pro usage |
| Max 20x | $200/mo | 20x Pro usage, monthly only |
| Team, standard seat | $25/mo ($20 annual), 5 to 150 people | SSO, central billing |
| Team, premium seat | $125/mo ($100 annual) | 5x standard-seat usage |
| Enterprise | Custom | ~$20/seat base plus usage at API rates; SCIM, audit logs, HIPAA-ready |

# Citations

[1] [Claude pricing docs (Anthropic, 2026)](https://platform.claude.com/docs/en/about-claude/pricing)
[2] [Claude pricing page (Anthropic, 2026)](https://claude.com/pricing)
