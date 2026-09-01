const mailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197361563373406082/subscribe';
const mailerLiteCallback = 'mlWebformSubmitted';

function createGuid() {
  if (typeof crypto?.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function buildMailerLiteUrl({ email, firstName, guid = createGuid() }) {
  const url = new URL(mailerLiteFormUrl);
  url.search = new URLSearchParams({
    'fields[email]': email,
    'fields[name]': firstName,
    'fields[last_name]': '',
    // The supplied MailerLite embed labels this field as optional, but its
    // generated markup marks it as required.
    'fields[phone]': 'Not provided',
    'ml-submit': '1',
    anticsrf: 'true',
    ajax: '1',
    guid,
    callback: mailerLiteCallback,
  }).toString();
  return url;
}

export function subscribeToMailerLite({ email, firstName }) {
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
      reject(new Error('Signup is temporarily unavailable.'));
    };

    script.async = true;
    script.src = buildMailerLiteUrl({ email, firstName }).toString();
    script.onerror = () => {
      cleanup();
      reject(new Error('Signup is temporarily unavailable.'));
    };
    document.head.append(script);
  });
}
