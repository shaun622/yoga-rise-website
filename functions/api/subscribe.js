const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailerLiteFormUrl =
  'https://assets.mailerlite.com/jsonp/2606050/forms/197361563373406082/subscribe';

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
    const mailerLiteBody = new URLSearchParams({
      'fields[email]': email,
      'fields[name]': firstName,
      'fields[last_name]': lastNameParts.join(' '),
      'ml-submit': '1',
      anticsrf: 'true',
    });
    const mailerLiteResponse = await fetch(mailerLiteFormUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: mailerLiteBody.toString(),
    });

    if (!mailerLiteResponse.ok) {
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
