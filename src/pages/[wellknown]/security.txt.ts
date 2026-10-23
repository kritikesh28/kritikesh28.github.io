import type { APIContext } from 'astro';
import { SITE } from '../../site.config';

// Served at /.well-known/security.txt (a folder name GitHub's upload page can skip, hence the [wellknown] trick).
// RFC 9116: tells security researchers how to report a problem. Expires one year after each build.
export function getStaticPaths() {
  return [{ params: { wellknown: '.well-known' } }];
}

export function GET({ site }: APIContext) {
  const expires = new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 19) + 'Z';
  const body = [
    `Contact: mailto:${SITE.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en, hi',
    `Canonical: ${new URL('/.well-known/security.txt', site)}`,
    `Policy: ${new URL('/privacy/', site)}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
