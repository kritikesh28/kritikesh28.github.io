// Search for the Exhaustive Curriculum Index (about 32,000 topics).
// It reads /exam-prep/search.json once, only when someone starts searching.
// Typo-tolerant: every query word is matched exactly, by its beginning, or by a near spelling
// (one or two letters off), and a subject named in the query becomes a gentle preference.
// Guide: docs/14-exam-prep.md

export type Row = { id: string; t: string; s: number; lvl: number; q: number; n: string; w: string[] };
export type Hit = { row: Row; score: number };
export type Filters = { subject: number | -1; maxLevel: number; pyqOnly: boolean };

const STOP = new Set('a an the is are was were be of to in on at for and or what why how who when which does do it its with from by as into about vs ka ki ke ko se me mein hai aur'.split(' '));
// Hinglish and everyday words -> words used in the index
const SYN: Record<string, string[]> = {
  itihas: ['history'], bhugol: ['geography'], rajniti: ['polity'], samvidhan: ['constitution'], arthvyavastha: ['economy'],
  vigyan: ['science'], ganit: ['maths', 'mathematics'], math: ['maths', 'mathematics'], maths: ['maths', 'mathematics'],
  gk: ['general', 'knowledge'], rajasthan: ['rajasthan'], raj: ['rajasthan'], nadi: ['river', 'rivers'], nadiyan: ['rivers'],
  parvat: ['mountain', 'mountains'], jhil: ['lake', 'lakes'], mitti: ['soil', 'soils'], jalvayu: ['climate'], sansad: ['parliament'],
  rashtrapati: ['president'], sangeet: ['music'], nritya: ['dance'], kala: ['art'], mandir: ['temple', 'temples'], kila: ['fort', 'forts'],
  computer: ['computer', 'computing'], ai: ['artificial', 'intelligence'], ml: ['machine', 'learning'], gdp: ['gdp', 'domestic', 'product'],
  rbi: ['rbi', 'reserve', 'bank'], upsc: ['upsc'], ras: ['ras'], dna: ['dna'], ww1: ['world', 'war'], ww2: ['world', 'war'],
};

export const norm = (s: string) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ');
export const tokens = (s: string) => norm(s).split(/\s+/).filter((w) => w && !STOP.has(w));
const stem = (w: string) => (w.length > 4 ? w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '') : w);

function lev(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < best) best = v;
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

export let rows: Row[] = [];
export let subjects: [string, string, string][] = [];
let vocab = new Map<string, number[]>(); // stemmed word -> rows that contain it
let freq = new Map<string, number>();
const titles = new Map<string, string>();
let loading: Promise<void> | undefined;

export function load() {
  loading ??= fetch('/exam-prep/search.json')
    .then((r) => r.json())
    .then((data: { s: [string, string, string][]; r: [string, string, number, number, number?][] }) => {
      subjects = data.s;
      rows = data.r.map(([id, t, s, lvl, q]) => ({ id, t, s, lvl, q: q ?? 0, n: norm(t), w: [] }));
      for (const r of rows) if (r.lvl === 1) titles.set(r.id, r.t);
      rows.forEach((r, i) => {
        r.w = [...new Set(tokens(r.t).map(stem))];
        for (const w of r.w) {
          let list = vocab.get(w);
          if (!list) vocab.set(w, (list = []));
          list.push(i);
          freq.set(w, (freq.get(w) ?? 0) + 1);
        }
      });
    });
  return loading;
}

export const majorTitle = (id: string) => titles.get(id.match(/^[A-Z]{3}-\d+/)?.[0] ?? id) ?? '';

/** Every vocabulary word close to w, with how good the match is (3 exact, 2 beginning, 1.2 near spelling). */
function expand(w: string): Map<string, number> {
  const out = new Map<string, number>();
  const s = stem(w);
  if (vocab.has(s)) out.set(s, 3);
  const maxEdit = s.length >= 8 ? 2 : s.length >= 4 ? 1 : 0;
  for (const v of vocab.keys()) {
    if (out.has(v)) continue;
    if (s.length >= 2 && v.startsWith(s)) out.set(v, s.length >= 4 ? 2.2 : 1.6);
    else if (maxEdit && v[0] === s[0] && lev(s, v, maxEdit) <= maxEdit) out.set(v, 1.2);
  }
  return out;
}

