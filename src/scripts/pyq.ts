// PYQ practice: flip cards, quick quiz, real exam questions and the "mastered" meters.
// Progress is kept only in this browser (localStorage "cs-pyq-v1"); nothing is sent anywhere.
// Guide: docs/19-pyq-practice.md
import { onPage } from './page';

const KEY = 'cs-pyq-v1';
type Store = Record<string, Record<string, 1>>;
function load(): Store {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') as Store; } catch { return {}; }
}
function save(s: Store) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private window: progress just isn't kept */ }
}
const known = (bank: string) => load()[bank] ?? {};
function setKnown(bank: string, key: string, on: boolean) {
  const s = load();
  s[bank] ??= {};
  if (on) s[bank][key] = 1; else delete s[bank][key];
  save(s);
}
const shuffle = <T,>(a: T[]) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fill = (el: Element | null, n: number, of: number) => { if (el instanceof HTMLElement) el.style.width = `${of ? Math.round((n / of) * 100) : 0}%`; };

/** Screens: show one [data-screen] at a time, with numbered tabs and previous / next */
function screens(root: HTMLElement, onShow?: (i: number) => void) {
  const list = [...root.querySelectorAll<HTMLElement>(':scope [data-screen]')];
  const dots = root.querySelector<HTMLElement>('[data-dots]');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const where = root.querySelector<HTMLElement>('[data-where]');
  if (!list.length) return;
  let cur = 0;
  const label = root.dataset.screenLabel ?? 'Screen';
  if (dots) {
    dots.innerHTML = '';
    list.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = String(i + 1); b.setAttribute('aria-label', `${label} ${i + 1}`);
      b.addEventListener('click', () => show(i, true));
      dots.append(b);
    });
  }
  function show(i: number, scroll = false) {
    cur = Math.max(0, Math.min(list.length - 1, i));
    list.forEach((s, k) => (s.hidden = k !== cur));
    dots?.querySelectorAll('button').forEach((b, k) => { b.setAttribute('aria-current', String(k === cur)); if (k < cur) b.classList.add('done'); });
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur === list.length - 1;
    if (where) where.textContent = `${cur + 1} / ${list.length}`;
    if (scroll) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onShow?.(cur);
  }
  prev?.addEventListener('click', () => show(cur - 1, true));
  next?.addEventListener('click', () => show(cur + 1, true));
  show(0);
  return { show, count: list.length, get cur() { return cur; } };
}

// ------------------------------------------------------------------ flip-card set page
function setPage(root: HTMLElement, signal: AbortSignal) {
  const bank = root.dataset.bank!;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-card]')];
  const meterTxt = root.querySelector<HTMLElement>('[data-meter-text]');
  const meterFill = root.querySelector('[data-meter-fill]');
  const tpl = root.dataset.meter ?? '{n} of {t} mastered';
  const refresh = () => {
    const k = known(bank);
    let n = 0;
    for (const c of cards) { const on = !!k[c.dataset.key!]; c.classList.toggle('known', on); if (on) n++; }
    if (meterTxt) meterTxt.textContent = tpl.replace('{n}', String(n)).replace('{t}', String(cards.length));
    fill(meterFill, n, cards.length);
  };
  for (const c of cards) {
    const front = c.querySelector<HTMLElement>('.front');
    const flip = () => c.classList.toggle('flipped');
    front?.addEventListener('click', flip);
    front?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    c.querySelector('.back')?.addEventListener('click', (e) => { if (!(e.target as HTMLElement).closest('button')) flip(); });
    c.querySelector('[data-ok]')?.addEventListener('click', () => { setKnown(bank, c.dataset.key!, true); c.classList.remove('flipped'); refresh(); });
    c.querySelector('[data-again]')?.addEventListener('click', () => { setKnown(bank, c.dataset.key!, false); c.classList.remove('flipped'); refresh(); });
  }
  refresh();
  const flipBox = root.querySelector<HTMLElement>('[data-flip]');
  if (flipBox) screens(flipBox);

  // mode tabs: Flip cards / Quick quiz
  const quiz = root.querySelector<HTMLElement>('[data-quiz]');
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const setMode = (m: string) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.mode === m)));
    if (flipBox) flipBox.hidden = m !== 'cards';
    quiz?.classList.toggle('on', m === 'quiz');
    if (m === 'quiz' && quiz) startQuiz(quiz, cards, bank, refresh);
  };
  tabs.forEach((t) => t.addEventListener('click', () => setMode(t.dataset.mode!)));
  if (location.hash === '#quiz') setMode('quiz');
  addEventListener('storage', refresh, { signal });
}

