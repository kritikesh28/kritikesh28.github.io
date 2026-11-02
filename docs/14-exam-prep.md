# 14 · Exam Prep section

The Exam Prep section lives at curioussparoows.com/exam-prep/. It shows two Google Sheets on the website, view only:

| Page | Address | Built from |
| :---- | :---- | :---- |
| Intro (problems first, short Q&A) | /exam-prep/ | text in src/pages/exam-prep/index.astro |
| Exhaustive Curriculum Index | /exam-prep/curriculum-index/ | the Curriculum Index sheet |
| One subject | /exam-prep/curriculum-index/SUBJECT/ | same |
| One major topic (Level 1) with everything inside | /exam-prep/curriculum-index/SUBJECT/ID/ | same |
| Exam Guide (pick exam and time, get ranked topics) | /exam-prep/exam-guide/ | the Exam Guide sheet and its PYQ analysis |
| How the ranking works, papers analysed | /exam-prep/exam-guide/how-it-works/ | same |

The sheets stay the source of truth. The website never reads Google directly; it uses files made from the sheets.

## Update the website after changing a sheet

1. Download both sheets: open each one, File › Download › Microsoft Excel (.xlsx).
2. Get the latest `export.json` from the Exam Guide's `_build` folder (it is rewritten whenever the PYQ analysis is re-run).
3. On a computer with Python: `pip install openpyxl`, then from the repository folder run
   `python3 tools/exam-prep/build_data.py Curriculum_Index.xlsx Exam_Guide.xlsx export.json`
4. Commit the changed files in `src/data/exam-prep/` and `public/exam-prep/` on a new branch and open a pull request (guide 06).

Or ask Claude: "Rebuild the Exam Prep data from the sheets and open a pull request."

## What the script reads

- Curriculum Index: each subject sheet (columns ID, Lvl, Topic, Date / Period, Details, Related topics in other subjects, Part / Unit), header on row 5.
- Exam Guide: the hidden `_RajMaster` sheet (Rajasthan GK, same columns).
- export.json: exams, scores per exam and topic, how often each topic was asked, papers analysed.

If a column is renamed in a sheet, rename it in `tools/exam-prep/build_data.py` too.

## Rules this section keeps

- View only: no ticks, no login, nothing saved or sent. The Exam Guide keeps the visitor's choices only in the page address (so a plan can be bookmarked or shared).
- No promises: past papers describe the past. The intro and the guide say so, and "how it works" lists every paper used and its limits.
- No links into the private Drive: papers are listed by name only.

## Search

`src/scripts/exam-search.ts` searches every topic title (about 32,000). It forgives spelling mistakes, finishes words as you type, understands a few Hinglish words (bhugol, itihas, samvidhan... add more in `SYN`), and treats a subject name in the query as a preference. Results never end empty: it loosens the filters and offers "Did you mean".

## Ranking (same maths as the sheet)

- Score of a topic for an exam = expected share of that exam's paper (from export.json).
- "≈ Qs per paper" = score × questions in one paper.
- Recommended number of topics = study days × 0.8 × hours a day × 0.75 ÷ 2 hours per topic, never more than the topics that covered 85% of past questions, and at least 10 when there is any time at all. No date = the 85% list.
- Stars: top 5% ★★★★★, next 10% ★★★★, next 20% ★★★, next 25% ★★, rest ★.
