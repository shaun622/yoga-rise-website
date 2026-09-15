import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { contentPagesPlugin } from '../build/content-pages-plugin.js';

test('Ambassador publishes the supplied Jotform, not the old disabled application', () => {
  const source = 'become-a-brand-ambassador/index.html';
  const plugin = contentPagesPlugin();
  plugin.configResolved({ root: resolve('.') });
  const html = plugin.transformIndexHtml(readFileSync(source, 'utf8'), { filename: resolve(source) });
  assert.equal((html.match(/src="https:\/\/form\.jotform\.com\/jsform\/262560523891864"/g) || []).length, 1);
  assert.match(html, /href="https:\/\/form\.jotform\.com\/262560523891864"/);
  assert.match(html, /<noscript>/);
  assert.match(html, /id="ambassador-application"/);
  assert.equal((html.match(/href="#ambassador-application"/g) || []).length, 4);
  assert.doesNotMatch(html, /data-draft-form|Programme and application details are coming soon/);
  assert.equal((html.match(/<form\b/g) || []).length, 1, 'Only the shared newsletter is a local form');
  assert.match(html, /data-hero-optin/);
  assert.doesNotMatch(html, /Exclusive perks|Get your ambassador kit|Unlock perks|unique referral code/);
  assert.equal((html.match(/data-site-header/g) || []).length, 1);
  assert.equal((html.match(/data-site-footer/g) || []).length, 1);
});

test('Ambassador reuses the responsive Presenter container without fixing iframe height', () => {
  const css = readFileSync('src/demo-pages.css', 'utf8');
  for (const name of ['application-layout', 'application-intro', 'form-panel', 'form-fallback']) {
    assert.match(css, new RegExp(`\\.ambassador-${name},\\s*html\\[data-demo-site\\] \\.presenter-${name} \\{`));
  }
  assert.match(css, /\.ambassador-form-panel iframe,\s*html\[data-demo-site\] \.presenter-form-panel iframe\s*\{[^}]*max-width: 100%;/);
  const frameRule = css.match(/\.presenter-form-panel iframe\s*\{([^}]*)\}/)?.[1];
  assert.doesNotMatch(frameRule, /height|overflow/);
  assert.match(css, /html\[data-demo-page='become-a-brand-ambassador'\] body \{ min-width: 0; \}/);
  assert.match(css, /html\[data-demo-page='become-a-brand-ambassador'\] \.content-button \{ max-width: 100%; \}/);
});
