# 15 · Languages: Hindi pages, the style rules, and adding a new language

The site is built in **English and Hindi**. English keeps its old addresses (`/about/`, `/library/the-universe/`). Hindi lives under `/hi/` (`/hi/about/`, `/hi/library/the-universe/`). The **EN / हिंदी** switch in the header moves a visitor to the same page in the other language and remembers the choice on that browser.

English addresses were kept on purpose. Google has already indexed them, and moving them to `/en/` would break every link already shared.

## 1. The easy-learning rules for Hindi (read these before writing)

The promise of the site is that **nobody has to leave it for Google or an AI to understand a sentence**. Write for a reader who finished class 5, speaks Hindi at home, and reads Hindi slowly.

1. **Everyday Hindi first.** Write the way people talk at home: "शुरुआत", not "प्रारंभ"; "ज़रूरी", not "अनिवार्य"; "पता लगाना", not "अन्वेषण करना". Short sentences, one idea each.
2. **Hard words get a plain meaning, every time.** When a subject needs the proper Hindi or English term, keep it, then explain it in brackets or in the next short line:
   - ब्रह्मांड (सारा आकाश और उसमें जो कुछ है)
   - गुरुत्वाकर्षण (चीज़ों का एक-दूसरे को अपनी ओर खींचना)
   - डार्क मैटर (ऐसा पदार्थ जो दिखता नहीं, पर अपने खिंचाव से पता चलता है)
   Give the meaning the **first time** the word appears on each page. A reader may land on any page directly.
3. **English technical words are fine** when that is what people actually say: AI, GIS, डेटा, मॉडल, ऐप. Write them in the script readers know (AI stays in Latin letters; डेटा in Devanagari), and still add the meaning once.
4. **Numbers in digits** (12 पत्ते, 2 मिनट). Units in plain words (किलोमीटर, साल).
5. **Brand names never change.** "Curious Sparoows" and "Sparoows" stay in Latin letters with the double o. Never write "Sparrows" for the brand, and never translate it. (The story series title "The Curious Sparrows" is separate and stays as it is.)
6. **First person is masculine.** Hindi verbs change with the writer's gender. Kritikesh writes with the masculine forms: "सीख रहा हूँ", "मैं गया", "कर सकता हूँ" (never रही / गई / सकती). Neutral forms such as "मैंने सीखा" and "मेरा काम" are fine too, and are already used on several pages.
7. **Tags stay in English** (`[universe, stars]`). They form the addresses of tag pages and keep the English and Hindi versions linked.
8. **Check before publishing:** read the page aloud. If any word would make a class-5 reader stop, add its meaning or change the word.

## 2. Translate an existing page (a post, a leaf or a project)

A translation is a copy of the English file, placed in a `hi/` folder that mirrors the English path, **with the same file name**:

| English file | Hindi file |
| --- | --- |
| `src/content/blog/why-this-site.md` | `src/content/blog/hi/why-this-site.md` |
| `src/content/library/the-universe/01-what-is-the-universe.md` | `src/content/library/hi/the-universe/01-what-is-the-universe.md` |
| `src/content/projects/qgis-maps.md` | `src/content/projects/hi/qgis-maps.md` |

Steps:

1. Copy the English file into the matching `hi/` folder, keeping the file name.
2. Translate `title`, `description` and the body using the rules in part 1. Keep `date`, `category`, `tags`, `order` and every other field exactly as in English.
3. Set `lang: hi` (for posts) and start with `draft: true`.
4. Links to your own pages: add `/hi` in front (`/hi/library/the-universe/`). Links to other sites stay as they are.
5. When it reads well, set `draft: false` and publish as usual ([02](02-write-and-publish-a-post.md)).

**If a page has no Hindi copy yet**, the Hindi address still works: it shows the English text with a small note saying the Hindi version is coming, and tells Google not to list that page. Reading progress (the ticks on leaves) is shared between the two languages.

### Hindi post template

