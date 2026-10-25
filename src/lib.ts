import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

// Library: pages of one twig in reading order (gateway, leaves, recap)
export async function getTwigPages(twig: string) {
  const pages = await getCollection('library', ({ id, data }) => !data.draft && id.startsWith(`${twig}/`));
  return pages.sort((a, b) => a.data.order - b.data.order);
}

export async function getLibraryPages() {
  return getCollection('library', ({ data }) => !data.draft);
}

// 'the-universe/is-space-really-empty' -> { twig: 'the-universe', slug: 'is-space-really-empty' }
export const splitLibraryId = (id: string) => {
  const [twig, slug] = id.split('/');
  return { twig, slug };
};

export const libraryUrl = (id: string, kind: string) => {
  const { twig, slug } = splitLibraryId(id);
  return kind === 'gateway' ? `/library/${twig}/` : `/library/${twig}/${slug}/`;
};

// Rough reading time at 200 words a minute, never less than one minute
export const readMinutes = (text = '') => Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));

// Markdown to plain text, good enough for search and summaries
export const plainText = (md = '') =>
  md
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
