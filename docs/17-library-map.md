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

`src/scripts/ambient.ts` plays a soft bamboo-flute track with birdsong, `public/audio/flute-and-birds.mp3` ("Nature Bird Bamboo Flute Morning Relaxing Music" by Sujan, shared as copyright-free), very quietly on a loop, "like music in a theatre washroom". Kritikesh chose this track on 14 Nov 2026, and asked for one melody that plays on without a break as the visitor moves through the site. The file was loudness-levelled to about -16 LUFS and re-encoded at 80 kbps (about 3 MB); it is only fetched when the music starts.

- **No break between pages.** The site changes pages without reloading: Astro's `<ClientRouter fallback="none" />` in the head of `src/layouts/Base.astro` fetches the next page and swaps it in. The music lives in one Audio element that is never thrown away, so it simply keeps playing. If a page ever does reload (an old link to an `/explore/` address, or a page outside the site's frame), the tab remembers where the music had got to (`cs-ambient-live` in sessionStorage, that tab only) and carries on from that point without fading in again.
- **What this means for page scripts.** Because pages no longer reload, a script runs once per visit, not once per page. Every script is wrapped in `onPage((signal) => { ... })` from `src/scripts/page.ts`, which runs it on the first page and again on each page after. Give `{ signal }` to any listener on `document` or `window`, stop timers when the signal ends, and let the script stop quietly on pages that do not have its elements. A new script that skips this will only work on the first page a visitor opens.
- **The security policy.** Every script and stylesheet is its own file (`build.inlineStylesheets: 'never'` and `vite.build.assetsInlineLimit: 0` in `astro.config.mjs`), so the security policy is the same on every page and covers pages reached without a reload. Keep it that way: an inline script written into a single page would be blocked there.
- **On by default.** It starts at once where the browser allows it, otherwise on the visitor's first tap, click or key press anywhere. The speaker button in the top bar switches it off, and that choice is remembered in the browser (`cs-ambient` in localStorage). It is quiet while the tab is hidden.
- **Loudness.** `LEVEL` (now `0.2`, on a 0 to 1 scale, about -30 LUFS) sets the volume. Raise it for louder, lower it for softer.
- **Changing the track.** Replace the mp3 (keep it small: level it and use about 80 kbps), or change `SRC`.
- **Turning it off for everyone.** Delete the `import('../scripts/ambient')` line in `src/layouts/Base.astro`. The no-reload page changes can stay.

## 5. My story

`/about/my-story/` tells Kritikesh's life story as 24 short questions and answers under 7 milestones (from "Before 2016, Rawatbhata" to "Now, Curious Sparoows"), in English and Hindi. He told the story in his own words on 15 Nov 2026. **Every date comes from his "My Life History" Google Sheet on Drive (Life Log tab), which is the reference for dates:** if the story and the sheet differ, the sheet wins, so check it before changing a date (never copy anything else from that sheet: it also holds private numbers). It is written as one person talking warmly to another (students, parents, teachers and recruiters alike): honest about the setbacks, and clear about what they taught him. Many of the questions are about how he felt at each moment (the friends leaving for Kota, the first day in Delhi, the IAS-at-21 dream breaking, missing DU by 1%, the heavy nights), because readers connect with the feelings more than the facts. The story is open-ended on purpose: the last question ("Is that the whole story?") and a "This is only the beginning" box under the answers promise the minute details still to come (every mistake, the 100-page booklet of his teachers' advice), so students can learn from his mistakes and save time. When those detailed stories are published, link them from that box. **Tone rules (his words, 15 Nov 2026):** humble and down to earth. Never say or suggest that other people lack what he has (many people know far more), and let it show that even after all this study he feels he knows little and is still learning. Recruiters are reached indirectly: no "for recruiters" section; the site should read as his hobby and his nature (serving people), and say plainly that any job he takes comes first (see `why-curious-sparoows`, the About page's "Outside work" list and the home "Hi, I'm Kritikesh" band). **The one featured question is "Why AI now, after so many years of preparation?"** (`why-ai`, set by `FEATURE` in the page and in the card): it is shown larger and bolder than every other question (a big link under the page title, in the lists, on its slide and on the home card). Its answer connects geography problems (rain and farming, distance to hospitals, the tribal villages of his dissertation) to what AI can do, and admits he is a beginner. The page says that it was arranged with AI help.

- **The words** are in `src/data/my-story.ts`: each milestone has `when`, `title` and its questions; each question has `q` (the question) and `a` (the answer, one string per paragraph), each with `en` and `hi`. The Hindi keeps the meaning, not word for word, and the narrator is masculine. Keep each answer short (about 40 to 60 words): many small questions rather than long answers. The page and the card show the reading time they work out from the word count (now about 7 minutes).
- **Adding a question:** add an item with a new, unique `id` (it becomes the link, for example `/about/my-story/#why-geology`). The numbering, the side lists, the "Next:" line and the search-engine data (FAQPage) all follow by themselves.
- **The page** (`src/pages/[...lang]/about/my-story.astro`): on wide screens the questions are listed down the left and right, grouped under the milestones, and the middle shows one answer at a time (Previous / Next, the ← → keys, or a swipe on phones). On phones the lists fold into one "All questions" list above the answer. "Read it all at once" shows every answer as one page; without JavaScript every answer simply shows, one below the other.
- **The invitation card** (`src/components/StoryTeaser.astro`) sits on the home page just after "Hi, I'm Kritikesh", and near the top of the About page (one column there, with `stack`). It leads with the struggle ("I didn't clear the exam I gave years to. Here's why I wouldn't change a single day."), shows four numbers (8 years of preparation, 3 UPSC attempts (10 Oct 2021, 5 Jun 2022, 24 May 2026; none cleared), 3 RAS attempts, 1 reason to keep going), a big, bold "Why AI now?" link, then five smaller curious questions that each open their own answer (one of them on the IAS-at-21 dream breaking, `no-shortcut`; the headline and the "If I could go back, would I change anything?" box open `would-you-change-anything`, which gives the reasons) on the story page, and an "If I could go back, would I change anything? Not a single day" box listing what the struggle gave him. The Delhi coaching detail: he woke at 5 a.m. for the 7:30 a.m. batch (his correction, 15 Nov 2026). If you rename a question's `id` in `my-story.ts`, change it in the card's `HOOKS` too (a hook whose id is missing is simply left out). Update the numbers there when a new attempt is made.
