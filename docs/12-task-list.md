# 12 · Pending task list

[Back to the handbook](README.md)

The single list of what is waiting to be done, in the recommended order. When you ask "what should I do next?", start at the top. Tick items as they finish and add new ones at the right place in the order.

**Who:** You = Kritikesh. Claude = done by Claude when asked (any developer could do it using this handbook).

## Now: quick actions for you

- [x] **Library update merged** (pull request #5, with #3 and #4), 25 October 2026.
- [ ] **Review and merge "Blog folds into the library"** (pull request #6): sparrow icons, tree watermarks, six trees, long reads, old links forwarding, search suggestions. How: [06 · Pull requests](06-pull-requests.md).
- [ ] **Add your own line to each Universe Leaf** (optional but recommended): one sentence from your own experience or notes, so every page carries your voice. How: [13 · Add to the library](13-add-to-the-library.md).
- [ ] **Upload the first site zip to Drive.** How: [09 · Backup and restore](09-backup-and-restore.md), "Make a fresh backup". 2 minutes.
- [x] **Confirm the level names.** Forest › Tree › Branch › Twig › Leaf, now in use (25 October 2026).
- [ ] **Fill in the domain registrar** in [00 · Accounts and access](00-accounts-and-access.md).

## Phase 1: Foundation (build first)

Status 25 October 2026: all five are built in pull request #5.

| # | Task | Who | Why this order |
| --- | --- | --- | --- |
| 1 ✓ | Course structure: Gateway, Leaf, Full Journey and Recap page types; Next/Previous; "Part 3 of 12" progress bar; breadcrumb in plain words | Claude | Everything else hangs on this |
| 2 ✓ | Write the 12 Universe Leaves from the notes, fact-checked; you add your own line to each | Claude drafts, you finish | Content is what readers come for |
| 3 ✓ | Curious Question card: a database of curious questions shown in a premium card ("Tap to find out"), each answered in 2 lines and linked to its Leaf | Claude | Small build, big delight; also seeds the AI assistant's knowledge |
| 4 ✓ | Search that never says "no match found" (built into the site, typo-tolerant, closest results labelled honestly) | Claude | People who search and find nothing leave |
| 5 ✓ | "How this library works" guide: a small panel explaining Forest, Tree, Branch, Twig, Leaf, shown once to new visitors and always one tap away | Claude | No one should feel lost |

## Phase 2: Explorer (after the first unit is live)

| # | Task | Who |
| --- | --- | --- |
| 6 ✓ | Reading progress tracker (built early, in #5): "You've read 5 of 12 Leaves in Universe", ticks on read pages, a progress ring per Tree. Saved privately in the reader's own browser; no login, no guilt-streaks | Claude |
| 7 ✓ | Home-page explorer: the curiosity wheel now opens the six library trees (in #6) | Claude |
| 8 | Hindi and Hinglish search words (started in #6: brahmand, prithvi, tara, akash, bhugol; add more as readers use them); quietly count searches that found little, to know what to write next | Claude |
| 9 | "How the Earth formed" twig (next after the Universe; listed as "being written" on the library page) | Claude drafts, you finish |

## Phase 3: Grow

| # | Task | Who |
| --- | --- | --- |
| 10 | Map of links between subjects (how rivers connect to AI and history) | Claude |
| 11 | Newsletter (only after a steady weekly rhythm) | You sign up, Claude connects |
| 12 | Hindi Leaves | You and Claude |

## Showcase track: the AI Sparrow Assistant (runs alongside all phases)

Your flagship AI project for recruiters: an assistant on the site that answers questions **using only your own pages**, cites the Leaf it used, and says "I don't know yet" instead of inventing. It is built in stages so it works flawlessly before going public.

| Stage | When | What | Status |
| --- | --- | --- | --- |
| A. Design | During phase 1 | Write its rules (honest, cites sources, never invents), choose the approach (retrieval-augmented generation over the site's pages), list 50 test questions with correct answers | Not started |
| B. Prototype | During phase 2 | A private version that answers from the Leaves; measure accuracy on the 50 test questions; publish the code and results on GitHub and Hugging Face | Not started |
| C. Launch | Phase 3 | Live on the site after it passes the tests; a write-up for LinkedIn and the portfolio | Not started |

The library page shows it publicly as "Not started" in the "What is growing" list, so it stays visible. Change that line in `src/library.config.ts` as each stage finishes.

**Recommended next step for this track:** stage A. The curious questions (`src/data/curious-questions.ts`) and each Leaf's short answer are ready-made test questions with correct answers.

Reminder: this track is how recruiters see your AI skill. Raise it at every weekly review until stage C is done.

_Last updated: 25 October 2026._
