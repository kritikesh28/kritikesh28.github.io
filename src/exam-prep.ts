// Data behind /exam-prep/. It is generated from the two Google Sheets by tools/exam-prep/build_data.py.
// Never edit the JSON by hand: change the sheet, then re-run the script (docs/14-exam-prep.md).
import subjectsJson from './data/exam-prep/subjects.json';
import statsJson from './data/exam-prep/stats.json';

export type Major = { id: string; slug: string; t: string; part: string; n: number; q: number };
export type Subject = { slug: string; prefix: string; name: string; blurb: string; total: number; levels: Record<string, number>; majors: Major[] };
export type Topic = { id: string; lvl: number; t: string; p?: string; d?: string; rel?: [string, string][]; part?: string; l1: string; q?: number; y?: number };

export const SUBJECTS = subjectsJson as Subject[];
export const STATS = statsJson as { topics: number; majors: number; subjects: number; papers: number; syllabi: number; questions: number; exams: number };

export const BASE = '/exam-prep';
export const CI = `${BASE}/curriculum-index`;
export const GUIDE = `${BASE}/exam-guide`;

// A small symbol for each subject (drawn as text, so it costs nothing to load)
export const GLYPH: Record<string, string> = {
  history: '🏛', geography: '🌍', polity: '⚖', economy: '₹', 'art-culture': '🎨', technology: '🚀', physics: '⚛', chemistry: '⚗',
  biology: '🧬', maths: '∑', reasoning: '🧩', computer: '⌨', hindi: 'अ', english: 'Aa', rajasthan: '🏜',
};

const files = import.meta.glob<{ default: Topic[] }>('./data/exam-prep/topics/*.json', { eager: true });
export const topicsOf = (slug: string): Topic[] => files[`./data/exam-prep/topics/${slug}.json`]?.default ?? [];

export const slugId = (id: string) => id.toLowerCase().replaceAll('.', '-');
const byPrefix = Object.fromEntries(SUBJECTS.map((s) => [s.prefix, s]));
export const l1Of = (id: string) => id.match(/^[A-Z]{3}-\d+/)?.[0] ?? id;
/** Link to any topic id: its major-topic page, with an anchor for deeper levels. */
export function topicUrl(id: string) {
  const s = byPrefix[id.slice(0, 3)];
  if (!s) return CI + '/';
  const l1 = l1Of(id);
  return `${CI}/${s.slug}/${slugId(l1)}/${l1 === id ? '' : '#' + slugId(id)}`;
}
export const subjectOf = (id: string) => byPrefix[id.slice(0, 3)];
export const fmt = (n: number) => n.toLocaleString('en-IN');
/** "Indian History · PART II — ANCIENT INDIA" -> "Part II — Ancient India": the last piece, in calm case, without "(added to fill gaps)". */
export function partLabel(part: string) {
  let last = (part.split('·').pop() ?? '').replace(/\s*\((added|कमी)[^)]*\)\s*$/i, '').trim();
  if (last && last === last.toUpperCase() && /[A-Z]/.test(last)) {
    last = last.toLowerCase().replace(/(^|[\s—(\-:])(\p{L})/gu, (m) => m.toUpperCase())
      .replace(/\b(And|Of|The|In|On|For|To|An)\b/g, (w) => w.toLowerCase())
      .replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv)\b/gi, (r) => r.toUpperCase())
      .replace(/^part/i, 'Part');
  }
  return last || 'Topics';
}

import examPagesJson from './data/exam-prep/exam-pages.json';
export type ExamPage = {
  gov: string; agency: string; name: string; key: string; short: string; slug: string; alias: string; papers: number; years: string; questions: number;
  syllabus: boolean; qpp: number; ranked: number; n85: number; cov10: number; cov50: number; langOnly: boolean; paperList: [number, string][];
  subjects: [number, number][]; top: { id: string; s: number; t: string; major: string; q: number; here: number; all: number; last: number }[];
};
export const EXAM_PAGES = examPagesJson as ExamPage[];
const FRIENDLY: Record<string, string> = {
  'RAS-PRE': 'RAS Pre', 'RAS-MAINS': 'RAS Mains', LDC: 'LDC (Clerk Grade II)', SI: 'SI (Sub Inspector)', 'SCH-LECT': 'School Lecturer (1st Grade)',
  'SCH-LECT-SPL': 'School Lecturer (Special Education)', 'SR-TEACHER': 'Senior Teacher (2nd Grade)', 'CET-GRAD': 'CET Graduate Level', 'CET-12': 'CET 12th Level',
  PATWARI: 'Patwari', VDO: 'VDO (Gram Vikas Adhikari)', PRAHARI: 'Jail Prahari', 'ANIMAL-ATT': 'Pashu Parichar', 'CLASS-IV': 'Fourth Grade (Class IV)',
  'FOREST-GUARD': 'Forest Guard and Forester', 'HOSTEL-SUPT': 'Hostel Superintendent', 'MVSI-RSSB': 'MVSI', MVSI: 'MVSI', STENO: 'Stenographer',
  AAO: 'AAO (Assistant Agriculture Officer)', AEN: 'AEN', APO: 'APO', 'ACF-FRO': 'ACF and Forest Range Officer', RSET: 'RSET', NHM: 'NHM', SURVEYOR: 'Surveyor and Mine Foreman', APRO: 'APRO',
};
/** "RPSC RAS Pre", "RSSB Patwari", "All RPSC exams" */
export const examTitle = (e: ExamPage) => (e.key.endsWith('-ALL') ? `All ${e.agency} exams` : `${e.agency} ${FRIENDLY[e.key] ?? e.short}`);

