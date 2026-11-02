# 00 · Accounts and access

[Back to the handbook](README.md)

The website depends on a few free accounts. Keep the login for each one safe (a password manager is best). **Never** write passwords into this repository: it is public.

| Service | What it does for the site | Where to sign in | Where it is set in the site |
| --- | --- | --- | --- |
| **GitHub** (user `kritikesh28`) | Stores all the site's files and their history, builds the site and hosts it for free (GitHub Pages) | <https://github.com> | The whole repository |
| **Domain registrar** | Owns the name `curioussparoows.com`. It must be renewed every year or the site address stops working. | _Fill in: the company you bought the domain from_ | `public/CNAME` |
| **Google Search Console** | Shows how the site appears in Google search and which searches bring visitors | <https://search.google.com/search-console> | `googleSiteVerification` in `src/site.config.ts` |
| **GoatCounter** | Counts visitors privately (no cookies) | <https://curioussparoows.goatcounter.com> | `goatcounterCode` in `src/site.config.ts` |
| **Formspree** | Receives messages sent from the Contact page and emails them to you | <https://formspree.io> | `formspreeUrl` in `src/site.config.ts` |
| **Bing Webmaster Tools** | Shows how the site appears in Bing (which also feeds ChatGPT search and Copilot). Set up by importing from Search Console. | <https://www.bing.com/webmasters> | Nothing in the site; IndexNow (below) feeds it |
| **IndexNow** | Tells Bing and other search engines about new or changed pages right after each publish. No account; it works with a key file. | <https://www.indexnow.org> | Key file `public/a1a8670a13934983a9f2272ac3cd12f2.txt` (public by design, never delete) and `.github/workflows/indexnow.yml` |
| **Google Sheets** | The Curriculum Index and Exam Guide sheets are the source of the Exam Prep section | <https://drive.google.com> › library › `06_EXAM_GUIDE_RPSC_RSSB` | Copied into the site by `tools/exam-prep/build_data.py` (see [14](14-exam-prep.md)) |
| **Google Drive** | Backup copy of the site and this handbook; the library | <https://drive.google.com> | Not read by the site itself |

Optional services that are prepared but switched off until you fill them in `src/site.config.ts`:

- **giscus** (comments under posts, uses GitHub Discussions): see [04 · Edit pages and settings](04-edit-pages-and-settings.md), "Turn on comments".
- **Buttondown** (email newsletter): `newsletterAction`.
- **Cal.com** (book-a-call button): `calUrl`.

## Yearly checklist

- [ ] Renew the domain before it expires (set a calendar reminder one month before).
- [ ] Check you can still sign in to GitHub, Formspree, GoatCounter, Search Console and Bing Webmaster Tools.
- [ ] In Search Console and Bing, look at Pages › "Not indexed" for Exam Prep pages and fix any errors.
- [ ] Download a fresh backup (see [09](09-backup-and-restore.md)).
