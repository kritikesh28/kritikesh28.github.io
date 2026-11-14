// The sound of the nest: a slow, soft bansuri (bamboo flute) in Raag Bhupali over a quiet tanpura-like drone,
// with sparrows chirping now and then (flute added 14 Nov 2026 at Kritikesh's request; the chirp timing is his choice, keep it).
// Everything is made live in the browser with the Web Audio API: no sound files, nothing downloaded, nothing tracked,
// and no one else's recording, so there is no copyright question. Every visit plays a new melody.
// It is on by default. Browsers only allow sound after a tap or key press, so it starts at once where the browser allows it,
// and otherwise fades in on the visitor's first tap, click or key press.
// The speaker button in the top bar switches it off; that choice is remembered in this browser only (see /privacy/).
// Guide: docs/17-library-map.md, "The background sound".

const KEY = 'cs-ambient';
// Overall loudness. 0.3 gives a soft but clearly audible level on laptop and phone speakers
// (measured: average about -24 dBFS, the loudest chirps about -10 dBFS). Raise it for louder, lower it for softer.
export const LEVEL = 0.3;
const MIX = { flute: 0.55, drone: 0.1, birds: 0.7, reverb: 0.45 }; // balance between the parts

type Nodes = { ctx: BaseAudioContext; master: GainNode; tick: (horizon: number) => void; timer?: number };
let n: Nodes | null = null;
let playing = false;

const pref = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (v: 'on' | 'off') => { try { localStorage.setItem(KEY, v); } catch {} };
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pickW = <T,>(items: [T, number][]) => {
  let r = Math.random() * items.reduce((s, [, w]) => s + w, 0);
  for (const [v, w] of items) if ((r -= w) <= 0) return v;
  return items[items.length - 1][0];
};

// Raag Bhupali: Sa Re Ga Pa Dha (no Ma, no Ni), a calm evening raag. Tonic D (a medium bansuri).
const SA = 293.66;
const SCALE = [3 / 4, 5 / 6, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4]; // low Pa, low Dha, Sa, Re, Ga, Pa, Dha, high Sa, high Re
const HOME = [2, 4, 5, 7]; // phrases come to rest on Sa, Ga, Pa or high Sa

