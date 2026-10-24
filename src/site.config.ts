// Every setting you are likely to change lives in this one file.

export const SITE = {
  // Header name (professional front door, decision D-01)
  name: 'Kritikesh Rajpurohit',
  // Blog brand (education front door). The spelling is deliberate.
  blogBrand: 'Curious Sparoows',
  motto: "Two o's, two sparrows: curiosity is better shared.",
  tagline: 'Curious, without end. Notes on AI, the Earth and everything in between.',
  description:
    'Curious Sparoows: explainers on AI, geography and ideas that start from the basics, with applied AI and data projects and QGIS maps by Kritikesh Rajpurohit.',
  jobTitle: 'Applied AI learner, geographer and teacher',
  location: 'Rawatbhata, Rajasthan (near Kota), India',
  email: 'hello@curioussparoows.com',
  // Free form at formspree.io; paste its URL here. Until then the contact form opens the visitor's email app.
  formspreeUrl: 'https://formspree.io/f/myeezyqv',
  // A booking page such as 'https://cal.com/kritikesh/20min'. Leave empty to hide the "Book a call" button.
  calUrl: '',
  // Newsletter form action from buttondown.com, e.g. 'https://buttondown.com/api/emails/embed-subscribe/curioussparoows'
  newsletterAction: '',
  resumePdf: '/Kritikesh_Rajpurohit_Resume.pdf',
  // Visitor stats: after signing up at goatcounter.com, put your code here (for example 'kritikesh')
  goatcounterCode: 'curioussparoows',
  // Comments: fill these from giscus.app after enabling Discussions on the repo (see UPLOAD_STEPS.md)
  giscus: { repo: '', repoId: '', category: 'Announcements', categoryId: '' },
  // Search engine ownership checks: paste only the content="..." value each tool gives you
  googleSiteVerification: 'nPlIXiEQqkySyR-eDcXyhy2FiriMLtYYU2ZWRR5z8BE',
  bingSiteVerification: '',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kritikesh-rajpurohit-6b3043195' },
  { label: 'GitHub', href: 'https://github.com/kritikesh28' },
  { label: 'Hugging Face', href: 'https://huggingface.co/kritikesh28' },
];

// Main blog categories. A post picks exactly one; add any number of free tags on top.
// To add a category, add a line here; the slug becomes its web address.
export const CATEGORIES = [
  { slug: 'ai-ml', label: 'AI & ML', short: 'AI', blurb: 'Projects, notes and experiments in applied AI and data.' },
  { slug: 'geography-earth', label: 'Geography & Earth', short: 'Earth', blurb: 'Landforms, maps, GIS, rivers, people and places.' },
  { slug: 'exam-prep', label: 'Exam Prep', short: 'Exams', blurb: 'UPSC, RAS and UGC-NET notes, explained from the basics.' },
  { slug: 'mind-ideas', label: 'Philosophy & Psychology', short: 'Mind', blurb: 'Big questions, linked with the sciences.' },
  { slug: 'stories-films', label: 'Stories & Films', short: 'Stories', blurb: 'Story writing, film notes and the Curious Sparoows.' },
  { slug: 'life-skills', label: 'Life & Skills', short: 'Life', blurb: 'Gardening, cooking, sketching and learning new things.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

// Small true facts the sparrows share when clicked
export const CURIOUS_FACTS = [
  'Light from the Sun takes about 8 minutes to reach Earth.',
  'The Aravalli range is one of the oldest fold mountain ranges on Earth.',
  'A neural network learns by nudging millions of numbers a tiny bit at a time.',
  'Sparrows take dust baths to keep their feathers clean.',
  'World Sparrow Day is on 20 March.',
  "Some of Earth's oldest known rocks are about 4 billion years old.",
  'Brahmagupta wrote rules for calculating with zero in 628 CE.',
  "Your brain uses about a fifth of your body's energy.",
  'New York taxis are busiest at 6 pm, not midnight. I checked.',
  'Curiosity is better shared. That is why there are two of us.',
];
