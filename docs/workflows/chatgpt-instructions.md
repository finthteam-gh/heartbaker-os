# ChatGPT instructions

Status: draft, untested. Run the 10-post test in `social-post-workflow.md` before relying on these. ChatGPT may ignore an instruction, so the Post Maker still checks the result.

## 1. Custom instructions

Paste into ChatGPT settings, under custom instructions. Availability on a free account is to verify.

```
For the social media images I ask for:
1. Create the picture only. Put no text, logo, QR code, price or watermark in the image.
2. Keep the top 15% and the bottom 20% of the image calm and uncluttered, with a soft background, so a logo and text can be added there later.
3. Keep the product and its packaging as in my photo, unchanged. Do not redraw, restyle or retype the label.
4. Make the image 2:3 portrait unless I ask for another shape. Keep the product centred.
5. After the image, reply with the words for the post as plain text in this format, one item per line, with nothing around it:
HEADLINE_TH: ...
HEADLINE_EN: ...
SUB_TH: ...
SUB_EN: ...
CTA: ...
Leave out a line if the post does not need it.
6. Use only the facts I give you: prices, hours, handles, flavours and claims. If a fact is missing, write [ASK] in its place.
7. Write Thai and English in short, natural sentences.
```

## 2. Prompt for each post

She attaches the photo and writes:

```
Make a social media image from this photo. Mood: [warm / festive / calm]. The post is about: [one sentence].
```

The custom instructions handle the rest.

## 3. If ChatGPT paints text or a logo anyway

She replies with one of these lines:

```
Same image, with no text and no logo.
```

```
ภาพเดิม แต่ไม่ต้องมีข้อความและโลโก้
```

Fallback if the product label changes: ask again with "Keep the bag as in my photo, unchanged", or use the original photo in the Post Maker.

## 4. Text block format

The Post Maker reads these labels. Bold markers and bullets are ignored.

| Label | Meaning |
| --- | --- |
| `HEADLINE_TH` | Thai headline |
| `HEADLINE_EN` | English headline |
| `SUB_TH` | Thai subline |
| `SUB_EN` | English subline |
| `CTA` | Call to action |
| `COLLECTION` | `yes` adds the script title. Writing the phrase "The Aperitif Collection" in any line does the same. |

## Why this works

The picture can come from ChatGPT because nothing in it needs to be exact. The logo, the fonts and the script title come from files, so they cannot drift.
