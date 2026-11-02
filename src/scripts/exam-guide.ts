// The Exam Guide: pick an exam and your time, get a ranked list of topics.
// Reads /exam-prep/guide.json (made by tools/exam-prep/build_data.py from the Exam Guide sheet).
// View only: nothing is saved or sent. The choices live in the page address so a plan can be shared.
// The maths is the same as in the sheet (docs/14-exam-prep.md, "How the ranking works").

type Exam = { gov: string; agency: string; bank: string; name: string; key: string; alias: string; papers: number; years: string; questions: number; syllabus: boolean; qpp: number };
type Guide = {
  subjects: [string, string, string][]; exams: Exam[]; units: [string, number, string, string, string][];
  score: Record<string, number[]>; hits: Record<string, Record<string, number>>; last: Record<string, Record<string, number>>;
  hits_all: number[]; papers: unknown[]; missing: unknown[]; questions: number;
};
export type Item = { rank: number; u: number; id: string; s: number; t: string; major: string; q: number; here: number; all: number; last: number; stars: number; due?: Date };
export type Plan = {
  exam: Exam; items: Item[]; ranked: number; n: number; n85: number; cap?: number; covered: number; days?: number; msLeft?: number; perDay?: number;
};

let data: Guide | undefined;
export async function loadGuide() {
  data ??= await fetch('/exam-prep/guide.json').then((r) => r.json());
  return data!;
}

export const norm = (s: string) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
function lev(a: string, b: string) {
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

/** Typo-tolerant exam finder: "patwri", "sub inspecter", "1st grade" all work. */
export function findExams(g: Guide, query: string) {
  const qw = norm(query).split(' ').filter(Boolean);
  if (!qw.length) return [];
  return g.exams
    .map((e, i) => {
      const words = norm(`${e.name} ${e.alias} ${e.agency} ${e.bank}`).split(' ');
      let sc = 0;
      for (const w of qw) {
        let best = 0;
        for (const v of words) {
          if (v === w) best = Math.max(best, 3);
          else if (v.startsWith(w) && w.length >= 2) best = Math.max(best, 2);
          else if (w.length >= 4 && Math.abs(v.length - w.length) <= 2 && lev(w, v) <= (w.length >= 7 ? 2 : 1)) best = Math.max(best, 1.5);
        }
        sc += best;
      }
      return { i, e, sc: sc / qw.length + (e.papers ? 0.1 : 0) };
    })
    .filter((x) => x.sc >= 1.2)
    .sort((a, b) => b.sc - a.sc)
    .slice(0, 8);
}

/** Recommended plan: ~2 focused hours per topic at 75% efficiency, the last 20% of days kept for revision,
 *  capped at the topics that together covered 85% of past questions. */
export function buildPlan(g: Guide, examIndex: number, opts: { deadline?: Date; hours: number; topN?: number; now?: Date }): Plan {
  const exam = g.exams[examIndex];
  const k = exam.key;
  const sc = g.score[k];
  const order = sc.map((v, i) => [v, i] as const).filter(([v]) => v > 0).sort((a, b) => b[0] - a[0]);
  const total = order.reduce((a, [v]) => a + v, 0) || 1;
  let cum = 0;
  let n85 = order.length;
  for (let r = 0; r < order.length; r++) {
    cum += order[r][0];
    if (cum / total >= 0.85) { n85 = r + 1; break; }
  }
  const now = opts.now ?? new Date();
  let days: number | undefined, cap: number | undefined, msLeft: number | undefined;
  if (opts.deadline) {
    msLeft = opts.deadline.getTime() - now.getTime();
    days = Math.max(0, msLeft / 864e5);
    cap = Math.max(1, Math.floor(days * 0.8 * opts.hours * 0.75 * 60 / 120));
  }
  let n = cap === undefined ? n85 : Math.max(Math.min(10, n85), Math.min(cap, n85));
  if (opts.topN && opts.topN > 0) n = Math.min(order.length, Math.round(opts.topN));
  const studyDays = days !== undefined ? Math.max(1, days * 0.8) : undefined;
  const items: Item[] = order.map(([v, u], r) => {
    const [id, s, t, l1, l1t] = g.units[u];
    const pct = (r + 1) / order.length;
    return {
      rank: r + 1, u, id, s, t, major: id === l1 ? '' : l1t, q: v * exam.qpp,
      here: g.hits[k]?.[u] ?? 0, all: g.hits_all[u] ?? 0, last: g.last[k]?.[u] ?? 0,
      stars: pct <= 0.05 ? 5 : pct <= 0.15 ? 4 : pct <= 0.35 ? 3 : pct <= 0.6 ? 2 : 1,
      due: studyDays !== undefined && r < n ? new Date(now.getTime() + Math.ceil(((r + 1) * studyDays) / n) * 864e5) : undefined,
    };
  });
  const covered = order.slice(0, n).reduce((a, [v]) => a + v, 0) / total;
  return { exam, items, ranked: order.length, n, n85, cap, covered, days, msLeft, perDay: studyDays ? n / studyDays : undefined };
}

export const slugId = (id: string) => id.toLowerCase().replaceAll('.', '-');
export function topicUrl(g: Guide, id: string, s: number) {
  const l1 = id.match(/^[A-Z]{3}-\d+/)?.[0] ?? id;
  return `/exam-prep/curriculum-index/${g.subjects[s][0]}/${slugId(l1)}/${l1 === id ? '' : '#' + slugId(id)}`;
}
