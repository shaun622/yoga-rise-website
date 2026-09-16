import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { contentPagesPlugin } from '../build/content-pages-plugin.js';
import { launchPlugin } from '../build/launch-plugin.js';

const socials = [
  ['Instagram', 'https://www.instagram.com/yogarise.au'],
  ['LinkedIn', 'https://www.linkedin.com/company/yogarise.au/'],
  ['TikTok', 'https://www.tiktok.com/@yogarise.au'],
  ['Facebook', 'https://www.facebook.com/yogarise.au'],
];

function assertSocials(html) {
  const navs = [...html.matchAll(/<nav class="footer-socials"[^>]*>([\s\S]*?)<\/nav>/g)];
  assert.equal(navs.length, 1);
  const links = [...navs[0][1].matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 4);
  socials.forEach(([name, url], index) => {
    const [, attributes, icon] = links[index];
    assert.ok(attributes.includes(`href="${url}"`));
    assert.ok(attributes.includes(`aria-label="${name} (opens in a new tab)"`));
    assert.match(attributes, /target="_blank"/);
    assert.match(attributes, /rel="noopener noreferrer"/);
    assert.match(icon, /<svg[^>]+aria-hidden="true"[^>]+focusable="false"/);
  });
}

test('shared footer has accessible icons for the four supplied social profiles', () => {
  assertSocials(readFileSync('build/site-footer.html', 'utf8'));
  const plugin = contentPagesPlugin();
  plugin.configResolved({ root: resolve('.') });
  for (const filename of ['index.html', 'about/index.html', 'expo/index.html', 'awards/index.html',
    'membership/index.html', 'blog/index.html', 'become-a-partner/index.html',
    'become-a-volunteer/index.html', 'become-a-brand-ambassador/index.html',
    'yoga-teacher-income-calculator/index.html']) {
    assertSocials(plugin.transformIndexHtml(readFileSync(filename, 'utf8'), { filename: resolve(filename) }));
  }
});

test('generated pages retain the shared social links', () => {
  const content = contentPagesPlugin();
  content.configResolved({ root: resolve('.') });
  const home = content.transformIndexHtml(readFileSync('index.html', 'utf8'), { filename: resolve('index.html') });
  const launch = launchPlugin();
  launch.configResolved({ root: resolve('.') });
  const emitted = new Map();
  launch.generateBundle.handler.call({ emitFile: asset => emitted.set(asset.fileName, asset.source) }, {},
    { 'index.html': { type: 'asset', source: home } });
  for (const name of ['courses', 'events', 'resources', 'book-a-call', 'become-a-speaker']) {
    assertSocials(emitted.get(name + '/index.html'));
  }
});
