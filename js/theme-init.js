/* Applied before first paint (loaded in <head>) to avoid a flash of
   the wrong theme — kept as its own tiny file, rather than inline,
   so the CSP can require script-src 'self' with no inline exception. */
(function () {
  var stored = localStorage.getItem('theme');
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
