const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const firstName = String(body.firstName ?? body.fullName ?? '')
    .trim()
    .replace(/\s+/g, ' ');
  const email = String(body.email ?? '').trim().toLowerCase();
  if (!firstName || firstName.length > 120) {
    return json({ ok: false, message: 'Please enter your first name.' }, 400);
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
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
