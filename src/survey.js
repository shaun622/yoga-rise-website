import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './styles.css';
import { subscribeToMailerLite } from './mailerlite.js';

const surveyMailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197286111087690808/subscribe';

const surveyOptin = document.querySelector('[data-survey-optin]');

surveyOptin?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = surveyOptin.querySelector('input[name="first_name"]');
  const lastName = surveyOptin.querySelector('input[name="last_name"]');
  const email = surveyOptin.querySelector('input[name="email"]');
  const phone = surveyOptin.querySelector('input[name="phone"]');
  const company = surveyOptin.querySelector('input[name="company"]');
  const submit = surveyOptin.querySelector('[data-survey-submit]');
  const message = surveyOptin.querySelector('[data-survey-message]');

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
  message.textContent = 'Submitting…';

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

    message.textContent = 'Thank you! We’ll be in touch shortly.';
    surveyOptin.reset();
  } catch (error) {
    message.textContent = error.message || 'Signup is temporarily unavailable.';
  } finally {
    submit.disabled = false;
  }
});
