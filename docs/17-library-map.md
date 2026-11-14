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

`src/scripts/ambient.ts` makes a very soft sound of sparrow chirps only (the wind and hum were removed on 14 Nov 2026 at Kritikesh's request; keep the chirp timing as it is), live in the browser (no sound files). Browsers allow sound only after a tap, so it fades in on the visitor's first tap or key press. The speaker button in the top bar pauses it, and that choice is remembered in the browser. To make it louder or softer, change `LEVEL` (now `0.025`, halved on 14 Nov 2026 so it never pulls attention from reading). To turn it off for everyone, delete the `import('../scripts/ambient')` line in `src/layouts/Base.astro`.

## 5. My story

`/about/my-story/` (`src/pages/[...lang]/about/my-story.astro`) has six chapter placeholders. To publish a chapter, write its paragraphs in `text` (and `textHi` for Hindi) and set `ready: true`. It is linked from the About page and the footer.
