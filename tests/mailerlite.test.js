import assert from 'node:assert/strict';
import test from 'node:test';

import { buildMailerLiteUrl } from '../src/mailerlite.js';

test('builds the browser-native MailerLite JSONP request', () => {
  const url = buildMailerLiteUrl({
    email: 'person@example.com',
    firstName: 'Valerie',
    guid: 'test-guid',
  });

  assert.equal(url.searchParams.get('fields[email]'), 'person@example.com');
  assert.equal(url.searchParams.get('fields[name]'), 'Valerie');
  assert.equal(url.searchParams.get('fields[last_name]'), '');
  assert.equal(url.searchParams.get('fields[phone]'), 'Not provided');
  assert.equal(url.searchParams.get('ml-submit'), '1');
  assert.equal(url.searchParams.get('anticsrf'), 'true');
  assert.equal(url.searchParams.get('ajax'), '1');
  assert.equal(url.searchParams.get('guid'), 'test-guid');
  assert.equal(url.searchParams.get('callback'), 'mlWebformSubmitted');
});
