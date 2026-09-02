const mailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197361563373406082/subscribe';
export const surveyMailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197286111087690808/subscribe';
const mailerLiteCallback = 'mlWebformSubmitted';

function cleanMessage(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240);
}

export function getMailerLiteErrorMessage(result) {
  const directMessage = cleanMessage(result?.message || result?.error);
  if (directMessage) return directMessage;

  const errors = result?.errors;
  if (Array.isArray(errors)) {
    const message = errors.map((error) => cleanMessage(error?.message || error)).find(Boolean);
    if (message) return message;
  }

  if (errors && typeof errors === 'object') {
    for (const value of Object.values(errors)) {
      const values = Array.isArray(value) ? value : [value];
      const message = values.map((error) => cleanMessage(error?.message || error)).find(Boolean);
      if (message) return message;
    }
  }

  return 'MailerLite could not accept those details. Please check them and try again.';
}

function createGuid() {
  if (typeof crypto?.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function buildMailerLiteUrl({
  email,
  firstName,
  lastName = '',
  phone = 'Not provided',
  formUrl = mailerLiteFormUrl,
  guid = createGuid(),
}) {
  const url = new URL(formUrl);
  url.search = new URLSearchParams({
    'fields[email]': email,
    'fields[name]': firstName,
    'fields[last_name]': lastName,
    // The supplied MailerLite embed labels this field as optional, but its
    // generated markup marks it as required.
    'fields[phone]': phone || 'Not provided',
    'ml-submit': '1',
    anticsrf: 'true',
    ajax: '1',
    guid,
    callback: mailerLiteCallback,
  }).toString();
  return url;
}

export function subscribeToMailerLite({
  email,
  firstName,
  lastName,
  phone,
  formUrl,
}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Signup is temporarily unavailable.'));
    }, 15000);

    function cleanup() {
      window.clearTimeout(timeout);
      script.remove();
      delete window[mailerLiteCallback];
    }

    window[mailerLiteCallback] = (result) => {
      cleanup();
      if (result?.success === true) {
        resolve(result);
        return;
      }
      reject(new Error(getMailerLiteErrorMessage(result)));
    };

    script.async = true;
    script.src = buildMailerLiteUrl({ email, firstName, lastName, phone, formUrl }).toString();
    script.onerror = () => {
      cleanup();
      reject(
        new Error(
          'MailerLite could not accept this email address. Please use a real inbox; for testing, add +1 to your usual address.',
        ),
      );
    };
    document.head.append(script);
  });
}
