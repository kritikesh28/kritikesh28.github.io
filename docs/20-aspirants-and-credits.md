# 20 · Mere Man Ki Baat…, credits and the grateful note

[Back to the handbook](README.md)

Built on 18 November 2026 from Kritikesh's brief. Three things work together:

| What | Address | Files |
| --- | --- | --- |
| **Mere Man Ki Baat…** (Hinglish, the same on English and Hindi pages), the aspirants' library: Kritikesh talking with aspirants, as at a chai tapri, about the problems everyone has and few say out loud | /aspirants/ (and /hi/aspirants/) | `src/pages/[...lang]/aspirants/index.astro`, text in `src/data/aspirants/talks-1.ts` and `talks-2.ts` |
| **Why this format?**: why the same book content is shown as flip cards, quizzes and short talks | /aspirants/why-this-format/ | `src/pages/[...lang]/aspirants/why-this-format.astro`, text in `WHY` in `src/data/aspirants/talks.ts` |
| **Credits and sources**: the bibliography of the whole site, what is and is not his own, copyright rules, his promise to authors and publishers | /credits/ | `src/pages/[...lang]/credits.astro` |
| **The grateful note** at the end of every page, linking to both pages above | every page | `src/components/CreditNote.astro`, placed in `src/layouts/Base.astro` |

Links to them: the footer (Begin column, and "Credits and sources" next to Privacy), the Exam Prep menu (Mere Man Ki Baat…), a flip card on the home page and the About menu (Why this format?, Credits and sources).

## 1. Mere Man Ki Baat…

**The name (19 Nov 2026, his choice):** "Mere Man Ki Baat…", written in Hinglish (Roman letters) on both the English and the Hindi pages, in the menu, footer, home card, Credits and Why this format. History: first "मन की सच्ची बातें" (he found it cliché), then for one morning "Mere Man Ki Baat…" / "पन्नों के बीच", then his own pick. If it changes again, search the code for the name: it sits in `src/pages/[...lang]/aspirants/index.astro` (`brand`, titles), `ChaptersCard.astro`, `NavMega.astro`, `src/i18n/ui.ts` (`footer.chapters`), `credits.astro` and `why-this-format.astro`.

**The home card:** `src/components/aspirants/ChaptersCard.astro`, in its own light pink band (`#mere-man-ki-baat`, class `b-mmkb`) on the home page, right under the "I didn’t clear the exam…" story card (moved there 19 Nov 2026 at his wish). One familiar question on the front; tapping turns it over to the first two sentences of the answer, with a link to the full talk. "Another one" shows the next. Which questions it uses: the `PICK` list at the top of the file (talk ids).

**His rules (18 Nov 2026):**
- Never advice. He is one of them: "yes, I felt this too, this is how long it lasted, this is who helped me (seniors, parents, teachers), this is what the books said". Chai-tapri tone, first person; the Hindi narrator is masculine.
- Start from the smallest, silliest problems (counting months, timetables, a clean room before a test) and go up to the biggest (should I quit?). Nothing is too small.
- Each answer ends by inviting the reader to share their own problem, anonymously or openly. The form at the bottom of the page sends it to his inbox through Formspree (the same account as the Contact page); name and email are optional, and the reader chooses "anonymous", "first name" or "please don't share".
- Humble, never comparing (project memory: story-tone-humble). Dates about him come from his Life History sheet.
- Answers that touch dark feelings mention Tele-MANAS, India's free mental-health helpline, **14416**. Keep that line.

**Layout:** `src/components/aspirants/TalkBook.astro`, the same pattern as My story: topics with their questions down the left and right side bars, one answer at a time in the middle (Previous / Next, arrow keys, swipe), "Read it all at once", and a fold-out list on phones. Each answer shows its read time and a "Books that helped me" box.

**Now:** 29 talks in 10 topics, all in English and Hindi. Parts 1 and 2 (`talks-1.ts`, `talks-2.ts`, 18 Nov 2026) have about 440 words each. Part 3 (`talks-3.ts`, 19 Nov 2026) comes from his voice note on time pressure: "In the exam hall" (stuck on one question, strange questions, re-reading, the first instinct and the ocean of the mind, the mind going blank, the 100-question mock) and "What is all this for?" (what use is this knowledge, were the years wasted). The page ends open: "More thoughts are on their way…", because he will keep adding.

**To add a talk** (for example, from a problem a reader sent): add an item to a topic in `talks-1.ts`, `talks-2.ts` or `talks-3.ts`:

```ts
{ id: 'unique-link-name', q: { en: '…', hi: '…' }, books: ['atomic'], a: { en: ['para 1', 'para 2'], hi: ['…', '…'] } },
```

The `id` becomes the link (/aspirants/#unique-link-name). `books` are keys from `src/data/aspirants/books.ts`; a new book goes there first (title, author, year, its idea in one line in both languages, in your own words). New books show up on the Credits page reading list by themselves. To add a topic, add `{ id, icon, title: { en, hi }, qs: [...] }`; the side bars split the topics in half by themselves.

**To check:** the small personal stories (what a senior, his mother, father or a teacher said; the screen-time deal with a friend; Holi with notes) were drafted for him to confirm or replace with what really happened. Change `en` and `hi` together.

## 2. Credits and sources

Sections: what is mine and not mine · PYQ books (with publisher and use) · Curriculum Index sources · links to every Library shelf's own Sources page (built from `src/explore.ts`, so new shelves appear by themselves) · the reading list behind Mere Man Ki Baat… (from `books.ts`) · music, fonts, tools, AI · copyright rules · a letter to authors and publishers · the benefit-sharing promise · why knowledge is shared freely · "did I miss you?".

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
