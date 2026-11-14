# 18 · Portfolio, top-bar menus and the home page

[Back to the handbook](README.md)

Added on 14 Nov 2026. This guide covers the drop-down menus in the top bar, the Portfolio shelves, the home page bands and the Curious Sparoows social links.

## 1. The top-bar menus

Library, Exam Prep, Portfolio, About and Contact each have a small arrow that opens a big panel. On a laptop it also opens when the mouse rests on the menu name. Esc or a click outside closes it.

| File | What it is |
| --- | --- |
| `src/components/library/LibraryMega.astro` | The Library panel (themes › disciplines), see [17](17-library-map.md) |
| `src/components/NavMega.astro` | The Exam Prep, Portfolio, About and Contact panels: a dark feature card on the left and columns of links. Each panel is one `if (kind === ...)` block; change its links there |
| `src/scripts/mega.ts` | Opening and closing for every panel (one open at a time) |
| `src/layouts/Base.astro` | `MENUS` lists which top-bar items have a panel and the panel's id |

Exam Prep subjects and exams come from the Exam Prep data, and the Portfolio panel from `src/portfolio.config.ts`, so they update on their own.

## 2. The Portfolio

`/portfolio/` shows every shelf in three groups; each shelf also has its own page, `/portfolio/<shelf>/`. Left: the shelves; right: a short "about me" with the photo and ways to follow. On phones the shelves become a row of chips.

| Group | Shelves (address) |
| --- | --- |
| Projects | AI and machine learning (`ai-ml`), Data and Python (`data-python`), Maps and GIS (`maps-gis`), Web and other languages (`web-code`) |
| Research | Research papers (`research`) |
| Made by hand | Sketches and paintings (`sketches`), From my kitchen (`kitchen`), Garden and tree planting (`garden`) |

Projects are grouped by what they do rather than by programming language, because most work mixes languages (the website is HTML, CSS, TypeScript and Python). The language shows as a tag on each card.

**A shelf with no work yet** shows an "On the workbench" card: what is coming first, and a link to the matching Library shelf. It disappears into a smaller "next on this shelf" card once the first piece is added.

**Add a piece of work.** Add a Markdown file to `src/content/projects/` (copy an existing one). Set `section:` to the shelf address, for example `section: kitchen`, and `status:` to `live`, `in-progress` or `planned`. Pictures go in `public/images/` (`image:` and `imageAlt:` in the file). A Hindi version goes in `src/content/projects/hi/` with the same file name.

**Change what a shelf says or what is "coming".** Edit its block in `src/portfolio.config.ts` (`blurbEn`, `comingEn` and the Hindi lines). To add a shelf, add a block there and its address to the `section` list in `src/content.config.ts`.

**Research paper link.** The Bhil research is `src/content/projects/bhil-tribal-poverty.md`. To link the published paper, add it under `links:` (label and address).

## 3. Social links

`BRAND_SOCIALS` in `src/site.config.ts` holds the Curious Sparoows Instagram, Facebook, X (Twitter) and YouTube addresses. An empty address stays hidden. Once filled, each one appears in the footer, on the Contact page, on the About page, in the About and Contact menus, and in the Portfolio side bar. `SOCIALS` (LinkedIn, GitHub, Hugging Face) are Kritikesh's own profiles. All four were filled on 14 Nov 2026 (Facebook points to Kritikesh's personal profile, as he asked). The Exam Prep menu has an "All exams of India" column fed by `src/data/exam-catalogue.ts` (see [14](14-exam-prep.md)).

## 4. The home page

`src/pages/[...lang]/index.astro`, top to bottom: the poster, then one band per section, each a very light wash of one site colour so the sections read as separate rooms:

| Band | Colour class | What it holds |
| --- | --- | --- |
| About me | `b-me` (gold) | Photo, short bio, four facts, a four-step timeline, buttons to My story and About |
| Library | `b-lib` (lavender) | "Just hatched" carousel and the curious-question card |
| Explore | `b-tree` (teal) | The drawn tree and every open shelf |
| Exam Prep | `b-exam` (amber) | Three numbers and all 15 subjects |
| Live project | `b-live` (blue) | The NYC taxi demo |
| Portfolio | `b-pf` (coral) | Every Portfolio shelf and the first three projects |
| Read deeper | `b-read` (violet) | The Universe course and the published long reads |

To change a band's colour, change its `--band-edge` and `--band` at the bottom of the file. The bands use the theme's own colours, so dark mode follows by itself.

## 5. The question card

The curious-question card no longer shows a counter ("135 / 644"). It still shows every question once before repeating ([17](17-library-map.md)).