```markdown
---
title: "सवाल या शीर्षक, आसान हिंदी में"
description: "एक वाक्य: पढ़ने वाला इस पन्ने से क्या सीखेगा।"
date: 2026-11-02
category: geography-earth
tags: [universe, stars]
lang: hi
draft: true
aiAssisted: true
---

<!-- Easy-learning check: every hard word has a plain meaning in brackets the first time it appears.
     Brand: write "Curious Sparoows" exactly. First person: masculine forms (रहा, गया, सकता). -->

एक छोटी-सी बात या सवाल से शुरू करें, जो पढ़ने वाले ने खुद कभी सोचा हो।

## पहला हिस्सा

छोटे वाक्य। हर कठिन शब्द के साथ उसका आसान मतलब, जैसे गुरुत्वाकर्षण (चीज़ों का एक-दूसरे को अपनी ओर खींचना)।

## एक लाइन में याद रखें

पूरे पन्ने की बात, एक आसान वाक्य में।
```

## 3. Change a word on the site itself (menu, buttons, footer)

- Menu, buttons, footer, search and other small text: `src/i18n/ui.ts`. Each key has an English line and a Hindi line.
- Library subject, branch and course names in Hindi: `src/i18n/library.hi.ts`.
- The 24 curious questions in Hindi: `src/data/curious-questions.hi.ts` (same order as the English file).
- Longer page text (home poster, About, Contact, Start here, Now, Portfolio): inside each page in `src/pages/[...lang]/`, in a block that has an `en:` part and a `hi:` part.

## 4. Add a new language later (for example Tamil, Bengali or French)

1. In `src/i18n/config.ts`, add one line to `LOCALES` (its code, the switcher label, the name, and the locale codes). Copy the `hi` line and change it.
2. In `src/i18n/ui.ts`, add a dictionary for the new code. Anything you leave out shows in English, so you can start small.
3. In `astro.config.mjs`, add the code to the sitemap `locales`.
4. If the script needs its own font (Tamil, Bengali), install a matching Noto font, import it in `src/layouts/Base.astro`, and add it to the font variables at the top of `src/styles/global.css`.
5. Put translated content in a folder named after the code (`src/content/library/ta/...`).

Every page is then built in the new language at `/ta/...`, the switcher shows it, and Google gets the language links automatically. Search builds one index per language (`/search-index.json`, `/hi/search-index.json`, …).

## 5. What stays English for now

- **Deeper Exam Prep topic lines.** Every Exam Prep page, the Exam Mentor (परीक्षा मार्गदर्शक), search, all 15 subjects, every major topic and the most-asked topics are in Hindi. The deeper lines (about 30,000) are still English and show in English on Hindi pages until their batch is done (see part 6).
- The contact form sends the visitor's language with each message, so you know which language to reply in.

## 6. Exam Prep translations

Exam Prep is built from the Curriculum Index sheet by `tools/exam-prep/build_data.py`. The Hindi is kept **separately**, so a sheet refresh never wipes it:

| File | What it holds |
|---|---|
| `src/data/exam-prep/hi/subjects.json` | Hindi name and blurb for each subject |
| `src/data/exam-prep/hi/parts.json` | Hindi part headings ("Part II — Ancient India" → "भाग II — प्राचीन भारत") |
| `src/data/exam-prep/hi/exams.json` | Hindi names of exams, agencies and governments |
| `src/data/exam-prep/hi/topics/<subject>.json` | One entry per topic id: `"POL-12": "मौलिक अधिकार"`, or `{"t": title, "d": description, "p": exam-paper note}` |

Rules:

1. The key is the topic id from the sheet (`POL-12.3`). If an id changes in the sheet, change it here too.
2. Anything without a Hindi entry falls back to English and is marked as English for screen readers and Google.
3. Hindi search also matches the English title of a translated topic, so typing "Fundamental Rights" on the Hindi page still works.
4. Keep the standard Hindi-medium exam word and add the English or a plain gloss in brackets: "न्याय निगमन (सिलॉजिज़्म)".
5. **Adding a batch:** list the ids still in English for one subject, translate them, add them to that subject's file, build and check `/hi/exam-prep/curriculum-index/<subject>/`. Do one subject at a time, most-asked topics first.
