# Post Maker

A single web page that finishes a social post. ChatGPT supplies the picture and the words. The Post Maker adds the real logo, the brand fonts and the script title, then exports every size.

Status: prototype v0.1. It covers the scene lane (photo plus logo, with optional text). The poster lane, real QR codes and automatic saving to Drive are not built. See `docs/workflows/social-post-workflow.md`.

## What it does

1. She picks a ChatGPT image.
2. She chooses "logo only" or "logo and text".
3. For text, she pastes the labelled block that ChatGPT returns. The page sorts it into fields.
4. She taps Create. The page returns Feed 4:5, Vertical 9:16 and Square 1:1 files.
5. She saves each file, or shares all three to Photos, Drive or LINE.

Rules the page applies without asking her:

- The logo is the real SVG, placed at the top or bottom inside the safe zones.
- Thai text uses Sarabun. English text uses Quicksand until the English post font is confirmed.
- "The Aperitif Collection" is lifted out of any text field and drawn as the Amsterdam Three artwork.
- Text and the script title turn white or dark depending on the photo behind them.
- A warning appears when the photo is busy behind the logo or the text.

## Run it

From the repo root:

```
python3 -m http.server 8765
```

Open `http://localhost:8765/tools/post-maker/` in a browser. The page reads brand files from `docs/brand/assets/`, so serve the repo root, not this folder.

## Change the brand settings

Edit `brand-config.js`: formats, safe zones, logo files, fonts and colours. Each value is marked "to approve" where Jere has not confirmed it.

Export the white and black logo files from the Canva Brand Kit, save them in `docs/brand/assets/`, and set their names in `brand-config.js`. The page then picks the white logo on dark photos and drops the white plate it uses now.

## Fonts

`fonts/` holds Sarabun and Quicksand as WOFF2 files with their SIL Open Font License texts. Quicksand has no Thai letters (checked in the font file), so Thai always falls back to Sarabun.

## Tested

A headless Chromium run on a phone-sized window, with two synthetic photos (light and dark), covered:

- parsing of the labelled text block, including bold markers and bullets
- removal of "The Aperitif Collection" from text and the automatic script title
- Thai and English rendering in all three formats
- logo at top and bottom, safe-zone overlay, light and dark text

Not tested yet: real ChatGPT images, a real phone, Safari, and sharing to Photos.

## Known gaps

| Gap | Effect |
| --- | --- |
| No white or black logo files in the repo | Dark photos get the colour logo on a white plate |
| English post font unconfirmed | Quicksand stands in |
| Amsterdam Three artwork is a PNG derived from Jere's file | Vector export preferred. Check the font licence for artwork use. |
| Poster lane not built | Offer, range and hours posters still need templates and real QR codes |
| No saving to Drive | She saves or shares from the page |
| Stills only | Reels and TikTok motion stays in Canva or the apps |
| Hosting undecided | The page needs a link she can open on her phone |
