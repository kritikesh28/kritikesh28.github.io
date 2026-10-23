import type { APIContext } from 'astro';

// Search engines and AI assistants are welcome to read and cite everything public here.
export function GET({ site }: APIContext) {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /thanks/',
    '',
    '# AI assistants and AI search may read and cite this site',
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'].flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${new URL('/sitemap-index.xml', site)}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
