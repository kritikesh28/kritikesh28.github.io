// The Exam Guide data in every language except English (English is public/exam-prep/guide.json).
// Same numbers; only subject names, exam names and topic titles change. Guide: docs/15-languages-and-hindi.md
import fs from 'node:fs';
import { LANGS, DEFAULT_LANG, type Lang } from '../../../i18n/config';
import { subjectsIn, tt, EXAM_HI } from '../../../exam-prep';

export const getStaticPaths = () => LANGS.filter((l) => l !== DEFAULT_LANG).map((lang) => ({ params: { lang } }));

type Exam = { gov: string; agency: string; bank: string; name: string; key: string; alias: string };
export function GET({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const g = JSON.parse(fs.readFileSync('public/exam-prep/guide.json', 'utf-8'));
  const subs = subjectsIn(lang);
  g.subjects = g.subjects.map(([slug, name, prefix]: string[]) => [slug, subs.find((x) => x.slug === slug)?.name ?? name, prefix]);
  g.units = g.units.map(([id, s, t, l1, l1t]: [string, number, string, string, string]) => [id, s, tt(id, t, lang), l1, tt(l1, l1t, lang)]);
  g.exams = g.exams.map((e: Exam) => {
    const [ag, rest = ''] = e.name.split(' · ');
    let name = e.name;
    if (e.key.endsWith('-ALL')) name = `${ag} · ${ag} की सभी परीक्षाएँ (सारे पुराने पेपर मिलाकर)`;
    else if (e.key === 'GENERAL') name = `${e.name.replace(/\s*\(all exams\)/, '').split(' — ')[0]} — सभी परीक्षाओं का मिला-जुला क्रम (इसके पुराने पेपर अभी नहीं जुड़े)`;
    else if (EXAM_HI.names[e.key]) name = `${ag} · ${EXAM_HI.names[e.key]}`;
    // keep the English name in the search words, so "patwari" and "पटवारी" both work
    return { ...e, name, alias: `${e.alias} ${rest} ${EXAM_HI.names[e.key] ?? ''}`.trim(), govLabel: EXAM_HI.govs[e.gov] ?? e.gov };
  });
  return new Response(JSON.stringify(g), { headers: { 'Content-Type': 'application/json' } });
}
