import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildMailerLiteUrl,
  getMailerLiteErrorMessage,
  getMailerLiteLocalValidationMessage,
  surveyMailerLiteFormUrl,
} from '../src/mailerlite.js';

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

test('supports a separate MailerLite form and the survey contact fields', () => {
  const formUrl = 'https://assets.mailerlite.com/jsonp/2606050/forms/survey/subscribe';
  const url = buildMailerLiteUrl({
    email: 'teacher@example.com',
    firstName: 'Alex',
    lastName: 'Rivera',
    phone: '0400 000 000',
    formUrl,
    guid: 'survey-guid',
  });

  assert.equal(url.origin + url.pathname, formUrl);
  assert.equal(url.searchParams.get('fields[email]'), 'teacher@example.com');
  assert.equal(url.searchParams.get('fields[name]'), 'Alex');
  assert.equal(url.searchParams.get('fields[last_name]'), 'Rivera');
  assert.equal(url.searchParams.get('fields[phone]'), '0400 000 000');
  assert.equal(url.searchParams.get('guid'), 'survey-guid');
});

test('preserves the survey embed\'s optional mobile behaviour', () => {
  const url = buildMailerLiteUrl({
    email: 'teacher@example.com',
    firstName: 'Alex',
    phone: '',
    guid: 'survey-guid',
  });

  assert.equal(url.searchParams.get('fields[phone]'), 'Not provided');
});

test('uses the supplied survey MailerLite embed endpoint', () => {
  const url = buildMailerLiteUrl({
    email: 'teacher@example.com',
    firstName: 'Alex',
    formUrl: surveyMailerLiteFormUrl,
    guid: 'survey-guid',
  });

  assert.equal(url.origin + url.pathname, surveyMailerLiteFormUrl);
});

test('surfaces a safe MailerLite validation message', () => {
  assert.equal(
    getMailerLiteErrorMessage({ errors: { email: ['Please enter a valid email address.'] } }),
    'Please enter a valid email address.',
  );
});

test('explains MailerLite short Gmail rejection before submission', () => {
  assert.match(
    getMailerLiteLocalValidationMessage('test@gmail.com'),
    /five or fewer characters/,
  );
  assert.equal(getMailerLiteLocalValidationMessage('shaun+1@gmail.com'), '');
});
