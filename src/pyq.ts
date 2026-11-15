// PYQ practice (/exam-prep/pyq/): Kritikesh's past-paper question banks, shown as flip cards, quick quizzes and
// the real exam questions. The data is made from his Word files by tools/pyq/build_pyq.py (never edit the JSON by hand).
// Guide: docs/19-pyq-practice.md
import raj from './data/pyq/raj.json';
import net from './data/pyq/net.json';
import type { Lang } from './i18n/config';
import { localizePath } from './i18n/config';

export type Row = { n: number; q: string; a: string; k: string; x?: string[]; i?: string[]; f?: string };
export type Sub = { id: string; slug: string; t: string; other: boolean; rows: Row[] };
export type Group = { id: string; t: string; subs: Sub[] };
export type Block = { p?: string; tb?: string[][]; img?: string };
export type Mcq = { n: number; p?: string; a: number; x?: string; o?: string[]; s: Block[]; star?: number };
export type Paper = { id: string; t: string; no?: number; code?: string; m: Mcq[] };
type Raw = { bank: string; groups: Group[]; papers: Paper[] };

export const SET_SIZE = 40; // flip cards on one set page (about 5 minutes); shown 8 to a screen
export const SCREEN = 8;
export const MCQ_SET = 10; // real exam questions on one page, one to a screen

export type Bank = {
  key: 'raj' | 'net';
  slug: string; // address under /exam-prep/pyq/
  content: 'hi' | 'en'; // the language the questions are written in
  icon: string;
  name: Record<Lang, string>;
  short: Record<Lang, string>;
  blurb: Record<Lang, string>;
  exams: Record<Lang, string>; // who it is for
  source: Record<Lang, string>;
  idPrefix: (p: Paper, m: Mcq) => string; // the id the Q&A rows use for an MCQ ("RB2-5", "U7B-A26")
  qaReady: Record<Lang, string>; // what the Q&A covers so far
  groups: Group[];
  papers: Paper[];
};

const R = raj as unknown as Raw;
const N = net as unknown as Raw;

export const BANKS: Bank[] = [
  {
    key: 'raj', slug: 'rajasthan-geography', content: 'hi', icon: '🏜',
    name: { en: 'Rajasthan Geography PYQs', hi: 'राजस्थान भूगोल PYQ' },
    short: { en: 'Rajasthan Geography', hi: 'राजस्थान भूगोल' },
    blurb: {
      en: 'Every past RPSC and RSSB question on Rajasthan’s geography, broken into tiny one-line facts you can flip, quiz and master.',
      hi: 'RPSC और RSSB की परीक्षाओं में राजस्थान के भूगोल पर पूछा गया हर सवाल, छोटे-छोटे एक-लाइन तथ्यों में: पलटिए, क्विज़ खेलिए, याद कीजिए।',
    },
    exams: { en: 'RAS, Patwari, VDO, LDC, Teacher, Police and every RPSC/RSSB exam', hi: 'RAS, पटवारी, VDO, LDC, शिक्षक, पुलिस और RPSC/RSSB की हर परीक्षा' },
    source: { en: 'Questions from RPSC/RSSB papers (2000s–2024) as collected in exam-prep books; facts checked and reworded by Kritikesh.', hi: 'RPSC/RSSB के पेपरों (2000 के दशक से 2024 तक) के सवाल, जैसे परीक्षा-तैयारी की किताबों में छपे; तथ्य कृतिकेश ने जाँचे और अपने शब्दों में लिखे।' },
    idPrefix: (p, m) => `RB${p.no}-${m.n}`,
    qaReady: { en: 'Q&A ready for book chapters 1–4; chapter 5 (Climate) has its real questions now and its Q&A soon.', hi: 'किताब के अध्याय 1–4 के Q&A तैयार; अध्याय 5 (जलवायु) के असली सवाल अभी हैं, उसके Q&A जल्द।' },
    groups: R.groups, papers: R.papers,
  },
  {
    key: 'net', slug: 'ugc-net-geography', content: 'en', icon: '🌐',
    name: { en: 'UGC-NET Geography PYQs', hi: 'UGC-NET भूगोल PYQ' },
    short: { en: 'UGC-NET Geography', hi: 'UGC-NET भूगोल' },
    blurb: {
      en: 'UGC-NET/JRF and Assistant Professor geography questions, unit by unit, turned into quick facts, quizzes and the real MCQs.',
      hi: 'UGC-NET/JRF और असिस्टेंट प्रोफ़ेसर परीक्षाओं के भूगोल के सवाल, यूनिट-दर-यूनिट: छोटे तथ्य, क्विज़ और असली MCQ।',
    },
    exams: { en: 'UGC-NET/JRF Geography (code 80), state SET and Assistant Professor exams', hi: 'UGC-NET/JRF भूगोल (कोड 80), राज्य SET और असिस्टेंट प्रोफ़ेसर परीक्षाएँ' },
    source: { en: 'NTA UGC-NET papers and state Assistant Professor papers as collected in an exam-prep book; facts checked and reworded by Kritikesh.', hi: 'NTA UGC-NET और राज्यों की असिस्टेंट प्रोफ़ेसर परीक्षाओं के सवाल, जैसे एक तैयारी-किताब में छपे; तथ्य कृतिकेश ने जाँचे और अपने शब्दों में लिखे।' },
    idPrefix: (p, m) => `${p.code}-${m.p}${m.n}`,
    qaReady: { en: 'Q&A ready for the Political Geography chapter (spread over the official units); the other chapters have their real questions now and their Q&A soon.', hi: 'राजनीतिक भूगोल अध्याय के Q&A तैयार (आधिकारिक यूनिटों में बँटे हुए); बाक़ी अध्यायों के असली सवाल अभी हैं, उनके Q&A जल्द।' },
    groups: N.groups, papers: N.papers,
  },
];

