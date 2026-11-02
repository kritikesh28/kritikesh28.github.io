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
