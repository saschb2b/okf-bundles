---
type: Cost Structure
title: NVIDIA cost structure
description: The fabless TSMC dependency, CoWoS and HBM constraints, R&D, margins, and capital returns.
resource: https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026
tags: [nvidia, costs, tsmc, hbm, margins, buybacks]
generated:
  by: claude-code/unrecorded
  at: 2026-07-07T16:00:00Z
sources:
  - resource: https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026
    title: "NVIDIA financial results for Q4 and fiscal 2026 (NVIDIA, Feb 2026)"
  - resource: https://www.stocktitan.net/sec-filings/NVDA/8-k-nvidia-corp-reports-material-event-56086a88bbb4.html
    title: "NVIDIA Q1 FY2027 8-K (StockTitan, May 2026)"
---

# Fabless, so the constraints are upstream

NVIDIA owns no fabs. Its cost structure and its ability to ship are set by a short supply chain it does not control:

- **TSMC** fabricates all leading-edge silicon. This is the single largest structural dependency, shared with the whole industry.
- **CoWoS advanced packaging** has been a recurring bottleneck; TSMC has been expanding capacity, but it gates how many Blackwell/Rubin units exist.
- **HBM memory** comes from SK hynix (primary), Samsung, and Micron. HBM availability is a gating input for the current and next generation.

These constraints are why the [go-to-market](/distribution/go-to-market.md) channels can sell faster than NVIDIA can deliver, and they are the physical limit on the [revenue](/revenue/revenue-streams.md) ramp.

# R&D and margins

R&D grew materially in FY2026 (full-year opex guided to mid-30s percent growth), though an exact FY2026 R&D dollar figure is not verified here (FY2025 R&D was ~$12.9B for reference). Gross margin ran 71.1% GAAP in FY2026, recovering toward the mid-70s, as detailed in the [monetization model](/revenue/pricing.md); the drivers are Blackwell mix maturation, networking attach, and the roll-off of one-off China inventory charges.

# Capital returns

The cash generation funds large returns. In FY2026 NVIDIA returned $41.1B to shareholders ($40.1B in buybacks plus $974M in dividends), the board approved a new $80B buyback authorization, and NVIDIA raised its quarterly dividend in Q1 FY2027 (the exact new per-share figure is worth confirming against the 8-K). [1][2] The scale of these returns is a function of the margins and the market position described in the [corporate structure](/strategy/governance.md).
