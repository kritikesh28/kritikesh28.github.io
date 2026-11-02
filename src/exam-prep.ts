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
