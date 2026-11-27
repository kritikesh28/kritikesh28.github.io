// Keeps "noindex" pages out of the sitemap. Runs after @astrojs/sitemap has written its files.
// Why: Google Search Console reports every sitemap address that says "noindex" as an error
// ("Excluded by 'noindex' tag"). Such pages are on purpose: moved pages that forward to a new address
// (old /explore/ links, the six old Library trees, old /paper/ch1/1/ PYQ pages) and Hindi addresses
// of pages that exist only in English (they show English with a note). So the sitemap must not list them.
// The check reads the built page itself, so a new noindex page is left out automatically.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const NOINDEX = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i;

export default function sitemapNoindex() {
  return {
    name: 'sitemap-noindex',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const site = 'https://curioussparoows.com';
        const cache = new Map();
        const isNoindex = (url) => {
          if (cache.has(url)) return cache.get(url);
          let path = url.startsWith(site) ? url.slice(site.length) : new URL(url).pathname;
          path = decodeURIComponent(path);
          const file = path.endsWith('/') ? join(out, path, 'index.html') : join(out, path);
          const hit = existsSync(file) && NOINDEX.test(readFileSync(file, 'utf8'));
          cache.set(url, hit);
          return hit;
        };
        let dropped = 0;
        for (const name of readdirSync(out).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
          const file = join(out, name);
          const xml = readFileSync(file, 'utf8').replace(/<url>[\s\S]*?<\/url>/g, (block) => {
            const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
            if (loc && isNoindex(loc)) { dropped++; return ''; }
            // also drop language links that point to a noindex page
            return block.replace(/<xhtml:link [^>]*href="([^"]+)"[^>]*\/>/g, (link, href) => (isNoindex(href) ? '' : link));
          });
          writeFileSync(file, xml);
        }
        logger.info(`left ${dropped} noindex page(s) out of the sitemap`);
      },
    },
  };
}
