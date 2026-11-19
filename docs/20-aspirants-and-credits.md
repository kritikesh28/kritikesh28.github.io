# 20 · Between the Chapters (पन्नों के बीच), credits and the grateful note

[Back to the handbook](README.md)

Built on 18 November 2026 from Kritikesh's brief. Three things work together:

| What | Address | Files |
| --- | --- | --- |
| **Between the Chapters** (Hindi: **पन्नों के बीच**), the aspirants' library: Kritikesh talking with aspirants, as at a chai tapri, about the problems everyone has and few say out loud | /aspirants/ (and /hi/aspirants/) | `src/pages/[...lang]/aspirants/index.astro`, text in `src/data/aspirants/talks-1.ts` and `talks-2.ts` |
| **Why this format?**: why the same book content is shown as flip cards, quizzes and short talks | /aspirants/why-this-format/ | `src/pages/[...lang]/aspirants/why-this-format.astro`, text in `WHY` in `src/data/aspirants/talks.ts` |
| **Credits and sources**: the bibliography of the whole site, what is and is not his own, copyright rules, his promise to authors and publishers | /credits/ | `src/pages/[...lang]/credits.astro` |
| **The grateful note** at the end of every page, linking to both pages above | every page | `src/components/CreditNote.astro`, placed in `src/layouts/Base.astro` |

Links to them: the footer (Begin column, and "Credits and sources" next to Privacy), the Exam Prep menu (Between the Chapters), a flip card on the home page and the About menu (Why this format?, Credits and sources).

## 1. Between the Chapters (पन्नों के बीच)

**The name (19 Nov 2026):** it was first called "मन की सच्ची बातें"; he found that cliché and asked for something relatable, catchy and classy. "Between the Chapters" is the time every aspirant knows: the pauses between study sessions when the doubts come. The page title shows the English name large in italic with the Hindi as a gold line under it (the other way round on Hindi pages).

**The home card:** `src/components/aspirants/ChaptersCard.astro`, inside the Exam Prep band on the home page. One familiar question on the front; tapping turns it over to the first two sentences of the answer, with a link to the full talk. "Another one" shows the next. Which questions it uses: the `PICK` list at the top of the file (talk ids).

**His rules (18 Nov 2026):**
- Never advice. He is one of them: "yes, I felt this too, this is how long it lasted, this is who helped me (seniors, parents, teachers), this is what the books said". Chai-tapri tone, first person; the Hindi narrator is masculine.
- Start from the smallest, silliest problems (counting months, timetables, a clean room before a test) and go up to the biggest (should I quit?). Nothing is too small.
- Each answer ends by inviting the reader to share their own problem, anonymously or openly. The form at the bottom of the page sends it to his inbox through Formspree (the same account as the Contact page); name and email are optional, and the reader chooses "anonymous", "first name" or "please don't share".
- Humble, never comparing (project memory: story-tone-humble). Dates about him come from his Life History sheet.
- Answers that touch dark feelings mention Tele-MANAS, India's free mental-health helpline, **14416**. Keep that line.

**Layout:** `src/components/aspirants/TalkBook.astro`, the same pattern as My story: topics with their questions down the left and right side bars, one answer at a time in the middle (Previous / Next, arrow keys, swipe), "Read it all at once", and a fold-out list on phones. Each answer shows its read time and a "Books that helped me" box.

**Now:** 21 talks in 8 topics, about 440 words each in English (about 3 minutes), all in Hindi too.

**To add a talk** (for example, from a problem a reader sent): add an item to a topic in `talks-1.ts` or `talks-2.ts`:

```ts
{ id: 'unique-link-name', q: { en: '…', hi: '…' }, books: ['atomic'], a: { en: ['para 1', 'para 2'], hi: ['…', '…'] } },
```

The `id` becomes the link (/aspirants/#unique-link-name). `books` are keys from `src/data/aspirants/books.ts`; a new book goes there first (title, author, year, its idea in one line in both languages, in your own words). New books show up on the Credits page reading list by themselves. To add a topic, add `{ id, icon, title: { en, hi }, qs: [...] }`; the side bars split the topics in half by themselves.

**To check:** the small personal stories (what a senior, his mother, father or a teacher said; the screen-time deal with a friend; Holi with notes) were drafted for him to confirm or replace with what really happened. Change `en` and `hi` together.

## 2. Credits and sources

Sections: what is mine and not mine · PYQ books (with publisher and use) · Curriculum Index sources · links to every Library shelf's own Sources page (built from `src/explore.ts`, so new shelves appear by themselves) · the reading list behind Between the Chapters (from `books.ts`) · music, fonts, tools, AI · copyright rules · a letter to authors and publishers · the benefit-sharing promise · why knowledge is shared freely · "did I miss you?".

**Book titles to confirm with him** (as he named them, 18 Nov 2026): Rajasthan Geography PYQ book, Disha Publication, Dr. Rajeev; UGC-NET Geography PYQ book, Shree Education & Publication, Dimpesh Saini and Swati Verma. The Kiran Prakashan credit for the Maths and Reasoning topic order comes from the file names `Kiran_*_Topic_Hierarchy.txt`.

## 3. Copyright research (18 Nov 2026, not legal advice)

- **Facts are free; expression is not.** Copyright protects the wording, explanations, translations, selection and layout of a book, not the facts in it (Supreme Court, *Eastern Book Co. v. D.B. Modak*, 2008).
- **Credit is not permission.** Naming the source satisfies the author's moral right to be named (Copyright Act 1957, s. 57) but does not make copying lawful. A disclaimer that says "taken from X's book" can even read as an admission.
- **Close paraphrase can still infringe** (the *R.G. Anand v. Delux Films*, 1978 test: would an ordinary reader feel it is a copy?). A "do not reproduce or rephrase" notice cannot extend rights over facts, but it does cover the book's own expression.
- **Exceptions are narrow.** Section 52(1)(a) fair dealing covers private use and research, criticism or review, and news reporting; 52(1)(i) covers reproduction by a teacher or pupil in the course of instruction and in exam questions and answers. A public website does not clearly fit either.
- **What can happen:** usually a takedown notice first (GitHub, which hosts the site, removes content on a valid complaint; repeated complaints can take the site down), then possibly a civil suit (injunction, damages, s. 55). Section 63 makes knowing infringement a crime, though that is rare against small education sites. Rule 75 of the Copyright Rules 2013 gives online intermediaries a 36-hour takedown and 21-day court-order window.
- **What the site does, so the credit page is true:** questions are traced to the official RPSC/RSSB/NTA papers; explanations are written fresh from facts checked in more than one place; the books' explanation boxes are never reproduced (see guide 19); the order should follow the official syllabus, not a book's chapters (the Rajasthan bank still follows book chapters: change this); nothing is sold; anything an author or publisher objects to is fixed or removed quickly.
- **Next steps recommended to him:** write to Disha Publication and Shree Education & Publication for permission; take one consultation with a lawyer before the site earns anything; keep ads and paid content away from book-derived material.

Sources: [Copyright Act, Chapter XI (s. 52)](https://copyright.gov.in/Copyright_Act_1957/chapter_xi.html), [SpicyIP on Rule 75](https://spicyip.com/2013/04/guest-post-look-at-new-notice-and.html).
