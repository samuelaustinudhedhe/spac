/* =========================================================
   Shared behaviour for every page: nav toggle, active-link
   highlighting, click sound effect, and the home-page entry
   gate (speech-synthesis welcome message).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  highlightActiveNavLink();
  initClickSound();
  initEntryGate();
  initThemeToggle();
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

/* ---------- Dark mode toggle ----------
   The theme itself is applied instantly by an inline script in
   <head> (before first paint, to avoid a flash of the wrong
   theme). This just wires the button to flip it and remember
   the choice. */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  updateThemeToggleIcon(toggle);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeToggleIcon(toggle);
  });
}

function updateThemeToggleIcon(toggle) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggle.textContent = isDark ? '☀️' : '🌙';
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ---------- Highlight current page in nav ---------- */
function highlightActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.setAttribute('aria-current', 'page');
  });
}

/* ---------- Click sound effect ----------
   A short synthesized tone (assets/audio/click.mp3) plays at low
   volume whenever a button or nav link is clicked. Cloning the
   node lets rapid successive clicks overlap instead of cutting
   each other off. */
function initClickSound() {
  const source = document.getElementById('click-sfx');
  if (!source) return;

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.btn, .nav-links a, .task-check, .task-delete, .nav-toggle');
    if (!trigger) return;

    const sfx = source.cloneNode(true);
    sfx.volume = 0.25;
    sfx.play().catch(() => {
      /* Autoplay can be blocked before the user's first interaction
         with the page — safe to ignore, the click itself is that
         first interaction on every click after the very first. */
    });
  });
}

/* ---------- Entry gate (home page only) ----------
   Clicking "Enter Site" fades out the splash and speaks a short
   welcome message via the Web Speech API. This stands in for a
   recorded welcome audio clip and needs no external asset. */
function initEntryGate() {
  const gate = document.getElementById('intro-gate');
  const enterBtn = document.getElementById('enter-site-btn');
  if (!gate || !enterBtn) return;

  enterBtn.addEventListener('click', () => {
    speakWelcome('Welcome to Samuel Austin\'s Portfolio');
    gate.classList.add('hidden');
    document.body.classList.remove('gate-locked');
    sessionStorage.setItem('gatePassed', '1');
  }, { once: true });

  // Skip the gate on repeat visits within the same tab session.
  if (sessionStorage.getItem('gatePassed') === '1') {
    gate.classList.add('hidden');
    document.body.classList.remove('gate-locked');
  }
}

function speakWelcome(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 0.6; // kept low so it doesn't startle anyone
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
