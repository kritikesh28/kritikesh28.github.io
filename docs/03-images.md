# 03 · Images

[Back to the handbook](README.md)

## Prepare the picture

1. Use your own pictures, or ones you have the right to use (NASA images are free to use; most images found on Google are not).
2. Make it small: width about 1200 to 1600 pixels, and convert it to **WebP** (free at <https://squoosh.app>). Aim for under 300 KB. Big pictures make pages slow.
3. Name it in lowercase with hyphens, for example `river-valley-v-shape.webp`.

## Upload it

4. In the repository, open the folder **`public/images`**.
5. Click **Add file** › **Upload files**, drag the picture in, and commit (to a new branch with a pull request, or directly to `main`).

## Use it in a post

6. In the post, write:

```markdown
![A V-shaped river valley in the Himalaya, with steep sides meeting at the river](/images/river-valley-v-shape.webp)
```

The words in square brackets are the **alt text**: a description for people who cannot see the image and for Google. Describe what the picture shows in one sentence.

The address always starts with `/images/` (not `/public/images/`).
