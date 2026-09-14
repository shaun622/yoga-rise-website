import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { launchPlugin } from '../build/launch-plugin.js';

test('Presenter is a static released page with the supplied Jotform and a fallback', () => {
  const plugin = launchPlugin();
  plugin.configResolved({ root: resolve('.') });
  const emitted = new Map();
  const home = '<html><head><title>YogaRise</title></head><body><main id="main-content"><header data-site-header></header></main><footer data-site-footer></footer></body></html>';
  plugin.generateBundle.handler.call({ emitFile: (asset) => emitted.set(asset.fileName, asset.source) }, {}, {
    'index.html': { type: 'asset', source: home },
  });
  const page = emitted.get('become-a-speaker/index.html');
  assert.ok(page);
  assert.match(page, /data-ready-page="become-a-speaker"/);
  assert.equal((page.match(/src="https:\/\/form\.jotform\.com\/jsform\/262559187564471"/g) || []).length, 1);
  assert.match(page, /href="https:\/\/form\.jotform\.com\/262559187564471"/);
  assert.match(page, /<noscript>/);
  assert.match(page, /id="presenter-interest"/);
  assert.match(page, /rel="canonical" href="https:\/\/www\.yogarise\.com\.au\/become-a-speaker\/"/);
  assert.doesNotMatch(page, /data-demo-draft-form|fieldset disabled|connection pending|<form\b/i);
  assert.match(emitted.get('sitemap.xml'), /https:\/\/www\.yogarise\.com\.au\/become-a-speaker\//);
  assert.ok(!emitted.has('contact/index.html'));
});

test('Presenter is discoverable without enabling unrelated draft forms', () => {
  assert.match(readFileSync('build/site-footer.html', 'utf8'), /href="\/become-a-speaker\/">Presenter/);
  for (const name of ['courses', 'events']) {
    assert.match(readFileSync(`src/demo-pages/${name}.html`, 'utf8'), /href="\/become-a-speaker\/#presenter-interest"/);
  }
  const drafts = readFileSync('src/demo-form-drafts.js', 'utf8');
  assert.doesNotMatch(drafts, /speaker|presenter/i);
  assert.match(drafts, /contact\.draft\.html/);
  const css = readFileSync('src/demo-pages.css', 'utf8');
  const frameRule = css.match(/\.presenter-form-panel iframe\s*\{([^}]*)\}/)?.[1];
  assert.ok(frameRule);
  assert.doesNotMatch(frameRule, /height|overflow/);
});
