// The Curriculum Index search data in every language except English (English is the static
// public/exam-prep/search.json). Each row keeps its English title as extra search words, so a
// Hindi reader can also type "mughal" or "monsoon". Guide: docs/15-languages-and-hindi.md, part 6.
import fs from 'node:fs';
import { LANGS, DEFAULT_LANG, type Lang } from '../../../i18n/config';
import { subjectsIn, tt } from '../../../exam-prep';

export const getStaticPaths = () => LANGS.filter((l) => l !== DEFAULT_LANG).map((lang) => ({ params: { lang } }));

export function GET({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const src = JSON.parse(fs.readFileSync('public/exam-prep/search.json', 'utf-8')) as { s: [string, string, string][]; r: [string, string, number, number, number?][] };
  const subs = subjectsIn(lang);
  const s = src.s.map(([slug, name, prefix]) => [slug, subs.find((x) => x.slug === slug)?.name ?? name, prefix]);
  const r = src.r.map(([id, t, si, lvl, q]) => {
    const h = tt(id, t, lang);
    return h === t ? [id, t, si, lvl, q ?? 0] : [id, h, si, lvl, q ?? 0, t];
  });
  return new Response(JSON.stringify({ s, r }), { headers: { 'Content-Type': 'application/json' } });
}
