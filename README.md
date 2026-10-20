# Heartbaker OS

The working system for Heartbaker, a premium bakery producer with a café in Thailand, owned and run by Jere. It holds brand decisions, product facts, sales channels, campaign plans and the social post workflow, so each decision has one home.

## Status

Setup stage, 20 Oct 2026. Jere's brand decisions on file sit in `docs/brand/identity.md`. A first version of the Post Maker exists and has not yet run on real posts. A New Year campaign launches in November 2026. The open items below stay open until Jere confirms them.

## The business at a glance

Jere supplied these facts on 20 Oct 2026. Prices, range and plans change, so confirm them with Jere before reuse.

- **Range:** the Aperitif Collection, a range of breadsticks. Flavours are Thyme & butter, Black truffle and Sour Cream & Chive. Per the brief, new concepts stay with breadsticks.
- **Café:** part of Heartbaker (confirmed by Jere, 20 Oct 2026). Menu and hours are not yet on record. See `docs/brand/facts.md`.
- **Sizes and retail prices:** S "For Try" 45 g at 75 THB, M "For Me" 75 g at 125 THB, L "For All" 135 g at 225 THB. M is the best seller.
- **Shelf life and packaging:** about 6 months. Plain white bags with a label.
- **Actual buyers:** aged 30+, upper middle class. Most buy as gifts or to bring to parties. They pair the breadsticks with soft drinks, wine or coffee, and some with Western soup.
- **Target audience:** the audience written in the brand file is intended and not validated.
- **Sales:** about 90% through LINE and personal contacts, with most of that direct sales by Jere's sister. Instagram and Facebook cover the rest.
- **Paid ads:** none so far. When they start, Jere runs them himself on about 5,000 THB per month.
- **Current plan:** a New Year campaign launching in November 2026 on two tracks, B2C and corporate New Year gifting (B2B). The gift set comes first and other formats follow in January 2027. Jere's sister handles B2B outreach. There are no B2B accounts yet.

## Contents

| Area | Location | Purpose |
| --- | --- | --- |
| Documentation index | `docs/README.md` | Map of every document and where new ones belong |
| Brand | `docs/brand/` | Positioning, identity, voice and approved wording |
| Commercial | `docs/commercial/` | Sales channels and campaign plans |
| Workflows | `docs/workflows/` | The social post workflow and the ChatGPT instructions |
| Tools | `tools/` | The Post Maker, which adds the real logo and brand fonts to posts |
| Decision log | `docs/decision-log.md` | Dated record of settled decisions |
| Working practices | `CONTRIBUTING.md` | How to add or change material |
| Claude guidance | `CLAUDE.md` | Context and rules for AI-assisted work in this repository |

## Usage

1. Read `docs/README.md` to find the section that fits your material.
2. Check `docs/decision-log.md` before drafting, so settled decisions stay settled.
3. File new material in the section whose purpose it serves. If no section fits, add one and write its filing logic in that section's `README.md` first.
4. Record any new decision in the log with its date and reason.

## Approvals

Jere approves all brand decisions.

## Conventions

- British English, sentence case headings, no em dashes.
- FINTH is always written in capitals.
- Settled elements (wording, look, behaviour) live on one home page. Other pages link to it.

## Open items

- [ ] Licence holder: FINTH, the Heartbaker legal entity (name needed) or Jere as an individual. `LICENSE` names FINTH as a placeholder until Jere chooses.
- [ ] Target audience as written in the brand file, copied into `docs/brand/positioning.md` with its intended-not-validated label
- [ ] Gift set specification for the November launch: contents, price and packaging
- [ ] White and black logo files exported from the Canva Brand Kit as SVG or high-resolution PNG
- [ ] English post font from Brand OS (Quicksand stands in)
- [ ] Facts marked "to confirm" in `docs/brand/facts.md`: café hours and menu, LINE ID, Facebook name, product claims
- [ ] Approval of the proposed safe zones and logo size in `docs/workflows/social-post-workflow.md`
- [ ] Technology stack: the Post Maker uses plain HTML and JavaScript. No other build is decided.

## Licence

Proprietary. All rights reserved. See `LICENSE`.
