import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './styles.css';
import { subscribeToMailerLite } from './mailerlite.js';

const surveyMailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197286111087690808/subscribe';

const form = document.querySelector('[data-survey-thanks-form]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = form.querySelector('input[name="first_name"]');
  const lastName = form.querySelector('input[name="last_name"]');
  const email = form.querySelector('input[name="email"]');
  const phone = form.querySelector('input[name="phone"]');
  const company = form.querySelector('input[name="company"]');
  const submit = form.querySelector('[data-survey-thanks-submit]');
  const message = form.querySelector('[data-survey-thanks-message]');

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
        lastName: lastName?.value.trim() || '',
        email: email.value.trim().toLowerCase(),
        phone: phone?.value.trim() || 'Not provided',
        formUrl: surveyMailerLiteFormUrl,
      });
    }

    message.textContent = 'You’re on the list. We’ll be in touch shortly.';
    form.reset();
  } catch (error) {
    message.textContent = error.message || 'Signup is temporarily unavailable.';
  } finally {
    submit.disabled = false;
  }
});
