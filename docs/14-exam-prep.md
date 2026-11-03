# 14 · Exam Prep section

[Back to the handbook](README.md)

The Exam Prep section lives at **curioussparoows.com/exam-prep/**. It puts two Google Sheets on the website, view only, so that any aspirant can see the whole syllabus and which topics past papers asked most, free and without a login. It was built on 1 and 2 November 2026 (pull requests #10 and #12).

**Why it exists:** Kritikesh has prepared for exams since 2018 and could never find this kind of map anywhere. The section is welfare first: it should lower an aspirant's stress, never add to it. Every change must keep that.

## 1. The big picture

```
 Google Sheets (the source of truth, edited by people)
   ├── Curriculum Index   → every topic of 14 subjects, in teaching order
   └── Exam Guide         → Rajasthan GK (_RajMaster) + past-paper analysis (_build/export.json)
            │
            │  download as .xlsx  +  export.json
            ▼
 tools/exam-prep/build_data.py   (a Python script, run by hand or by Claude)
            │
            ▼
 data files in the repository
   ├── src/data/exam-prep/   (used while the site is built)
   └── public/exam-prep/     (downloaded by the visitor's browser: search and Exam Mentor)
            │
            ▼
 Astro builds the pages  →  GitHub Pages publishes  →  curioussparoows.com/exam-prep/
```

The website never reads Google directly. When a sheet changes, the website only changes after the script is run again (section 4).

## 2. The pages

| Page | Address | Built from | File |
| :---- | :---- | :---- | :---- |
| Intro (problems first, short Q&A) | /exam-prep/ | text written in the file | `src/pages/[...lang]/exam-prep/index.astro` |
| Exhaustive Curriculum Index (all subjects, search) | /exam-prep/curriculum-index/ | Curriculum Index sheet | `src/pages/[...lang]/exam-prep/curriculum-index/index.astro` |
| One subject | /exam-prep/curriculum-index/SUBJECT/ | same | `.../curriculum-index/[subject]/index.astro` |
| One major topic (Level 1) with everything inside | /exam-prep/curriculum-index/SUBJECT/ID/ | same | `.../curriculum-index/[subject]/[major].astro` |
| Exam Mentor (pick exam and time, get ranked topics) | /exam-prep/exam-guide/ (old address kept on purpose, see the note below) | Exam Guide sheet and export.json | `src/pages/[...lang]/exam-prep/exam-guide/index.astro` + `src/scripts/exam-guide.ts` |
| How the ranking works, papers analysed | /exam-prep/exam-guide/how-it-works/ | same | `.../exam-guide/how-it-works.astro` |
| All exams | /exam-prep/exams/ | export.json | `src/pages/[...lang]/exam-prep/exams/index.astro` |
| One exam (for example RSSB Patwari) | /exam-prep/exams/rssb-patwari/ | same | `src/pages/[...lang]/exam-prep/exams/[exam].astro` |

**Name vs address (3 November 2026).** The planner tool is called **Exam Mentor** in English and **परीक्षा मार्गदर्शक** in Hindi on every page. Its address stays `/exam-prep/exam-guide/` because links to it were already shared on LinkedIn and Instagram; changing it would break them. The Google Sheet behind it is still named "Exam Guide", so the docs call it "the Exam Guide sheet". If the address is ever renamed, add redirects from every old `/exam-guide/` page first.

Pages in square brackets (`[subject]`, `[major]`, `[exam]`) are templates: one file makes hundreds of pages, one per subject, topic or exam in the data. About 950 pages in all.

## 3. Every file of the section

| File | What it does | Safe to edit? |
| --- | --- | --- |
| `src/pages/[...lang]/exam-prep/index.astro` | The intro. All words are in this file (the Q&A list near the top). | Yes, the words |
| `src/exam-prep.ts` | Shared settings: subject list, addresses, subject icons (`GLYPH`), exam display names (`FRIENDLY`) | Yes, the names |
| `src/layouts/ExamLayout.astro` | The frame of every Exam Prep page: left sidebar (a drawer on phones), breadcrumbs, structured data for Google | With care |
| `src/components/exam/ExamSearch.astro` | The search box, filters and results list | With care |
| `src/scripts/exam-search.ts` | The search engine (typo-tolerant, Hinglish words in `SYN`) | `SYN` list: yes |
| `src/scripts/exam-guide.ts` | The Exam Mentor maths (`buildPlan`) and exam finder | Only if the sheet's maths changes |
| `tools/exam-prep/build_data.py` | Turns the sheets into data files | Lists at the top: yes |
| `src/data/exam-prep/*.json`, `public/exam-prep/*.json` | Data made by the script | **Never by hand**: re-run the script |
| `src/pages/llms.txt.ts` | The summary for AI assistants (has an Exam Prep part) | Yes |
| `.github/workflows/indexnow.yml` | Tells Bing about new pages after each publish | Leave alone |
| `public/a1a8670a13934983a9f2272ac3cd12f2.txt` | IndexNow key file | **Never delete or rename** |
| Also touched: `src/site.config.ts` (menu item "Exam Prep"), `src/components/CuriosityOrbit.astro` (home wheel link), `src/components/TreePage.astro` (Exam Prep banner), `astro.config.mjs` (sitemap leaves out language-only exam pages) | | |

## 4. Update the website after changing a sheet

Do this whenever a topic is added, renamed, moved or deleted in either sheet, or the past-paper analysis is re-run.

1. Download both sheets: open each one, **File › Download › Microsoft Excel (.xlsx)**. Name them `Curriculum_Index.xlsx` and `Exam_Guide.xlsx`.
2. Get the latest `export.json`, the output of the past-paper analysis (it is rewritten whenever the analysis is re-run). Today it lives in the Claude project files under `Exam_Guide/_build/`, next to the analysis scripts (`scripts.tar.gz`) and OCR text; once Kritikesh uploads that folder to Drive it will also be in `06_EXAM_GUIDE_RPSC_RSSB` › "Exam Guide" › `_build`. A copy without the Drive links is always in the repository as `public/exam-prep/guide.json`.
3. On a computer with Python 3 and the repository (guide [07](07-run-on-your-computer.md)):
   ```
   pip install openpyxl
   python3 tools/exam-prep/build_data.py Curriculum_Index.xlsx Exam_Guide.xlsx export.json
   ```
   It prints how many topics and exams it wrote. Read that line: a big drop means a sheet or column was renamed.
4. Run `npm run build` to check that the site still builds.
5. Commit the changed files in `src/data/exam-prep/` and `public/exam-prep/` on a new branch and open a pull request (guide [06](06-pull-requests.md)). Merging publishes it.

**Or ask Claude:** "Rebuild the Exam Prep data from the sheets and open a pull request." Give Claude the three files, or access to the Drive folder.

The Hindi version (`/hi/exam-prep/`) reads its words from `src/data/exam-prep/hi/`, which the script never touches. After a refresh, new topic ids show in English on Hindi pages until they are translated (guide [15](15-languages-and-hindi.md), part 6).

### What the script reads

- **Curriculum Index:** each subject sheet, with columns ID, Lvl, Topic, Date / Period, Details, Related topics in other subjects, Part / Unit. Header on row 5.
- **Exam Guide:** the hidden `_RajMaster` sheet (Rajasthan GK, same columns).
- **export.json:** exams, the score of every topic for every exam, how often each topic was asked, the papers analysed.

If a column or a sheet tab is renamed in a sheet, rename it in `tools/exam-prep/build_data.py` too, or the script will skip it.

## 5. How to add, change or remove things

| I want to... | Do this |
| --- | --- |
| Add, rename or delete a topic | Change it in the sheet, then section 4. Never edit the JSON files. |
| Fix a wrong or junk topic | Same. Rows whose sheet text isn't a real topic title can also be renamed in `TITLE_FIX` at the top of `build_data.py` (then run `python3 tools/exam-prep/build_data.py --fix-only`, and add the Hindi title for the same id). Done that way on 2 November 2026 for REA-40.1, REA-40.2 and COM-35.11; still to clean in the sheet: the 60-odd rows under COM-35.11 that are really an appendix (learning routes, references and web links). |
| Change the intro words | Edit the `chaptersEn` list (and its Hindi twin `chaptersHi`) near the top of `src/pages/[...lang]/exam-prep/index.astro` (each item is a question `q` and its answer lines `a`). Keep each answer short (under a 2-minute read), in a friend's voice, honest, no promises. The FAQ for Google is made from the same list. |
| Add a new subject | Add its tab to the Curriculum Index (same columns, IDs with a new 3-letter prefix). Add one line to `SUBJECTS` at the top of `build_data.py`: `('Sheet tab name', 'PFX', 'web-slug', 'Name on site')`. Add an icon for it in `GLYPH` in `src/exam-prep.ts`. Then section 4. |
| Remove a subject | Delete its line from `SUBJECTS` in `build_data.py`, then section 4. Its pages disappear on the next publish. |
| Add a new exam | Add it in the Exam Guide sheet and re-run the past-paper analysis so `export.json` has it. Then section 4. Its page appears by itself. For a nicer address add a line to `PAGE_SLUG` in `build_data.py`; for a nicer title add a line to `FRIENDLY` in `src/exam-prep.ts`. |
| Change an exam's page address | Change `PAGE_SLUG` in `build_data.py`. Warning: an address Google has already indexed is lost, so do this rarely. |
| Teach search a new Hinglish or everyday word | Add a line to `SYN` in `src/scripts/exam-search.ts`, for example `nadi: ['river', 'rivers'],` |
| Change the ranking maths | Only if the sheet's maths changed: edit `buildPlan` in `src/scripts/exam-guide.ts` and section 7 of this guide, and the "How it works" page. |
| Take the whole section offline | Remove the "Exam Prep" line from `NAV` in `src/site.config.ts` and delete the folder `src/pages/[...lang]/exam-prep/`. Everything else can stay. |

## 6. Rules this section keeps

- **View only:** no ticks, no login, nothing saved or sent. The Exam Mentor keeps the visitor's choices only in the page address (so a plan can be bookmarked or shared).
- **No promises:** past papers describe the past. The intro, the guide and every exam page say so, and "How it works" lists every paper used and its limits.
- **No private links:** papers are listed by name only. No Drive file IDs or links ever go on the site (the script leaves them out on purpose).
- **Honest pages only in Google:** exams whose only analysed paper is a language paper (AEN, APO) are marked `noindex` and kept out of the sitemap.
- **Security setting:** the site forbids inline `style="..."` written by scripts. Set `element.style.width = ...` in code instead.

## 7. How search and ranking work

**Search** (`src/scripts/exam-search.ts`) searches every topic title (about 32,600). It forgives spelling mistakes, finishes words as you type, understands Hinglish words (bhugol, itihas, samvidhan... add more in `SYN`), works in Devanagari, and treats a subject name in the query as a preference. Results never end empty: it loosens the filters and offers "Did you mean".

**Ranking** (same maths as the sheet):

- Score of a topic for an exam = its expected share of that exam's paper (from export.json).
- "≈ Qs per paper" = score × questions in one paper.
- Recommended number of topics = study days × 0.8 × hours a day × 0.75 ÷ 2 hours per topic, never more than the topics that covered 85% of past questions, and at least 10 when there is any time at all. No date = the 85% list.
- Stars: top 5% ★★★★★, next 10% ★★★★, next 20% ★★★, next 25% ★★, rest ★.

## 8. Being found on Google and by AI assistants

The full explanation, written for Kritikesh, is the Claude artifact "How aspirants find us" (https://claude.ai/artifact/JQcZcLZHj1RzRNDo7touVi); a copy is in Drive (see below). The short version:

- **Exam pages** answer what aspirants actually type ("patwari most asked topics", "LDC subject wise weightage"). Each opens with a plain answer in one paragraph (what Google snippets and AI assistants quote), then subject weightage, the top 40 topics, an FAQ, and the papers used.
- **Titles** follow how aspirants search: "<exam> Most Asked Topics: Topic-wise PYQ Analysis and Subject Weightage", "<subject> Syllabus for Competitive Exams: All N Topics in Order". A Hindi line under each heading catches Hindi searches.
- **Structured data:** breadcrumbs on every page (made in `ExamLayout.astro` from the visible crumbs), FAQ on the intro, exam pages and "How it works", and a ranked list on exam pages.
- **llms.txt** (curioussparoows.com/llms.txt) lists Exam Prep and every exam page for AI assistants. `src/pages/robots.txt.ts` lets AI crawlers in.
- **IndexNow:** after each successful publish, `.github/workflows/indexnow.yml` sends every page in the sitemap to IndexNow (Bing, Yandex and others; Bing also feeds ChatGPT search and Copilot). To run it by hand: Actions tab › "Tell search engines about new pages (IndexNow)" › Run workflow. A first-run "403 SiteVerificationNotCompleted" is normal for a new key; it clears once Bing has read the key file.
- **By hand, once (Kritikesh):** submit `https://curioussparoows.com/sitemap-index.xml` in Google Search Console (Sitemaps), and in Bing Webmaster Tools choose "Import from Google Search Console".

## 9. Where the copies are

- **Code and data:** this repository.
- **Sheets:** Google Drive › library › `06_EXAM_GUIDE_RPSC_RSSB` › "Exam Guide" (the Exam Guide sheet, past papers, and a README explaining how they feed the website) and the Curriculum Index sheet. The analysis output and scripts (`_build/`) are in the Claude project files until uploaded by hand.
- **Analysis scripts stay private:** they contain Drive file IDs of the papers, so never commit them to this public repository.
- **Guides in Drive:** the same Drive folder has "README: how the sheets feed the website", and "Curious Sparoows Website (backup)" has a copy of this guide plus the assessment and SEO write-ups.

_Last updated: 2 November 2026._
