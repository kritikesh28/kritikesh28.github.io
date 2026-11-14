// The sound of the nest: soft sparrow chirps now and then, nothing else (no wind or hum, his choice on 14 Nov 2026).
// Everything is made live in the browser with the Web Audio API: no sound files, nothing downloaded, nothing tracked.
// Browsers only allow sound after a tap or key press, so it fades in on the visitor's first tap.
// The speaker button in the top bar pauses it; that choice is remembered in this browser only (see /privacy/).
// Guide: docs/17-library-map.md, "The background sound".

const KEY = 'cs-ambient';
const LEVEL = 0.05; // overall loudness: very dim on purpose

type Nodes = { ctx: AudioContext; master: GainNode; timers: number[] };
let n: Nodes | null = null;
let playing = false;

const pref = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (v: 'on' | 'off') => { try { localStorage.setItem(KEY, v); } catch {} };
const rand = (a: number, b: number) => a + Math.random() * (b - a);

function build(): Nodes {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const timers: number[] = [];

  // Sparrows: short rising-falling chirps in little groups, from left and right
  const chirp = (t0: number, pan: number) => {
    const o = ctx.createOscillator(); o.type = 'sine';
    const f = rand(3400, 4600);
    o.frequency.setValueAtTime(f, t0);
    o.frequency.exponentialRampToValueAtTime(f * rand(1.15, 1.4), t0 + 0.035);
    o.frequency.exponentialRampToValueAtTime(f * rand(0.7, 0.85), t0 + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(rand(0.05, 0.11), t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.1);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.8;
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) { p.pan.value = pan; o.connect(g).connect(bp).connect(p).connect(master); } else o.connect(g).connect(bp).connect(master);
    o.start(t0); o.stop(t0 + 0.12);
  };
  const flock = () => {
    const t0 = ctx.currentTime + 0.05;
    const pan = rand(-0.8, 0.8);
    const k = Math.floor(rand(2, 6));
    for (let i = 0; i < k; i++) chirp(t0 + i * rand(0.11, 0.2), pan + rand(-0.1, 0.1));
    timers.push(window.setTimeout(flock, rand(3500, 11000)));
  };
  timers.push(window.setTimeout(flock, 1800));
  return { ctx, master, timers };
}

function fade(to: number, seconds: number) {
  if (!n) return;
  const g = n.master.gain;
  const t = n.ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value, t);
  g.linearRampToValueAtTime(to, t + seconds);
}

function paint() {
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) => b.setAttribute('aria-pressed', String(playing)));
}

async function play() {
  try {
    if (!n) n = build();
    await n.ctx.resume();
    fade(LEVEL, 5);
    playing = true;
  } catch { playing = false; }
  paint();
}

function pause() {
  if (n) {
    fade(0, 0.8);
    const ctx = n.ctx;
    window.setTimeout(() => { if (!playing) ctx.suspend(); }, 900);
  }
  playing = false;
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
  // Fade in on the first tap or key press, unless this visitor paused it before
  if (pref() !== 'off') {
    const first = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.('[data-ambient]')) return;
      ['pointerdown', 'keydown'].forEach((t) => removeEventListener(t, first, true));
      if (pref() !== 'off' && !playing) play();
    };
    ['pointerdown', 'keydown'].forEach((t) => addEventListener(t, first, true));
  }
  // Quiet while the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (!n || !playing) return;
    if (document.hidden) n.ctx.suspend(); else n.ctx.resume();
  });
}