export const PYQ = '/exam-prep/pyq';
export const bankBy = (slug: string) => BANKS.find((b) => b.slug === slug)!;
export const pyqPath = (lang: Lang, ...parts: (string | number)[]) => localizePath(`${PYQ}/${parts.map(String).join('/')}${parts.length ? '/' : ''}`, lang);

/** "स्थिति एवं विस्तार (location, latitude…)" -> ["स्थिति एवं विस्तार", "location, latitude…"] */
export function splitTitle(t: string): [string, string] {
  const m = t.match(/^(.*?)\s*\((.*)\)\s*$/);
  if (!m || !m[1]) return [t, ''];
  // drop the working notes of the source file ("not named in the syllabus text; …")
  const note = m[2].split(';')[0].trim();
  return [m[1].trim(), /^not named/i.test(m[2]) ? (/^not named/i.test(note) ? '' : note) : m[2].trim()];
}

// ------------------------------------------------------------------ sets (one page of flip cards each)
export type QaSet = { bank: Bank; group: Group; sub: Sub; set: number; sets: number; rows: Row[]; seq: number };
const setCache = new Map<string, QaSet[]>();
/** Every flip-card page of a bank, in syllabus order */
export function qaSets(b: Bank): QaSet[] {
  if (!setCache.has(b.key)) {
    const out: QaSet[] = [];
    for (const g of b.groups) for (const s of g.subs) {
      const sets = Math.ceil(s.rows.length / SET_SIZE);
      // spread the rows evenly so the last page is never a tiny leftover
      const per = Math.ceil(s.rows.length / sets);
      for (let i = 0; i < sets; i++) out.push({ bank: b, group: g, sub: s, set: i + 1, sets, rows: s.rows.slice(i * per, (i + 1) * per), seq: out.length });
    }
    setCache.set(b.key, out);
  }
  return setCache.get(b.key)!;
}

export type McqSet = { bank: Bank; paper: Paper; set: number; sets: number; m: Mcq[]; seq: number };
const mcqCache = new Map<string, McqSet[]>();
export function mcqSets(b: Bank): McqSet[] {
  if (!mcqCache.has(b.key)) {
    const out: McqSet[] = [];
    for (const p of b.papers) {
      const sets = Math.ceil(p.m.length / MCQ_SET);
      for (let i = 0; i < sets; i++) out.push({ bank: b, paper: p, set: i + 1, sets, m: p.m.slice(i * MCQ_SET, (i + 1) * MCQ_SET), seq: out.length });
    }
    mcqCache.set(b.key, out);
  }
  return mcqCache.get(b.key)!;
}

