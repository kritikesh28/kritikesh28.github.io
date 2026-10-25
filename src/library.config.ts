// The Curious Sparoows Library: how it is organised.
// Guide: docs/13-add-to-the-library.md
//
// Forest = the whole library
//   Tree   = a big subject            (like a course)
//     Branch = one area of it        (like a module)
//       Twig = one question-led topic (like a chapter); its pages live in src/content/library/<twig>/
//         Leaf = one 2-minute page    (like a lesson)

export const LEVELS = [
  { name: 'Forest', icon: '🌳', means: 'The whole library', like: 'the whole university', example: 'Curious Sparoows Library' },
  { name: 'Tree', icon: '🌲', means: 'A big subject', like: 'a course', example: 'Geography & Earth' },
  { name: 'Branch', icon: '🌿', means: 'One area of that subject', like: 'a module', example: 'Earth & Universe' },
  { name: 'Twig', icon: '🪴', means: 'One topic, told as a short series', like: 'a chapter', example: 'The Universe' },
  { name: 'Leaf', icon: '🍃', means: 'One page, one question, about 2 minutes', like: 'a lesson', example: 'Is space really empty?' },
] as const;

export type Status = 'live' | 'next' | 'planned';

export interface Twig {
  slug: string; // web address: /library/<slug>/ ; must match the folder in src/content/library/
  title: string;
  question: string; // the curious question the whole twig answers
  status: Status;
}
export interface Branch { slug: string; title: string; twigs: Twig[] }
export interface Tree { slug: string; title: string; blurb: string; branches: Branch[] }

// To add a twig: add a line here, then make its folder of pages. Planned twigs show as "not written yet".
export const TREES: Tree[] = [
  {
    slug: 'geography-earth',
    title: 'Geography & Earth',
    blurb: 'From the birth of the Universe to the ground under your feet.',
    branches: [
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
  },
  {
    slug: 'ai-ml',
    title: 'AI & ML',
    blurb: 'How machines learn, explained from zero.',
    branches: [
      {
        slug: 'ai-basics',
        title: 'AI basics',
        twigs: [{ slug: 'how-machines-learn', title: 'How machines learn', question: 'How can numbers learn to recognise a cat?', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'mind-ideas',
    title: 'Philosophy & Psychology',
    blurb: 'Big questions about the mind, linked with the sciences.',
    branches: [
      {
        slug: 'how-we-learn',
        title: 'How we learn',
        twigs: [{ slug: 'why-curiosity', title: 'Why we are curious', question: 'Why does a question we cannot answer bother us so much?', status: 'planned' }],
      },
    ],
  },
];

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
  { name: 'How the Earth formed', status: 'in-progress', note: 'The next twig, being written now.' },
  { name: 'Sparrow, the AI study assistant', status: 'planned', note: 'Will answer your questions using only this library, and always link the page it used. Not built yet.' },
];
