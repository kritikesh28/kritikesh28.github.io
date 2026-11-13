// Explore: the 12 Encyclopedic Indexes as website pages. Guide: docs/16-explore.md
// The data in src/data/explore/ is made by tools/explore/build_explore.py from the booklet part files.
// Do not edit the JSON by hand: change the part files in tools/explore/source/<topic>/ and run the script.

import indexJson from './data/explore/index.json';

export type Media =
  | { type: 'image'; src: string; alt: string; caption?: string; credit?: string }
  | { type: 'video'; youtube: string; title: string; caption?: string; credit?: string };

export type Entry = { id: string; name: string };
export type Section = {
  id: string; title: string; url: string; html: string; entries: Entry[]; words: number; summary: string; media: Media[];
};
export type Part = { num: number; title: string; intro: string; sections: Section[] };
export type Cover = { src: string; alt: string; credit?: string } | null;
export type TopicSummary = {
  slug: string; code: string; short: string; shelf: ShelfId; order: number; title: string; subtitle: string; edition: string;
  color1: string; color2: string; light: string; question: string; entries: number; words: number; sections: number;
  cover: Cover; url: string; leaves: { id: string; title: string; url: string }[];
};
export type Topic = TopicSummary & { tagline: string; pdf: string; pdfMB: number | null; parts: Part[] };

export type ShelfId = 'stories' | 'living' | 'how' | 'needle';
export const SHELVES: { id: ShelfId; title: string; blurb: string }[] = [
  { id: 'stories', title: 'Stories and Sound', blurb: 'Films, books, music and the instruments that make it.' },
  { id: 'living', title: 'Living Well', blurb: 'Food, gardens and play: the arts of everyday life.' },
  { id: 'how', title: 'How Things Work', blurb: 'From the first stone tool to the phone in your hand.' },
  { id: 'needle', title: 'Needle Arts', blurb: 'Crochet, knitting, embroidery and sewing: one thread, four crafts.' },
];

export const TOPICS = indexJson as unknown as TopicSummary[];

const files = import.meta.glob<Topic>('./data/explore/*.json', { eager: true, import: 'default' });
export function getTopic(slug: string): Topic {
  const t = files[`./data/explore/${slug}.json`];
  if (!t) throw new Error(`Explore: no data for "${slug}". Run python3 -I tools/explore/build_explore.py`);
  return t;
}
export const topicsIn = (shelf: ShelfId) => TOPICS.filter((t) => t.shelf === shelf);

/** about 200 words a minute, at least one */
export const minutes = (words: number) => Math.max(1, Math.round(words / 200));

/** "SEW-00.03" -> true: the short question pages of Part 0 */
export const isLeaf = (id: string) => /-00\.\d+$/.test(id);

/** The address part after /explore/<topic>/ */
export const sectionSlug = (s: Section) => s.url.split('/').filter(Boolean).at(-1)!;

/** Every Section of a topic in reading order, with its Part */
export const flatSections = (t: Topic) => t.parts.flatMap((p) => p.sections.map((s) => ({ ...s, part: p })));
