const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailerLiteApiUrl = 'https://connect.mailerlite.com/api/subscribers';

const signupSources = {
  website: {
    groupId: '197361749519762447',
    backupSource: 'mailerlite-website',
  },
  survey: {
    groupId: '197286125900924756',
    backupSource: 'mailerlite-survey',
  },
};

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function clean(value, maxLength) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength + 1);
}

function publicMailerLiteError(status) {
  if (status === 422) return 'Please enter a valid email address.';
  if (status === 429) return 'Too many signup attempts. Please wait a moment and try again.';
  return 'Signup is temporarily unavailable. Please try again shortly.';
}

async function storeSubscriberBackup(env, email, source) {
  if (!env.SUBSCRIBERS_DB) return;

  try {
    await env.SUBSCRIBERS_DB.prepare(
      `INSERT INTO subscribers (email, source)
       VALUES (?, ?)
       ON CONFLICT(email) DO UPDATE SET source = excluded.source`,
    )
      .bind(email, source)
      .run();
  } catch (error) {
    console.error('Subscriber backup failed', {
      source,
      error: error instanceof Error ? error.message : 'Unknown D1 error',
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Please check your details and try again.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, message: 'Please check your details and try again.' }, 400);
  }

  // Treat the hidden honeypot as a successful no-op so bots receive no useful signal.
  if (body.company) return json({ ok: true });

  const sourceName = clean(body.source || 'website', 20).toLowerCase();
  const source = signupSources[sourceName];
  const firstName = clean(body.firstName ?? body.fullName, 120);
  const lastName = clean(body.lastName, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 50);

  if (!source) {
    return json({ ok: false, message: 'This signup form is not available.' }, 400);
  }
  if (!firstName || firstName.length > 120) {
    return json({ ok: false, message: 'Please enter your first name.' }, 400);
  }
  if (lastName.length > 120) {
    return json({ ok: false, message: 'Please check your last name.' }, 400);
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }
  if (phone.length > 50) {
    return json({ ok: false, message: 'Please check your phone number.' }, 400);
  }
  if (!env.MAILER_API_TOKEN) {
    console.error('MailerLite signup is missing MAILER_API_TOKEN', { source: sourceName });
    return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 503);
  }

  const fields = { name: firstName };
  if (lastName) fields.last_name = lastName;
  if (phone) fields.phone = phone;

  let mailerLiteResponse;
  try {
    mailerLiteResponse = await fetch(mailerLiteApiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.MAILER_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields,
        groups: [source.groupId],
      }),
    });
  } catch (error) {
    console.error('MailerLite signup request failed', {
      source: sourceName,
      error: error instanceof Error ? error.message : 'Unknown network error',
    });
    return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 502);
  }

  if (!mailerLiteResponse.ok) {
    console.error('MailerLite signup was rejected', {
      source: sourceName,
      status: mailerLiteResponse.status,
    });
    return json(
      { ok: false, message: publicMailerLiteError(mailerLiteResponse.status) },
      mailerLiteResponse.status === 429 ? 429 : 502,
    );
  }

  context.waitUntil(storeSubscriberBackup(env, email, source.backupSource));
  return json({ ok: true });
}
