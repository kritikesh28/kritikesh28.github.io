import type { APIContext } from 'astro';
import { SITE, SOCIALS, CATEGORIES } from '../site.config';
import { getPosts, getProjects, getLibraryPages, libraryUrl } from '../lib';
import { EXAM_PAGES, SUBJECTS, STATS, examTitle } from '../exam-prep';

// A plain summary for AI assistants (the llms.txt convention), built from the same data as the site.
export async function GET({ site }: APIContext) {
  const url = (p: string) => new URL(p, site).href;
  const projects = await getProjects();
  const posts = await getPosts();
  const library = (await getLibraryPages()).filter((p) => p.data.kind !== 'gateway').sort((a, b) => a.id.localeCompare(b.id) || a.data.order - b.data.order);
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
    `- [Library](${url('/library/')}): short question-led courses; each page answers one question in about two minutes`,
    `- [Now](${url('/now/')}): current work`,
    `- [Contact](${url('/contact/')})`,
    '',
    '## Exam Prep (free, for RPSC, RSSB and other government exam aspirants)',
    `- [Exam Prep](${url('/exam-prep/')}): why preparation feels overwhelming, and two free tools that help, in short Q&A`,
    `- [Exhaustive Curriculum Index](${url('/exam-prep/curriculum-index/')}): ${STATS.topics} topics of ${STATS.subjects} exam subjects in one searchable, typo-tolerant map`,
    `- [Exam Guide](${url('/exam-prep/exam-guide/')}): pick an exam and the time left; get topics ranked by ${STATS.questions} past questions from ${STATS.papers} RPSC and RSSB papers`,
    `- [How the ranking works](${url('/exam-prep/exam-guide/how-it-works/')}): method, papers used and limits`,
    `- [Most asked topics, exam by exam](${url('/exam-prep/exams/')})`,
    ...EXAM_PAGES.filter((e) => !e.langOnly).map((e) => `- [${examTitle(e)}: most asked topics](${url(`/exam-prep/exams/${e.slug}/`)}): ${e.papers ? `from ${e.papers} past paper(s), ${e.years}` : 'from the syllabus and related papers'}; top topics: ${e.top.slice(0, 3).map((t) => t.t).join(', ')}`),
    ...SUBJECTS.map((sub) => `- [${sub.name} syllabus, all topics](${url(`/exam-prep/curriculum-index/${sub.slug}/`)}): ${sub.blurb}`),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.data.title}](${url(`/portfolio/${p.id}/`)}): ${p.data.summary} (status: ${p.data.status})`),
    '',
    '## Library subjects (trees)',
    ...CATEGORIES.map((c) => `- [${c.label}](${url(`/library/${c.slug}/`)}): ${c.blurb}`),
    '',
    '## Library pages',
    ...library.sort((a, b) => a.data.order - b.data.order).map((p) => `- [${p.data.title}](${url(libraryUrl(p.id, p.data.kind))}): ${p.data.answer ?? p.data.description}`),
    ...(posts.length ? ['', '## Long reads', ...posts.map((p) => `- [${p.data.title}](${url(`/library/read/${p.id}/`)}): ${p.data.description}`)] : []),
    '',
    '## Profiles',
    ...SOCIALS.map((s) => `- [${s.label}](${s.href})`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
