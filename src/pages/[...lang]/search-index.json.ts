// Everything the site search can find, built fresh on every deploy, once per language
// (/search-index.json for English, /hi/search-index.json for Hindi). Used by /search/ and the search boxes.
import type { GetStaticPaths, APIContext } from 'astro';
import { getQuestions } from '../../data/curious-questions';
import { getTrees } from '../../library.config';
import { categoryLabel } from '../../site.config';
import { getLibraryPages, getPosts, getProjects, libraryUrl, plainText } from '../../lib';
import { langFromPath, langParams, localizePath, pick } from '../../i18n/config';
import { useT } from '../../i18n/ui';

export const getStaticPaths: GetStaticPaths = () => langParams().map((params) => ({ params }));

export async function GET({ url }: APIContext) {
  const lang = langFromPath(url.pathname);
  const t = useT(lang);
  const L = (p: string) => localizePath(p, lang);
  const trees = getTrees(lang);
  const items: { t: string; d: string; u: string; k: string; w: string; b: string }[] = [];
  const twigTitle = (id: string) =>
    trees.flatMap((tr) => tr.branches.flatMap((b) => b.twigs)).find((tw) => id.startsWith(`${tw.slug}/`))?.title ?? t('nav.library');

  for (const p of await getLibraryPages(lang)) {
    const kind = p.data.kind === 'leaf' ? t('search.kind.leaf', { twig: twigTitle(p.slug) }) : p.data.kind === 'gateway' ? t('search.kind.course') : t('search.kind.recap');
    items.push({ t: p.data.title, d: p.data.answer ?? p.data.description, u: libraryUrl(p.slug, p.data.kind, lang), k: kind, w: p.data.keywords.join(' '), b: plainText(p.body).slice(0, 2500) });
  }
  for (const p of await getPosts(lang))
    items.push({ t: p.data.title, d: p.data.description, u: L(`/library/read/${p.slug}/`), k: t('search.kind.longRead', { cat: categoryLabel(p.data.category, lang) }), w: p.data.tags.join(' '), b: plainText(p.body).slice(0, 2500) });
  for (const p of await getProjects(lang))
    items.push({ t: p.data.title, d: p.data.summary, u: L(`/portfolio/${p.slug}/`), k: t('search.kind.project'), w: p.data.tags.join(' '), b: plainText(p.body).slice(0, 1500) });
  for (const q of getQuestions(lang))
    items.push({ t: q.q, d: q.a, u: q.link ?? '', k: t('search.kind.question', { topic: q.topic }), w: q.topic, b: '' });
  for (const tree of trees)
    items.push({ t: tree.title, d: tree.blurb, u: L(`/library/${tree.slug}/`), k: t('search.kind.subject'), w: tree.branches.map((b) => b.title).join(' '), b: '' });
  for (const tree of trees)
    for (const branch of tree.branches)
      for (const twig of branch.twigs)
        if (twig.status !== 'live') items.push({ t: twig.title, d: t('search.notWritten', { q: twig.question }), u: L(`/library/${tree.slug}/`), k: t('search.kind.planned'), w: `${tree.title} ${branch.title}`, b: '' });
  const pages = pick({
    en: [
      { t: 'About Kritikesh', d: 'Who writes Curious Sparoows: background, skills and interests.', u: '/about/', w: 'about author geography geology ai teacher' },
      { t: 'Portfolio', d: 'Applied AI, data and GIS projects.', u: '/portfolio/', w: 'projects work ai data gis qgis' },
      { t: 'Contact', d: 'Write to me, or suggest a question for the library.', u: '/contact/', w: 'contact email suggest question' },
      { t: 'The Library', d: 'Every course and question in the library.', u: '/library/', w: 'library courses learn topics' },
    ],
    hi: [
      { t: 'कृतिकेश के बारे में', d: 'Curious Sparoows कौन लिखता है: पढ़ाई, हुनर और शौक।', u: '/about/', w: 'परिचय लेखक भूगोल भूविज्ञान AI शिक्षक about' },
      { t: 'मेरा काम (पोर्टफ़ोलियो)', d: 'AI, डेटा और GIS (कंप्यूटर पर नक्शे) के प्रोजेक्ट।', u: '/portfolio/', w: 'प्रोजेक्ट काम AI डेटा नक्शा GIS QGIS portfolio' },
      { t: 'संपर्क', d: 'मुझे लिखिए, या लाइब्रेरी के लिए कोई सवाल सुझाइए।', u: '/contact/', w: 'संपर्क ईमेल सुझाव सवाल contact' },
      { t: 'लाइब्रेरी', d: 'लाइब्रेरी के सारे कोर्स और सवाल।', u: '/library/', w: 'लाइब्रेरी कोर्स पढ़ाई सीखें विषय library' },
    ],
  }, lang);
  for (const p of pages) items.push({ ...p, u: L(p.u), k: t('search.kind.page'), b: '' });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
