const unavailable = 'The form is temporarily unavailable. Please email hello@yogarise.com.au.';

function loadTurnstile() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error(unavailable));
    script.onerror = () => reject(new Error(unavailable));
    document.head.append(script);
  });
}

export async function mountContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-contact-status]');
  let turnstile, widget, token = '', pending = false, submissionId = crypto.randomUUID();
  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.toggleAttribute('data-error', error);
  };
  form.addEventListener('input', () => { submissionId = crypto.randomUUID(); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    if (!token) { setStatus('Please complete the security check before sending.', true); return; }
    const values = new FormData(form);
    const payload = Object.fromEntries(['name', 'email', 'phone', 'message', 'website'].map(name => [name, values.get(name) || '']));
    if (!payload.name.trim() || !payload.message.trim()) {
      setStatus('Please enter your name and message.', true);
      form.elements[!payload.name.trim() ? 'name' : 'message'].focus();
      return;
    }
    payload.token = token;
    payload.submissionId = submissionId;
    pending = true;
    submit.disabled = true;
    form.querySelector('fieldset').disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus('Sending your enquiry…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(25000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || unavailable);
      form.reset();
      submissionId = crypto.randomUUID();
      setStatus('Thank you. Your enquiry has been sent to the YogaRise team.');
    } catch (error) {
      setStatus(error.name === 'TimeoutError' || error.name === 'TypeError'
        ? 'Delivery was not confirmed. Please try again, or email hello@yogarise.com.au.'
        : error.message || unavailable, true);
    } finally {
      pending = false;
      form.querySelector('fieldset').disabled = false;
      form.removeAttribute('aria-busy');
      token = '';
      turnstile?.reset(widget);
      submit.disabled = false;
    }
  });
  try {
    const response = await fetch('/api/contact-config', { cache: 'no-store' });
    const config = await response.json();
    if (!response.ok || !config.siteKey) throw new Error(unavailable);
    turnstile = await loadTurnstile();
    widget = turnstile.render(form.querySelector('[data-contact-challenge]'), {
      sitekey: config.siteKey, action: 'contact', theme: 'light', size: 'compact',
      callback: (value) => { token = value; },
      'expired-callback': () => { token = ''; },
      'error-callback': () => { token = ''; setStatus('The security check could not load. Please refresh or email hello@yogarise.com.au.', true); },
    });
    submit.disabled = false;
    setStatus('');
  } catch {
    setStatus(unavailable, true);
  }
}
