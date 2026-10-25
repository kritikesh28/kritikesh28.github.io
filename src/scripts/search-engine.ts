// The site search, shared by the search page and every search box with suggestions.
// It reads /search-index.json (built by src/pages/search-index.json.ts) once per visit.
// Guide: docs/13-add-to-the-library.md, "How search works".

export type Item = { t: string; d: string; u: string; k: string; w: string; b: string };
type Indexed = { item: Item; fields: [Set<string>, number][]; tris: Set<string>; title: string };

const STOP = new Set('a an the is are was were be of to in on at for and or what why how who when where which does do did it its can i you we me my this that with from by as into about'.split(' '));
// Words people use for the same idea. Add pairs here to teach search new synonyms.
const SYN: Record<string, string[]> = {
  bigbang: ['big', 'bang'], cmb: ['cosmic', 'microwave', 'background'], ai: ['artificial', 'intelligence', 'ai'],
  ml: ['machine', 'learning'], earth: ['earth', 'planet'], cosmos: ['universe'], space: ['space', 'universe'],
  old: ['age', 'old'], age: ['age', 'old'], begin: ['beginning', 'begin', 'origin', 'start'], end: ['end', 'fate'],
  stars: ['star', 'stars'], galaxy: ['galaxy', 'galaxies'], atom: ['atom', 'atoms', 'elements'],
  brahmand: ['universe'], prithvi: ['earth'], tara: ['star'], taare: ['star'], akash: ['sky'], bhugol: ['geography'],
};

export const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s]/gu, ' ');
const words = (s: string) => norm(s).split(/\s+/).filter((w) => w && !STOP.has(w));
const stem = (w: string) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');
function lev(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0];
    d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return d[b.length];
}
const tri = (s: string) => {
  const t = new Set<string>();
  const x = `  ${norm(s)} `;
  for (let i = 0; i < x.length - 2; i++) t.add(x.slice(i, i + 3));
  return t;
};

let index: Indexed[] = [];
let vocab = new Map<string, number>(); // every word in titles and keywords, with how often it appears
let loading: Promise<void> | undefined;

export function loadIndex() {
  loading ??= fetch('/search-index.json')
    .then((r) => r.json())
    .then((items: Item[]) => {
      index = items.map((item) => ({
        item,
        title: norm(item.t),
        fields: [[new Set(words(item.t).map(stem)), 6], [new Set(words(item.w).map(stem)), 4], [new Set(words(item.d).map(stem)), 3], [new Set(words(item.b).map(stem)), 1]],
        tris: tri(`${item.t} ${item.w}`),
      }));
      vocab = new Map();
      for (const { item } of index) for (const w of words(`${item.t} ${item.w} ${item.d}`)) if (w.length > 2) vocab.set(w, (vocab.get(w) ?? 0) + 1);
    });
  return loading;
}

function termScore(term: string, set: Set<string>) {
  const s = stem(term);
  if (set.has(s)) return 1;
  let best = 0;
  for (const w of set) {
    if (s.length >= 3 && w.startsWith(s)) best = Math.max(best, 0.7);
    else if (s.length >= 4) {
      const dist = lev(s, w);
      if (dist === 1 || (dist === 2 && s.length >= 7)) best = Math.max(best, 0.5);
    }
  }
  return best;
}

export function search(q: string) {
  const terms = words(q).flatMap((t) => SYN[t] ?? [t]);
  const phrase = norm(q).trim();
  const qt = tri(q);
  const scored = index.map(({ item, fields, tris, title }) => {
    let score = 0;
    let hits = 0;
    for (const term of terms) {
      let best = 0;
      for (const [set, weight] of fields) best = Math.max(best, termScore(term, set) * weight);
      if (best > 0) hits++;
      score += best;
    }
    if (terms.length) score *= 0.5 + 0.5 * (hits / terms.length); // reward pages that match more of the words
    if (phrase.length > 3 && title.includes(phrase)) score += 8;
    if (phrase.length > 1 && title.startsWith(phrase)) score += 4;
    // closeness by letter patterns, so even odd spellings find something
    let common = 0;
    qt.forEach((t) => tris.has(t) && common++);
    const sim = qt.size ? common / qt.size : 0;
    return { item, score, sim };
  });
  const exact = scored.filter((s) => s.score > 0.9).sort((a, b) => b.score - a.score || b.sim - a.sim);
  const close = scored.filter((s) => s.score <= 0.9).sort((a, b) => b.sim + b.score - (a.sim + a.score));
  return { exact, close: close.slice(0, exact.length ? 4 : 8) };
}

// Suggestions while typing: the best few pages, with the ones that start like the query first
export function suggest(q: string, n = 6) {
  if (norm(q).trim().length < 2) return [];
  const { exact, close } = search(q);
  const list = exact.length ? exact : close.slice(0, 3);
  const seen = new Set<string>();
  return list
    .map((r) => r.item)
    .filter((item) => !seen.has(norm(item.t)) && seen.add(norm(item.t)))
    .slice(0, n);
}

// "Did you mean": replaces words the site has never used with the closest word it has
export function didYouMean(q: string) {
  const raw = norm(q).split(/\s+/).filter(Boolean);
  let changed = false;
  const fixed = raw.map((w) => {
    if (w.length < 4 || STOP.has(w) || vocab.has(w) || SYN[w]) return w;
    let best = w;
    let bestScore = Infinity;
    for (const [v, count] of vocab) {
      const d = lev(w, v);
      const limit = w.length >= 7 ? 2 : 1;
      if (d <= limit && d - count / 1000 < bestScore) { best = v; bestScore = d - count / 1000; }
    }
    if (best !== w) changed = true;
    return best;
  });
  return changed ? fixed.join(' ') : null;
}