function startQuiz(box: HTMLElement, cards: HTMLElement[], bank: string, refresh: () => void) {
  const W = { q: box.dataset.tQ ?? 'Question', right: box.dataset.tRight ?? 'Right!', wrong: box.dataset.tWrong ?? 'Not quite. The answer is', next: box.dataset.tNext ?? 'Next', again: box.dataset.tAgain ?? 'Play 5 more', score: box.dataset.tScore ?? 'You got {s} out of {t}.' };
  const all = cards.map((c) => ({ key: c.dataset.key!, q: c.dataset.q!, a: c.dataset.a! }));
  const answers = [...new Set(all.map((x) => x.a))];
  // the ones not mastered come first
  const k = known(bank);
  const pool = [...shuffle(all.filter((x) => !k[x.key])), ...shuffle(all.filter((x) => k[x.key]))].slice(0, 5);
  let i = 0, score = 0;
  const render = () => {
    box.innerHTML = '';
    if (i >= pool.length) {
      const s = document.createElement('div'); s.className = 'pq-score';
      s.innerHTML = `<p class="big">${score} / ${pool.length}</p><p></p>`;
      s.querySelector('p:last-child')!.textContent = W.score.replace('{s}', String(score)).replace('{t}', String(pool.length));
      const b = document.createElement('button'); b.className = 'btn'; b.type = 'button'; b.textContent = W.again;
      b.addEventListener('click', () => startQuiz(box, cards, bank, refresh));
      s.append(b); box.append(s); return;
    }
    const item = pool[i];
    const wrong = shuffle(answers.filter((a) => a !== item.a)).slice(0, 3);
    const opts = shuffle([item.a, ...wrong]);
    const card = document.createElement('div'); card.className = 'pq-qcard';
    const top = document.createElement('div'); top.className = 'pq-qtop';
    top.innerHTML = '<span></span><span></span>';
    top.children[0].textContent = `${W.q} ${i + 1} / ${pool.length}`;
    top.children[1].textContent = `★ ${score}`;
    const q = document.createElement('p'); q.className = 'q'; q.textContent = item.q;
    const ul = document.createElement('ul'); ul.className = 'pq-opts';
    const say = document.createElement('p'); say.className = 'pq-say'; say.setAttribute('aria-live', 'polite');
    const nx = document.createElement('button'); nx.className = 'btn'; nx.type = 'button'; nx.textContent = W.next; nx.hidden = true;
    nx.addEventListener('click', () => { i++; render(); });
    opts.forEach((o, n) => {
      const li = document.createElement('li');
      const b = document.createElement('button'); b.type = 'button';
      const kk = document.createElement('span'); kk.className = 'k'; kk.textContent = 'ABCD'[n];
      const t = document.createElement('span'); t.textContent = o;
      b.append(kk, t);
      b.addEventListener('click', () => {
        ul.querySelectorAll('button').forEach((x) => (x.disabled = true));
        const ok = o === item.a;
        if (ok) { score++; setKnown(bank, item.key, true); refresh(); }
        b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) ul.querySelectorAll('button').forEach((x) => { if (x.lastChild?.textContent === item.a) x.classList.add('right'); });
        say.className = `pq-say ${ok ? 'good' : 'bad'}`;
        say.textContent = ok ? W.right : `${W.wrong} “${item.a}”.`;
        top.children[1].textContent = `★ ${score}`;
        nx.hidden = false; nx.focus();
      });
      li.append(b); ul.append(li);
    });
    card.append(top, q, ul, say, nx);
    box.append(card);
  };
  render();
}

// ------------------------------------------------------------------ real exam questions
function mcqPage(root: HTMLElement) {
  const bank = root.dataset.bank!;
  const qs = [...root.querySelectorAll<HTMLElement>('[data-mcq]')];
  const scoreEl = root.querySelector<HTMLElement>('[data-score]');
  const W = { right: root.dataset.tRight ?? 'Right!', wrong: root.dataset.tWrong ?? 'Not this one. The answer is option', score: root.dataset.tScore ?? 'Score' };
  let score = 0, done = 0;
  const upd = () => { if (scoreEl) scoreEl.textContent = `${W.score}: ${score} / ${done}`; };
  for (const q of qs) {
    const a = Number(q.dataset.a);
    const btns = [...q.querySelectorAll<HTMLButtonElement>('[data-opt]')];
    const say = q.querySelector<HTMLElement>('.pq-say');
    const ans = q.querySelector<HTMLElement>('.ans');
    btns.forEach((b) => b.addEventListener('click', () => {
      if (q.classList.contains('answered')) return;
      q.classList.add('answered');
      const pick = Number(b.dataset.opt);
      const ok = pick === a || a === 0;
      btns.forEach((x) => { x.disabled = true; if (Number(x.dataset.opt) === a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      done++; if (ok) score++; upd();
      if (ok) for (const k of (q.dataset.keys ?? '').split(' ').filter(Boolean)) setKnown(bank, k, true);
      if (say) { say.className = `pq-say ${ok ? 'good' : 'bad'}`; say.textContent = ok ? W.right : `${W.wrong} (${a}).`; }
      ans?.classList.add('shown'); if (ans instanceof HTMLDetailsElement) ans.open = true;
    }));
    // questions printed without separate options: "Show answer"
    q.querySelector('details.ans')?.addEventListener('toggle', () => q.classList.add('answered'));
  }
  const box = root.querySelector<HTMLElement>('[data-run]');
  if (box) screens(box);
  upd();
}

// ------------------------------------------------------------------ bank home: a meter on every tile
function homePage(root: HTMLElement) {
  const bank = root.dataset.bank!;
  const k = known(bank);
  const keys = Object.keys(k);
  let total = 0, have = 0;
  root.querySelectorAll<HTMLElement>('[data-sub]').forEach((t) => {
    const slug = t.dataset.sub!, n = Number(t.dataset.n);
    const got = keys.filter((x) => x.startsWith(`${slug}:`)).length;
    total += n; have += got;
    fill(t.querySelector('[data-mini]'), got, n);
    const lab = t.querySelector<HTMLElement>('[data-got]');
    if (lab && got) lab.textContent = (root.dataset.got ?? '{n} mastered').replace('{n}', String(got));
  });
  const mt = root.querySelector<HTMLElement>('[data-meter-text]');
  if (mt) mt.textContent = (root.dataset.meter ?? '{n} of {t} mastered').replace('{n}', String(have)).replace('{t}', String(total));
  fill(root.querySelector('[data-meter-fill]'), have, total);
}

onPage((signal) => {
  document.querySelectorAll<HTMLElement>('[data-pyq-set]').forEach((r) => setPage(r, signal));
  document.querySelectorAll<HTMLElement>('[data-pyq-mcq]').forEach((r) => mcqPage(r));
  document.querySelectorAll<HTMLElement>('[data-pyq-home]').forEach((r) => homePage(r));
});
