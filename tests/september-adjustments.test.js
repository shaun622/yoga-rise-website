import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { contentPagesPlugin } from '../build/content-pages-plugin.js';
import { launchPlugin } from '../build/launch-plugin.js';

const read = (path) => readFileSync(path, 'utf8');
function render(path) {
  const plugin = contentPagesPlugin();
  plugin.configResolved({ root: resolve('.') });
  return plugin.transformIndexHtml(read(path), { filename: resolve(path) });
}

test('regular pages share the complete newsletter form and home-linked logo', () => {
  for (const path of ['index.html', 'about/index.html', 'awards/index.html',
    'expo/index.html', 'membership/index.html', 'blog/index.html',
    'become-a-partner/index.html', 'become-a-volunteer/index.html',
    'become-a-brand-ambassador/index.html', 'yoga-teacher-income-calculator/index.html']) {
    const html = render(path);
    assert.equal((html.match(/data-hero-optin/g) || []).length, 1, path);
    assert.equal((html.match(/id="newsletter"/g) || []).length, 1, path);
    assert.match(html, /class="brand" href="\/"/, path);
    assert.match(html, /href="\/resources\/">Resources/, path);
    assert.doesNotMatch(html, /href="[^"]*demo-newsletter"/, path);
    assert.doesNotMatch(html, /<a[^>]*>Home<\/a>/, path);
  }
  assert.match(read('src/site-chrome.js'), /import '\.\/newsletter\.js'/);
  assert.doesNotMatch(read('src/main.js'), /addEventListener\('submit'/);
});

test('generated ready pages retain the shared newsletter instead of a link back home', () => {
  const plugin = launchPlugin();
  plugin.configResolved({ root: resolve('.') });
  const emitted = new Map();
  plugin.generateBundle.handler.call({ emitFile: asset => emitted.set(asset.fileName, asset.source) }, {},
    { 'index.html': { type: 'asset', source: render('index.html') } });
  for (const name of ['courses', 'events', 'resources', 'book-a-call', 'become-a-speaker']) {
    const html = emitted.get(name + '/index.html');
    assert.equal((html.match(/data-hero-optin/g) || []).length, 1, name);
    assert.match(html, /id="newsletter"/);
    assert.doesNotMatch(html, /demo-newsletter|href="\/#newsletter"/);
  }
  assert.ok(!emitted.has('contact/index.html'), 'Do not release the disconnected Contact form');
});

test('update CTAs follow the annotated locations and preserve unreleased content', () => {
  const expo = render('expo/index.html');
  assert.equal((expo.match(/href="#newsletter">Get Expo updates/g) || []).length, 4);
  for (const text of ['Ticket and venue details will be announced here.', 'This is for you if...',
    'Plan your day.', 'Invest in the person behind the practice.']) {
    const after = expo.slice(expo.indexOf(text));
    assert.ok(after.indexOf('href="#newsletter"') < after.indexOf('</section>') || text.startsWith('Ticket'));
  }
  assert.doesNotMatch(expo, /id="tickets"|\$269|\$49|href="#tickets"/);
  const membership = render('membership/index.html');
  assert.equal((membership.match(/href="#newsletter">Get Membership updates/g) || []).length, 3);
  assert.match(membership, /src="\/assets\/events.webp" alt="A teacher leading a small yoga workshop"/);
  assert.doesNotMatch(membership, /Monthly masterclasses|Monthly online networking/);
  const awards = render('awards/index.html');
  assert.equal((awards.match(/href="#newsletter">Get Awards updates/g) || []).length, 2);
  assert.doesNotMatch(awards, /id="nominate"|id="award-categories"/);
  assert.match(render('about/index.html'), /href="#newsletter">Join the community/);
});

test('supplied MailerLite applications keep separate destinations, fields and callbacks', () => {
  const cases = [
    ['partner', '198554764562138627', '45893777', 'partnership-enquiry', 6],
    ['volunteer', '198557478572525399', '45894370', 'volunteer-application', 4],
  ];
  for (const [name, formId, embedId, anchor, links] of cases) {
    const html = render('become-a-' + name + '/index.html');
    assert.match(html, new RegExp('id="' + anchor + '"'));
    assert.equal((html.match(new RegExp('href="#' + anchor + '"', 'g')) || []).length, links);
    assert.match(html, new RegExp('action="https://dashboard.mailerlite.com/jsonp/2606050/forms/' + formId + '/subscribe"'));
    assert.match(html, new RegExp('function ml_webform_success_' + embedId));
    assert.match(html, /webforms\.min\.js/);
    assert.match(html, /name="ml-submit" value="1"/);
    assert.match(html, /name="anticsrf" value="true"/);
    assert.doesNotMatch(html, /data-draft-form|application details are coming soon|enquiry details are coming soon/);
    const embed = read('build/forms/' + name + '.html');
    const controls = [...embed.matchAll(/<(?:input|textarea)\b[^>]*name="fields\[[^"]+"[^>]*>/g)];
    assert.equal(controls.length, 8);
    controls.forEach(([tag]) => {
      assert.match(tag, /id="[^"]+"/);
      if (tag.includes('aria-required="true"')) assert.match(tag, /\srequired/);
    });
    assert.match(embed, /role="status" aria-live="polite"/);
  }
  assert.doesNotMatch(read('build/forms/partner.html'), /fields\[country\]/);
  assert.doesNotMatch(render('become-a-volunteer/index.html'), /Final volunteer benefits|accessibility_requirements/);
});

test('Contact remains an honest local form preview, not a mailto-only replacement or fake success', () => {
  const contact = read('src/demo-pages/contact.draft.html');
  assert.match(contact, /id="contact-enquiry"/);
  for (const name of ['name', 'email', 'phone', 'message']) assert.match(contact, new RegExp('name="' + name + '"'));
  assert.match(contact, /data-demo-draft-form/);
  assert.match(contact, /type="submit" disabled/);
  assert.match(contact, /hello@yogarise\.com\.au/);
  assert.doesNotMatch(contact, /action="mailto:|message sent/i);
});
