// Everything the site search can find, built fresh on every deploy. Used by /search/.
import { CURIOUS_QUESTIONS } from '../data/curious-questions';
import { TREES } from '../library.config';
import { categoryLabel } from '../site.config';
import { getLibraryPages, getPosts, getProjects, libraryUrl, plainText } from '../lib';

export async function GET() {
  const items: { t: string; d: string; u: string; k: string; w: string; b: string }[] = [];
  const twigTitle = (id: string) =>
    TREES.flatMap((t) => t.branches.flatMap((b) => b.twigs)).find((tw) => id.startsWith(`${tw.slug}/`))?.title ?? 'Library';

  for (const p of await getLibraryPages()) {
    const kind = p.data.kind === 'leaf' ? `Library · ${twigTitle(p.id)}` : p.data.kind === 'gateway' ? 'Library · course' : 'Library · recap';
    items.push({ t: p.data.title, d: p.data.answer ?? p.data.description, u: libraryUrl(p.id, p.data.kind), k: kind, w: p.data.keywords.join(' '), b: plainText(p.body).slice(0, 2500) });
  }
  for (const p of await getPosts())
    items.push({ t: p.data.title, d: p.data.description, u: `/library/read/${p.id}/`, k: `Long read · ${categoryLabel(p.data.category)}`, w: p.data.tags.join(' '), b: plainText(p.body).slice(0, 2500) });
  for (const p of await getProjects())
    items.push({ t: p.data.title, d: p.data.summary, u: `/portfolio/${p.id}/`, k: 'Project', w: p.data.tags.join(' '), b: plainText(p.body).slice(0, 1500) });
  for (const q of CURIOUS_QUESTIONS)
    items.push({ t: q.q, d: q.a, u: q.link ?? '', k: `Curious question · ${q.topic}`, w: q.topic, b: '' });
  for (const tree of TREES)
    items.push({ t: tree.title, d: tree.blurb, u: `/library/${tree.slug}/`, k: 'Library · subject', w: tree.branches.map((b) => b.title).join(' '), b: '' });
  for (const tree of TREES)
    for (const branch of tree.branches)
      for (const twig of branch.twigs)
        if (twig.status !== 'live') items.push({ t: twig.title, d: `${twig.question} Not written yet; it is on the library's plan.`, u: `/library/${tree.slug}/`, k: 'Library · planned', w: `${tree.title} ${branch.title}`, b: '' });
  items.push(
    { t: 'About Kritikesh', d: 'Who writes Curious Sparoows: background, skills and interests.', u: '/about/', k: 'Page', w: 'about author geography geology ai teacher', b: '' },
    { t: 'Portfolio', d: 'Applied AI, data and GIS projects.', u: '/portfolio/', k: 'Page', w: 'projects work ai data gis qgis', b: '' },
    { t: 'Contact', d: 'Write to me, or suggest a question for the library.', u: '/contact/', k: 'Page', w: 'contact email suggest question', b: '' },
    { t: 'The Library', d: 'Every course and question in the library.', u: '/library/', k: 'Page', w: 'library courses learn topics', b: '' },
  );
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
