---
type: Analysis
title: Why standards win
description: Agreement beats technical superiority. OSI, Xanadu, Gopher, and Markdown each prove a piece of it, and each maps to an OKF design choice.
tags: [context, standards, history, adoption, motivation]
generated:
  by: claude-code/fable-5
  at: 2026-08-05T23:00:00Z
sources:
  - id: osi
    resource: https://spectrum.ieee.org/osi-the-internet-that-wasnt
    title: "Andrew L. Russell, OSI: The Internet That Wasn't (IEEE Spectrum, August 2013)"
    last_modified: 2013-08-01
  - id: cern
    resource: https://timeline.web.cern.ch/cern-puts-world-wide-web-public-domain
    title: "CERN puts the World Wide Web in the public domain (CERN timeline)"
  - id: commonmark
    resource: https://commonmark.org/
    title: "CommonMark, why a spec was needed"
  - id: xanadu
    resource: https://en.wikipedia.org/wiki/Project_Xanadu
    title: "Project Xanadu"
  - id: ietf-tao
    resource: https://www.ietf.org/about/participate/tao/
    title: "The Tao of the IETF"
---

# The question

Why agree on one format when your own would fit better? Every team that [hand-rolls a wiki for machines](scattered-knowledge.md) has a good local reason, and the sum of those good reasons is twelve incompatible shapes. History gives a clear answer. The value of a standard is the agreement itself, and the formats that carried the most weight were rarely the best candidates on paper.

# Agreement is the product

A format's worth scales with the number of parties who read and write it. That is why [the design principles](../spec/design-principles.md) end on "a lingua franca is only worth the number of parties who speak it". A technically superior format that only you use solves your problem once. A merely adequate format that everyone uses lets any producer's knowledge reach any consumer's agent without translation. Every tool built for it compounds every bundle written in it. Computing supplies the cleanest evidence: three richer candidates that lost, and one winner that nearly fragmented away its victory.

# OSI, the complete design that never shipped

The OSI protocol suite was the proper answer to internetworking: a rigorous seven-layer model backed by IBM, DEC, the European telephone monopolies, and governments across three continents. By the mid-1980s it looked inevitable. It collapsed anyway, under committee overhead, unresolved expert conflicts, and standards documents sold as paper copies. TCP/IP shipped as running code, cost nothing to read, and was mandatory for ARPA contractors from 1 January 1983.[^osi]

TCP/IP was the less complete design. It won on adoptability, which the IETF later compressed into its unofficial motto, "rough consensus and running code".[^ietf-tao] OKF encodes the same bet: [conformance](../spec/conformance.md) is one field rather than forty, and the spec is fourteen free pages under Apache 2.0.

# Xanadu, the richer link that never arrived

Project Xanadu, begun by Ted Nelson in 1960, specified two-way links that could not break, visible transclusion, and full version management. It was strictly richer than the web's one-way, breakable link. Its first working deliverable arrived in 2014, five decades later.[^xanadu] The web's willingness to serve a 404 looked like a defect and was the feature: a link that may break is a link anyone can create without coordination.

OKF makes the identical trade. [Consumers tolerate broken links](../spec/cross-linking.md), a partial bundle stays usable, and nobody must register an edge before asserting one.

# Gopher, the head start a license killed

Gopher had the early momentum in menu-driven internet publishing. In February 1993 the University of Minnesota announced licensing fees for its reference server, and organisations started looking for alternatives. On 30 April 1993 CERN put the World Wide Web software in the public domain, in part as a direct response. The web absorbed Gopher's audience.[^cern]

Two OKF lessons, one comfortable and one not. The comfortable one is [format, not platform](../spec/design-principles.md): no account, no fee, no owner whose pricing decision can kill it. The uncomfortable one is that OKF currently lives in one vendor's repository with [no governance outside it](../ecosystem/governance.md), and Gopher shows how fast a single institution's decision can empty a protocol's ecosystem.

# Markdown, where winning the name was not enough

Markdown won so completely that OKF builds on it, and it still fragmented. Gruber's canonical description "does not specify the syntax unambiguously". Implementations diverged for a decade, and the same document rendered differently on different systems until CommonMark wrote the missing spec in 2014.[^commonmark]

That is the cautionary tale inside the success story. Agreement on a name does not survive an ambiguous spec. OKF already shows the early symptoms, [unanswered errata, a spec that contradicts its own examples, and no shared conformance corpus](../ecosystem/open-questions.md), which is why every serious producer [rebuilds validation](../practice/validation.md).

# What this predicts for OKF

The losers of these fights were better on paper. The winners were free, simple, tolerant of imperfection, and already running. OKF starts on the winning side of every one of those axes, and [running code exists in five languages](../ecosystem/community-tools.md). Its two live risks are exactly the historical ones: a Gopher-shaped governance failure and a Markdown-shaped ambiguity failure. Neither is hypothetical, and this bundle measures both.

An imperfect format that everyone reads beats a perfect format that nobody else writes. That sentence is the whole argument for adopting OKF over a better bespoke design. It is also the standard OKF itself must meet to matter.

# Related

- [Scattered knowledge](scattered-knowledge.md) is the fragmentation a standard cures.
- [Design principles](../spec/design-principles.md) states this argument as doctrine rather than history.
- [State of adoption](../ecosystem/adoption.md) measures where OKF sits on this curve today.

[^osi]: Andrew L. Russell, OSI: The Internet That Wasn't (IEEE Spectrum, August 2013).
[^ietf-tao]: The Tao of the IETF.
[^xanadu]: Project Xanadu.
[^cern]: CERN puts the World Wide Web in the public domain (CERN timeline).
[^commonmark]: CommonMark, why a spec was needed.
