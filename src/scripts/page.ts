// Pages change without reloading (Astro's ClientRouter, in src/layouts/Base.astro), so the background sound never stops.
// A script on a page therefore runs only once per visit, not once per page. Wrap its work in onPage():
//   onPage((signal) => { ... });
// fn runs on the first page and again on every page the visitor goes to after it.
// signal is ended when the visitor leaves that page: give it to every listener on document or window,
//   document.addEventListener('keydown', fn, { signal });
// and stop timers with signal.addEventListener('abort', () => clearInterval(t)).
// Listeners on elements of the page need nothing: those elements are thrown away with the page.
// Each script must also cope with pages that do not have its elements (look them up, and stop if they are missing).
// Guide: docs/17-library-map.md, "The background sound".
export function onPage(fn: (signal: AbortSignal) => void) {
  document.addEventListener('astro:page-load', () => {
    const ac = new AbortController();
    document.addEventListener('astro:before-swap', () => ac.abort(), { once: true });
    try { fn(ac.signal); } catch (e) { console.error(e); }
  });
}