export function search(query: string, f: Filters, limit = 400): { hits: Hit[]; subjectHint: number } {
  let words = tokens(query);
  // A subject named in the query ("geography rivers") becomes a preference, not a required word
  let subjectHint = -1;
  const names = subjects.map(([slug, name]) => [slug, ...tokens(name)]);
  words = words.filter((w) => {
    const i = names.findIndex((n) => n.includes(w) || (SYN[w] && n.includes(SYN[w][0])));
    if (i >= 0 && words.length > 1 && subjectHint < 0) { subjectHint = i; return false; }
    return true;
  });
  if (!words.length) return { hits: [], subjectHint };
  const groups = words.map((w) => {
    const m = expand(w);
    for (const syn of SYN[w] ?? []) for (const [k, v] of expand(syn)) m.set(k, Math.max(m.get(k) ?? 0, v * 0.95));
    return m;
  });
  const score = new Map<number, number[]>(); // row -> best match per query word
  groups.forEach((g, j) => {
    for (const [v, quality] of g) {
      for (const i of vocab.get(v) ?? []) {
        let arr = score.get(i);
        if (!arr) score.set(i, (arr = new Array(groups.length).fill(0)));
        if (quality > arr[j]) arr[j] = quality;
      }
    }
  });
  const need = groups.length <= 2 ? groups.length : Math.ceil(groups.length * 0.67);
  const phrase = norm(query).trim();
  const hits: Hit[] = [];
  for (const [i, arr] of score) {
    const r = rows[i];
    if (f.subject >= 0 && r.s !== f.subject) continue;
    if (r.lvl > f.maxLevel) continue;
    if (f.pyqOnly && !r.q) continue;
    const matched = arr.filter((x) => x > 0).length;
    if (matched < need) continue;
    let sc = arr.reduce((a, b) => a + b, 0) + (matched === groups.length ? 2 : 0);
    if (phrase.length > 2 && r.n.includes(phrase)) sc += 4;
    if (r.n.startsWith(norm(words[0]))) sc += 1;
    sc += [0, 1.6, 0.9, 0.3, 0][r.lvl] ?? 0;
    sc += Math.min(1.5, r.q * 0.15);
    sc -= Math.min(1.2, r.w.length * 0.05);
    if (subjectHint >= 0 && r.s === subjectHint) sc += 2.5;
    hits.push({ row: r, score: sc });
  }
  hits.sort((a, b) => b.score - a.score || a.row.lvl - b.row.lvl);
  return { hits: hits.slice(0, limit), subjectHint };
}

/** "patwri histry" -> "patwari history", using the commonest close word in the index. Empty when nothing changes. */
export function didYouMean(query: string) {
  let changed = false;
  const out = tokens(query).map((w) => {
    if (vocab.has(stem(w)) || SYN[w] || w.length < 4) return w;
    for (const v of vocab.keys()) if (v.startsWith(w)) return w; // a word still being typed
    let best = '', bestF = 0, bestD = 3;
    for (const [v, n] of freq) {
      if (Math.abs(v.length - w.length) > 2) continue;
      const d = lev(w, v, 2);
      if (d < bestD || (d === bestD && n > bestF)) { best = v; bestF = n; bestD = d; }
    }
    if (best && bestD <= 2) { changed = true; return best; }
    return w;
  });
  return changed ? out.join(' ') : '';
}

/** Title with the matched words wrapped in <mark> (text is escaped first). */
export function highlight(title: string, query: string) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  const ws = tokens(query).filter((w) => w.length > 1).map((w) => stem(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!ws.length) return esc(title);
  const re = new RegExp(`(${ws.join('|')})[\\p{L}\\p{M}]*`, 'giu');
  return esc(title).replace(re, (m) => `<mark>${m}</mark>`);
}
