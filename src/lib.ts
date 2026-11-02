import { getCollection } from 'astro:content';
import { DEFAULT_LANG, LANGS, isLang, localizePath, type Lang } from './i18n/config';

// ---- Languages for posts, projects and library pages (guide: docs/15-languages-and-hindi.md)
// English files sit where they always did. A translation sits in a folder named after its language,
// with the same path inside it: src/content/library/hi/the-universe/what-is-dark-matter.md
// translates src/content/library/the-universe/what-is-dark-matter.md.

/** The language of an entry, from its folder: 'hi/the-universe/x' -> 'hi' */
export const entryLang = (id: string): Lang => {
  const first = id.split('/')[0];
  return isLang(first) && first !== DEFAULT_LANG && id.includes('/') ? first : DEFAULT_LANG;
};
/** The shared id of all translations of an entry: 'hi/the-universe/x' -> 'the-universe/x' */
export const baseId = (id: string) => (entryLang(id) === DEFAULT_LANG ? id : id.split('/').slice(1).join('/'));

/** An entry as shown in one language. `slug` is its address; `fallback` is true when no translation exists yet and English is shown. */
export type Localized<T> = T & { slug: string; lang: Lang; fallback: boolean };

/** For each entry, the version in `lang` if there is one, otherwise the English one. Entries that only exist in `lang` are included too. */
export function localize<T extends { id: string }>(entries: T[], lang: Lang): Localized<T>[] {
  const byBase = new Map<string, Localized<T>>();
  for (const e of entries) {
    const l = entryLang(e.id);
    const slug = baseId(e.id);
    if (l === lang) byBase.set(slug, { ...e, slug, lang: l, fallback: false });
    else if (l === DEFAULT_LANG && !byBase.has(slug)) byBase.set(slug, { ...e, slug, lang: l, fallback: lang !== DEFAULT_LANG });
  }
  return [...byBase.values()];
}

/** The languages an entry is really written in (not counting English shown as a stand-in) */
export async function translatedLangs(collection: 'blog' | 'projects' | 'library', slug: string): Promise<Lang[]> {
  const all = await getCollection(collection, ({ data }) => !data.draft);
  return LANGS.filter((l) => all.some((e) => baseId(e.id) === slug && entryLang(e.id) === l));
}

export async function getPosts(lang: Lang = DEFAULT_LANG) {
  const posts = localize(await getCollection('blog', ({ data }) => !data.draft), lang);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(lang: Lang = DEFAULT_LANG) {
  const projects = localize(await getCollection('projects', ({ data }) => !data.draft), lang);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\p{L}\p{M}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

// Library: pages of one twig in reading order (gateway, leaves, recap)
export async function getTwigPages(twig: string, lang: Lang = DEFAULT_LANG) {
  const pages = (await getLibraryPages(lang)).filter((p) => p.slug.startsWith(`${twig}/`));
  return pages.sort((a, b) => a.data.order - b.data.order);
}

export async function getLibraryPages(lang: Lang = DEFAULT_LANG) {
  return localize(await getCollection('library', ({ data }) => !data.draft), lang);
}

// 'the-universe/is-space-really-empty' (or 'hi/the-universe/...') -> { twig: 'the-universe', slug: 'is-space-really-empty' }
export const splitLibraryId = (id: string) => {
  const [twig, slug] = baseId(id).split('/');
  return { twig, slug };
};

export const libraryUrl = (id: string, kind: string, lang: Lang = DEFAULT_LANG) => {
  const { twig, slug } = splitLibraryId(id);
  return localizePath(kind === 'gateway' ? `/library/${twig}/` : `/library/${twig}/${slug}/`, lang);
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
