// Reading progress for the library. Saved only in the reader's own browser (see /privacy/).
// No accounts, no streaks, no guilt: it only remembers which Leaves you reached the end of.

const KEY = 'cs-library-read';

export function getRead(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

function save(read: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...read])); } catch {}
}

export function markRead(id: string) {
  const read = getRead();
  if (read.has(id)) return;
  read.add(id);
  save(read);
  paintProgress();
}

export function resetTwig(twig: string) {
  const read = getRead();
  for (const id of read) if (id.startsWith(`${twig}/`)) read.delete(id);
  save(read);
  paintProgress();
}

// Updates every progress display on the page:
//   [data-leaf-id]               gets .done when that Leaf is read
//   [data-progress-twig][data-total]  shows "n of total" in [data-count] and a bar in [data-bar]
//   [data-continue-twig]         links to the first unread Leaf (its options come from data-leaves)
export function paintProgress() {
  const read = getRead();
  document.querySelectorAll<HTMLElement>('[data-leaf-id]').forEach((el) => {
    el.classList.toggle('done', read.has(el.dataset.leafId!));
  });
  document.querySelectorAll<HTMLElement>('[data-progress-twig]').forEach((el) => {
    const twig = el.dataset.progressTwig!;
    const total = Number(el.dataset.total) || 0;
    const n = [...read].filter((id) => id.startsWith(`${twig}/`)).length;
    const count = el.querySelector<HTMLElement>('[data-count]');
    const bar = el.querySelector<HTMLElement>('[data-bar]');
    if (count) count.textContent = n === 0 ? 'Not started yet' : n >= total ? `All ${total} read` : `${n} of ${total} read`;
    if (bar) bar.style.setProperty('--done', `${total ? Math.min(100, (n / total) * 100) : 0}%`);
    el.classList.toggle('started', n > 0);
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-continue-twig]').forEach((a) => {
    const leaves: { id: string; url: string; title: string }[] = JSON.parse(a.dataset.leaves ?? '[]');
    const next = leaves.find((l) => !read.has(l.id));
    const started = leaves.some((l) => read.has(l.id));
    const label = a.querySelector<HTMLElement>('[data-label]');
    if (!started || !next) return;
    a.href = next.url;
    if (label) label.textContent = `Continue: ${next.title}`;
  });
}

// Marks a Leaf read once the reader reaches its end marker
export function watchLeafEnds() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      markRead((e.target as HTMLElement).dataset.leafEnd!);
      io.unobserve(e.target);
    });
  });
  document.querySelectorAll('[data-leaf-end]').forEach((el) => io.observe(el));
}
