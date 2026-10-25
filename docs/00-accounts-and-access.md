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
| **Google Drive** | Backup copy of the site and this handbook | <https://drive.google.com> | Not used by the site itself |

Optional services that are prepared but switched off until you fill them in `src/site.config.ts`:

- **giscus** (comments under posts, uses GitHub Discussions): see [04 · Edit pages and settings](04-edit-pages-and-settings.md), "Turn on comments".
- **Buttondown** (email newsletter): `newsletterAction`.
- **Cal.com** (book-a-call button): `calUrl`.

## Yearly checklist

- [ ] Renew the domain before it expires (set a calendar reminder one month before).
- [ ] Check you can still sign in to GitHub, Formspree, GoatCounter and Search Console.
- [ ] Download a fresh backup (see [09](09-backup-and-restore.md)).