/** Q&A rows that were made from one MCQ (so a real question can show "the facts behind it") */
const byMcq = new Map<string, Map<string, { row: Row; sub: Sub }[]>>();
export function rowsForMcq(b: Bank, id: string) {
  if (!byMcq.has(b.key)) {
    const m = new Map<string, { row: Row; sub: Sub }[]>();
    for (const g of b.groups) for (const s of g.subs) for (const r of s.rows) for (const i of r.i ?? []) {
      if (!m.has(i)) m.set(i, []);
      m.get(i)!.push({ row: r, sub: s });
    }
    byMcq.set(b.key, m);
  }
  return byMcq.get(b.key)!.get(id) ?? [];
}
/** The first flip-card page that holds a row of a sub-topic */
export function setOfRow(b: Bank, sub: Sub, n: number) {
  return qaSets(b).find((x) => x.sub === sub && x.rows.some((r) => r.n === n));
}

/** How many exams asked a row (the "favourite" heat): PYQ rows count their exams, other kinds count 0 */
export const heat = (r: Row) => (r.k.startsWith('PYQ') || r.k === 'Rev' ? (r.x?.length ?? 0) : 0);

export const KIND: Record<string, Record<Lang, string>> = {
  PYQ: { en: 'Asked', hi: 'पूछा गया' },
  'PYQ-corrected': { en: 'Asked · corrected', hi: 'पूछा गया · सुधारा' },
  Rev: { en: 'Asked, the other way round', hi: 'उल्टा करके' },
  Expl: { en: 'From the explanation', hi: 'व्याख्या से' },
  Tab: { en: 'From a table', hi: 'तालिका से' },
  Box: { en: 'Did you know', hi: 'क्या आप जानते हैं' },
  Option: { en: 'From an option', hi: 'विकल्प से' },
  Added: { en: 'Likely pair', hi: 'साथ में पूछा जा सकता है' },
};

