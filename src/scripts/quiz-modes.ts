// Practice mode and Exam mode for the real-question quizzes (component: src/components/exam/QuizModes.astro).
// Practice: every question gets a "Reattempt" button (top right). Exam: whole-test and per-question timers, no feedback,
// no going back, then an evaluation card with a time-per-question graph. Nothing is stored anywhere: every test is one time.
// Guide: docs/19-pyq-practice.md, "Practice mode and Exam mode".
import { onPage } from './page';

type W = Record<string, string>;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e;
};

function setup(qm: HTMLElement, signal: AbortSignal) {
  const root = qm.closest<HTMLElement>('[data-pyq-mcq]');
  if (!root) return;
  const w = JSON.parse(qm.dataset.w ?? '{}') as W;
  const PER = Number(qm.dataset.per ?? 40);
  const MINS = Number(qm.dataset.mins ?? 1);
  const qs = [...root.querySelectorAll<HTMLElement>('[data-mcq]')];
  const dots = () => [...root.querySelectorAll<HTMLButtonElement>('[data-dots] button')];
  const tabs = [...qm.querySelectorAll<HTMLButtonElement>('[data-qm-mode]')];
  const hint = qm.querySelector<HTMLElement>('[data-qm-hint]')!;
  const startBox = qm.querySelector<HTMLElement>('[data-qm-start]')!;
  const clock = qm.querySelector<HTMLElement>('[data-qm-clock]')!;
  const totalEl = qm.querySelector<HTMLElement>('[data-qm-total]')!;
  const qRing = qm.querySelector<HTMLElement>('[data-qm-q]')!;
  const secEl = qm.querySelector<HTMLElement>('[data-qm-sec]')!;
  const nextBtn = qm.querySelector<HTMLButtonElement>('[data-qm-next]')!;
  const evalBox = qm.querySelector<HTMLElement>('[data-qm-eval]')!;
  // the clock sits just above the questions, so it can stay pinned to the top while they scroll
  root.querySelector('[data-run]')?.before(clock);
  const reset = (q: HTMLElement) => q.dispatchEvent(new Event('pyq-reset'));
  const goTo = (i: number) => dots()[i]?.click();

  // Practice: "Reattempt" on every question
  for (const q of qs) {
    const b = el('button', 'qm-re'); b.type = 'button';
    b.append(el('span', '', '↻'), document.createTextNode(w.reattempt));
    b.setAttribute('aria-label', w.reattempt);
    b.addEventListener('click', () => reset(q));
    q.prepend(b);
  }

  // Exam state (kept only in memory, gone when the page closes)
  let timer = 0, i = 0, tStart = 0, qStart = 0;
  let picks: number[] = [], times: number[] = [];
  const stop = () => { if (timer) clearInterval(timer); timer = 0; };
  signal.addEventListener('abort', stop);

  // in the exam, a click on an option only marks it: no right or wrong until the end
  root.addEventListener('click', (e) => {
    if (!root.classList.contains('exam-on')) return;
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-opt]');
    if (!b) return;
    e.stopPropagation(); e.preventDefault();
    const q = b.closest<HTMLElement>('[data-mcq]')!;
    q.querySelectorAll('[data-opt]').forEach((x) => x.classList.remove('picked'));
    b.classList.add('picked');
    picks[qs.indexOf(q)] = Number(b.dataset.opt);
    nextBtn.textContent = i === qs.length - 1 ? w.finish : w.next;
  }, { capture: true, signal });

  const showQ = () => {
    goTo(i);
    qStart = performance.now();
    nextBtn.textContent = i === qs.length - 1 ? w.finish : w.skip;
    tick();
  };
  const advance = () => {
    times[i] = Math.min(PER, (performance.now() - qStart) / 1000);
    i++;
    if (i >= qs.length) finish(); else showQ();
  };
  function tick() {
    const now = performance.now();
    const q = (now - qStart) / 1000;
    const left = MINS * 60 - (now - tStart) / 1000;
    totalEl.textContent = fmt(Math.max(0, Math.ceil(left)));
    secEl.textContent = String(Math.max(0, Math.ceil(PER - q)));
    qRing.classList.toggle('hot', q >= 30);
    if (left <= 0) { times[i] = Math.min(PER, q); for (let k = i + 1; k < qs.length; k++) times[k] = 0; i = qs.length; finish(); return; }
    if (q >= PER) advance();
  }
  nextBtn.addEventListener('click', () => advance());

  function start() {
    stop();
    qs.forEach(reset);
    root!.classList.remove('exam-done');
    root!.classList.add('exam-on');
    evalBox.hidden = true; startBox.hidden = true; clock.hidden = false;
    picks = qs.map(() => 0); times = qs.map(() => 0); i = 0;
    tStart = performance.now();
    showQ();
    timer = window.setInterval(tick, 200);
    root!.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function finish() {
    stop();
    root!.classList.remove('exam-on');
    root!.classList.add('exam-done');
    clock.hidden = true;
    renderEval();
  }
  function renderEval() {
    evalBox.innerHTML = '';
    const ans = qs.map((q) => Number(q.dataset.a));
    const state = picks.map((p, k) => (!p ? 'skip' : p === ans[k] || ans[k] === 0 ? 'ok' : 'no'));
    const right = state.filter((s) => s === 'ok').length;
    const used = times.reduce((a, b) => a + b, 0);
    evalBox.append(el('h2', '', w.evalH));
    const sum = el('div', 'qm-sum');
    const stat = (big: string, small: string) => { const d = el('div'); d.append(el('b', '', big), el('small', '', small)); return d; };
    sum.append(stat(`${right} / ${qs.length}`, w.score), stat(fmt(Math.round(used)), `${w.used} (${w.of} ${MINS}:00)`));
    evalBox.append(sum);
    const g = el('div', 'qm-graph'); g.setAttribute('role', 'img');
    g.setAttribute('aria-label', times.map((t, k) => `${k + 1}: ${Math.round(t)} ${w.sec}`).join(', '));
    times.forEach((t, k) => {
      const bar = el('div', `qm-bar ${state[k]}`);
      bar.style.height = `${Math.max(3, (t / PER) * 100)}%`;
      const badge = state[k] === 'ok' ? (t < 10 ? ' ⚡' : t < 30 ? ' 🎯' : '') : '';
      bar.append(el('i', '', `${Math.round(t)}${w.sec}${badge}`), el('em', '', String(k + 1)));
      g.append(bar);
    });
    const line = el('div', 'qm-line'); line.style.bottom = `${(30 / PER) * 100}%`; line.append(el('span', '', w.l30));
    g.append(line);
    evalBox.append(g);
    const leg = el('p', 'qm-legend');
    leg.append(el('span', 'ok', w.lRight), el('span', 'no', w.lWrong), el('span', '', w.lSkip));
    evalBox.append(leg);
    const fast = (lim: number, lo: number) => state.filter((s, k) => s === 'ok' && times[k] < lim && times[k] >= lo).length;
    const pats = el('ul', 'qm-pats');
    const add = (n: number, t: string) => { if (n) pats.append(el('li', '', t.replace('{n}', String(n)))); };
    add(fast(10, 0), w.p10); add(fast(30, 10), w.p30); add(fast(PER + 1, 30), w.p40);
    add(state.filter((s) => s === 'skip').length, w.pSkip);
    if (!right) pats.append(el('li', '', w.pNone));
    evalBox.append(pats);
    const acts = el('p', 'qm-acts');
    const rv = el('button', 'btn', w.review) as HTMLButtonElement; rv.type = 'button';
    const ag = el('button', 'btn ghost', w.again) as HTMLButtonElement; ag.type = 'button';
    rv.addEventListener('click', () => {
      const keep = [...picks];
      setMode('practice');
      qs.forEach((q, k) => { if (keep[k]) q.querySelector<HTMLButtonElement>(`[data-opt="${keep[k]}"]`)?.click(); });
      goTo(0); root!.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    ag.addEventListener('click', () => start());
    acts.append(rv, ag);
    evalBox.append(acts);
    evalBox.hidden = false;
    qm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setMode(m: string) {
    stop();
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.qmMode === m)));
    root!.classList.remove('exam-on', 'exam-done');
    clock.hidden = true; evalBox.hidden = true;
    qs.forEach(reset); goTo(0);
    hint.hidden = m !== 'practice';
    startBox.hidden = m !== 'exam';
  }
  tabs.forEach((t) => t.addEventListener('click', () => setMode(t.dataset.qmMode!)));
  qm.querySelector('[data-qm-go]')?.addEventListener('click', () => start());
}

onPage((signal) => {
  document.querySelectorAll<HTMLElement>('[data-qm]').forEach((q) => setup(q, signal));
});
