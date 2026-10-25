# 07 · Run the site on your computer

[Back to the handbook](README.md)

Optional. Useful to preview big changes before publishing. Do this once:

1. Install **Node.js version 24** from <https://nodejs.org> (choose the "LTS" installer for version 24 or newer).
2. Install **Git** from <https://git-scm.com/downloads>.
3. Open a terminal (Windows: "Command Prompt" or "PowerShell"; Mac: "Terminal").
4. Type, pressing Enter after each line:

```
git clone https://github.com/kritikesh28/kritikesh28.github.io.git
cd kritikesh28.github.io
npm ci
```

Each time you want to preview:

5. In the terminal, inside the `kritikesh28.github.io` folder, type `npm run dev`.
6. Open <http://localhost:4321> in your browser. It refreshes when you save a file.
7. Press `Ctrl` + `C` in the terminal to stop.

To check that the site builds without errors (the same check GitHub runs): `npm run build`.

To send your local changes to GitHub:

```
git checkout -b my-change-name
git add .
git commit -m "Describe the change"
git push -u origin my-change-name
```

Then open the repository on GitHub; it offers **Compare & pull request**. Continue with [06](06-pull-requests.md).

Before starting new work, get the latest files: `git checkout main` then `git pull`.
