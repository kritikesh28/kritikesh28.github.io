// PYQ practice (/exam-prep/pyq/): Kritikesh's past-paper question banks, shown as flip cards, quick quizzes and
// the real exam questions. The data is made from his Word files by tools/pyq/build_pyq.py (never edit the JSON by hand).
// Guide: docs/19-pyq-practice.md
import raj from './data/pyq/raj.json';
import net from './data/pyq/net.json';
import ciMatch from './data/pyq/ci-match.json';
import quizRaj from './data/pyq/quiz/raj.json';
import quizNet from './data/pyq/quiz/net.json';
import rajEn from './data/pyq/tr/raj-en.json';
import type { Lang } from './i18n/config';
import { localizePath } from './i18n/config';

// `t0`, `o0`: the original wording, kept on a translated copy (see inLang) so a page can offer "See original"
export type Row = { n: number; q: string; a: string; k: string; x?: string[]; i?: string[]; f?: string; o0?: { q: string; a: string; f?: string } };
export type Sub = { id: string; slug: string; t: string; other: boolean; rows: Row[]; t0?: string };
export type Group = { id: string; t: string; subs: Sub[]; t0?: string };
export type Block = { p?: string; tb?: string[][]; img?: string };
export type Mcq = { n: number; p?: string; a: number; x?: string; o?: string[]; s: Block[]; star?: number; o0?: { x?: string; o?: string[]; s: Block[] } };
export type Paper = { id: string; t: string; no?: number; code?: string; m: Mcq[]; t0?: string };
type Raw = { bank: string; groups: Group[]; papers: Paper[] };

export const SET_SIZE = 40; // flip cards on one set page (about 5 minutes); shown 8 to a screen
export const SCREEN = 8;
export const MCQ_SET = 10; // real exam questions on one page, one to a screen

export type Bank = {
  key: 'raj' | 'net';
  slug: string; // address under /exam-prep/pyq/
  content: 'hi' | 'en'; // the language the questions are shown in (on a translated copy: the reader's language)
  orig?: 'hi' | 'en'; // set only on a translated copy: the language the questions were asked in
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

// Quick-quiz wrong options, written by hand for every row (same kind as the answer: a district for a district, a
// height for a height) so the quiz is fair and moderately tough. Keyed by row number. Rows without an entry get
// options picked by the quiz script from same-kind answers. Edit these files directly. Guide: docs/19-pyq-practice.md
const QUIZ: Record<Bank['key'], Record<string, string[]>> = { raj: quizRaj as Record<string, string[]>, net: quizNet as Record<string, string[]> };
export const quizOptions = (b: Bank, r: Row): string[] | undefined => {
  const o = QUIZ[b.key][String(r.n)];
  const d = b.orig && DICT[`${b.key}:${b.content}`];
  return o && d ? o.map((x) => d[x] ?? x) : o;
};

// ------------------------------------------------------------------ translations
// Hand translations, so every reader can practise in their own language: Rajasthan into English, NET into Hindi.
// Made by tools/pyq/tr/build_dict.py from the files in tools/pyq/tr/. {original: translation}. A string with no
// translation yet stays as it was asked. Guide: docs/19-pyq-practice.md (Translations)
const DICT: Record<string, Record<string, string>> = { 'raj:en': rajEn as Record<string, string> };
const langCache = new Map<string, Bank>();
/** The bank in the reader's language: the bank itself when it was asked in that language (or no translation exists),
 *  otherwise a translated copy that keeps the original wording in t0 / o0 for "See original" */
export function inLang(b: Bank, lang: Lang): Bank {
  if (b.orig || lang === b.content) return b;
  const key = `${b.key}:${lang}`;
  const d = DICT[key];
  if (!d) return b;
  if (!langCache.has(key)) {
    const t = (x: string) => d[x] ?? x;
    const tb = (bl: Block): Block => (bl.p ? { p: t(bl.p) } : bl.tb ? { tb: bl.tb.map((r) => r.map(t)) } : bl);
    langCache.set(key, {
      ...b, content: lang as Bank['content'], orig: b.content,
      groups: b.groups.map((g) => ({
        ...g, t: t(g.t), t0: g.t,
        subs: g.subs.map((s) => ({ ...s, t: t(s.t), t0: s.t, rows: s.rows.map((r) => ({ ...r, q: t(r.q), a: t(r.a), f: r.f && t(r.f), o0: { q: r.q, a: r.a, f: r.f } })) })),
      })),
      papers: b.papers.map((p) => ({
        ...p, t: t(p.t), t0: p.t,
        m: p.m.map((m) => ({ ...m, x: m.x && t(m.x), o: m.o?.map(t), s: m.s.map(tb), o0: { x: m.x, o: m.o, s: m.s } })),
      })),
    });
  }
  return langCache.get(key)!;
}
/** data-orig for an element whose text was translated (nothing when it reads the same) */
export const orig = (now: string | undefined, was: string | undefined) => (was && was !== now ? was : undefined);

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
  const ck = `${b.key}:${b.content}`;
  if (!setCache.has(ck)) {
    const out: QaSet[] = [];
    for (const g of b.groups) for (const s of g.subs) {
      const sets = Math.ceil(s.rows.length / SET_SIZE);
      // spread the rows evenly so the last page is never a tiny leftover
      const per = Math.ceil(s.rows.length / sets);
      for (let i = 0; i < sets; i++) out.push({ bank: b, group: g, sub: s, set: i + 1, sets, rows: s.rows.slice(i * per, (i + 1) * per), seq: out.length });
    }
    setCache.set(ck, out);
  }
  return setCache.get(ck)!;
}