/** Builds the whole sound on any audio context (live, or offline for testing) and returns a scheduler. */
export function compose(ctx: BaseAudioContext, out: AudioNode): Nodes {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(out);

  // A soft room: a made-up stereo reverb tail, so the flute sounds like it is in a quiet hall
  const verb = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 4);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  verb.buffer = ir;
  const wet = ctx.createGain(); wet.gain.value = MIX.reverb;
  verb.connect(wet).connect(master);
  const bus = (gain: number) => { const g = ctx.createGain(); g.gain.value = gain; g.connect(master); g.connect(verb); return g; };
  const fluteBus = bus(MIX.flute), droneBus = bus(MIX.drone), birdBus = bus(MIX.birds);

  // Breath noise, shared by every note
  const nb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  // Drone: Sa and Pa held low, swelling slowly, like a tanpura far away
  const drone = (f: number, pan: number, rate: number) => {
    const g = ctx.createGain(); g.gain.value = 0.5;
    const lfo = ctx.createOscillator(); lfo.frequency.value = rate;
    const lg = ctx.createGain(); lg.gain.value = 0.35;
    lfo.connect(lg).connect(g.gain); lfo.start();
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    const p = ctx.createStereoPanner(); p.pan.value = pan;
    [1, 2, 3, 4].forEach((h, i) => {
      const o = ctx.createOscillator(); o.frequency.value = f * h; o.detune.value = rand(-3, 3);
      const hg = ctx.createGain(); hg.gain.value = [0.5, 0.3, 0.18, 0.1][i];
      o.connect(hg).connect(lp); o.start();
    });
    lp.connect(g).connect(p).connect(droneBus);
  };
  drone(SA / 2, -0.3, 0.07);
  drone((SA / 2) * 3 / 4, 0.3, 0.05);
  drone(SA, 0, 0.09);

  // One flute note: a pure tone with a little of its octave, breath on top, a slow vibrato, and a glide (meend) from the last note
  const note = (t: number, f: number, dur: number, from: number | null, peak: number) => {
    const end = t + dur;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(peak, t + Math.min(0.35, dur * 0.3));
    env.gain.setTargetAtTime(peak * 0.82, t + 0.4, dur * 0.4);
    env.gain.setTargetAtTime(0, end - 0.2, 0.25);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.3;
    const vib = ctx.createOscillator(); vib.frequency.value = rand(4.6, 5.4);
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(0, t + 0.5); vg.gain.linearRampToValueAtTime(f * 0.007, t + Math.min(dur, 1.6));
    vib.connect(vg);
    [[1, 1], [2, 0.09], [3, 0.03]].forEach(([h, a]) => {
      const o = ctx.createOscillator(); o.type = 'sine';
      if (from) { o.frequency.setValueAtTime(from * h, t); o.frequency.exponentialRampToValueAtTime(f * h, t + 0.22); }
      else o.frequency.setValueAtTime(f * h, t);
      const vgh = ctx.createGain(); vgh.gain.value = h; vg.connect(vgh).connect(o.frequency);
      const g = ctx.createGain(); g.gain.value = a;
      o.connect(g).connect(lp); o.start(t); o.stop(end + 1.2);
    });
    // breath: louder "chiff" at the start, then a thin hiss under the tone
    const ns = ctx.createBufferSource(); ns.buffer = nb; ns.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 2; bp.Q.value = 1.2;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(0.22, t + 0.06);
    ng.gain.setTargetAtTime(0.05, t + 0.08, 0.15); ng.gain.setTargetAtTime(0, end - 0.2, 0.2);
    ns.connect(bp).connect(ng).connect(lp);
    ns.start(t, Math.random()); ns.stop(end + 1.2);
    vib.start(t); vib.stop(end + 1.2);
    lp.connect(env).connect(fluteBus);
  };

  // A phrase: a few notes walking up or down the raag, the last one held long, then a rest
  let at = 4; // which note of SCALE the melody is on
  const phrase = (t: number) => {
    const k = Math.floor(rand(3, 8));
    let prev: number | null = null;
    for (let i = 0; i < k; i++) {
      const last = i === k - 1;
      if (i > 0) {
        const step = pickW<number>([[1, 5], [-1, 5], [2, 1.5], [-2, 1.5], [0, 0.6]]);
        at = Math.max(0, Math.min(SCALE.length - 1, at + step));
      }
      if (last && !HOME.includes(at)) at = HOME.reduce((b, h) => (Math.abs(h - at) < Math.abs(b - at) ? h : b), HOME[0]);
      const f = SA * SCALE[at];
      const dur = last ? rand(3.2, 5.5) : pickW<number>([[0.7, 2], [1.1, 3], [1.6, 2], [2.4, 1]]);
      note(t, f, dur, prev && Math.random() < 0.6 ? prev : null, last ? 0.8 : rand(0.6, 0.85));
      prev = f;
      t += dur * 0.97;
    }
    return t + rand(2.5, 6); // breathing space before the next phrase
  };

  // Sparrows: short rising-falling chirps in little groups, from left and right (same timing as before)
  const chirp = (t0: number, pan: number) => {
    const o = ctx.createOscillator(); o.type = 'sine';
    const f = rand(3400, 4600);
    o.frequency.setValueAtTime(f, t0);
    o.frequency.exponentialRampToValueAtTime(f * rand(1.15, 1.4), t0 + 0.035);
    o.frequency.exponentialRampToValueAtTime(f * rand(0.7, 0.85), t0 + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(rand(0.5, 1), t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.1);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.8;
    const p = ctx.createStereoPanner(); p.pan.value = pan;
    o.connect(g).connect(bp).connect(p).connect(birdBus);
    o.start(t0); o.stop(t0 + 0.12);
  };
  const flock = (t0: number) => {
    const pan = rand(-0.8, 0.8);
    const k = Math.floor(rand(2, 6));
    for (let i = 0; i < k; i++) chirp(t0 + i * rand(0.11, 0.2), pan + rand(-0.1, 0.1));
    return t0 + rand(3.5, 11);
  };

  // Everything is planned a few seconds ahead of the audio clock, so a paused or hidden tab simply stops planning
  let nextPhrase = ctx.currentTime + 2.5;
  let nextFlock = ctx.currentTime + 1.8;
  const tick = (horizon: number) => {
    const until = ctx.currentTime + horizon;
    while (nextPhrase < until) nextPhrase = phrase(nextPhrase);
    while (nextFlock < until) nextFlock = flock(nextFlock);
  };
  return { ctx, master, tick };
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

function build(): Nodes {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const nodes = compose(ctx, ctx.destination);
  nodes.tick(6);
  nodes.timer = window.setInterval(() => nodes.tick(6), 1500);
  return nodes;
}

async function play(): Promise<boolean> {
  try {
    if (!n) n = build();
    const ctx = n.ctx as AudioContext;
    await ctx.resume();
    if (ctx.state !== 'running') { playing = false; paint(); return false; }
    fade(LEVEL, 4);
    playing = true;
  } catch { playing = false; }
  paint();
  return playing;
}

function pause() {
  if (n) {
    fade(0, 0.8);
    const ctx = n.ctx as AudioContext;
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
  // On by default: unless this visitor switched it off before, start now if the browser allows it,
  // otherwise on the first tap, click or key press anywhere on the page
  if (pref() !== 'off') {
    const first = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.('[data-ambient]')) return;
      ['pointerdown', 'keydown', 'touchend'].forEach((t) => removeEventListener(t, first, true));
      if (pref() !== 'off' && !playing) play();
    };
    ['pointerdown', 'keydown', 'touchend'].forEach((t) => addEventListener(t, first, true));
    play().then((ok) => { if (!ok) n = closeIdle(); });
  }
  // Quiet while the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (!n || !playing) return;
    const ctx = n.ctx as AudioContext;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });
}

// If the browser refused to start the sound, drop the unused context so the first tap builds a fresh one
function closeIdle(): null {
  if (n) { window.clearInterval(n.timer); (n.ctx as AudioContext).close?.(); }
  return null;
}
