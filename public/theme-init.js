// Runs before the page paints: applies the saved light/dark choice and marks that JavaScript is on.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') root.dataset.theme = t;
  } catch (e) {}
})();
