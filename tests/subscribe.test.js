import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildMailerLiteUrl,
  onRequestPost,
  parseMailerLiteResponse,
} from '../functions/api/subscribe.js';

test('parses MailerLite JSON and JSONP responses', () => {
  assert.deepEqual(parseMailerLiteResponse('{"success":true}'), { success: true });
  assert.deepEqual(parseMailerLiteResponse('mlWebformSubmitted({"success":true});'), {
    success: true,
  });
  assert.equal(parseMailerLiteResponse('<html>Not a signup response</html>'), null);
});

test('builds the request shape used by the MailerLite embed', () => {
  const url = buildMailerLiteUrl({
    email: 'person@example.com',
    firstName: 'Valerie',
    lastName: 'Saindon',
  });

  assert.equal(url.searchParams.get('fields[email]'), 'person@example.com');
  assert.equal(url.searchParams.get('fields[name]'), 'Valerie');
  assert.equal(url.searchParams.get('fields[last_name]'), 'Saindon');
  assert.equal(url.searchParams.get('fields[phone]'), 'Not provided');
  assert.equal(url.searchParams.get('ajax'), '1');
  assert.equal(url.searchParams.get('callback'), 'mlWebformSubmitted');
  assert.ok(url.searchParams.get('guid'));
});

test('returns success only when MailerLite confirms the subscriber', async () => {
  const originalFetch = globalThis.fetch;
  let requestedUrl;
  globalThis.fetch = async (url, options) => {
    requestedUrl = new URL(url);
    assert.equal(options.method, 'GET');
    return new Response('mlWebformSubmitted({"success":true});', { status: 200 });
  };

  try {
    const response = await onRequestPost({
      request: new Request('https://www.yogarise.com.au/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'Valerie', email: 'person@example.com' }),
      }),
      env: {},
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(requestedUrl.searchParams.get('fields[phone]'), 'Not provided');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('does not show a false success for a MailerLite validation error', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      'mlWebformSubmitted({"success":false,"errors":{"fields":["phone"]}});',
      { status: 200 },
    );

  try {
    const response = await onRequestPost({
      request: new Request('https://www.yogarise.com.au/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'Valerie', email: 'person@example.com' }),
      }),
      env: {},
    });

    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      ok: false,
      message: 'Signup is temporarily unavailable.',
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
