import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getPosts, getLibraryPages, libraryUrl } from '../lib';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const pages = (await getLibraryPages()).filter((p) => p.data.kind !== 'recap');
  return rss({
    title: `${SITE.blogBrand} by ${SITE.name}`,
    description: SITE.tagline,
    site: context.site!,
    items: [
      ...posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: `/library/read/${post.id}/` })),
      ...pages.map((p) => ({ title: p.data.title, description: p.data.answer ?? p.data.description, pubDate: p.data.date, link: libraryUrl(p.id, p.data.kind) })),
    ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
}
