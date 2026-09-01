const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197361563373406082/subscribe';
const mailerLiteCallback = 'mlWebformSubmitted';

export function parseMailerLiteResponse(responseText) {
  const text = responseText.trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    const jsonpMatch = text.match(/^[^(]+\((.*)\);?$/s);
    if (!jsonpMatch) return null;

    try {
      return JSON.parse(jsonpMatch[1]);
    } catch {
      return null;
    }
  }
}

export function buildMailerLiteUrl({ email, firstName, lastName }) {
  const url = new URL(mailerLiteFormUrl);
  url.search = new URLSearchParams({
    'fields[email]': email,
    'fields[name]': firstName,
    'fields[last_name]': lastName,
    // The supplied MailerLite embed labels this field as optional, but its
    // generated markup marks it as required. Keep it out of the visible form
    // while satisfying that server-side form configuration.
    'fields[phone]': 'Not provided',
    'ml-submit': '1',
    anticsrf: 'true',
    ajax: '1',
    guid: crypto.randomUUID(),
    callback: mailerLiteCallback,
  }).toString();
  return url;
}

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  if (body.company) {
    return json({ ok: true });
  }

  const fullName = String(body.fullName ?? '')
    .trim()
    .replace(/\s+/g, ' ');
  const email = String(body.email ?? '').trim().toLowerCase();
  if (!fullName || fullName.length > 120) {
    return json({ ok: false, message: 'Please enter your first name.' }, 400);
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  const [firstName, ...lastNameParts] = fullName.split(' ');

  try {
    // MailerLite's own embed submits this endpoint as an AJAX JSONP GET.
    // Mirroring that request shape is important: a plain POST can return an
    // HTML 200 response without creating the subscriber.
    const mailerLiteUrl = buildMailerLiteUrl({
      email,
      firstName,
      lastName: lastNameParts.join(' '),
    });
    const mailerLiteResponse = await fetch(mailerLiteUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/javascript, application/json, text/javascript, */*; q=0.01',
      },
    });
    const mailerLiteResult = parseMailerLiteResponse(await mailerLiteResponse.text());

    if (!mailerLiteResponse.ok || mailerLiteResult?.success !== true) {
      return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 502);
    }
  } catch {
    return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 502);
  }

  if (env.SUBSCRIBERS_DB) {
    try {
      await env.SUBSCRIBERS_DB.prepare(
        `INSERT INTO subscribers (email, source)
         VALUES (?, 'mailerlite-hero')
         ON CONFLICT(email) DO UPDATE SET source = excluded.source`,
      )
        .bind(email)
        .run();
    } catch {
      // MailerLite is the source of truth; a backup write must not block signup.
    }
  }

  return json({ ok: true });
}
