import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getPosts } from '../lib';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.blogBrand} by ${SITE.name}`,
    description: SITE.tagline,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
