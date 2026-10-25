# 05 · Portfolio projects

[Back to the handbook](README.md)

Each project is one file in **`src/content/projects/`**. The easiest start is to copy an existing one (for example `qgis-maps.md`) and change it.

1. Open `src/content/projects/`, click **Add file** › **Create new file**, name it `my-project-name.md`.
2. Fill the front matter:

| Field | What to write |
| --- | --- |
| `title` | Project name in quotes |
| `summary` | One sentence on what it does and what it shows about your skill |
| `date` | YEAR-MONTH-DAY |
| `status` | `live`, `in-progress` or `planned` |
| `tags` | Tools and topics, e.g. `[Python, pandas, QGIS]` |
| `image`, `imageAlt` | Optional cover picture, e.g. `/images/my-chart.webp`, and its description |
| `links` | Optional buttons, e.g. `[{ label: "Code on GitHub", href: "https://github.com/kritikesh28/..." }]` |
| `order` | Smaller numbers show first (1, 2, 3...) |
| `draft` | `true` to hide |
| `aiAssisted` | `true` if AI helped |

3. Below the front matter, describe the project: the problem, what you built, one result, one limitation, what you learned.
4. Publish as in [02](02-write-and-publish-a-post.md), steps 8 to 15.
