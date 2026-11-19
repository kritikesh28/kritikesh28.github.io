# 19 · PYQ practice (past questions as flip cards, quizzes and real MCQs)

[Back to the handbook](README.md)

The PYQ practice section lives at **curioussparoows.com/exam-prep/pyq/**. It puts Kritikesh's past-paper question banks on the website in small bites: one-line flip cards, five-question quizzes and the real exam questions. It was built on 15 November 2026.

**Why it exists:** the questions are in every book, but a book of a thousand MCQs is a wall, and aspirants get bored. Here every MCQ is cut into small facts, one screen at a time (about 8 cards), about five minutes a page, and the site remembers what the reader has mastered. Edutainment first: curiosity, not pressure.

## 1. What is on the site today

| Bank | Address | Questions in | Flip cards (Q&A rows) | Real MCQs |
| --- | --- | --- | --- | --- |
| Rajasthan Geography (RPSC/RSSB) | /exam-prep/pyq/rajasthan-geography/ | Hindi | 4,647 from book chapters 1–4 (rev4 file) | all 544, sorted into 15 official syllabus topics (G1.1–G2.6), not the book's chapters |
| UGC-NET Geography | /exam-prep/pyq/ugc-net-geography/ | English | 2,207 from the Political Geography chapter (U7B), grouped by the official 10 units | 1,406 from 9 chapters (U5A–U7B) |

**Translations (19 November 2026):** the Rajasthan bank now also reads in English on the English site (all 4,647 flip cards, their quiz options and all 544 real MCQs, translated by hand), with a **See original (हिन्दी)** button on every page. NET in Hindi is in progress (part 7).

The Q&A of Rajasthan chapter 5 (Climate) and of the other NET chapters comes later: re-run the builder (part 4) when the new Word file is ready and the pages appear by themselves.

## 2. The pages

| Page | Address | File |
| --- | --- | --- |
| Hub: all banks | /exam-prep/pyq/ | `src/pages/[...lang]/exam-prep/pyq/index.astro` |
| One bank: topic map with "mastered" meters, list of real-question topics | /exam-prep/pyq/BANK/ | `.../pyq/[bank]/index.astro` |
| One page of flip cards (about 40) with Flip cards / Quick quiz tabs | /exam-prep/pyq/BANK/SUBTOPIC/N/ | `.../pyq/[bank]/[sub]/[set].astro` |
| Ten real exam questions, one to a screen | /exam-prep/pyq/BANK/paper/TOPIC/N/ (Rajasthan: `g1-5`; NET: `u7b`) | `.../pyq/[bank]/paper/[paper]/[set].astro` |
| Practice page of one syllabus topic: up to 40 matching flip cards with the quiz, "notes coming soon" note, links to the full decks and back to the topic | /exam-prep/pyq/topic/CI-ID/ (for example `raj-34-5`) | `.../pyq/topic/[id].astro` |

Every page exists in English and Hindi (`/hi/...`). The page frame (buttons, menus, help text) follows the reader's language; the questions stay in the language they were asked in (Hindi for Rajasthan, English for NET) and are marked with `lang`. Translating the questions themselves is a later job.

**How the three modes work**

- **Flip cards:** tap a card to see the answer; "✓ I knew it" marks it mastered, "↻ Again" un-marks it. 🔥 N× = the fact was asked in N exams (the examiner's favourites). A small tag says where the fact came from (asked, asked the other way round, from the explanation, from an option, likely pair).
- **Quick quiz:** five questions from the cards on the page, not-yet-mastered first. The wrong choices are written by hand for every question in `src/data/pyq/quiz/raj.json` and `net.json` (keyed by row number `n`), always the same kind as the answer (a district for a district, a height for a height, a year for a year), so the question is fair and moderately tough. Yes/no questions show only हाँ/नहीं (Yes/No). If a row has no entry, `src/scripts/pyq.ts` picks same-kind answers instead. When a bank is rebuilt and row numbers change, check these files again. A right answer marks the card mastered.
- **Real PYQ:** the MCQ as printed. Pick an option, see right or wrong, then "The facts behind this question" (the Q&A rows made from that MCQ, found by the row's MCQ id such as `RB2-5` or `U7B-A26`) with a link to their flip cards.

**Progress** is kept only in the reader's browser (localStorage key `cs-pyq-v1`), never sent anywhere. The sidebar note on PYQ pages says so.

Without JavaScript every page still works: cards show question and answer together, real questions show a "Show answer" fold.

## 3. Files

| File | What it does | Safe to edit? |
| --- | --- | --- |
| `tools/pyq/build_pyq.py` | Reads the Word files, writes the data | With care |
| `src/data/pyq/raj.json`, `src/data/pyq/net.json` | The data | **Never by hand**: re-run the builder |
| `public/pyq/net/fig-*.webp` | Figures of NET questions (maps, diagrams), made by the builder | No |
| `src/pyq.ts` | Bank names and blurbs, page sizes (`SET_SIZE` 40, `SCREEN` 8, `MCQ_SET` 10), tag names (`KIND`), and **`CI_LINKS`**: which Curriculum Index topics link to which PYQ pages | Yes: names, blurbs, `CI_LINKS` |
| `src/scripts/pyq.ts` | Flip, quiz, real-question checking, meters | With care |
| `src/styles/pyq.css` | Look of the section | Yes |
| `src/components/exam/PyqBox.astro` | The "Practise the past questions on this" box | Yes, the words |
| `src/components/exam/PyqDeck.astro` | The flip-card deck and quiz, shared by set pages and topic practice pages | With care |
| `tools/pyq/link_ci.py` | Matches every Curriculum Index topic (all levels) with the PYQ cards on it, writes `src/data/pyq/ci-match.json` | Yes: `SUB_MAP` (hand-checked whole decks) and `DROP` (off-topic matches) |
| `src/data/pyq/ci-match.json` | The matches | **Never by hand**: re-run `link_ci.py` |

**Syllabus ↔ PYQ links (15 November 2026).** Every Curriculum Index major-topic page now opens with a note: "Notes for these topics are being prepared and will be uploaded soon", followed by where to practise meanwhile. Each topic, subtopic and detail that has matching past questions gets a 🃏 "N PYQ cards" button that opens its practice page; subjects without PYQs yet point to the Exam Mentor. Subject pages mark major topics that have PYQs with "🃏 PYQ". The other way round, every flip-card page ends with "Where this sits in the syllabus", linking to the matching topics. The matching: `link_ci.py` uses words that are rare across the cards (Hindi text of the Rajasthan GK topics for Rajasthan cards; English text of Geography topics for NET cards; a one-word title alone is not enough), plus `SUB_MAP` for whole decks that are the same as a syllabus topic (for example RAJ-32.2 Aravalli = deck G1.5, GEO-25.6.4 Boundary = NET deck "Boundaries and Frontiers"). About 100 topics are linked. Re-run it after `build_pyq.py` or after the Curriculum Index data changes:
```
python3 tools/pyq/link_ci.py
```

**Where the section is linked from:** the Exam Prep sidebar (group 3, "PYQ practice"), the Exam Prep menu in the top bar, the Exam Prep intro page, every RPSC/RSSB exam page, the Rajasthan GK and Geography subject pages, every Curriculum Index topic listed in `CI_LINKS` (for example RAJ-31 to RAJ-41, GEO-18, GEO-25) and every topic matched in `ci-match.json` (🃏 buttons), site search (each bank, sub-topic and chapter, with the questions as search words) and `llms.txt`.

## 4. Update after Kritikesh changes a Word file

1. Save the newest Q&A file (for example `..._rev5.docx`) and the original MCQ file on your computer.
2. In the repository folder run (Python 3 with `pip install python-docx pillow`):
   ```
   python3 tools/pyq/build_pyq.py raj "Rajasthan Bhugol PYQ QA - Topic Wise_rev5.docx" "Rajasthan_Bhugol_Complete.docx"
   python3 tools/pyq/build_pyq.py net "NET Geo PYQ QA - Topic Wise.docx" "NET Geography_ALL_Combined.docx"
   ```
   It prints how many rows and MCQs it found. Rajasthan should show all 544 MCQs.
   For Rajasthan, then run `python3 tools/pyq/regroup_raj.py`: it sorts the 544 real questions into the syllabus topics (from the Q&A rows made from each one; climate questions by keywords; a short hand list at the top) and writes `src/data/pyq/raj-topics.json`. It prints how many went where.
   Then run `python3 tools/pyq/link_ci.py` so the syllabus links follow the new cards.
3. Build and look (guide [07](07-run-on-your-computer.md)), then open a pull request.

**What the builder expects in the Q&A file:** Heading 1 = group (`G1: …` or `Unit I — …`), Heading 2 = sub-topic (`G1.1 …`; "— अन्य/Other" means the group's other questions), then two-column tables `प्रश्न | उत्तर` (or `Question | Answer`) whose question cell ends with a tag `[KIND exams · ids]`. A flag such as `(पुस्तक: X)` or `(disputed: Y)` at the end of the answer cell is shown in red under the answer.

**What it expects in the MCQ file:** Rajasthan: Heading 1 `अध्याय N` then the chapter title, questions `प्रश्न N. …`, options `(1) … (2) …`, `उत्तर: (N)`. NET: Heading 1 `Unit-7 B …`, Heading 2 for the Assistant Professor / NTA parts, questions `N.<tab>…`, options as lines or a 2×2 table, `Ans: (N)` or `Ans (B)` then the exam in brackets.

**Left out on purpose:** the book's printed explanation boxes (that text belongs to the publisher). `src/pyq.ts` also drops any `उत्तर:` / `व्याख्या` / `Explanation` line that slipped into a question stem. The Q&A rows already carry the facts from them, in Kritikesh's words. NET questions whose answer is printed as `(*)` or missing are skipped; questions whose options could not be read cleanly show a "Show answer" fold instead of buttons (about 160 of 1,406).

## 5. Add a new bank (for example Indian History PYQs)

1. Teach the builder its file format (or reuse the NET/Rajasthan readers) and write `src/data/pyq/KEY.json`.
2. In `src/pyq.ts` import it and add one entry to `BANKS` (slug, language of the questions, names and blurbs in both languages, `idPrefix` that rebuilds the MCQ id the Q&A tags use).
3. Add its Curriculum Index topics to `CI_LINKS`. Everything else (pages, menu, sidebar, search, llms.txt) picks it up by itself.

_Last updated: 15 November 2026 (section built)._

## 6. Copyright rules for this section (audit of 18 November 2026)

- **The questions** are RPSC, RSSB and NTA exam questions. Every bank page names them as the question source, and every flip-card and real-question page carries one line saying so (`qsrc` in `src/pyq.ts`). The two books (Disha Publication, Dr. Rajeev; Shree Education & Publication, Dimpesh Saini and Swati Verma) are thanked as the help used to collect them.
- **Order:** Rajasthan real questions follow the official syllabus topics, not the book's chapters (`tools/pyq/regroup_raj.py`). NET real questions follow the official UGC-NET units. The old chapter addresses (`/paper/ch1/1/` … `/paper/ch5/14/`) redirect to the new topic page (`.../pyq/rajasthan-geography/paper/[old]/[set].astro`).
- **Never copy** the books' explanation text, tables or boxes. Facts are free to use; the book's sentences are not. New solutions and notes are written fresh.
- **Audit:** a scan of every flip card against the books' explanation text found 229 of about 8,700 cards that share six or more words in a row with a book sentence. 67 of these are book titles, quotes or standard definitions (fine). 41 share eight or more words and should be reworded; the rest need a light touch. The list is `PYQ_audit/flagged-rows.csv` in the project files. 39 of the 41 are now reworded in `src/data/pyq/reword.json` (bank → row number → new `q`/`a`), which `src/pyq.ts` applies over the built data; the other 2 matched the exam question itself, which is fine. When Kritikesh next edits the Word file, copy these wordings into it and empty the file; if a rebuild renumbers rows, check the numbers again.

## 7. Translations: Rajasthan in English, NET in Hindi

Kritikesh asked (18 November 2026) that every reader can practise in their own language: the Rajasthan bank (asked in Hindi) in English on the English site, and the NET bank (asked in English) in Hindi on the Hindi site, with a way to see the exam's own wording.

**How it works**

- The translations are done by hand (no machine translation), one string at a time, and kept as plain text files in `tools/pyq/tr/`:
  - `raj-strings.json` (every Hindi string of the flip cards, titles and quiz options) and `raj-en/NNN.tsv` (`index<TAB>English`, one per line);
  - `raj-mcq-strings.json` (every Hindi string of the real MCQs: stems, options, tables, exam tags) and `raj-mcq-en/NNN.tsv`;
  - the same for NET later: `net-strings.json` + `net-hi/`, `net-mcq-strings.json` + `net-mcq-hi/`.
- `python3 tools/pyq/tr/build_dict.py` joins them into `src/data/pyq/tr/raj-en.json` (and `net-hi.json`): `{original: translation}`. **Never edit that file by hand**; fix the `.tsv` line and re-run.
- `inLang(bank, lang)` in `src/pyq.ts` gives the pages a translated copy of the bank. The copy keeps the original wording (`t0`, `o0`), and the pages put it on each translated element as `data-orig`. A string with no translation yet simply stays as it was asked.
- `src/components/exam/OrigToggle.astro` shows **See original (हिन्दी)** / **मूल देखें (English)** in the page header; `origToggle` in `src/scripts/pyq.ts` swaps the text and remembers the choice on the device (`cs-pyq-orig`). The quick quiz always plays in the reader's language.
- Conventions used: "(as per the book)", "August 2023 set-up" for the district re-organisation, "sq km", "m", en dashes for ranges, the Indian number format (1,75,000), exam names as on the RPSC/RSSB notices (for example "Patwar", "Jail Prahari exam"). Place names follow the district list in the Rajasthan GK pages.

**After the builder runs again** (a new Word file): new Hindi strings have no translation and show in Hindi. List them with a short script against `raj-strings.json`, add them at the end of `raj-strings.json`, write their English in a new `raj-en/NNN.tsv`, then run `build_dict.py` and build.
