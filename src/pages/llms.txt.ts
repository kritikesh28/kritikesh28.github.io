import type { APIContext } from 'astro';
import { SITE, SOCIALS, CATEGORIES } from '../site.config';
import { getPosts, getProjects } from '../lib';

// A plain summary for AI assistants (the llms.txt convention), built from the same data as the site.
export async function GET({ site }: APIContext) {
  const url = (p: string) => new URL(p, site).href;
  const projects = await getProjects();
  const posts = await getPosts();
  const lines = [
    `# ${SITE.name} · ${SITE.blogBrand}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is based in ${SITE.location}. Education: B.Sc. (Hons.) Geology, Hansraj College, University of Delhi (2018 to 2021); M.Sc. Geography, IGNOU (2023 to 2026); Executive Post Graduate Programme in Applied AI and Agentic AI, IIIT Bangalore with upGrad (2026 to 2027, ongoing). "${SITE.blogBrand}" (spelled with two o's on purpose) is the name of the blog.`,
    '',
    '## Main pages',
    `- [About](${url('/about/')}): background, skills and interests`,
    `- [Portfolio](${url('/portfolio/')}): data, AI and GIS projects`,
    `- [Blog](${url('/blog/')}): explainers by theme`,
    `- [Now](${url('/now/')}): current work`,
    `- [Contact](${url('/contact/')})`,
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.data.title}](${url(`/portfolio/${p.id}/`)}): ${p.data.summary} (status: ${p.data.status})`),
    '',
    '## Blog themes',
    ...CATEGORIES.map((c) => `- [${c.label}](${url(`/blog/category/${c.slug}/`)}): ${c.blurb}`),
    ...(posts.length ? ['', '## Posts', ...posts.map((p) => `- [${p.data.title}](${url(`/blog/${p.id}/`)}): ${p.data.description}`)] : []),
    '',
    '## Profiles',
    ...SOCIALS.map((s) => `- [${s.label}](${s.href})`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
