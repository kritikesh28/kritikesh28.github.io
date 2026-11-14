# 17 · The Library map, the home page panels and the background sound

[Back to the handbook](README.md)

On 14 Nov 2026 the Library became one tree for all knowledge. Its map is **The Universal Index of Human Knowledge** (Expanded First Edition 1.0, Kritikesh's Word book, Drive file `Universal_Index_of_Human_Knowledge_Expanded_Book.docx`): 46 disciplines and 3,126 named topics.

## 1. How the tree is arranged

| Level | What it is | Example | Where it lives |
| --- | --- | --- | --- |
| Forest | The whole Library | `/library/` | `src/pages/[...lang]/library/index.astro` |
| Theme | One of 8 groups of disciplines, for finding your way | Words, Arts & Media | `THEMES` in `src/library-map.ts` |
| Tree | A discipline (a principal field of the Index) | ACP Arts & Crafts, `/library/map/arts-and-crafts/` | `src/pages/[...lang]/library/map/[field].astro` |
| Branch | Its main areas, and their topics | ACP.02 Crafts and material practice › ACP.02.02 Fibre arts and textiles | from the Index |
| Twig | A topic with pages: a **shelf** | Crochet, `/library/crochet/`; The Universe, `/library/the-universe/` | Encyclopedic Indexes ([16](16-explore.md)) and courses ([13](13-add-to-the-library.md)) |
| Leaf | One short page | "Why can't a machine crochet the way it knits?" | |

The whole tree is at `/library/map/`. The six older trees of long reads (AI & ML, Geography & Earth ...) were folded into this tree on 14 Nov 2026: their old addresses (`/library/ai-ml/` ...) forward to the matching discipline (list `MOVED` in `src/pages/[...lang]/library/[twig]/index.astro`), and the Library page shows the one course and the published long reads under "Courses and long reads".

## 2. Where the files are

| File | What it is |
| --- | --- |
| `tools/library-index/source/universal-index.md` | The Index book as text (**the master**) |
| `tools/library-index/build_taxonomy.py` | Turns it into `src/data/library/taxonomy.json`. Never edit the JSON by hand |
| `src/data/library/branches.hi.json` | Hindi names of the 336 branches (keyed by code, e.g. `PPS.01`). If a new edition adds a branch, add its Hindi name here; until then the English name shows |
| `src/library-map.ts` | Short names and Hindi names of the 46 disciplines, the 8 themes and their colours, **where each shelf sits** (`PLACE`) and planned topics (`PLANNED`) |
| `src/components/library/LibraryMega.astro` | The big Library menu in the top bar of every page (the other menus: [18](18-portfolio-and-menus.md)) |
| `src/layouts/LibraryLayout.astro` | The left sidebar (themes › disciplines › branches) on Library pages; a drawer on phones |
| `src/components/library/LibraryTree.astro` | The drawn tree with sparrows (home page "Pick a thread", Library page, `/library/map/`) |
| `src/components/library/ShelfCard.astro`, `ShelfMotif.astro` | Shelf cards and their line drawings |
| `src/components/library/ThemeGrid.astro` | The 8 theme cards with every discipline, marked "pages coming" until written |

## 3. Common jobs

**A new edition of the Index.** Save the Word book as text into `tools/library-index/source/universal-index.md` (headings `# CODE Name`, `## CODE.01 Name`, topics start with `–`, units with `·`), run `python3 -I tools/library-index/build_taxonomy.py`, then `npm run build`. If a discipline code is added or renamed, add it to `NAMES` and to one theme in `THEMES` in `src/library-map.ts`; the build stops with a clear message until you do.

**A new shelf goes live** (a new Encyclopedic Index or course). Add one line to `PLACE` in `src/library-map.ts` with its discipline code and branch code (find codes on `/library/map/<discipline>/`). It then appears in the menu, the sidebar, the tree, the discipline page and the shelf cards. If it has no line drawing yet, add one to `ShelfMotif.astro`.

**Announce a new upload.** Edit `src/data/fresh.ts`: add the line at the top of the first slide and move the last line of each slide down one slide, so there are always 6 slides of 5 lines. Lines can point to a web address or to `[shelf, n]`, question n of a shelf (counted from 0).

**Add curious questions.** Add lines to `src/data/questions/bank.en.txt` as `Topic | Question | Answer`. Answers must be complete, true and checked. The card shows each question once before any repeats (the order is remembered in the reader's browser). Hindi questions are in `src/data/curious-questions.hi.ts`.

## 4. The background sound

`src/scripts/ambient.ts` plays soft background music on every page: a slow bansuri (bamboo flute) in Raag Bhupali (Sa Re Ga Pa Dha, tonic D) over a quiet tanpura-like drone, with sparrows chirping now and then (flute added 14 Nov 2026 at Kritikesh's request; keep the chirp timing as it is). It is all made live in the browser with the Web Audio API: no sound files, nothing downloaded, and no one else's recording, so there is no copyright question. The melody is made up fresh on every visit from short phrases that rest on Sa, Ga or Pa.

- **On by default.** It starts at once where the browser allows it. Most browsers allow sound only after a tap, click or key press, so otherwise it fades in on the visitor's first one. The speaker button in the top bar switches it off, and that choice is remembered in the browser (`cs-ambient` in localStorage).
- **Loudness.** `LEVEL` (now `0.3`) sets the overall level: about -24 dBFS on average, the loudest chirps about -10 dBFS, so it is clearly audible but stays under speech. `MIX` sets the balance of flute, drone, sparrows and room echo.
- **Checking a change.** `compose()` also works on an `OfflineAudioContext`, so a minute can be rendered to a WAV file in a headless browser and measured before going live.
- **Turning it off for everyone.** Delete the `import('../scripts/ambient')` line in `src/layouts/Base.astro`.

## 5. My story

`/about/my-story/` (`src/pages/[...lang]/about/my-story.astro`) has six chapter placeholders. To publish a chapter, write its paragraphs in `text` (and `textHi` for Hindi) and set `ready: true`. It is linked from the About page and the footer.
