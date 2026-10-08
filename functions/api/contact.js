const mailbox = 'hello@yogarise.com.au';
const unavailable = `The form is temporarily unavailable. Please email ${mailbox}.`;
const reply = (status, data) => Response.json(data, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
} });
const allowedHost = (host) => ['www.yogarise.com.au', 'yogarise.com.au', 'yoga-rise-website.pages.dev'].includes(host)
  || host.endsWith('.yoga-rise-website.pages.dev');

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

export function renderContactEmail(fields, { source, reference }) {
  const emailLink = `mailto:${encodeURIComponent(fields.email).replace(/%40/g, '@')}`;
  const replyLink = `${emailLink}?subject=${encodeURIComponent(`Re: New website enquiry from ${fields.name}`)}`;
  const safe = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]));
  const detailStyle = 'padding:6px 0;font-size:15px;line-height:24px;vertical-align:top;';
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New YogaRise website enquiry</title></head>
<body style="margin:0;padding:0;background-color:#f2f0ec;color:#25231f;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;overflow:hidden;mso-hide:all;">A new enquiry from ${safe.name}. Reply directly to get in touch.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f2f0ec;">
    <tr><td align="center" style="padding:28px 16px;">
      <!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e2ded7;">
        <tr><td style="padding:24px 28px;background-color:#24120d;color:#ffffff;">
          <div style="font-size:25px;line-height:30px;font-weight:700;letter-spacing:-1px;">YogaRise</div>
          <div style="margin-top:5px;font-size:11px;line-height:18px;letter-spacing:2px;color:#dfcbb8;">GROW BEYOND THE MAT</div>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 10px;font-size:26px;line-height:34px;font-weight:700;">New website enquiry</h1>
          <p style="margin:0 0 22px;font-size:15px;line-height:24px;color:#625c54;">Someone has contacted YogaRise through the website.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr><td width="72" style="${detailStyle}color:#756d63;">Name</td><td style="${detailStyle}font-weight:700;overflow-wrap:anywhere;word-break:break-word;">${safe.name}</td></tr>
            <tr><td width="72" style="${detailStyle}color:#756d63;">Email</td><td style="${detailStyle}overflow-wrap:anywhere;word-break:break-word;"><a href="${escapeHtml(emailLink)}" style="color:#744c33;text-decoration:underline;">${safe.email}</a></td></tr>
            <tr><td width="72" style="${detailStyle}color:#756d63;">Phone</td><td style="${detailStyle}overflow-wrap:anywhere;word-break:break-word;">${safe.phone || 'Not supplied'}</td></tr>
          </table>
          <h2 style="margin:26px 0 10px;font-size:14px;line-height:22px;font-weight:700;">Message</h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr><td style="padding:18px;background-color:#f6f4f0;border-left:3px solid #987352;font-size:15px;line-height:25px;overflow-wrap:anywhere;word-break:break-word;">${safe.message.replace(/\r\n?|\n/g, '<br>')}</td></tr>
          </table>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
            <tr><td style="background-color:#24120d;"><a href="${escapeHtml(replyLink)}" style="display:inline-block;padding:13px 22px;border:1px solid #24120d;color:#ffffff;font-size:14px;line-height:20px;font-weight:700;text-decoration:none;">Reply to enquiry</a></td></tr>
          </table>
          <p style="margin:12px 0 0;font-size:12px;line-height:19px;color:#756d63;">You can also use your email app's Reply button to respond to the visitor.</p>
        </td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid #e8e4dd;font-size:11px;line-height:18px;color:#756d63;overflow-wrap:anywhere;word-break:break-word;">
          Submitted from <a href="${escapeHtml(source)}" style="color:#756d63;text-decoration:underline;">the YogaRise Contact page</a><br>
          Reference: ${escapeHtml(reference)}
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}

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
        html: renderContactEmail(fields, { source: `${url.origin}/contact/`, reference: body.submissionId }),
        tags: [{ name: 'form', value: 'contact' }],
      }),
      signal: AbortSignal.timeout(12000),
    });
    const accepted = await sent.json();
    if (!sent.ok || typeof accepted.id !== 'string' || !accepted.id) return reply(502, { error: 'Delivery was not confirmed. Please try again, or email hello@yogarise.com.au.' });
    return reply(200, { ok: true });
  } catch { return reply(502, { error: 'Delivery was not confirmed. Please try again, or email hello@yogarise.com.au.' }); }
}
