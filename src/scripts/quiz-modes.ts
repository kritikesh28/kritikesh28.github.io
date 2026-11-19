// Practice mode and Exam mode (component: src/components/exam/QuizModes.astro), on two kinds of quiz:
//  - 'mcq': the real-question pages. The questions are already on the page; exam mode steps through them.
//  - 'quick': the 5-question quick quiz of a flip-card deck. Practice is the normal quick quiz (with ↻ Reattempt,
//    in src/scripts/pyq.ts); exam mode draws 5 questions from the deck and runs them itself.
// Exam: whole-test and 40-second per-question timers, no feedback, no going back, then an evaluation card with a
// time-per-question graph. Nothing is stored anywhere: every test is one time. Guide: docs/19-pyq-practice.md
import { onPage } from './page';
import { quizPool, explainCard } from './pyq';

type W = Record<string, string>;
type State = 'ok' | 'no' | 'skip';
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e;
};

/** The evaluation card: score, time used, a bar per question, and a pat on the back */
function renderEval(box: HTMLElement, w: W, PER: number, MINS: number, state: State[], times: number[], acts: [string, string, () => void][]) {
  box.innerHTML = '';
  const right = state.filter((s) => s === 'ok').length;
  const used = times.reduce((a, b) => a + b, 0);
  box.append(el('h2', '', w.evalH));
  const sum = el('div', 'qm-sum');
  const stat = (big: string, small: string) => { const d = el('div'); d.append(el('b', '', big), el('small', '', small)); return d; };
  sum.append(stat(`${right} / ${state.length}`, w.score), stat(fmt(Math.round(used)), `${w.used} (${w.of} ${MINS}:00)`));
  box.append(sum);
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
  box.append(g);
  const leg = el('p', 'qm-legend');
  leg.append(el('span', 'ok', w.lRight), el('span', 'no', w.lWrong), el('span', '', w.lSkip));
  box.append(leg);
  const fast = (lim: number, lo: number) => state.filter((s, k) => s === 'ok' && times[k] < lim && times[k] >= lo).length;
  const pats = el('ul', 'qm-pats');
  const add = (n: number, t: string) => { if (n) pats.append(el('li', '', t.replace('{n}', String(n)))); };
  add(fast(10, 0), w.p10); add(fast(30, 10), w.p30); add(fast(PER + 1, 30), w.p40);
  add(state.filter((s) => s === 'skip').length, w.pSkip);
  if (!right) pats.append(el('li', '', w.pNone));
  box.append(pats);
  const row = el('p', 'qm-acts');
  acts.forEach(([label, cls, fn]) => { const b = el('button', cls, label) as HTMLButtonElement; b.type = 'button'; b.addEventListener('click', fn); row.append(b); });
  box.append(row);
  box.hidden = false;
}

