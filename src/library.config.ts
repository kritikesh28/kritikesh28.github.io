// The Curious Sparoows Library: how it is organised.
// Guide: docs/13-add-to-the-library.md
//
// Forest = the whole library
//   Tree   = a big subject, one per theme in site.config.ts (like a course)
//     Branch = one area of it        (like a module)
//       Twig = one question-led topic (like a chapter); its pages live in src/content/library/<twig>/
//         Leaf = one 2-minute page    (like a lesson)

import { CATEGORIES, type CategorySlug } from './site.config';

export const LEVELS = [
  { name: 'Forest', means: 'The whole library', like: 'the whole university', example: 'Curious Sparoows Library' },
  { name: 'Tree', means: 'A big subject', like: 'a course', example: 'Geography & Earth' },
  { name: 'Branch', means: 'One area of that subject', like: 'a module', example: 'Earth & Universe' },
  { name: 'Twig', means: 'One topic, told as a short series', like: 'a chapter', example: 'The Universe' },
  { name: 'Leaf', means: 'One page, one question, about 2 minutes', like: 'a lesson', example: 'Is space really empty?' },
] as const;

export type Status = 'live' | 'next' | 'planned';

export interface Twig {
  slug: string; // web address: /library/<slug>/ ; must match the folder in src/content/library/
  title: string;
  question: string; // the curious question the whole twig answers
  status: Status;
}
export interface Branch { slug: string; title: string; twigs: Twig[] }
export interface Tree { slug: string; title: string; short: string; blurb: string; branches: Branch[] }

// The trees ARE the six themes in src/site.config.ts (CATEGORIES): one map for the whole site.
// Long reads (the longer articles in src/content/blog/) appear on their tree by their `category`.
// To add a twig: add a line under its branch, then make its folder of pages. Planned twigs show as "not written yet".
const BRANCHES: Record<CategorySlug, Branch[]> = {
  'geography-earth': [
    {
      slug: 'earth-and-universe',
      title: 'Earth & Universe',
      twigs: [
        { slug: 'the-universe', title: 'The Universe', question: 'Where did everything come from?', status: 'live' },
        { slug: 'how-earth-formed', title: 'How the Earth formed', question: 'How did a cloud of dust become our planet?', status: 'next' },
        { slug: 'inside-the-earth', title: 'Inside the Earth', question: 'What is under our feet, all the way down?', status: 'planned' },
      ],
    },
  ],
  'ai-ml': [
    {
      slug: 'ai-basics',
      title: 'AI basics',
      twigs: [{ slug: 'how-machines-learn', title: 'How machines learn', question: 'How can numbers learn to recognise a cat?', status: 'planned' }],
    },
  ],
  'exam-prep': [
    {
      slug: 'rajasthan-geography',
      title: 'Rajasthan geography',
      twigs: [{ slug: 'rajasthan-landforms', title: 'Landforms of Rajasthan', question: 'Why is one state home to both a desert and the oldest mountains in India?', status: 'planned' }],
    },
  ],
  'mind-ideas': [
    {
      slug: 'how-we-learn',
      title: 'How we learn',
      twigs: [{ slug: 'why-curiosity', title: 'Why we are curious', question: 'Why does a question we cannot answer bother us so much?', status: 'planned' }],
    },
  ],
  'stories-films': [
    {
      slug: 'sparrow-stories',
      title: 'Sparrow stories',
      twigs: [{ slug: 'curious-sparrows-stories', title: 'The Curious Sparrows', question: 'What happens when two sparrows ask "why?" about everything?', status: 'planned' }],
    },
  ],
  'life-skills': [
    {
      slug: 'grow-and-make',
      title: 'Grow and make',
      twigs: [{ slug: 'gardening-from-zero', title: 'Gardening from zero', question: 'How does a seed know which way is up?', status: 'planned' }],
    },
  ],
};

export const TREES: Tree[] = CATEGORIES.map((c) => ({ slug: c.slug, title: c.label, short: c.short, blurb: c.blurb, branches: BRANCHES[c.slug] }));

export const findTree = (slug: string) => TREES.find((t) => t.slug === slug);

export const findTwig = (slug: string) => {
  for (const tree of TREES)
    for (const branch of tree.branches)
      for (const twig of branch.twigs) if (twig.slug === slug) return { tree, branch, twig };
  return undefined;
};

// What is being built, shown on the library page so readers (and I) can see the honest status.
export const BUILD_STATUS: { name: string; status: 'live' | 'in-progress' | 'planned'; note: string }[] = [
  { name: 'The Universe (12 Leaves)', status: 'live', note: 'The first full twig of the library.' },
  { name: 'Search that never leaves you empty-handed', status: 'live', note: 'Shows the closest pages even when nothing matches exactly.' },
  { name: 'Reading progress', status: 'live', note: 'Ticks off the Leaves you finish, saved only in your browser.' },
  { name: 'Search suggestions as you type', status: 'live', note: 'Suggests real page titles while you type, and offers "Did you mean" for typos.' },
  { name: 'How the Earth formed', status: 'in-progress', note: 'The next twig, being written now.' },
  { name: 'Sparrow, the AI study assistant', status: 'planned', note: 'Will answer your questions using only this library, and always link the page it used. Not built yet.' },
];
