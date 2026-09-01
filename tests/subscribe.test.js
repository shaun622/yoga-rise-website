import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestPost } from '../functions/api/subscribe.js';

function createDatabaseSpy() {
  const calls = [];
  return {
    calls,
    database: {
      prepare(sql) {
        return {
          bind(...values) {
            return {
              async run() {
                calls.push({ sql, values });
              },
            };
          },
        };
      },
    },
  };
}

test('stores a confirmed MailerLite signup in the D1 backup', async () => {
  const { calls, database } = createDatabaseSpy();
  const response = await onRequestPost({
    request: new Request('https://www.yogarise.com.au/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'Valerie', email: 'Person@Example.com' }),
    }),
    env: { SUBSCRIBERS_DB: database },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].values, ['person@example.com']);
});

test('validates the first name before writing the backup', async () => {
  const { calls, database } = createDatabaseSpy();
  const response = await onRequestPost({
    request: new Request('https://www.yogarise.com.au/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: '', email: 'person@example.com' }),
    }),
    env: { SUBSCRIBERS_DB: database },
  });

  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('a filled honeypot returns success without writing the backup', async () => {
  const { calls, database } = createDatabaseSpy();
  const response = await onRequestPost({
    request: new Request('https://www.yogarise.com.au/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Robot',
        email: 'robot@example.com',
        company: 'Spam Inc',
      }),
    }),
    env: { SUBSCRIBERS_DB: database },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 0);
});
