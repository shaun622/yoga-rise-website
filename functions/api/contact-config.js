export function onRequestGet({ env }) {
  const ready = Boolean(env.RESEND_API_KEY && env.CONTACT_TURNSTILE_SECRET && env.CONTACT_TURNSTILE_SITE_KEY);
  return Response.json(ready ? { siteKey: env.CONTACT_TURNSTILE_SITE_KEY } : { error: 'Contact form unavailable.' }, {
    status: ready ? 200 : 503,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}
