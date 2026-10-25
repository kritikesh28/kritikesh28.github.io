# 04 · Edit pages and settings

[Back to the handbook](README.md)

To change any file: open it on GitHub, click the **pencil icon** (Edit this file), make the change, click **Commit changes...**, and publish as in [02 · Write and publish a post](02-write-and-publish-a-post.md), steps 8 to 15.

## Settings file: `src/site.config.ts`

Change only the text **inside the quotes**. Keep every quote mark, comma and bracket exactly where it is.

| To change... | Edit this line |
| --- | --- |
| Name in the header | `name:` |
| Brand name (Curious Sparoows) or motto | `blogBrand:`, `motto:` |
| Tagline and Google description | `tagline:`, `description:` |
| Job title, location, email | `jobTitle:`, `location:`, `email:` |
| Résumé file | Upload the new PDF to `public/`, then change `resumePdf:` |
| Social links | The `SOCIALS` list: add a line like `{ label: 'YouTube', href: 'https://...' },` |
| Top menu | The `NAV` list |
| Subjects (the library's trees) | The `CATEGORIES` list. Each one is a tree in the library; its branches and short courses are in `src/library.config.ts` (see [13](13-add-to-the-library.md)). Also add the new slug to `BRANCHES` there, and a colour line `.t-<slug>` in `src/styles/global.css`. A new line needs a `slug` (lowercase-with-hyphens), `label`, `short` and `blurb`. **Never remove a category that posts still use**, or the build fails. |
| Fun facts shown by the sparrows | The `CURIOUS_FACTS` list |

## Text pages

| Page | File |
| --- | --- |
| Home | `src/pages/index.astro` |
| About | `src/pages/about.astro` |
| Now (what you're doing these days) | `src/pages/now.astro` |
| Contact | `src/pages/contact.astro` |
| Privacy | `src/pages/privacy.astro` |
| 404 (page not found) | `src/pages/404.astro` |

In these files, change only the words between tags, for example the words between `<p>` and `</p>`, or `<li>` and `</li>`. Don't delete the tags themselves. Remember to update "Updated October 2026" on the Now page.

## Turn on comments (giscus)

1. In the repository, go to **Settings** › **General** › **Features** and tick **Discussions**.
2. Install the giscus app: <https://github.com/apps/giscus>, and allow it on this repository.
3. Open <https://giscus.app>, type `kritikesh28/kritikesh28.github.io` in the repository box, pick the category **Announcements**.
4. Scroll to "Enable giscus". Copy the values of `data-repo-id` and `data-category-id`.
5. In `src/site.config.ts`, fill the `giscus` line: `repo: 'kritikesh28/kritikesh28.github.io'`, `repoId: '<data-repo-id>'`, `categoryId: '<data-category-id>'`. Commit and publish.

## Change the domain

1. Buy or move the domain at a registrar.
2. Put the new domain (just the name, e.g. `example.com`) in `public/CNAME`.
3. Change `site:` in `astro.config.mjs` to `https://example.com`.
4. At the registrar, point the domain to GitHub Pages: follow <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>.
5. In the repository: **Settings** › **Pages** › **Custom domain**, enter it and tick **Enforce HTTPS** once offered.
