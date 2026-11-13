# 16 · Explore: the Encyclopedic Indexes

[Back to the handbook](README.md)

**Explore** (<https://curioussparoows.com/explore/>) puts the 12 Encyclopedic Indexes on the website: Movies, Books, Music, Musical Instruments, Cooking, Gardening, Sports and Games, Technology, Crochet, Knitting, Embroidery and Sewing. Each index is also a printable booklet; the website and the booklet share the same IDs (such as `SEW-07.1`), so they match line for line.

## 1. How it is arranged

| Page | Address | What it shows |
| --- | --- | --- |
| Hub | `/explore/` | The 12 subjects on four shelves (Stories and Sound, Living Well, How Things Work, Needle Arts) and one starting question from each |
| Topic page | `/explore/<topic>/` | Cover, the five starting questions, the map of Parts, the reader's progress, the PDF download |
| Reading page | `/explore/<topic>/<id>-<title>/` | One Section of the booklet (for example SEW-07), with tick boxes, contents and Previous/Next |

There are about 450 reading pages. The menu has an **Explore** link, and the home page has a "Twelve worlds, mapped" band. Explore is in **English only** for now; Hindi pages link to the English ones.

## 2. Where the files are

| File or folder | What it is |
| --- | --- |
| `tools/explore/source/<topic>/p*.md` and `config.json` | The booklet's part files: **the master text**. The same files build the printed booklet (Drive: 07_ENCYCLOPEDIC_INDEXES) |
| `tools/explore/build_explore.py` | Turns the part files into website data. Python 3, no extra installs |
| `tools/explore/media/<topic>.json` | Optional pictures and videos for a topic (part 4) |
| `src/data/explore/` | The website data the script writes. **Never edit by hand** |
| `src/styles/explore-topics.css` | Each topic's colours, written by the script from the booklet cover colours |
| `src/explore.ts` | The shelves, their names and blurbs |
| `src/pages/explore/` | The hub, topic and reading pages |
| `src/components/explore/` | Topic card, contents, progress bar, pictures and videos, the home band |
| `src/scripts/explore.ts` | Tick boxes, progress, the phone contents sheet, tap-to-play videos |
| `src/styles/explore.css` | The look of Explore |
| `public/explore/pdf/<topic>-encyclopedic-index.pdf` | The downloadable booklets |

## 3. Correct or update an index

1. Edit the part file in `tools/explore/source/<topic>/` (keep the booklet rules: `# PART n — TITLE`, `## XXX-nn Title`, `- ☐ **XXX-nn.n Name**: text`).
2. From the repository root run `python3 -I tools/explore/build_explore.py`.
3. Run `npm run build` to check, then publish as usual ([06](06-pull-requests.md)).
4. Copy the same change into the booklet's part files in Drive (07_ENCYCLOPEDIC_INDEXES/_build_tools) and rebuild the DOCX and PDF there, then replace `public/explore/pdf/<topic>-encyclopedic-index.pdf`.

A changed Section title changes that page's address. Avoid renaming once a page is shared; if you must, add a redirect (see [08](08-fix-problems.md)).

## 4. Add pictures and videos

1. Prepare the picture as in [03 · Images](03-images.md) and upload it to `public/images/explore/<topic>/`.
2. Create or open `tools/explore/media/<topic>.json` and add it:

```json
{
  "cover": { "src": "/images/explore/sewing/cover.webp", "alt": "An old treadle sewing machine", "credit": "Photo: your name" },
  "sections": {
    "SEW-02": [
      { "type": "image", "src": "/images/explore/sewing/treadle.webp", "alt": "A treadle machine on a wooden table", "caption": "A treadle machine", "credit": "Photo: your name" },
      { "type": "video", "youtube": "VIDEO_ID", "title": "How a lockstitch is made", "caption": "Slow-motion lockstitch", "credit": "Channel name" }
    ]
  }
}
```

3. Run the script (part 3, step 2) and publish.

- `cover` replaces the coloured cover on the hub card and topic page (a dark shade is added so the white title stays readable; use a landscape picture at least 1600 px wide).
- In `sections`, the first item appears at the top of that page and the rest at the bottom.
- `youtube` is the part after `v=` in a YouTube link. The video shows its picture first and only loads YouTube (privacy-enhanced mode) when tapped.
- Only use pictures and videos you have the right to use, and always fill in `credit`.

## 5. Tick boxes and privacy

Ticks are saved only in the visitor's own browser (key `cs-explore-ticks`), never sent anywhere, and do not move between devices. The topic page shows progress and a "Clear my ticks" button. The privacy page says the same.

## 6. Add Hindi later

The layout is ready for Hindi (Devanagari fonts and line spacing are set). To add it: translate the part files into `tools/explore/source/hi/<topic>/` following the easy-Hindi rules in [15](15-languages-and-hindi.md), extend the script to write Hindi data, and give the pages a `[...lang]` route like the Library. Start with Part 0 (the five questions) of each topic.

## 7. Change the shelves or the order

The order and shelf of each topic are in `TOPICS` at the top of `tools/explore/build_explore.py`; the shelf names and blurbs are in `SHELVES` in `src/explore.ts`.
