const mailbox = 'hello@yogarise.com.au';
const unavailable = `The form is temporarily unavailable. Please email ${mailbox}.`;
const reply = (status, data) => Response.json(data, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
} });
const allowedHost = (host) => ['www.yogarise.com.au', 'yogarise.com.au', 'yoga-rise-website.pages.dev'].includes(host)
  || host.endsWith('.yoga-rise-website.pages.dev');

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0, text = '';
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); throw new Error('size'); }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return reply(405, { error: 'Please use the Contact form to send an enquiry.' });
  const url = new URL(request.url);
  if (!allowedHost(url.hostname) || request.headers.get('Origin') !== url.origin) {
    return reply(403, { error: 'Please submit your enquiry from the YogaRise website.' });
  }
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415, { error: 'Invalid form submission.' });
  let body;
  try { body = await readBody(request); } catch { return reply(400, { error: 'Invalid or oversized form submission.' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { error: 'Invalid form submission.' });
  const fields = {};
  for (const [name, max, required] of [['name', 200, true], ['email', 254, true], ['phone', 100, false], ['message', 5000, true], ['website', 200, false]]) {
    if (typeof body[name] !== 'string' || body[name].length > max || (required && !body[name].trim())) {
      return reply(400, { error: 'Please check your name, email address and message, and try again.' });
    }
    fields[name] = body[name].trim();
  }
  if (fields.website) return reply(400, { error: 'Your enquiry could not be sent. Please refresh and try again.' });
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)
    || /[\r\n\x00-\x1f\x7f]/.test(fields.name + fields.email + fields.phone)
    || typeof body.submissionId !== 'string' || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(body.submissionId)) {
    return reply(400, { error: 'Please check your details and try again.' });
  }
  if (typeof body.token !== 'string' || !body.token || body.token.length > 2048) return reply(400, { error: 'Please complete the security check and try again.' });
  if (!env.RESEND_API_KEY || !env.CONTACT_TURNSTILE_SECRET) return reply(503, { error: unavailable });
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: env.CONTACT_TURNSTILE_SECRET, response: body.token }),
      signal: AbortSignal.timeout(8000),
    });
    const result = await verification.json();
    if (!verification.ok) return reply(503, { error: unavailable });
    if (result.success !== true || result.hostname !== url.hostname || result.action !== 'contact') {
      return reply(400, { error: 'The security check expired or could not be verified. Please try again.' });
    }
    // Sender and recipient are fixed. Visitor details are never used as From,
    // copied to marketing lists, stored in a database, or written to logs.
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact/${body.submissionId}` },
      body: JSON.stringify({
        from: `YogaRise Website <${mailbox}>`, to: [mailbox], reply_to: fields.email,
        subject: `New website enquiry from ${fields.name}`,
        text: `New YogaRise website enquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || 'Not supplied'}\n\nMessage:\n${fields.message}\n\nSubmitted from: ${url.origin}/contact/\nReference: ${body.submissionId}\n\nUse your email app's Reply button to respond to the visitor.`,
        tags: [{ name: 'form', value: 'contact' }],
      }),
      signal: AbortSignal.timeout(12000),
    });
    const accepted = await sent.json();
    if (!sent.ok || typeof accepted.id !== 'string' || !accepted.id) return reply(502, { error: 'Delivery was not confirmed. Please try again, or email hello@yogarise.com.au.' });
    return reply(200, { ok: true });
  } catch { return reply(502, { error: 'Delivery was not confirmed. Please try again, or email hello@yogarise.com.au.' }); }
}
