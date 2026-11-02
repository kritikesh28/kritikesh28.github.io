# kritikesh28.github.io

Personal website of Kritikesh Rajpurohit: Portfolio, the Curious Sparoows Library, Exam Prep, About and Contact.
Built with [Astro](https://astro.build) and published free on GitHub Pages.

- Settings you change most (name, tagline, links, library subjects, contact form): `src/site.config.ts`
- Library: short pages in `src/content/library/` (copy `LEAF_TEMPLATE.md`), long reads in `src/content/blog/` (copy `POST_TEMPLATE.md`). Guide: `docs/13-add-to-the-library.md`
- Exam Prep (/exam-prep/): built from two Google Sheets (Curriculum Index, Exam Guide) by `tools/exam-prep/build_data.py`. Pages in `src/pages/exam-prep/`. Guide: `docs/14-exam-prep.md`
- Portfolio projects: `src/content/projects/`
- Images: `public/images/`

Every change committed to `main` rebuilds and republishes the site in about two minutes (see the Actions tab).

**Step-by-step guides for every task (writing, publishing, images, settings, fixing problems, backups): see the [handbook in `docs/`](docs/README.md).**
