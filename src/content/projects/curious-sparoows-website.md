---
title: "Curious Sparoows: this website, as a software project"
summary: "A two-language static website of about 4,800 pages: a Library, an Exam Prep section with a data-driven Exam Mentor, timed past-paper quizzes and an aspirants' diary. Designed and coded with Claude; here is how it works and the real bugs it met on the way."
date: 2026-11-27
status: live
tags: [Astro, TypeScript, HTML, CSS, Python, JSON, Git, GitHub Actions, GitHub Pages]
links:
  - label: Code on GitHub
    href: https://github.com/kritikesh28/kritikesh28.github.io
  - label: Every change, one by one
    href: https://github.com/kritikesh28/kritikesh28.github.io/pulls?q=is%3Apr+is%3Amerged
section: web-code
order: 5
aiAssisted: designed
---

## In one minute

Curious Sparoows is the website you are on. It started on 23 October 2026 and has grown through about 100 small, reviewed changes (pull requests). My degrees are in Geology and Geography, not computer science. I am heading towards AI/ML for cybersecurity, one step at a time: first software basics, then AI/ML, then security. This site is my first step: a real system to learn from, because you can only find the weak spots of a system once you understand how it is built.

**Honest note:** the site was designed and coded with Claude, an AI assistant. My part is deciding what it should do, checking every change before it goes live, finding problems, and learning how each part works, line by line, so I can explain it. This page only describes what is really in the code.

| What | Number (27 November 2026) |
| --- | --- |
| Pages built on every publish | about 4,800 (English and Hindi) |
| Languages | 2: English at `/`, Hindi at `/hi/` |
| Exam Prep syllabus lines | 32,663 topics in 15 subjects |
| Exam Mentor data | 2,987 questions from 38 RPSC and RSSB papers, 27 exam pages |
| All exams of India list | 62 exams in 10 groups (UPSC, SSC, banking, railways, NTA, CAT and GATE, defence, teaching, Rajasthan, other states) |
| Past-question practice | 6,854 flip cards and 1,950 real MCQs (Rajasthan Geography and UGC-NET Geography) |
| Code | 10 TypeScript scripts and 8 Python data builders |

## What a visitor can do

