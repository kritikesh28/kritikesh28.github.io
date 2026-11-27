// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sitemapNoindex from './src/integrations/sitemap-noindex.mjs';
import { readFileSync } from 'node:fs';

// Exam pages that only cover a language paper are kept out of search (noindex), so keep them out of the sitemap too.
const hiddenExamPages = JSON.parse(readFileSync(new URL('./src/data/exam-prep/exam-pages.json', import.meta.url), 'utf8'))
  .filter((e) => e.langOnly)
  .map((e) => `/exam-prep/exams/${e.slug}/`);

// When you buy a domain, change `site` to it (for example 'https://curioussparoows.com')
// and add the domain to public/CNAME. See docs/04-edit-pages-and-settings.md.
export default defineConfig({
  site: 'https://curioussparoows.com',
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', hi: 'hi' } }, filter: (page) => !page.includes('/thanks/') && !page.endsWith('/all/') && !page.includes('/blog/') && !hiddenExamPages.some((p) => page.endsWith(p)) }), sitemapNoindex()],
  // sitemapNoindex (after sitemap): removes every page whose robots tag says noindex, so Search Console shows no "Excluded by 'noindex' tag" errors.
  // Every script and stylesheet is a separate file (none written into the page), so the security policy below can stay the same
  // on every page: pages change without reloading (ClientRouter, for the continuous sound), and the policy of the first page then covers them all.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  security: {
    // Content Security Policy: the browser only runs scripts and loads content from the sources listed here.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://*.goatcounter.com https://i.ytimg.com",
        "font-src 'self'",
        "connect-src 'self' https://formspree.io https://*.goatcounter.com",
        "frame-src 'self' https://giscus.app https://cal.com https://www.youtube-nocookie.com",
        "form-action 'self' https://formspree.io https://buttondown.com",
        "base-uri 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", 'https://giscus.app', 'https://gc.zgo.at'],
      },
    },
  },
});
