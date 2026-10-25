// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// When you buy a domain, change `site` to it (for example 'https://curioussparoows.com')
// and add the domain to public/CNAME. See docs/04-edit-pages-and-settings.md.
export default defineConfig({
  site: 'https://curioussparoows.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks/') && !page.endsWith('/all/') && !page.includes('/blog/') })],
  security: {
    // Content Security Policy: the browser only runs scripts and loads content from the sources listed here.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://*.goatcounter.com",
        "font-src 'self'",
        "connect-src 'self' https://formspree.io https://*.goatcounter.com",
        "frame-src 'self' https://giscus.app https://cal.com",
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
