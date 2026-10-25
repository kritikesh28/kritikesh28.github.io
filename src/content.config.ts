import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site.config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'hi']).default('en'),
    // Drafts are never published. Set to false when the post is ready.
    draft: z.boolean().default(false),
    // true shows a short note that an AI tool helped write the post
    aiAssisted: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    status: z.enum(['live', 'in-progress', 'planned']),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    // Lower numbers appear first
    order: z.number().default(100),
    // true embeds the live NYC taxi demo on the project page
    demo: z.boolean().default(false),
    aiAssisted: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Library pages: one folder per twig in src/content/library/. Guide: docs/13-add-to-the-library.md
const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    // A leaf's title is the question it answers, written the way people search for it
    title: z.string(),
    description: z.string(),
    kind: z.enum(['gateway', 'leaf', 'recap']).default('leaf'),
    // Reading order inside the twig: gateway 0, leaves 1, 2, 3..., recap last
    order: z.number(),
    // The answer in one or two sentences, shown at the top so nobody has to hunt for it
    answer: z.string().optional(),
    // One honest line that sets up the next leaf's question
    nextHook: z.string().optional(),
    // Gateway only: what the reader will be able to do by the end
    outcomes: z.array(z.string()).default([]),
    // Words people really search for; they help the site search and search engines
    keywords: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    aiAssisted: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, library };
