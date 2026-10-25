# 09 · Backup and restore

[Back to the handbook](README.md)

## Where the copies are

| Copy | Where | What it holds | How it stays current |
| --- | --- | --- | --- |
| **Main** | GitHub repository | Every file and every past version | Automatically, with each change |
| **Backup** | Google Drive › "Digital Ecosystem - Claude Project Files" › **Curious Sparoows Website (backup)** | A zip of the whole site, plus Google Doc copies of this handbook, the vision, the task list and the working-methods file | Refreshed after important changes (see below) |
| **Your computer** (optional) | The folder from [07](07-run-on-your-computer.md) | Every file and its history | Type `git pull` |

## Make a fresh backup (about 2 minutes)

1. Open <https://github.com/kritikesh28/kritikesh28.github.io>.
2. Click the green **Code** button › **Download ZIP**.
3. Rename the downloaded file with the date, for example `curioussparoows-site-2026-11-01.zip`.
4. Open the Drive backup folder and upload it. Keep the last 3 zips and delete older ones.

Do this at least once a month, and after any big change. When Claude works on the site it refreshes the handbook and working-methods copies in the same folder; the site zip is uploaded by you.

## Restore the site from the Drive backup

Use this only if the GitHub repository is lost or deleted.

1. Download the newest zip from the Drive backup folder and unzip it.
2. On GitHub, create a new **public** repository named exactly `kritikesh28.github.io` (**+** › **New repository**). Don't add a README.
3. On the new repository's page, click **uploading an existing file**, drag in **all files and folders** from the unzipped folder, and commit to `main`.
    - The folder `.github` is hidden on some computers. Make sure it is uploaded too (on Mac press `Cmd` + `Shift` + `.` to show hidden files; on Windows, File Explorer › View › Show › Hidden items). Without it the site won't publish.
4. Go to **Settings** › **Pages** › "Build and deployment" › Source: **GitHub Actions**.
5. Under **Custom domain**, enter `curioussparoows.com` and save.
6. Go to the **Actions** tab and wait for the green tick. The site is back.

Note: a zip holds the files but not the history of past versions. The history lives only on GitHub and on any computer where the repository was cloned.
