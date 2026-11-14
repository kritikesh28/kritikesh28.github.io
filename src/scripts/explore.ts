// Explore: tick boxes, progress bars, the phone contents sheet and tap-to-play videos.
// Ticks are saved only in the reader's own browser (see /privacy/). No account, nothing sent anywhere.

const KEY = 'cs-explore-ticks';

function getTicks(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')); } catch { return new Set(); }
}
function save(ticks: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...ticks])); } catch {}
}

// [data-progress][data-ids]: a list of ids (JSON) whose ticks are counted; shows "n of m" in [data-count], a bar in [data-bar]
function paint() {
  const ticks = getTicks();
  document.querySelectorAll<HTMLInputElement>('input[data-tick]').forEach((box) => {
    box.checked = ticks.has(box.dataset.tick!);
    box.closest('.entry, .tick-h')?.classList.toggle('done', box.checked);
  });
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => {
    const ids: string[] = JSON.parse(el.dataset.ids ?? '[]');
    const total = ids.length;
    const n = ids.filter((id) => ticks.has(id)).length;
    const count = el.querySelector<HTMLElement>('[data-count]');
    const bar = el.querySelector<HTMLElement>('[data-bar]');
    if (count) count.textContent = n === 0 ? `0 of ${total} ticked` : n >= total ? `All ${total} ticked` : `${n} of ${total} ticked`;
    if (bar) bar.style.setProperty('--done', `${total ? (n / total) * 100 : 0}%`);
    el.classList.toggle('started', n > 0);
  });
}

document.addEventListener('change', (e) => {
  const box = e.target as HTMLInputElement;
  if (!box.matches?.('input[data-tick]')) return;
  const ticks = getTicks();
  if (box.checked) ticks.add(box.dataset.tick!); else ticks.delete(box.dataset.tick!);
  save(ticks);
  paint();
});

// "Clear my ticks" for one topic: [data-clear] holds the topic code prefix, e.g. "SEW-"
document.querySelectorAll<HTMLButtonElement>('[data-clear]').forEach((b) =>
  b.addEventListener('click', () => {
    const prefix = b.dataset.clear!;
    const ticks = getTicks();
    for (const id of ticks) if (id.startsWith(prefix)) ticks.delete(id);
    save(ticks);
    paint();
  }),
);

// Videos: show the picture first, load YouTube (privacy-enhanced) only when tapped
document.querySelectorAll<HTMLButtonElement>('button[data-yt]').forEach((b) =>
  b.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt!)}?autoplay=1&rel=0`;
    f.title = b.dataset.title ?? 'Video';
    f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
    f.allowFullscreen = true;
    f.loading = 'lazy';
    b.replaceWith(f);
  }),
);

// Phone contents sheet
const sheet = document.querySelector<HTMLDialogElement>('dialog.toc-sheet');
document.querySelectorAll<HTMLButtonElement>('[data-open-toc]').forEach((b) => b.addEventListener('click', () => sheet?.showModal()));
sheet?.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t === sheet || t.closest('[data-close-toc]') || t.closest('a')) sheet.close();
});

paint();

// ← and → turn the pages (not while typing in a box)
addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  const el = e.target as HTMLElement;
  if (el?.closest?.('input, textarea, select, [contenteditable], dialog[open]')) return;
  const a = e.key === 'ArrowLeft' ? document.querySelector<HTMLAnchorElement>('[data-prev]') : e.key === 'ArrowRight' ? document.querySelector<HTMLAnchorElement>('[data-next]') : null;
  if (a) location.href = a.href;
});
