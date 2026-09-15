import { subscribeToMailerLite } from './mailerlite.js';

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

  if (submit.disabled) return;
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