// ------------------------------------------------------------------ links from the Curriculum Index
// Which PYQ pages belong to which Curriculum Index major topic. Each entry is [bank key, 'qa' sub-topic id | 'paper' paper id].
type Ref = [Bank['key'], 'qa' | 'paper', string];
export const CI_LINKS: Record<string, Ref[]> = {
  'RAJ-31': [['raj', 'qa', 'G1.1'], ['raj', 'qa', 'G1.2'], ['raj', 'qa', 'G1.3'], ['raj', 'paper', 'ch1'], ['raj', 'paper', 'ch2']],
  'RAJ-32': [['raj', 'qa', 'G1.4'], ['raj', 'qa', 'G1.5'], ['raj', 'qa', 'G1.6'], ['raj', 'qa', 'G1.7'], ['raj', 'qa', 'G1.8'], ['raj', 'qa', 'G1.0'], ['raj', 'paper', 'ch3'], ['raj', 'paper', 'ch4']],
  'RAJ-33': [['raj', 'qa', 'G2.1'], ['raj', 'qa', 'G2.3'], ['raj', 'qa', 'G2.5'], ['raj', 'qa', 'G2.6'], ['raj', 'paper', 'ch5']],
  'RAJ-34': [['raj', 'qa', 'G1.9']],
  'RAJ-35': [['raj', 'qa', 'G3'], ['raj', 'qa', 'G4']],
  'RAJ-36': [['raj', 'qa', 'G3']],
  'RAJ-37': [['raj', 'qa', 'G5']],
  'RAJ-38': [['raj', 'qa', 'G6']],
  'RAJ-39': [['raj', 'qa', 'G7']],
  'RAJ-40': [['raj', 'qa', 'G9']],
  'RAJ-41': [['raj', 'qa', 'G8']],
  // Geography (NET units)
  'GEO-03': [['net', 'qa', 'UI']], 'GEO-04': [['net', 'qa', 'UI']], 'GEO-05': [['net', 'qa', 'UI']],
  'GEO-10': [['net', 'qa', 'UII']], 'GEO-11': [['net', 'qa', 'UII']], 'GEO-12': [['net', 'qa', 'UII']],
  'GEO-13': [['net', 'qa', 'UIII']], 'GEO-97': [['net', 'qa', 'UIII']], 'GEO-98': [['net', 'qa', 'UIII']], 'GEO-99': [['net', 'qa', 'UIII']],
  'GEO-26': [['net', 'qa', 'UIV']],
  'GEO-18': [['net', 'qa', 'UV'], ['net', 'qa', 'UVII'], ['net', 'paper', 'u5a'], ['net', 'paper', 'u7a']],
  'GEO-24': [['net', 'qa', 'UV'], ['net', 'paper', 'u5b']],
  'GEO-45': [['net', 'paper', 'u5a']], 'GEO-46': [['net', 'paper', 'u5a']], 'GEO-47': [['net', 'paper', 'u5a']], 'GEO-48': [['net', 'paper', 'u5a']],
  'GEO-49': [['net', 'paper', 'u5a']], 'GEO-50': [['net', 'paper', 'u5a']], 'GEO-51': [['net', 'paper', 'u5a']],
  'GEO-52': [['net', 'paper', 'u5a']], 'GEO-53': [['net', 'paper', 'u5a']], 'GEO-54': [['net', 'paper', 'u5a']],
  'GEO-63': [['net', 'qa', 'UV'], ['net', 'paper', 'u5b']], 'GEO-64': [['net', 'qa', 'UV'], ['net', 'paper', 'u5b']],
  'GEO-65': [['net', 'qa', 'UV'], ['net', 'paper', 'u5b']], 'GEO-66': [['net', 'qa', 'UV'], ['net', 'paper', 'u5b']],
  'GEO-20': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6a']], 'GEO-55': [['net', 'paper', 'u6a']], 'GEO-56': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6a']],
  'GEO-21': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6b']], 'GEO-57': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6b']],
  'GEO-22': [['net', 'paper', 'u6c']], 'GEO-58': [['net', 'paper', 'u6c']],
  'GEO-28': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6d']], 'GEO-70': [['net', 'qa', 'UVI'], ['net', 'paper', 'u6d']], 'GEO-71': [['net', 'qa', 'UVI']],
  'GEO-23': [['net', 'paper', 'u6e']], 'GEO-59': [['net', 'paper', 'u6e']], 'GEO-60': [['net', 'paper', 'u6e']], 'GEO-61': [['net', 'paper', 'u6e']], 'GEO-67': [['net', 'paper', 'u6e']],
  'GEO-25': [['net', 'qa', 'UVII'], ['net', 'paper', 'u7b'], ['net', 'paper', 'u6e']],
  'GEO-42': [['net', 'qa', 'UVII'], ['net', 'paper', 'u7a']], 'GEO-44': [['net', 'paper', 'u7a']], 'GEO-41': [['net', 'paper', 'u7a']],
  'GEO-01': [['net', 'qa', 'UVIII']], 'GEO-37': [['net', 'qa', 'UVIII']],
  'GEO-31': [['net', 'qa', 'UIX']],
  'GEO-30': [['net', 'qa', 'UX']],
};

export type PyqLink = { href: string; label: string; note: string; bank: Bank; contentLang: 'hi' | 'en' };
/** The PYQ practice links for one Curriculum Index major topic, in the reader's language */
export function pyqLinksFor(ciId: string, lang: Lang): PyqLink[] {
  const out: PyqLink[] = [];
  const hi = lang === 'hi';
  for (const [key, kind, id] of CI_LINKS[ciId] ?? []) {
    const b = BANKS.find((x) => x.key === key)!;
    if (kind === 'qa') {
      // a group id ("G3", "UVII") means every sub-topic of it; a sub-topic id means just that one
      const subs = b.groups.flatMap((g) => g.subs.map((s) => ({ g, s }))).filter(({ g, s }) => s.id === id || (g.id === id));
      for (const { s } of subs) {
        out.push({ href: pyqPath(lang, b.slug, s.slug, 1), label: splitTitle(s.t)[0] || s.t, note: hi ? `${s.rows.length} फ़्लिप कार्ड` : `${s.rows.length} flip cards`, bank: b, contentLang: b.content });
      }
    } else {
      const p = b.papers.find((x) => x.id === id);
      if (p) out.push({ href: pyqPath(lang, b.slug, 'paper', p.id, 1), label: p.t, note: hi ? `${p.m.length} असली सवाल` : `${p.m.length} real exam questions`, bank: b, contentLang: b.content });
    }
  }
  return out;
}
