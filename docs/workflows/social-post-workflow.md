# Social post workflow

Status: draft for Jere's approval, 20 Oct 2026. The Post Maker prototype exists (`tools/post-maker/`) and has been tested on synthetic photos only.

## Problem

Heartbaker's sister makes about three posts a week with ChatGPT's image generator, from a studio photo of the product. ChatGPT paints the logo and every letter as pixels, so the logo drifts, the fonts are not the brand fonts, and the QR codes and small label text cannot be trusted. The wording is right in most posts.

## Principle

ChatGPT supplies the picture and the words. A fixed step supplies everything that must be exact: the logo, the fonts, the script title and the QR codes.

## Roles

| Person | Does |
| --- | --- |
| Heartbaker's sister | Shoots the photo, asks ChatGPT, runs the Post Maker, posts |
| Jere | Approves brand rules, maintains the facts sheet and the tool, confirms facts |

## Two lanes

About half of her posts fall in each lane (Jere, 20 Oct 2026).

| Lane | Example | Approach | Status |
| --- | --- | --- | --- |
| Scene | Product or café photo with the logo and a short headline | Post Maker | Prototype built |
| Poster | Offer, range and prices, opening hours | Fixed poster templates with fields, text from the facts sheet, real QR codes. ChatGPT supplies imagery only. | Not built |

ChatGPT cannot repair a poster it designed with 20 or more text items. The poster lane replaces its layout instead.

## Steps for the scene lane

1. **Photo.** She photographs the product on a plain surface in daylight, with the product centred.
2. **ChatGPT.** Her custom instructions (see `chatgpt-instructions.md`) make it return a clean image with calm space top and bottom, and the words as a labelled text block.
3. **If ChatGPT still paints text or a logo,** she replies with one saved line asking for the same image without them.
4. **Post Maker.** She picks the image, pastes the text block, and taps Create.
5. **Check, 60 seconds.** The list below.
6. **Post.** She saves or shares the files to the channel.

## 60-second check

- The logo is the real one and sits inside the safe zone.
- Thai and English text use the brand fonts.
- The Thai spelling matches what she wrote.
- Any price, hour or handle matches `docs/brand/facts.md`.
- Any QR code comes from the Post Maker and scans on a phone.
- No warning is left on the preview.

## Formats and safe zones

Proposed by Claude, to approve. Platform figures come from marketing guides, not official specs, and they disagree. These take the cautious end. Check them on a live phone preview before they become settled.

| Format | Size | Channels | Keep logo and text inside |
| --- | --- | --- | --- |
| Feed 4:5 | 1080 × 1350 | Instagram, Facebook | 60 px from the sides, 80 px from top and bottom. The Instagram profile grid crops 4:5 to 3:4, which trims about 34 px per side. |
| Vertical 9:16 | 1080 × 1920 | Stories, Reels, TikTok | 290 px from the top, 480 px from the bottom, 220 px from the right, 60 px from the left |
| Square 1:1 | 1080 × 1080 | LINE (format to confirm) | 60 px on all sides |

On the vertical format a bottom logo must end above y = 1440.

Logo size (to approve): about 20% of the canvas width, centred, at the top or the bottom.

## What stays manual

- Asking ChatGPT and posting.
- Motion for Reels and TikTok. The Post Maker returns still images.
- Confirming facts before they enter the facts sheet.

## Test before rollout

Run a 10-post test with her real photos: five usual posts, each run twice.

| Measure | Pass mark |
| --- | --- |
| ChatGPT returns a clean image with no text or logo | 8 of 10 |
| The product and its label stay unchanged | 10 of 10 |
| The text block comes back in the right format | 8 of 10 |
| Finished files need no manual fix | 9 of 10 |

If the first measure fails, the fallback is to detect and cover the old text, or to ask for the same image without it each time.

## Open items

| Item | Owner | Status |
| --- | --- | --- |
| White and black logo files from the Canva Brand Kit, exported as SVG or high-resolution PNG | Jere | Open |
| English post font from Brand OS | Jere | Open, Quicksand stands in |
| Facts in `docs/brand/facts.md` marked "to confirm" | Jere | Open, does not block the build |
| Vector file and licence terms for the Amsterdam Three artwork | Jere | Open |
| Safe zones and logo size | Jere | Awaiting approval |
| Hosting: a link she can open on her phone | Jere and Claude | Open |
| LINE post format | Jere | Open |
| ChatGPT custom instructions available on a free account | Claude | To verify |
| Poster templates and real QR codes | Claude | Not started |