- **Library:** subjects that start from a small question, on one knowledge tree (Forest, Tree, Branch, Twig, Leaf), plus 12 encyclopedic shelves.
- **Exam Mentor:** pick a government, an agency and an exam, and see which topics came most often in its past papers. It *counts*; it does not predict.
- **All exams of India:** UPSC, SSC, banks, railways, NTA and more, by who conducts them. Groups without their own papers yet use their body's overall ranking.
- **PYQ practice:** flip cards, a five-question quick quiz and the real exam questions with explanations. Two modes: **Practice** (try again any time) and **Exam** (a timer for the whole test and one for each question, no going back, and a score card at the end).
- **Mere Man Ki Baat…** (the aspirants' diary): short talks about what aspirants feel and rarely say.
- **Portfolio**, **My story**, search, light and dark themes, and soft background music.

## How a page reaches you

1. **Source:** text is written in Markdown; big lists (syllabus, papers, questions) live in Google Sheets and Word files.
2. **Python builders** (in `tools/`) read those sheets and Word files and write clean **JSON** data files.
3. **Astro** reads the Markdown and JSON and builds plain HTML pages ahead of time. This is called a *static site*: no database and no server code runs when you visit.
4. **Git and GitHub:** every change is a pull request I can read, test and undo.
5. **GitHub Actions** builds the site again after each merge and publishes it to **GitHub Pages**. The domain points there through Cloudflare DNS, with HTTPS.
6. **Your browser** gets ready-made pages. Small **TypeScript** scripts add the interactive parts: menus, search, flip cards, quiz timers and music.

## Parts worth a closer look

- **Two languages, one set of pages.** One page file serves both languages through a route called `[...lang]`. Interface words sit in one dictionary (`src/i18n/ui.ts`), and translated content sits in a `hi/` folder with the same file name. Switching language keeps you on the same paragraph, not back at the home page.
- **Data first, pages second.** The Exam Prep and PYQ pages are generated from JSON, so fixing a question in the data fixes every page that shows it.
- **Progress without accounts.** What you have mastered is kept only in your own browser (`localStorage`). Nothing is sent to a server.
- **Security policy.** A Content Security Policy tells the browser to run scripts only from this site and a few named services. To keep it simple, every script and style is a separate file.
- **Pages that change without reloading.** Astro's ClientRouter swaps pages in place, so the music keeps playing from page to page. Each page script runs through one helper, `onPage()`, which cleans up after itself so nothing runs twice.
- **Found by search engines and AI assistants:** sitemap, structured data, an `llms.txt` file, and an IndexNow job that tells Bing about new pages.
- **Works without JavaScript too:** cards show question and answer together, and real questions get a "Show answer" fold.

## Real bugs and how they were fixed

Every item below is in the project's history on GitHub.

**1. The quiz gave away answers.** The quick quiz took three wrong options at random from other cards, so a question about a place could show years as options, and the answer was easy to guess without knowing it. *Fix:* every question now has hand-written wrong options of the same kind as the answer (a district for a district, a year for a year), with a same-kind fallback in code. Yes/no questions show only two choices. *Lesson:* the code ran without any error. Working code is not the same as a fair product. (Pull request #69)

**2. Junk rows ranked as top exam topics.** Two lines in the source sheet were notes, not topics ("Question: What is 25% of 240?" and "Maintain a living roadmap"), yet they ranked in the top 10 for every RSSB exam. *Fix:* a `TITLE_FIX` list in the Python builder renames them on every rebuild. *Lesson:* check the data before trusting the chart. (Pull request #18)

**3. Dependabot never ran.** Its settings file sat in `.github/workflows/`, where GitHub does not look for it. *Fix:* move it to `.github/dependabot.yml`. Now it opens small update requests every month. *Lesson:* a config file in the wrong folder fails silently.

**4. Inline styles were blocked.** Some scripts set widths and colours with `style="..."`, and the security policy blocked them, so bars did not show. *Fix:* set `element.style` from the script instead. *Lesson:* security rules shape how code must be written.

**5. Music stopped on every click.** A normal page load restarts everything, including sound. *Fix:* switch to page changes without reloading (ClientRouter) and move every script to `onPage()`, so listeners are removed when you leave a page. (Pull request #50) Later, browsers refused to play sound before the first tap, which looked like a bug. That is a browser rule, so the site now shows a gentle "Tap anywhere for music" hint. (Pull request #99)

**6. The language switch lost your place.** Some pages had no Hindi twin, so switching sent readers to the home page. *Fix:* give every page a twin in the other language, carry the scroll position across, and open the section page when no twin exists. (Pull requests #35 and #73)

**7. Raw template code on screen.** The English Exam Prep sidebar showed `{T.note}` and `{T.none}` instead of words. *Fix:* the missing English text was added. (Pull request #34)

**8. Two branches changed the same file.** A fix branch and a translation branch both edited the Hindi reasoning topics file, and Git reported a merge conflict. *Fix:* merge `main` into the branch and keep both sets of lines. *Lesson:* small, separate pull requests keep conflicts rare.

**9. An old icon would not go away.** Browsers kept showing the cached favicon. *Fix:* add a version to its address (`favicon.svg?v=2`), so browsers fetch it again.

**10. Content can be a bug too.** 39 flip cards stayed too close to a book's sentence. *Fix:* they were reworded, and book references were removed from the PYQ pages. (Pull requests #71 and #86)

## Why this matters for AI/ML and security

- **Data quality is an ML skill.** Bugs 1 and 2 were data problems, not code problems. A model trained on junk rows or easy-to-guess options learns the wrong thing, and no error message tells you.
- **The site already uses basic security ideas:** a Content Security Policy (bug 4), automatic dependency updates against known weaknesses (bug 3), a `security.txt` file for reporting problems, HTTPS, and no accounts or tracking cookies, so there is no personal data to leak.
- **Next steps on the same path:** my predictive-maintenance MLOps project (on this portfolio) is the AI/ML step. Security-focused ML projects come after it.

## What this taught me

- Small changes, each one reviewed and easy to undo.
- Clean data matters more than clever code.
- Tests and builds catch broken code, not unfair or wrong content. People do.
- Write it down: the repository has a 21-part handbook in `docs/`, so anyone can run the site.

## What I am still learning

I am studying the code from the ground up: HTML, CSS, JavaScript, the folder map, how Astro builds, the two-language routes, Git and the deploy pipeline. I can walk you through how a page reaches the browser and why each bug above happened. If you spot something that could be better, please [tell me](/contact/).
