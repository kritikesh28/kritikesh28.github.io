# 13 · Add to the library

[Back to the handbook](README.md)

The library lives at **curioussparoows.com/library/**. This guide covers every task: adding a Leaf, starting a new twig (course), adding trees and branches, adding a curious question, and updating the "What is growing" status. For the ideas behind it, see [11 · Library plan](11-library-plan.md). For the rules every page must follow, see [VISION.md](VISION.md).

## The levels, in plain words

| Level | What it is | Like | Example |
| --- | --- | --- | --- |
| Forest | The whole library | the whole university | Curious Sparoows Library |
| Tree | A big subject | a course | Geography & Earth |
| Branch | One area of that subject | a module | Earth & Universe |
| Twig | One topic, told as a short series | a chapter | The Universe |
| Leaf | One page, one question, about 2 minutes | a lesson | Is space really empty? |

## Where the files are

| What | File |
| --- | --- |
| Trees, branches, twigs, and the "What is growing" list | `src/library.config.ts` |
| The pages of a twig (one folder per twig) | `src/content/library/<twig>/` |
| A twig's front page (Gateway) | `src/content/library/<twig>/gateway.md` |
| A twig's last page (Recap) | `src/content/library/<twig>/recap.md` |
| Each Leaf | `src/content/library/<twig>/<question-words>.md` |
| Curious questions (the dark card) | `src/data/curious-questions.ts` |
| Template for a new Leaf | `LEAF_TEMPLATE.md` (in the main folder) |

Pages built automatically for every twig, with nothing to do by hand:

- `/library/<twig>/`: the Gateway with outcomes, the path of Leaves and the reader's progress
- `/library/<twig>/<leaf>/`: each Leaf with its short answer, Next button, guide panel and progress dots
- `/library/<twig>/all/`: the Full Journey, every Leaf on one page (hidden from Google, so it does not compete with the Leaves)
- `/library/<twig>/recap/`: the recap, plus a "test yourself" list built from every Leaf's short answer
- `/search/`: search reads every Leaf, post, project and curious question automatically

## A. Add a Leaf to an existing twig

1. On GitHub, open the repository, then `LEAF_TEMPLATE.md`. Click the copy icon ("Copy raw file").
2. Go to `src/content/library/the-universe/` (or the twig you want). Click **Add file › Create new file**.
3. Name the file after the question in small letters with dashes, ending in `.md`, for example `why-is-space-dark.md`. This becomes the web address.
4. Paste the template. Fill in every line of the front matter (the part between the two `---` lines):
   - `title`: the question, worded the way a person would type it into Google.
   - `answer`: the full answer in one or two sentences. Never hold the answer back.
   - `order`: its position. To put it between Leaf 4 and Leaf 5, give it `4.5`. Numbers do not need to be whole.
   - `nextHook`: one honest line pointing to the next Leaf's question. The next Leaf must really answer it.
   - Update the `nextHook` of the Leaf **before** it, so it points to your new Leaf.
5. Write the body: 250 to 400 words, `##` headings, finishing with `## Remember this`.
6. Keep `draft: true` while you are still writing. Drafts never appear on the site.
7. When it is ready, set `draft: false`, then click **Commit changes**. Choose "Create a new branch" if you want to check it first in a pull request ([06](06-pull-requests.md)).
8. About two minutes after it reaches `main`, the Leaf appears in the Gateway path, the progress dots, the recap quiz and search, all by itself.

Quality check before publishing (from [VISION.md](VISION.md)):

- [ ] The title is a real question people ask.
- [ ] The short answer is complete and true on its own.
- [ ] Every number has a source you trust (NASA, ESA, a textbook, a university page).
- [ ] Anything unknown or debated is called unknown or debated.
- [ ] Readable in about two minutes on a phone.
- [ ] The hook to the next page is answered on the next page. No clickbait.
- [ ] `aiAssisted: true` if an AI helped write it.

## B. Start a new twig (a new short course)

1. Open `src/library.config.ts`. Find the right tree and branch. Add a line in `twigs`, or change an existing planned twig:
   ```ts
   { slug: 'how-earth-formed', title: 'How the Earth formed', question: 'How did a cloud of dust become our planet?', status: 'live' },
   ```
   `status` is `'live'` (readable), `'next'` (being written) or `'planned'`. Only `live` twigs are clickable.
2. Create the folder `src/content/library/how-earth-formed/` (on GitHub, type the folder name followed by `/` in the file name box).
3. Add `gateway.md`. Copy `src/content/library/the-universe/gateway.md` and change it. Keep `kind: gateway` and `order: 0`. Write 3 to 5 `outcomes`: things the reader will be able to do at the end.
4. Add the Leaves (section A), with `order` 1, 2, 3...
5. Add `recap.md`. Copy the Universe one. Keep `kind: recap` and `order: 99`.
6. Set the twig's `status` to `'live'` only when the Gateway, the Leaves and the Recap are all ready.
7. Update the "What is growing" list (section E).

## C. Add a tree or a branch

In `src/library.config.ts`, copy an existing tree block `{ slug: ..., title: ..., blurb: ..., branches: [...] }` and change the words. A tree needs at least one branch, and a branch needs at least one twig (it can be `planned`). Tree colours rotate automatically.

## D. Add a curious question

1. Open `src/data/curious-questions.ts` and click the pencil icon.
2. Copy one block and change it:
   ```ts
   {
     q: 'Why is the sea salty?',
     a: 'Rain slowly dissolves salts from rocks, rivers carry them to the sea, and when seawater evaporates the salt stays behind.',
     link: '/library/some-twig/some-leaf/',   // optional: only if a page goes deeper
     topic: 'Earth',
   },
   ```
3. Rules: the answer must be complete on the card, true and checked. The link is optional. Never tease without answering.

## E. Update "What is growing"

The list at the bottom of the library page is `BUILD_STATUS` in `src/library.config.ts`. Each line has a name, a status (`'live'`, `'in-progress'` or `'planned'`) and a short note. Update it whenever something starts or finishes, so readers never click on a promise. The AI Sparrow Assistant is listed there as "Not started" until it is built; see [12 · Pending task list](12-task-list.md).

## F. How reading progress works

When a reader reaches the end of a Leaf, the browser remembers it (in its own storage, `cs-library-read`). Nothing is sent anywhere. The Gateway then shows ticks, "3 of 12 read" and a **Continue** button to the first unread Leaf. Clearing browser data removes it. There are no accounts, no streaks and no reminders, on purpose ([VISION.md](VISION.md)).

## G. How search works

`/search-index.json` is rebuilt on every publish from all library pages, posts, projects and curious questions. The search page ranks results by title, keywords, description and text, accepts spelling mistakes, and when nothing matches well it shows the closest pages with an honest note and a link to suggest the question. To make a page easier to find, add the words people use to its `keywords`. To teach search that two words mean the same, add them to `SYN` near the top of the script in `src/pages/search.astro`.

## If something breaks

- **The build fails after adding a Leaf:** usually a missing quote or `---` in the front matter, or a `kind` other than `gateway`, `leaf` or `recap`. Open the failed run in the **Actions** tab; the error names the file. See [08 · Fix problems](08-fix-problems.md).
- **A twig shows "not written yet":** its `status` in `src/library.config.ts` is not `'live'`.
- **A Leaf is missing:** check `draft: false` and that it is in the right folder.

_Last updated: 25 October 2026._
