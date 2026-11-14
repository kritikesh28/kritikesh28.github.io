// Background music: a soft bamboo-flute track with birdsong (public/audio/flute-and-birds.mp3),
// played very quietly on a loop, like music in the background of a cinema foyer.
// Kritikesh chose this track on 14 Nov 2026 ("Nature Bird Bamboo Flute Morning Relaxing Music", shared as copyright-free
// by its creator, Sujan). The file was loudness-levelled to about -16 LUFS and re-encoded at 80 kbps (about 3 MB).
// It is on by default. Browsers only allow sound after a tap or key press, so it starts at once where the browser allows it,
// and otherwise fades in on the visitor's first tap, click or key press. The file is only fetched when it starts playing.
// The speaker button in the top bar switches it off; that choice is remembered in this browser only (see /privacy/).
// Guide: docs/17-library-map.md, "The background sound".

const KEY = 'cs-ambient';
const SRC = '/audio/flute-and-birds.mp3';
// Volume, from 0 to 1. 0.2 is low and in the background (about -30 LUFS on average): you notice it in a quiet room,
// and it never gets in the way of reading. Raise it for louder, lower it for softer.
export const LEVEL = 0.2;

let audio: HTMLAudioElement | null = null;
let playing = false;
let fadeTimer: number | undefined;

const pref = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (v: 'on' | 'off') => { try { localStorage.setItem(KEY, v); } catch {} };

function paint() {
  document.querySelectorAll<HTMLButtonElement>('[data-ambient]').forEach((b) => b.setAttribute('aria-pressed', String(playing)));
}

/** Moves the volume smoothly to `to` over `ms` milliseconds, then runs `done`. */
function fade(to: number, ms: number, done?: () => void) {
  if (!audio) return;
  window.clearInterval(fadeTimer);
  const a = audio;
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
  }
  return audio;
}

async function play(): Promise<boolean> {
  const a = get();
  try {
    await a.play();
    playing = true;
    fade(LEVEL, 3000);
  } catch {
    playing = false; // the browser wants a tap first
  }
  paint();
  return playing;
}

function pause() {
  playing = false;
  paint();
  if (audio) fade(0, 800, () => { if (!playing) audio?.pause(); });
}

export function initAmbient() {
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
    if (!audio || !playing) return;
    if (document.hidden) audio.pause(); else audio.play().catch(() => {});
  });
}
