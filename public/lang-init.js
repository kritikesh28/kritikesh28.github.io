// Runs before the page paints: if the visitor picked a language earlier (with the EN / हिंदी switch),
// and this page exists in that language, open that version instead. Search engines never store a choice, so they are not redirected.
(function () {
  try {
    var want = localStorage.getItem('lang');
    var have = document.documentElement.lang;
    if (!want || want === have) return;
    var link = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]');
    if (!link) return;
    var target = new URL(link.getAttribute('href'), location.href);
    location.replace(target.pathname + location.search + location.hash);
  } catch (e) {}
})();