function setup(qm: HTMLElement, signal: AbortSignal) {
  const quick = qm.dataset.kind === 'quick';
  const root = qm.closest<HTMLElement>(quick ? '[data-pyq-set]' : '[data-pyq-mcq]');
  if (!root) return;
  const w = JSON.parse(qm.dataset.w ?? '{}') as W;
  const PER = Number(qm.dataset.per ?? 40);
  const MINS = Number(qm.dataset.mins ?? 1);
  const tabs = [...qm.querySelectorAll<HTMLButtonElement>('[data-qm-mode]')];
  const hint = qm.querySelector<HTMLElement>('[data-qm-hint]')!;
  const startBox = qm.querySelector<HTMLElement>('[data-qm-start]')!;
  const clock = qm.querySelector<HTMLElement>('[data-qm-clock]')!;
  const totalEl = qm.querySelector<HTMLElement>('[data-qm-total]')!;
  const qRing = qm.querySelector<HTMLElement>('[data-qm-q]')!;
  const secEl = qm.querySelector<HTMLElement>('[data-qm-sec]')!;
  const nextBtn = qm.querySelector<HTMLButtonElement>('[data-qm-next]')!;
  const evalBox = qm.querySelector<HTMLElement>('[data-qm-eval]')!;
  const runBox = qm.querySelector<HTMLElement>('[data-qm-run]')!;

  // ---- the questions, for each kind
  const mcqs = quick ? [] : [...root.querySelectorAll<HTMLElement>('[data-mcq]')];
  const reset = (q: HTMLElement) => q.dispatchEvent(new Event('pyq-reset'));
  const goTo = (i: number) => [...root.querySelectorAll<HTMLButtonElement>('[data-dots] button')][i]?.click();
  let items: { key: string; q: string; a: string; opts: string[] }[] = [];
  const count = () => (quick ? items.length : mcqs.length);

  if (!quick) {
    // Practice: "Reattempt" on every real question
    for (const q of mcqs) {
      const b = el('button', 'qm-re'); b.type = 'button';
      b.append(el('span', '', '↻'), document.createTextNode(w.reattempt));
      b.setAttribute('aria-label', w.reattempt);
      b.addEventListener('click', () => reset(q));
      q.prepend(b);
    }
    // the clock sits just above the questions, so it can stay pinned to the top while they scroll
    root.querySelector('[data-run]')?.before(clock);
  }

  // ---- exam state (kept only in memory, gone when the page closes)
  let timer = 0, i = 0, tStart = 0, qStart = 0;
  let picks: number[] = [], times: number[] = [];
  const stop = () => { if (timer) clearInterval(timer); timer = 0; };
  signal.addEventListener('abort', stop);
  const label = () => (i === count() - 1 ? w.finish : picks[i] ? w.next : w.skip);

  // real questions: in the exam, a click on an option only marks it
  if (!quick) root.addEventListener('click', (e) => {
    if (!root.classList.contains('exam-on')) return;
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-opt]');
    if (!b) return;
    e.stopPropagation(); e.preventDefault();
    const q = b.closest<HTMLElement>('[data-mcq]')!;
    q.querySelectorAll('[data-opt]').forEach((x) => x.classList.remove('picked'));
    b.classList.add('picked');
    picks[mcqs.indexOf(q)] = Number(b.dataset.opt);
    nextBtn.textContent = label();
  }, { capture: true, signal });

  // quick quiz: draw question i ourselves
  const drawQuick = () => {
    runBox.innerHTML = '';
    const it = items[i];
    const card = el('div', 'pq-qcard');
    const top = el('div', 'pq-qtop'); top.append(el('span', '', `${i + 1} / ${items.length}`));
    const ul = el('ul', 'pq-opts');
    it.opts.forEach((o, n) => {
      const li = el('li'); const b = el('button') as HTMLButtonElement; b.type = 'button';
      b.append(el('span', 'k', 'ABCD'[n]), el('span', '', o));
      b.addEventListener('click', () => { ul.querySelectorAll('button').forEach((x) => x.classList.remove('picked')); b.classList.add('picked'); picks[i] = n + 1; nextBtn.textContent = label(); });
      li.append(b); ul.append(li);
    });
    card.append(top, el('p', 'q', it.q), ul);
    runBox.append(card);
  };

  const showQ = () => {
    if (quick) drawQuick(); else goTo(i);
    qStart = performance.now();
    nextBtn.textContent = label();
    tick();
  };
  const advance = () => {
    times[i] = Math.min(PER, (performance.now() - qStart) / 1000);
    i++;
    if (i >= count()) finish(); else showQ();
  };
  function tick() {
    const now = performance.now();
    const q = (now - qStart) / 1000;
    const left = MINS * 60 - (now - tStart) / 1000;
    totalEl.textContent = fmt(Math.max(0, Math.ceil(left)));
    secEl.textContent = String(Math.max(0, Math.ceil(PER - q)));
    qRing.classList.toggle('hot', q >= 30);
    if (left <= 0) { times[i] = Math.min(PER, q); for (let k = i + 1; k < count(); k++) times[k] = 0; i = count(); finish(); return; }
    if (q >= PER) advance();
  }
  nextBtn.addEventListener('click', () => advance());

  function start() {
    stop();
    if (quick) items = quizPool(root!, 5); else mcqs.forEach(reset);
    root!.classList.remove('exam-done');
    root!.classList.add('exam-on');
    evalBox.hidden = true; startBox.hidden = true; clock.hidden = false; runBox.hidden = !quick;
    picks = Array(count()).fill(0); times = Array(count()).fill(0); i = 0;
    tStart = performance.now();
    showQ();
    timer = window.setInterval(tick, 200);
    (quick ? qm : root!).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function finish() {
    stop();
    root!.classList.remove('exam-on');
    root!.classList.add('exam-done');
    clock.hidden = true; runBox.hidden = true;
    const state: State[] = quick
      ? picks.map((p, k) => (!p ? 'skip' : items[k].opts[p - 1] === items[k].a ? 'ok' : 'no'))
      : picks.map((p, k) => { const a = Number(mcqs[k].dataset.a); return !p ? 'skip' : p === a || a === 0 ? 'ok' : 'no'; });
    const review = () => {
      if (quick) {
        // the answers, one line each
        runBox.innerHTML = '';
        const ul = el('ul', 'qm-review');
        items.forEach((it, k) => {
          const li = el('li'); li.append(el('p', 'q', `${k + 1}. ${it.q}`));
          const mine = picks[k] ? it.opts[picks[k] - 1] : '—';
          li.append(el('p', state[k], `${state[k] === 'ok' ? '✓' : state[k] === 'no' ? '✗' : '·'} ${mine}`));
          if (state[k] !== 'ok') li.append(el('p', 'ok', `✓ ${it.a}`));
          const ex = explainCard(root!, it.key, root!.querySelector<HTMLElement>('[data-quiz]')?.dataset.tExp ?? 'Explanation');
          if (ex) { ex.querySelector('details.pq-bg')?.removeAttribute('open'); li.append(ex); }
          ul.append(li);
        });
        runBox.append(ul); runBox.hidden = false;
        runBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const keep = [...picks];
        setMode('practice');
        mcqs.forEach((q, k) => { if (keep[k]) q.querySelector<HTMLButtonElement>(`[data-opt="${keep[k]}"]`)?.click(); });
        goTo(0); root!.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    renderEval(evalBox, w, PER, MINS, state, times, [[w.review, 'btn', review], [w.again, 'btn ghost', () => start()]]);
    qm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setMode(m: string) {
    stop();
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.qmMode === m)));
    root!.classList.remove('exam-on', 'exam-done');
    root!.classList.toggle('qm-exam-tab', quick && m === 'exam');
    clock.hidden = true; evalBox.hidden = true; runBox.hidden = true;
    if (!quick) { mcqs.forEach(reset); goTo(0); }
    hint.hidden = m !== 'practice';
    startBox.hidden = m !== 'exam';
  }
  tabs.forEach((t) => t.addEventListener('click', () => setMode(t.dataset.qmMode!)));
  // leaving the quick quiz for the flip cards ends any test
  if (quick) root.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((t) => t.addEventListener('click', () => setMode('practice')));
  qm.querySelector('[data-qm-go]')?.addEventListener('click', () => start());
}

onPage((signal) => {
  document.querySelectorAll<HTMLElement>('[data-qm]').forEach((q) => setup(q, signal));
});
