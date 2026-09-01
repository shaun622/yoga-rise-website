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
  if (!env.SUBSCRIBERS_DB) {
    return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  if (body.company) {
    return json({ ok: true });
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  try {
    await env.SUBSCRIBERS_DB.prepare(
      `INSERT INTO subscribers (email, source)
       VALUES (?, 'temporary-hero')
       ON CONFLICT(email) DO NOTHING`,
    )
      .bind(email)
      .run();
  } catch {
    return json({ ok: false, message: 'Signup is temporarily unavailable.' }, 500);
  }

  return json({ ok: true });
}
