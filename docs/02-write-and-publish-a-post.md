# 02 · Write and publish a post

[Back to the handbook](README.md)

> Writing a short two-minute library page instead of a blog post? Use [13 · Add to the library](13-add-to-the-library.md).

You need only a web browser and your GitHub login. No installation.

## A. Write the post

1. Open <https://github.com/kritikesh28/kritikesh28.github.io> and sign in.
2. Open the file **`POST_TEMPLATE.md`** and copy all of its text.
3. Go to the folder **`src/content/blog`** (click `src`, then `content`, then `blog`).
4. Click **Add file** › **Create new file**.
5. In the name box, type the post's web address followed by `.md`, using lowercase words joined by hyphens. Example: `why-is-the-sky-dark-at-night.md`. This becomes `curioussparoows.com/blog/why-is-the-sky-dark-at-night/`.
6. Paste the template text and fill in the front matter (the part between the two `---` lines):

| Field | What to write | Example |
| --- | --- | --- |
| `title` | The question or title, inside double quotes | `"Why is the sky dark at night?"` |
| `description` | One sentence saying what the reader will learn (shows in Google) | `"Billions of stars, yet a black sky: the answer reveals the age of the Universe."` |
| `date` | Today's date as YEAR-MONTH-DAY | `2026-10-25` |
| `category` | Exactly one of: `ai-ml`, `geography-earth`, `exam-prep`, `mind-ideas`, `stories-films`, `life-skills` | `geography-earth` |
| `tags` | Any words in square brackets, separated by commas | `[universe, stars, light]` |
| `lang` | `en` for English, `hi` for Hindi | `en` |
| `draft` | `true` to keep it hidden, `false` to publish | `false` |
| `aiAssisted` | `true` if an AI helped write it (shows a short honest note) | `true` |
| `updated` | Optional. The date you last changed the post | `2026-11-02` |

7. Below the second `---`, write the post in Markdown:
    - `## Heading` for a section heading
    - `**bold words**`
    - `[link text](https://example.com)` for a link; `[link text](/blog/other-post/)` for one of your own pages
    - `- item` for a bullet list, `1. item` for a numbered list
    - A table: rows of `| a | b |`, with `| --- | --- |` under the header row
    - A picture: see [03 · Images](03-images.md)

## B. Save it as a pull request (recommended)

8. Click **Commit changes...** (top right).
9. In "Commit message", write a short note, for example `Add post: why is the sky dark`.
10. Choose **Create a new branch for this commit and start a pull request**, then click **Propose changes**.
11. On the next page click **Create pull request**.
12. Read it over in the **Files changed** tab. To fix something, click the three dots on the file › **Edit file**, change it and commit again to the same branch.

## C. Publish

13. When happy, click **Merge pull request**, then **Confirm merge**.
14. Click the **Actions** tab. A job called "Deploy site to GitHub Pages" will be running (yellow dot). Wait for a green tick (1 to 2 minutes).
15. Open `https://curioussparoows.com/blog/` and refresh. Your post is live.

Red cross instead of a green tick? Go to [08 · Fix problems](08-fix-problems.md).

## Quick route (no review)

At step 10 choose **Commit directly to the `main` branch** instead. It goes live straight away. Use this only for small, safe changes.

## Before you publish: the quality checklist

- [ ] The title is a real question people would type into Google.
- [ ] The first two sentences answer it directly.
- [ ] Every number is checked against a current, trustworthy source (NASA, NCERT, a university, a journal). Notes can be out of date.
- [ ] There is at least one line in your own voice or from your own experience.
- [ ] It ends with a curious question or a link to the next page, never a dull summary.
- [ ] Pictures have alt text (see [03](03-images.md)).
- [ ] `draft: false` if you want it live.

## Edit or remove a published post

- **Edit:** open the post's file in `src/content/blog`, click the pencil icon, change it, then follow steps 8 to 15. Add or change `updated:` in the front matter.
- **Hide without deleting:** change `draft: false` to `draft: true`.
- **Delete:** open the file, click the three dots › **Delete file**, then commit.
