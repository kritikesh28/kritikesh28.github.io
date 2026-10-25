# 08 · Fix problems

[Back to the handbook](README.md)

## The Actions tab shows a red cross (the build failed)

The live site is unaffected; it keeps the last working version.

1. Click the **Actions** tab, then the failed run, then the **build** job.
2. Open the step with the red cross and read the last red lines. They usually name the file and the problem.

| The error mentions... | Likely cause | Fix |
| --- | --- | --- |
| `category` or `Invalid enum value` | The category is misspelled or not in the list | Use one of the slugs in [02](02-write-and-publish-a-post.md) |
| `date` or `Invalid date` | Date not written as YEAR-MONTH-DAY | e.g. `2026-10-25` |
| `title` or `description` `Required` | A front matter line is missing | Add it |
| `YAMLException` or `bad indentation` | A typo in the front matter: missing quote, colon or `---` | Compare with `POST_TEMPLATE.md` line by line. Titles containing `:` must be inside double quotes. |
| An image path | The picture file name or folder is wrong | Check spelling and that it's in `public/images/` |

3. Fix the file and commit again. A new run starts by itself.

## The change is merged but the site looks the same

- Wait 2 minutes and check the Actions tab for a green tick.
- Refresh with `Ctrl` + `Shift` + `R` (Mac: `Cmd` + `Shift` + `R`) to skip the browser's saved copy.
- Check the post has `draft: false`.

## The site shows "404" or the domain stopped working

- Check the domain hasn't expired at the registrar.
- In the repository: **Settings** › **Pages**. The source should be **GitHub Actions** and the custom domain `curioussparoows.com`.
- Check `public/CNAME` still contains `curioussparoows.com`.

## Undo a change

- **Undo a merged pull request:** open the merged pull request and click **Revert** near the bottom. This creates a new pull request that undoes it; merge that.
- **See an old version of a file:** open the file, click **History**, pick a version.

## Re-run the publish job by hand

Actions tab › **Deploy site to GitHub Pages** (left) › **Run workflow** › **Run workflow**.

## Contact form emails stopped

Sign in to Formspree and check the form is active and the monthly limit isn't reached. The form address is `formspreeUrl` in `src/site.config.ts`.
