import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './staging-home.css';
import './analytics.js';
import './site-chrome.js';
import { subscribeToMailerLite } from './mailerlite.js';

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

const heroOptin = document.querySelector('[data-hero-optin]');
heroOptin?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const firstName = heroOptin.querySelector('input[name="full_name"]');
  const email = heroOptin.querySelector('input[type="email"]');
  const company = heroOptin.querySelector('input[name="company"]');
  const submit = heroOptin.querySelector('[data-optin-submit]');
  const message = heroOptin.querySelector('[data-optin-message]');

  if (!firstName?.value.trim() || !firstName.checkValidity()) {
    message.textContent = 'Please enter your first name.';
    firstName?.focus();
    return;
  }

  if (!email?.value || !email.checkValidity()) {
    message.textContent = 'Please enter a valid email address.';
    email?.focus();
    return;
  }

  submit.disabled = true;
  message.textContent = 'Joining…';

  try {
    if (!company?.value) {
      await subscribeToMailerLite({
        firstName: firstName.value.trim(),
        email: email.value.trim().toLowerCase(),
      });
    }

    message.textContent = 'You’re on the list. Thanks for joining us.';
    heroOptin.reset();
  } catch (error) {
    message.textContent = error.message || 'Signup is temporarily unavailable.';
  } finally {
    submit.disabled = false;
  }
});