export type McqSet = { bank: Bank; paper: Paper; set: number; sets: number; m: Mcq[]; seq: number };
const mcqCache = new Map<string, McqSet[]>();
export function mcqSets(b: Bank): McqSet[] {
  const ck = `${b.key}:${b.content}`;
  if (!mcqCache.has(ck)) {
    const out: McqSet[] = [];
    for (const p of b.papers) {
      const sets = Math.ceil(p.m.length / MCQ_SET);
      for (let i = 0; i < sets; i++) out.push({ bank: b, paper: p, set: i + 1, sets, m: p.m.slice(i * MCQ_SET, (i + 1) * MCQ_SET), seq: out.length });
    }
    mcqCache.set(ck, out);
  }
  return mcqCache.get(ck)!;
}

/** Q&A rows that were made from one MCQ (so a real question can show "the facts behind it") */
const byMcq = new Map<string, Map<string, { row: Row; sub: Sub }[]>>();
export function rowsForMcq(b: Bank, id: string) {
  const ck = `${b.key}:${b.content}`;
  if (!byMcq.has(ck)) {
    const m = new Map<string, { row: Row; sub: Sub }[]>();
    for (const g of b.groups) for (const s of g.subs) for (const r of s.rows) for (const i of r.i ?? []) {
      if (!m.has(i)) m.set(i, []);
      m.get(i)!.push({ row: r, sub: s });
    }
    byMcq.set(ck, m);
  }
  return byMcq.get(ck)!.get(id) ?? [];
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
    const b = inLang(BANKS.find((x) => x.key === key)!, lang);
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

// ---- Curriculum Index topic ↔ PYQ cards (made by tools/pyq/link_ci.py; SUB_MAP there is the hand-checked part) ----
type CiMatch = { topics: Record<string, [Bank['key'], string[], string[], string[]]>; rows: Record<Bank['key'], Record<string, string>> };
const CM = ciMatch as unknown as CiMatch;
export type CiCard = { key: string; sub: Sub; row: Row };
export type CiPack = { id: string; bank: Bank; cards: CiCard[]; subs: Sub[]; total: number };
const subBySlug = (b: Bank) => new Map(b.groups.flatMap((g) => g.subs).map((s) => [s.slug, s]));
const packCache = new Map<string, CiPack | undefined>();
/** The PYQ cards for one Curriculum Index topic (any level): up to SET_SIZE cards for its practice page, and the whole decks that match it */
export function ciPack(id: string): CiPack | undefined {
  if (packCache.has(id)) return packCache.get(id);
  const m = CM.topics[id];
  let out: CiPack | undefined;
  if (m) {
    const [key, keys, , slugs] = m;
    const b = BANKS.find((x) => x.key === key)!;
    const bySlug = subBySlug(b);
    const card = (k: string): CiCard | undefined => {
      const [sl, n] = k.split(':');
      const sub = bySlug.get(sl);
      const row = sub?.rows.find((r) => r.n === Number(n));
      return sub && row ? { key: k, sub, row } : undefined;
    };
    const subs = slugs.map((s) => bySlug.get(s)!).filter(Boolean);
    const cards = keys.map(card).filter((c): c is CiCard => !!c);
    const seen = new Set(cards.map((c) => c.key));
    // a hand-matched deck tops the page up with its most-asked cards
    const extra = subs.flatMap((s) => s.rows.map((row) => ({ key: `${s.slug}:${row.n}`, sub: s, row }))).filter((c) => !seen.has(c.key)).sort((a, z) => heat(z.row) - heat(a.row));
    const all = [...cards, ...extra];
    const inSubs = new Set(subs.map((s) => s.slug));
    const total = subs.reduce((a, s) => a + s.rows.length, 0) + cards.filter((c) => !inSubs.has(c.sub.slug)).length;
    out = { id, bank: b, cards: all.slice(0, SET_SIZE), subs, total };
  }
  packCache.set(id, out);
  return out;
}
export const CI_PACK_IDS = Object.keys(CM.topics);
export const ciPackPath = (lang: Lang, id: string) => pyqPath(lang, 'topic', id.toLowerCase().replaceAll('.', '-'));
/** Syllabus topics that this PYQ deck page covers: hand-matched ones first, then the topics its cards were matched to */
export function ciTopicsFor(b: Bank, sub: Sub, rows: Row[]): string[] {
  const out = new Set<string>();
  for (const [id, [key, , , slugs]] of Object.entries(CM.topics)) if (key === b.key && slugs.includes(sub.slug)) out.add(id);
  const counts = new Map<string, number>();
  for (const r of rows) {
    const id = CM.rows[b.key]?.[`${sub.slug}:${r.n}`];
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  [...counts].sort((a, z) => z[1] - a[1]).forEach(([id]) => out.add(id));
  return [...out];
}
