// The drop-down menus of the top bar (Library, Exam Prep, Portfolio, About, Contact).
// Each [data-mega-btn] opens the panel named in its aria-controls. Only one is open at a time.
// Mouse: opens on hover after a short pause. Touch and keyboard: tap or Enter on the small arrow. Esc closes.
export function initMegas() {
  const btns = [...document.querySelectorAll<HTMLButtonElement>('[data-mega-btn]')];
  const pairs = btns
    .map((btn) => ({ btn, mega: document.getElementById(btn.getAttribute('aria-controls') ?? ''), item: btn.closest('li') }))
    .filter((p): p is { btn: HTMLButtonElement; mega: HTMLElement; item: HTMLLIElement } => !!p.mega && !!p.item);
  let timer: number | undefined;
  const set = (p: (typeof pairs)[number] | null) => {
    clearTimeout(timer);
    pairs.forEach((q) => {
      const open = q === p;
      q.mega.hidden = !open;
      q.btn.setAttribute('aria-expanded', String(open));
      q.item.classList.toggle('mega-open', open);
    });
  };
  const hover = matchMedia('(hover: hover) and (min-width: 900px)').matches;
  pairs.forEach((p) => {
    p.btn.addEventListener('click', (e) => { e.stopPropagation(); set(p.mega.hidden ? p : null); });
    if (hover) {
      p.item.addEventListener('pointerenter', () => { clearTimeout(timer); timer = window.setTimeout(() => set(p), p.mega.hidden && pairs.some((q) => !q.mega.hidden) ? 60 : 160); });
      p.item.addEventListener('pointerleave', () => { clearTimeout(timer); timer = window.setTimeout(() => set(null), 260); });
      p.mega.addEventListener('pointerenter', () => clearTimeout(timer));
      p.mega.addEventListener('pointerleave', () => { clearTimeout(timer); timer = window.setTimeout(() => set(null), 260); });
    }
  });
  document.addEventListener('click', (e) => { if (!pairs.some((p) => p.mega.contains(e.target as Node))) set(null); });
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = pairs.find((p) => !p.mega.hidden);
    if (open) { set(null); open.btn.focus(); }
  });
}
