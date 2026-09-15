import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './staging-home.css';
import './analytics.js';
import './site-chrome.js';

import './team.js';

let toastTimer;
function showNotice(message) {
  let toast = document.querySelector('[data-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.dataset.toast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

document.querySelectorAll('.placeholder-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showNotice('This destination will be connected when the final client link is supplied.');
  });
});
