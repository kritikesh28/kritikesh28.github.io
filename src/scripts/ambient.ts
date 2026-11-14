// The sound of the nest: soft sparrow chirps in little groups, from left and right, and nothing else
// (Kritikesh's choice, 14 Nov 2026: no flute; the chirps must carry on without a break from page to page).
// Everything is made live in the browser with the Web Audio API: no sound files, nothing downloaded, nothing tracked.
//
// Carrying on across pages: every page of the site is a separate page load, so the sound has to start again on each one.
// To make that unnoticeable, the chirps never fade in again after the first page of a visit, and the next group of chirps
// keeps the timing it had on the page before (both are kept in sessionStorage, so only for this tab and this visit).
// Chirps come in short groups with quiet gaps between them, so a page change falls in a gap and is not heard.
// Chrome, Edge and Android allow the sound to go on straight away once the visitor has tapped anywhere on the site;
// Safari and Firefox may wait for a tap on each new page.
//
// It is on by default. The speaker button in the top bar switches it off; that choice is remembered in this browser only (see /privacy/).
// Guide: docs/17-library-map.md, "The background sound".

const KEY = 'cs-ambient';
const LIVE = 'cs-ambient-live'; // sessionStorage: { next: time of the next group of chirps, in ms since 1970 }
// Overall loudness, from 0 to 1. Low on purpose, so it stays in the background. Raise it for louder, lower it for softer.
export const LEVEL = 0.15;

type Nodes = { ctx: AudioContext; master: GainNode; timer?: number; nextAt: number };
let n: Nodes | null = null;
let playing = false;

const pref = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (v: 'on' | 'off') => { try { localStorage.setItem(KEY, v); } catch {} };
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const readLive = (): { next: number } | null => { try { return JSON.parse(sessionStorage.getItem(LIVE) || 'null'); } catch { return null; } };
const writeLive = (v: { next: number } | null) => { try { v ? sessionStorage.setItem(LIVE, JSON.stringify(v)) : sessionStorage.removeItem(LIVE); } catch {} };

function build(): Nodes {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const nodes: Nodes = { ctx, master, nextAt: Date.now() + 1800 };

  // One chirp: a short rising-falling whistle (the timing and shape are his choice: keep them)
  const chirp = (t0: number, pan: number) => {
    const o = ctx.createOscillator(); o.type = 'sine';
    const f = rand(3400, 4600);
    o.frequency.setValueAtTime(f, t0);
    o.frequency.exponentialRampToValueAtTime(f * rand(1.15, 1.4), t0 + 0.035);
    o.frequency.exponentialRampToValueAtTime(f * rand(0.7, 0.85), t0 + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(rand(0.5, 1), t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.1);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.8;
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) { p.pan.value = pan; o.connect(g).connect(bp).connect(p).connect(master); } else o.connect(g).connect(bp).connect(master);
    o.start(t0); o.stop(t0 + 0.12);
  };
  // A group of 2 to 5 chirps from one side, then a gap of 3.5 to 11 seconds
  const flock = () => {
    const t0 = ctx.currentTime + 0.05;
    const pan = rand(-0.8, 0.8);
    const k = Math.floor(rand(2, 6));
    for (let i = 0; i < k; i++) chirp(t0 + i * rand(0.11, 0.2), pan + rand(-0.1, 0.1));
    schedule(rand(3500, 11000));
  };
  const schedule = (inMs: number) => {
    window.clearTimeout(nodes.timer);
    nodes.nextAt = Date.now() + inMs;
    if (playing) writeLive({ next: nodes.nextAt });
    nodes.timer = window.setTimeout(flock, inMs);
  };
  // Keep the rhythm of the page before: the next group comes when it was due there (or soon, if that time has passed)
  const prev = readLive();
  schedule(prev ? Math.min(11000, Math.max(250, prev.next - Date.now())) : 1800);
  return nodes;
}

function fade(to: number, seconds: number) {
  if (!n) return;
  const g = n.master.gain;
  const t = n.ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value, t);
  if (seconds <= 0) g.setValueAtTime(to, t); else g.linearRampToValueAtTime(to, t + seconds);
}

function paint() {
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) => b.setAttribute('aria-pressed', String(playing)));
}

async function play(): Promise<boolean> {
  const carryOn = !!readLive(); // it was already playing on the page before, in this visit
  try {
    if (!n) n = build();
    await n.ctx.resume();
    if (n.ctx.state !== 'running') { playing = false; paint(); return false; }
    playing = true;
    fade(LEVEL, carryOn ? 0 : 3);
    writeLive({ next: n.nextAt });
  } catch { playing = false; }
  paint();
  return playing;
}

function pause() {
  playing = false;
  writeLive(null);
  if (n) {
    fade(0, 0.8);
    const ctx = n.ctx;
    window.setTimeout(() => { if (!playing) ctx.suspend(); }, 900);
  }
  paint();
}

export function initAmbient() {
  if (!('AudioContext' in window || 'webkitAudioContext' in window)) {
    document.querySelectorAll<HTMLElement>('[data-ambient]').forEach((b) => (b.hidden = true));
    return;
  }
  paint();
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) =>
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (playing) { pause(); remember('off'); } else { play(); remember('on'); }
    }),
  );
  // On by default: unless this visitor switched it off before, start now if the browser allows it,
  // otherwise on the first tap, click or key press anywhere on the page
  if (pref() !== 'off') {
    const first = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.('[data-ambient]')) return;
      ['pointerdown', 'keydown', 'touchend'].forEach((t) => removeEventListener(t, first, true));
      if (pref() !== 'off' && !playing) play();
    };
    ['pointerdown', 'keydown', 'touchend'].forEach((t) => addEventListener(t, first, true));
    play();
  }
  // Quiet while the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (!n || !playing) return;
    if (document.hidden) n.ctx.suspend(); else n.ctx.resume();
  });
}
