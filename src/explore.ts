// Explore: the 12 Encyclopedic Indexes as website pages. Guide: docs/16-explore.md
// The data in src/data/explore/ is made by tools/explore/build_explore.py from the booklet part files.
// Do not edit the JSON by hand: change the part files in tools/explore/source/<topic>/ and run the script.

import indexJson from './data/explore/index.json';
import indexHiJson from './data/explore/hi/index.json';

export type Media =
  | { type: 'image'; src: string; alt: string; caption?: string; credit?: string }
  | { type: 'video'; youtube: string; title: string; caption?: string; credit?: string };

export type Entry = { id: string; name: string };
/** One web page of a Section: two to three minutes of reading. Long Sections have several (made by build_explore.py). */
export type Page = { html: string; words: number; heads: string[]; summary: [string, string][]; cont?: string };
export type Section = {
  id: string; title: string; url: string; pages: Page[]; entries: Entry[]; words: number; summary: string; media: Media[];
};
export type Part = { num: number; title: string; intro: string; sections: Section[] };
export type Cover = { src: string; alt: string; credit?: string } | null;
export type TopicSummary = {
  slug: string; code: string; short: string; shelf: ShelfId; order: number; title: string; subtitle: string; edition: string;
  color1: string; color2: string; light: string; question: string; entries: number; words: number; sections: number;
  cover: Cover; url: string; leaves: { id: string; title: string; url: string }[];
};
export type Topic = TopicSummary & { tagline: string; parts: Part[]; hiText?: boolean };

export type ShelfId = 'stories' | 'living' | 'how' | 'needle';
export const SHELVES: { id: ShelfId; title: string; blurb: string }[] = [
  { id: 'stories', title: 'Stories and Sound', blurb: 'Films, books, music and the instruments that make it.' },
  { id: 'living', title: 'Living Well', blurb: 'Food, gardens and play: the arts of everyday life.' },
  { id: 'how', title: 'How Things Work', blurb: 'From the first stone tool to the phone in your hand.' },
  { id: 'needle', title: 'Needle Arts', blurb: 'Crochet, knitting, embroidery and sewing: one thread, four crafts.' },
];

export const TOPICS = indexJson as unknown as TopicSummary[];

const files = import.meta.glob<Topic>('./data/explore/*.json', { eager: true, import: 'default' });
// Hindi shelves (tools/explore/source/<topic>/hi/, same IDs and the same page cuts as the English)
const filesHi = import.meta.glob<Topic>('./data/explore/hi/*.json', { eager: true, import: 'default' });
export const TOPICS_HI = indexHiJson as unknown as TopicSummary[];
/** True when this shelf's text has been written in Hindi */
export const hasHindi = (slug: string) => `./data/explore/hi/${slug}.json` in filesHi;
/** A shelf's summary in the reader's language (English where the Hindi is not written yet) */
export const topicSummary = (slug: string, lang: string = 'en') =>
  (lang === 'hi' && TOPICS_HI.find((t) => t.slug === slug)) || TOPICS.find((t) => t.slug === slug)!;

/** A shelf in the reader's language: the Hindi text where it exists, otherwise the English (hiText tells which) */
export function getTopic(slug: string, lang: string = 'en'): Topic {
  if (lang === 'hi' && hasHindi(slug)) return { ...filesHi[`./data/explore/hi/${slug}.json`], hiText: true };
  const t = files[`./data/explore/${slug}.json`];
  if (!t) throw new Error(`Explore: no data for "${slug}". Run python3 -I tools/explore/build_explore.py`);
  return t;
}
export const topicsIn = (shelf: ShelfId) => TOPICS.filter((t) => t.shelf === shelf);

/** about 200 words a minute, at least one */
export const minutes = (words: number) => Math.max(1, Math.round(words / 200));

/** "SEW-00.03" -> true: the short question pages of Part 0 */
export const isLeaf = (id: string) => /-00\.\d+$/.test(id);

/** The address part after /library/<topic>/ */
export const sectionSlug = (s: Section) => s.url.split('/').filter(Boolean).at(-1)!;

/** Every Section of a topic in reading order, with its Part */
export const flatSections = (t: Topic) => t.parts.flatMap((p) => p.sections.map((s) => ({ ...s, part: p })));

/** Address of page n (counted from 0) of a Section: the first page keeps the Section's address, the rest add 2/, 3/ ... */
export const pageUrl = (s: Section, n: number) => (n === 0 ? s.url : `${s.url}${n + 1}/`);

/** Every web page of a topic in reading order */
export const flatPages = (t: Topic) =>
  flatSections(t).flatMap((s) => s.pages.map((pg, n) => ({ ...pg, n, of: s.pages.length, url: pageUrl(s, n), sec: s, part: s.part })));

/** What a page is about, in a few words: its headings, or "more of ..." for a page that carries on a long list */
export const pageLabel = (pg: Page, max = 2, lang: string = 'en') => {
  const hi = lang === 'hi';
  return pg.heads.length ? pg.heads.slice(0, max).join(', ') + (pg.heads.length > max ? (hi ? ` और ${pg.heads.length - max} अन्य` : ` and ${pg.heads.length - max} more`) : '')
    : pg.cont ? (hi ? `${pg.cont} (आगे)` : `${pg.cont}, continued`) : hi ? 'और' : 'More';
};

/** Every short page of every shelf, for the [...section] routes in both languages */
export const shelfPagePaths = () =>
  TOPICS.flatMap((ts) => {
    const t = getTopic(ts.slug);
    return flatPages(t).map((pg) => ({
      params: { topic: t.slug, section: pg.n === 0 ? sectionSlug(pg.sec) : `${sectionSlug(pg.sec)}/${pg.n + 1}` },
      props: { url: pg.url },
    }));
  });
