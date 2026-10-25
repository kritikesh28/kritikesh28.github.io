# 01 · How the site works

[Back to the handbook](README.md)

## The journey of a change

1. A file in the GitHub repository is added or changed (for example a new library page).
2. The change is saved ("committed") to the `main` branch, either directly or by merging a pull request.
3. GitHub notices and runs the **"Deploy site to GitHub Pages"** job (see the **Actions** tab of the repository). It turns the files into web pages. This takes about 1 to 2 minutes.
4. The new pages go live at <https://curioussparoows.com>.

If step 3 fails, the live site simply stays as it was. Nothing breaks for visitors. See [08 · Fix problems](08-fix-problems.md).

## Words you will see

| Word | Meaning |
| --- | --- |
| **Repository (repo)** | The project folder on GitHub with all the site's files |
| **Commit** | One saved change, with a short note saying what changed |
| **Branch** | A separate copy of the files to try changes on. `main` is the live one. |
| **Pull request (PR)** | A request to copy a branch's changes into `main`. You can review it first. |
| **Merge** | Accepting a pull request, which publishes it |
| **Markdown (.md)** | Simple text format for posts: `## Heading`, `**bold**`, `[link](url)` |
| **Front matter** | The block between two `---` lines at the top of a post that holds its title, date and so on |
| **Astro** | The free tool that turns the files into a website |

## Where everything lives

```
kritikesh28.github.io/
├── docs/                    ← this handbook
├── POST_TEMPLATE.md         ← copy this to start a new post
├── LEAF_TEMPLATE.md         ← copy this to start a new library Leaf
├── public/                  ← files served as they are
│   ├── images/              ← pictures used on pages and posts
│   ├── CNAME                ← the domain name (curioussparoows.com)
│   └── Kritikesh_Rajpurohit_Resume.pdf
├── src/
│   ├── site.config.ts       ← name, tagline, links, menu, categories, services
│   ├── library.config.ts    ← library trees, branches, twigs, "What is growing" list
│   ├── data/curious-questions.ts ← questions for the curious question card
│   ├── content/
│   │   ├── blog/            ← one .md file per long read (shown in the library at /library/read/...)
│   │   ├── library/         ← one folder per library twig (course); see guide 13
│   │   └── projects/        ← one .md file per portfolio project
│   ├── pages/               ← the pages (about, now, contact, privacy...)
│   ├── components/          ← reusable building blocks (cards, starfield...)
│   ├── layouts/Base.astro   ← the frame around every page (header, footer)
│   └── styles/global.css    ← colours, fonts and spacing
├── astro.config.mjs         ← technical settings (do not change unless needed)
├── package.json             ← list of tools the site needs
└── .github/workflows/deploy.yml ← the automatic publish job
```

**Safe to edit any time:** anything in `src/content/`, `public/images/`, `src/site.config.ts`, `src/library.config.ts`, `src/data/`, and the text inside `src/pages/*.astro`.
**Edit with care:** `src/components/`, `src/layouts/`, `src/styles/`.
**Leave alone unless you know why:** `astro.config.mjs`, `package.json`, `package-lock.json`, `.github/`.