// ---------------------------------------------------------------------------------------------
// Languages. The sheets are English (Hindi subject in Hindi). Hindi words live in src/data/exam-prep/hi/,
// keyed by topic id, so re-running build_data.py never wipes them. Anything not translated yet shows in
// English (and is marked lang="en"). Guide: docs/15-languages-and-hindi.md, part 6.
import { DEFAULT_LANG, localizePath, type Lang } from './i18n/config';
import hiSubjects from './data/exam-prep/hi/subjects.json';
import hiParts from './data/exam-prep/hi/parts.json';
import hiExams from './data/exam-prep/hi/exams.json';

type Tr = { t?: string; d?: string; p?: string };
const hiTopicFiles = import.meta.glob<{ default: Record<string, string | Tr> }>('./data/exam-prep/hi/topics/*.json', { eager: true });
const HI: Record<string, Tr> = {};
for (const f of Object.values(hiTopicFiles)) for (const [id, v] of Object.entries(f.default)) HI[id] = typeof v === 'string' ? { t: v } : v;

const DEV = /[ऀ-ॿ]/;
/** True when a piece of text is still English (so the page can mark it lang="en"). */
export const isEnglish = (s: string) => !DEV.test(s);
export const trTopic = (id: string, lang: Lang): Tr | undefined => (lang === 'hi' ? HI[id] : undefined);
/** A topic title in a language, falling back to the sheet's own text. */
export const tt = (id: string, fallback: string, lang: Lang) => trTopic(id, lang)?.t ?? fallback;

export type LMajor = Major & { en?: boolean };
export type LSubject = Omit<Subject, 'majors'> & { majors: LMajor[] };
const SUBJ_HI = hiSubjects as Record<string, { name: string; blurb: string }>;
const subjCache = new Map<Lang, LSubject[]>();
/** The subjects with their names, blurbs and major-topic titles in a language. */
export function subjectsIn(lang: Lang): LSubject[] {
  if (lang === DEFAULT_LANG) return SUBJECTS;
  if (!subjCache.has(lang)) {
    subjCache.set(lang, SUBJECTS.map((s) => ({
      ...s, name: SUBJ_HI[s.slug]?.name ?? s.name, blurb: SUBJ_HI[s.slug]?.blurb ?? s.blurb,
      majors: s.majors.map((m) => { const t = tt(m.id, m.t, lang); return { ...m, t, en: isEnglish(t) }; }),
    })));
  }
  return subjCache.get(lang)!;
}
/** Topics of a subject in a language; untranslated ones keep their English text and get en: true. */
export function topicsIn(slug: string, lang: Lang): (Topic & { en?: boolean })[] {
  const all = topicsOf(slug);
  if (lang === DEFAULT_LANG) return all;
  return all.map((t) => {
    const h = trTopic(t.id, lang);
    const title = h?.t ?? t.t;
    return { ...t, t: title, d: h?.d ?? t.d, p: h?.p ?? t.p, en: isEnglish(title),
      rel: t.rel?.map(([rid, label]) => [rid, tt(rid, label, lang)] as [string, string]) };
  });
}
/** Part label ("Part II — Ancient India") in a language */
export const partIn = (part: string, lang: Lang) => {
  const en = partLabel(part);
  return lang === 'hi' ? ((hiParts as Record<string, string>)[en] ?? (en === 'Topics' ? 'टॉपिक' : en)) : en;
};
/** Exam Prep addresses in a language */
export const paths = (lang: Lang) => ({ BASE: localizePath(`${BASE}/`, lang).replace(/\/$/, ''), CI: localizePath(`${CI}/`, lang).replace(/\/$/, ''), GUIDE: localizePath(`${GUIDE}/`, lang).replace(/\/$/, '') });
export const topicUrlIn = (id: string, lang: Lang) => localizePath(topicUrl(id), lang);
const EX_HI = hiExams as { names: Record<string, string>; agencies: Record<string, string>; govs: Record<string, string> };
/** "RPSC RAS Pre" / "RPSC RAS प्री" */
export const examTitleIn = (e: ExamPage, lang: Lang) => {
  if (lang !== 'hi') return examTitle(e);
  return e.key.endsWith('-ALL') ? `${e.agency} की सभी परीक्षाएँ` : `${e.agency} ${EX_HI.names[e.key] ?? FRIENDLY[e.key] ?? e.short}`;
};
export const EXAM_HI = EX_HI;
