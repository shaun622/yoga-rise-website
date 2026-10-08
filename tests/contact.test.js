import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest, renderContactEmail } from '../functions/api/contact.js';
import { onRequestGet } from '../functions/api/contact-config.js';

const origin = 'https://www.yogarise.com.au';
const env = { RESEND_API_KEY: 'server-key-placeholder', CONTACT_TURNSTILE_SECRET: 'secret-placeholder', CONTACT_TURNSTILE_SITE_KEY: 'public-placeholder' };
const fields = { name: 'Zoë Test', email: 'zoe@example.com', phone: '+61 400 000 000', message: '<b>Only plain text</b>\nAn enquiry.', website: '', token: 'valid-token', submissionId: '12345678-abcd-4321-8abc-123456789abc' };
const request = (body = fields, headers = {}) => new Request(`${origin}/api/contact`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
const json = (value, status = 200) => Response.json(value, { status });

test('configuration exposes only the public site key and fails closed when unconfigured', async () => {
  const response = onRequestGet({ env });
  assert.deepEqual(await response.json(), { siteKey: 'public-placeholder' });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(onRequestGet({ env: {} }).status, 503);
});

test('rejects wrong origins, methods, invalid fields, header injection, bots and oversized requests without sending', async (t) => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('must not contact provider'); });
  assert.equal((await onRequest({ request: new Request(`${origin}/api/contact`), env })).status, 405);
  assert.equal((await onRequest({ request: request(fields, { Origin: 'https://example.com' }), env })).status, 403);
  assert.equal((await onRequest({ request: request(fields, { 'Content-Type': 'text/plain' }), env })).status, 415);
  for (const body of [null, [], { ...fields, name: ' ' }, { ...fields, email: 'invalid' }, { ...fields, email: 'x@y.com\r\nBcc:a@b.com' },
    { ...fields, name: 'Name\r\nFrom: somebody' }, { ...fields, website: 'spam' }, { ...fields, message: 'x'.repeat(5001) },
    { ...fields, token: '' }, { ...fields, submissionId: 'not-an-id' }, { ...fields, phone: [] }, { ...fields, extra: 'x'.repeat(24000) }]) {
    assert.equal((await onRequest({ request: request(body), env })).status, 400);
  }
  assert.equal((await onRequest({ request: request(), env: {} })).status, 503);
});

test('Turnstile success must match the real hostname and contact action', async (t) => {
  for (const verification of [{ success: false }, { success: true, hostname: 'other.example', action: 'contact' }, { success: true, hostname: 'www.yogarise.com.au', action: 'newsletter' }]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => json(verification));
    assert.equal((await onRequest({ request: request(), env })).status, 400);
    assert.equal(mock.mock.callCount(), 1);
    mock.mock.restore();
  }
});

test('verified enquiries use fixed sender/recipient, visitor Reply-To and stable idempotency, not caller-supplied destinations', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? json({ success: true, hostname: 'www.yogarise.com.au', action: 'contact' }) : json({ id: 'accepted-email-id' });
  });
  const response = await onRequest({ request: request({ ...fields, to: 'attacker@example.com', from: 'attacker@example.com' }), env });
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  assert.equal(calls[0].options.body.get('secret'), env.CONTACT_TURNSTILE_SECRET);
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
  const email = JSON.parse(calls[1].options.body);
  assert.deepEqual(email.to, ['hello@yogarise.com.au']);
  assert.equal(email.from, 'YogaRise Website <hello@yogarise.com.au>');
  assert.equal(email.reply_to, fields.email);
  assert.match(email.text, /Zoë Test/);
  assert.ok(email.text.includes(fields.message));
  assert.match(email.html, /New website enquiry/);
  assert.match(email.html, /&lt;b&gt;Only plain text&lt;\/b&gt;<br>An enquiry\./);
  assert.match(email.html, /mailto:zoe@example\.com/);
  assert.equal(calls[1].options.headers['Idempotency-Key'], `contact/${fields.submissionId}`);
  assert.equal(calls[1].options.headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
});

test('enquiry email presents contact details, multiline message, reply action and source with a plain-text fallback', () => {
  const html = renderContactEmail(fields, { source: `${origin}/contact/`, reference: fields.submissionId });
  assert.match(html, /<html lang="en">/);
  assert.match(html, /max-width:600px/);
  for (const text of ['YogaRise', 'GROW BEYOND THE MAT', 'Zoë Test', fields.email, fields.phone, 'Message', 'Reply to enquiry', fields.submissionId, `${origin}/contact/`]) {
    assert.ok(html.includes(text), `missing ${text}`);
  }
  const withoutPhone = renderContactEmail({ ...fields, phone: '' }, { source: `${origin}/contact/`, reference: fields.submissionId });
  assert.match(withoutPhone, /Not supplied/);
});

test('HTML email escapes all visitor content and encodes mailto query characters', () => {
  const hostile = {
    ...fields, name: `A & B <img src=x onerror="alert(1)"> 'quoted'`,
    email: 'a+tag?bcc=unwanted@example.com', phone: '<script>alert(1)</script>',
    message: '<a href="https://unwanted.example">Click me</a>\r\nSecond & final line.\rThird line.',
  };
  const html = renderContactEmail(hostile, { source: `${origin}/contact/`, reference: fields.submissionId });
  assert.doesNotMatch(html, /<img|<script|href="https:\/\/unwanted\.example|mailto:a\+tag\?bcc=/);
  assert.match(html, /A &amp; B &lt;img src=x onerror=&quot;alert\(1\)&quot;&gt; &#39;quoted&#39;/);
  assert.match(html, /mailto:a%2Btag%3Fbcc%3Dunwanted@example\.com/);
  assert.match(html, /&lt;\/a&gt;<br>Second &amp; final line\.<br>Third line\./);
});

test('provider rejection, malformed acceptance and network errors never pretend success or leak provider details', async (t) => {
  for (const outcome of [json({ message: 'private provider failure' }, 403), json({}), new Error('secret failure')]) {
    let count = 0;
    const mock = t.mock.method(globalThis, 'fetch', async () => {
      if (++count === 1) return json({ success: true, hostname: 'www.yogarise.com.au', action: 'contact' });
      if (outcome instanceof Error) throw outcome;
      return outcome;
    });
    const response = await onRequest({ request: request(), env });
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.doesNotMatch(body, /private|secret|"ok":true/);
    assert.match(body, /Delivery was not confirmed/);
    mock.mock.restore();
  }
});
