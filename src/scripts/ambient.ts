// Background music: a soft bamboo-flute track with birdsong (public/audio/flute-and-birds.mp3), played very quietly on a loop,
// like music in the background of a cinema foyer. Kritikesh chose this track on 14 Nov 2026 ("Nature Bird Bamboo Flute Morning
// Relaxing Music", shared as copyright-free by its creator, Sujan). The file was loudness-levelled to about -16 LUFS, 80 kbps (about 3 MB).
//
// One melody for the whole visit, without a break from page to page (his wish, 14 Nov 2026):
// pages change without reloading (Astro's ClientRouter in src/layouts/Base.astro), and this module runs only once per visit,
// so the one Audio element below simply keeps playing while the pages change around it.
// If a page does reload (an old browser, or a page outside the site's frame), the tab remembers where the music had got to
// (sessionStorage, this tab only), and it carries on from there without fading in again.
//
// It is on by default. Browsers only allow sound after a tap or key press, so it starts at once where the browser allows it,
// and otherwise on the visitor's first tap, click or key press. Until then the speaker button glows and shows a small hint. The file is only fetched when it starts playing.
// The speaker button in the top bar switches it off; that choice is remembered in this browser only (see /privacy/).
// Guide: docs/17-library-map.md, "The background sound".

const KEY = 'cs-ambient';
const LIVE = 'cs-ambient-live'; // sessionStorage: { t: seconds into the track, at: when that was, in ms since 1970 }
const SRC = '/audio/flute-and-birds.mp3';
// Volume, from 0 to 1. 0.2 is low and in the background (about -30 LUFS on average): you notice it in a quiet room,
// and it never gets in the way of reading. Raise it for louder, lower it for softer.
export const LEVEL = 0.2;

let audio: HTMLAudioElement | null = null;
let playing = false;
let fadeTimer: number | undefined;
let started = false; // the once-per-visit listeners are in place

const pref = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (v: 'on' | 'off') => { try { localStorage.setItem(KEY, v); } catch {} };
const readLive = (): { t: number; at: number } | null => { try { return JSON.parse(sessionStorage.getItem(LIVE) || 'null'); } catch { return null; } };
const writeLive = () => { try { if (playing && audio) sessionStorage.setItem(LIVE, JSON.stringify({ t: audio.currentTime, at: Date.now() })); else sessionStorage.removeItem(LIVE); } catch {} };

let waiting = false; // on by default, but the browser is still waiting for the visitor's first tap

function paint() {
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) => {
    b.setAttribute('aria-pressed', String(playing));
    // While the browser holds the sound back, the speaker button glows softly and shows a small hint
    // ("Tap anywhere for music"), so visitors know the music is there (Kritikesh's wish, 23 Nov 2026).
    if (waiting && !playing) b.dataset.waiting = ''; else delete b.dataset.waiting;
  });
}

/** Moves the volume smoothly to `to` over `ms` milliseconds, then runs `done`. */
function fade(to: number, ms: number, done?: () => void) {
  if (!audio) return;
  window.clearInterval(fadeTimer);
  const a = audio;
  if (ms <= 0) { a.volume = to; done?.(); return; }
  const from = a.volume;
  const start = performance.now();
  fadeTimer = window.setInterval(() => {
    const k = Math.min(1, (performance.now() - start) / ms);
    a.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k >= 1) { window.clearInterval(fadeTimer); done?.(); }
  }, 50);
}

function get(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    // after a reload: start where the music had got to on the page before (as if it had kept going meanwhile)
    const live = readLive();
    if (live) {
      const a = audio;
      const at = live.t + Math.min(30, Math.max(0, (Date.now() - live.at) / 1000));
      a.addEventListener('loadedmetadata', () => { try { a.currentTime = a.duration ? at % a.duration : at; } catch {} }, { once: true });
    }
  }
  return audio;
}

async function play(): Promise<boolean> {
  const carryOn = !!readLive(); // it was already playing before this page loaded, in this visit
  const a = get();
  try {
    await a.play();
    playing = true;
    fade(LEVEL, carryOn ? 0 : 3000);
    writeLive();
  } catch {
    playing = false; // the browser wants a tap first
    waiting = pref() !== 'off';
  }
  if (playing) waiting = false;
  paint();
  return playing;
}

function pause() {
  playing = false;
  waiting = false;
  writeLive();
  paint();
  if (audio) fade(0, 800, () => { if (!playing) audio?.pause(); });
}

/** Called on every page (from Base.astro): binds the speaker button of this page; the first time, also starts the music. */
export function initAmbient() {
  paint();
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) =>
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (playing) { pause(); remember('off'); } else { play(); remember('on'); }
    }),
  );
  if (started) return;
  started = true;
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
    if (!audio || !playing) return;
    if (document.hidden) audio.pause(); else audio.play().catch(() => {});
  });
  // keep the place in the music, in case a page reloads
  window.setInterval(writeLive, 2000);
  addEventListener('pagehide', writeLive);
}
