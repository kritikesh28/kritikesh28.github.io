# 16 · Library shelves: the Encyclopedic Indexes (was "Explore")

[Back to the handbook](README.md)

> **14 Nov 2026: Explore moved into the Library.** The 12 indexes are now *shelves* of the Library, each placed on its branch of the Library tree (see [17 · The Library map](17-library-map.md)). Old `/explore/...` links still work: small pages forward them to the new address. The PDF download section was removed from the website for now; the booklets stay in Drive.

The 12 Encyclopedic Indexes: Movies, Books, Music, Musical Instruments, Cooking, Gardening, Sports and Games, Technology, Crochet, Knitting, Embroidery and Sewing. The website and the printed booklet share the same IDs (such as `SEW-07.1`), so they match line for line.

## 1. How it is arranged

| Page | Address | What it shows |
| --- | --- | --- |
| Shelf cards | `/library/#shelves` | Every shelf as a card with a line drawing behind it |
| Topic page (a Twig) | `/library/<topic>/` | Cover, where it sits in the tree, the five starting questions, the map of Parts, the reader's progress |
| Reading page (a Leaf) | `/library/<topic>/<id>-<title>/`, then `.../2/`, `.../3/` | One page of a Section, **two to three minutes long**: an Overview box, the text, a Summary box, tick boxes, Back/Next (and the ← → keys) |
| Old addresses | `/explore/...` | Forwarding pages only (`src/pages/explore/[...path].astro`), not indexed |

There are about 540 reading pages, in **English only** for now; Hindi pages link to the English ones.

**The reading layout (14 Nov 2026).** Every topic and reading page has three columns: on the left, every Part as a drop-down with its Sections (and the pages of the Section you are in); in the middle, the page; on the right, the five starting questions and the topic at a glance. On phones the left bar opens from the **Contents** button and the right bar moves below the text.

**How long Sections are cut into pages.** `build_explore.py` cuts each Section (except the short question pages of Part 0) into pages of about 380 words, never more than about 480, cutting before a heading where it can and between list items or table rows only when one heading's block is too long (`PAGE_TARGET`, `PAGE_MAX`, `PAGE_MIN` near the top of `paginate()`). The first page keeps the Section's old address, so no link breaks. For each page the script also writes its headings (used in the Overview and the left bar) and a Summary: each heading or named entry with the first sentence of its explainer. The question pages keep their own "Short answer" (shown as **Overview**) and "Remember this" (shown as **Summary**).

## 2. Where the files are

| File or folder | What it is |
| --- | --- |
| `tools/explore/source/<topic>/p*.md` and `config.json` | The booklet's part files: **the master text**. The same files build the printed booklet (Drive: 07_ENCYCLOPEDIC_INDEXES) |
| `tools/explore/build_explore.py` | Turns the part files into website data. Python 3, no extra installs |
| `tools/explore/media/<topic>.json` | Optional pictures and videos for a topic (part 4) |
| `src/data/explore/` | The website data the script writes. **Never edit by hand** |
| `src/styles/explore-topics.css` | Each topic's colours, written by the script from the booklet cover colours |
| `src/explore.ts` | Reading the shelf data. Where each shelf sits in the tree is in `src/library-map.ts` (`PLACE`) |
| `src/pages/library/[topic]/` | The topic page (`index.astro`) and the reading pages (`[...section].astro`) |
| `src/components/explore/` | Contents, progress bar, pictures and videos (the shelf card is `src/components/library/ShelfCard.astro`) |
| `src/scripts/explore.ts` | Tick boxes, progress, the phone contents sheet, tap-to-play videos |
| `src/styles/explore.css` | The look of Explore |

## 3. Correct or update an index

1. Edit the part file in `tools/explore/source/<topic>/` (keep the booklet rules: `# PART n — TITLE`, `## XXX-nn Title`, `- ☐ **XXX-nn.n Name**: text`).
2. From the repository root run `python3 -I tools/explore/build_explore.py`.
3. Run `npm run build` to check, then publish as usual ([06](06-pull-requests.md)).
4. Copy the same change into the booklet's part files in Drive (07_ENCYCLOPEDIC_INDEXES/_build_tools) and rebuild the DOCX and PDF there. (The PDFs are not on the website for now.)

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
