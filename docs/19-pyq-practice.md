# 19 · PYQ practice (past questions as flip cards, quizzes and real MCQs)

[Back to the handbook](README.md)

The PYQ practice section lives at **curioussparoows.com/exam-prep/pyq/**. It puts Kritikesh's past-paper question banks on the website in small bites: one-line flip cards, five-question quizzes and the real exam questions. It was built on 15 November 2026.

**Why it exists:** the questions are in every book, but a book of a thousand MCQs is a wall, and aspirants get bored. Here every MCQ is cut into small facts, one screen at a time (about 8 cards), about five minutes a page, and the site remembers what the reader has mastered. Edutainment first: curiosity, not pressure.

## 1. What is on the site today

| Bank | Address | Questions in | Flip cards (Q&A rows) | Real MCQs |
| --- | --- | --- | --- | --- |
| Rajasthan Geography (RPSC/RSSB) | /exam-prep/pyq/rajasthan-geography/ | Hindi | 4,647 from book chapters 1–4 (rev4 file) | all 544 of chapters 1–5 |
| UGC-NET Geography | /exam-prep/pyq/ugc-net-geography/ | English | 2,207 from the Political Geography chapter (U7B), grouped by the official 10 units | 1,406 from 9 chapters (U5A–U7B) |

The Q&A of Rajasthan chapter 5 (Climate) and of the other NET chapters comes later: re-run the builder (part 4) when the new Word file is ready and the pages appear by themselves.

## 2. The pages

| Page | Address | File |
| --- | --- | --- |
| Hub: all banks | /exam-prep/pyq/ | `src/pages/[...lang]/exam-prep/pyq/index.astro` |
| One bank: topic map with "mastered" meters, list of real-question chapters | /exam-prep/pyq/BANK/ | `.../pyq/[bank]/index.astro` |
| One page of flip cards (about 40) with Flip cards / Quick quiz tabs | /exam-prep/pyq/BANK/SUBTOPIC/N/ | `.../pyq/[bank]/[sub]/[set].astro` |
| Ten real exam questions, one to a screen | /exam-prep/pyq/BANK/paper/CHAPTER/N/ | `.../pyq/[bank]/paper/[paper]/[set].astro` |
| Practice page of one syllabus topic: up to 40 matching flip cards with the quiz, "notes coming soon" note, links to the full decks and back to the topic | /exam-prep/pyq/topic/CI-ID/ (for example `raj-34-5`) | `.../pyq/topic/[id].astro` |

Every page exists in English and Hindi (`/hi/...`). The page frame (buttons, menus, help text) follows the reader's language; the questions stay in the language they were asked in (Hindi for Rajasthan, English for NET) and are marked with `lang`. Translating the questions themselves is a later job.

**How the three modes work**

- **Flip cards:** tap a card to see the answer; "✓ I knew it" marks it mastered, "↻ Again" un-marks it. 🔥 N× = the fact was asked in N exams (the examiner's favourites). A small tag says where the fact came from (asked, asked the other way round, from the explanation, from an option, likely pair).
- **Quick quiz:** five questions from the cards on the page, not-yet-mastered first; four choices made from other answers of the same sub-topic. A right answer marks the card mastered.
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
   Then run `python3 tools/pyq/link_ci.py` so the syllabus links follow the new cards.
3. Build and look (guide [07](07-run-on-your-computer.md)), then open a pull request.

**What the builder expects in the Q&A file:** Heading 1 = group (`G1: …` or `Unit I — …`), Heading 2 = sub-topic (`G1.1 …`; "— अन्य/Other" means the group's other questions), then two-column tables `प्रश्न | उत्तर` (or `Question | Answer`) whose question cell ends with a tag `[KIND exams · ids]`. A flag such as `(पुस्तक: X)` or `(disputed: Y)` at the end of the answer cell is shown in red under the answer.

**What it expects in the MCQ file:** Rajasthan: Heading 1 `अध्याय N` then the chapter title, questions `प्रश्न N. …`, options `(1) … (2) …`, `उत्तर: (N)`. NET: Heading 1 `Unit-7 B …`, Heading 2 for the Assistant Professor / NTA parts, questions `N.<tab>…`, options as lines or a 2×2 table, `Ans: (N)` or `Ans (B)` then the exam in brackets.

**Left out on purpose:** the book's printed explanation boxes (that text belongs to the publisher). The Q&A rows already carry the facts from them, in Kritikesh's words. NET questions whose answer is printed as `(*)` or missing are skipped; questions whose options could not be read cleanly show a "Show answer" fold instead of buttons (about 160 of 1,406).

## 5. Add a new bank (for example Indian History PYQs)

1. Teach the builder its file format (or reuse the NET/Rajasthan readers) and write `src/data/pyq/KEY.json`.
2. In `src/pyq.ts` import it and add one entry to `BANKS` (slug, language of the questions, names and blurbs in both languages, `idPrefix` that rebuilds the MCQ id the Q&A tags use).
3. Add its Curriculum Index topics to `CI_LINKS`. Everything else (pages, menu, sidebar, search, llms.txt) picks it up by itself.

_Last updated: 15 November 2026 (section built)._
