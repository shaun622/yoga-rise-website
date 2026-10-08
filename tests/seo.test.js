import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { activeContentPages } from '../content/page-release.js';
import { articles } from '../content/articles.js';
import { contentPagesPlugin } from '../build/content-pages-plugin.js';
import { articlesPlugin } from '../build/articles-plugin.js';
import { launchPlugin } from '../build/launch-plugin.js';
import { applySeoMetadata, pagePath, siteOrigin } from '../build/seo.js';

const read = (path) => readFileSync(path, 'utf8');
const headOf = (html) => html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)[0];
function meta(html, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = [...headOf(html).matchAll(new RegExp(`<meta\\s+(?:property|name)="${escaped}"\\s+content="([^"]*)"`, 'g'))];
  assert.equal(matches.length, 1, `Exactly one ${key}`);
  return matches[0][1];
}
const protectedPages = new Set([
  '404.html', 'yoga-teacher-industry-survey/index.html',
  'yoga-teacher-industry-survey/thank-you/index.html',
  'yoga-teacher-income-calculator/index.html', 'yogarise-marketing-health-check/index.html',
]);
const sources = [...new Set(['index.html', 'blog/index.html', 'yoga-teacher-income-calculator/index.html',
  'yoga-teacher-industry-survey/index.html', 'yoga-teacher-industry-survey/thank-you/index.html',
  ...activeContentPages().map((page) => page.source)])];

function renderedSite() {
  const plugins = [contentPagesPlugin(), articlesPlugin(), launchPlugin()];
  for (const plugin of plugins) plugin.configResolved({ root: resolve('.') });
  const bundle = Object.fromEntries(sources.map((fileName) => {
    let html = read(fileName);
    for (const plugin of plugins) {
      if (plugin.transformIndexHtml) html = plugin.transformIndexHtml(html, { filename: resolve(fileName), path: `/${fileName}` });
    }
    return [fileName, { type: 'asset', source: html }];
  }));
  const context = { emitFile: (asset) => { bundle[asset.fileName] = asset; } };
  for (const plugin of plugins) plugin.generateBundle?.handler.call(context, {}, bundle);
  return bundle;
}
const bundle = renderedSite();
const pages = Object.entries(bundle).filter(([name]) => name.endsWith('.html'));

test('every released page has complete static, page-specific social and canonical metadata', () => {
  assert.equal(pages.length, 22);
  const titles = new Set();
  const descriptions = new Set();
  for (const [fileName, { source: html }] of pages) {
    const canonical = `${siteOrigin}${pagePath(fileName)}`;
    assert.equal((headOf(html).match(/rel="canonical"/g) || []).length, 1, fileName);
    assert.ok(headOf(html).includes(`rel="canonical" href="${canonical}"`), fileName);
    assert.equal(meta(html, 'og:url'), canonical);
    assert.equal(meta(html, 'og:site_name'), 'YogaRise');
    assert.equal(meta(html, 'og:locale'), 'en_AU');
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image');
    assert.equal(meta(html, 'twitter:title'), meta(html, 'og:title'));
    assert.equal(meta(html, 'twitter:description'), meta(html, 'og:description'));
    assert.equal(meta(html, 'twitter:image'), meta(html, 'og:image'));
    assert.equal(meta(html, 'twitter:image:alt'), meta(html, 'og:image:alt'));
    assert.equal(meta(html, 'og:image:secure_url'), meta(html, 'og:image'));
    assert.match(meta(html, 'og:image'), /^https:\/\/www\.yogarise\.com\.au\/assets\//);
    assert.doesNotMatch(headOf(html), /content="[^"\n]*\/assets\/hero\.webp"|__ARTICLE_DESCRIPTION__/);
    if (!protectedPages.has(fileName)) {
      const title = headOf(html).match(/<title>([\s\S]*?)<\/title>/)[1];
      const description = meta(html, 'description');
      assert.ok(!titles.has(title), `Duplicate indexable title: ${fileName}`);
      assert.ok(!descriptions.has(description), `Duplicate indexable description: ${fileName}`);
      titles.add(title);
      descriptions.add(description);
    }
  }
  assert.equal(meta(bundle['index.html'].source, 'og:image'), `${siteOrigin}/assets/demo-20260911/home-hero.webp`);
  for (const name of ['about', 'awards', 'expo']) {
    assert.equal(meta(bundle[`${name}/index.html`].source, 'og:image'), `${siteOrigin}/assets/demo-20260911/${name}-hero.webp`);
  }
  assert.match(meta(bundle['404.html'].source, 'og:description'), /^This page is not available\./);
});

test('article previews use the article title, description and artwork rather than a shared hero', () => {
  for (const article of articles.filter((entry) => entry.status === 'published')) {
    const html = bundle[`blog/${article.slug}/index.html`].source;
    assert.equal(meta(html, 'og:type'), 'article');
    assert.equal(meta(html, 'og:image'), `${siteOrigin}${article.imageSrc}`);
    assert.equal(meta(html, 'og:description'), article.excerpt);
    assert.equal(Number(meta(html, 'og:image:width')), article.imageWidth);
    assert.equal(Number(meta(html, 'og:image:height')), article.imageHeight);
  }
});

test('sharing image files exist with the declared WebP dimensions', () => {
  for (const [fileName, { source: html }] of pages) {
    const src = new URL(meta(html, 'og:image')).pathname;
    const data = readFileSync(resolve('public', `.${src}`));
    assert.equal(meta(html, 'og:image:type'), 'image/webp');
    assert.equal(data.toString('ascii', 0, 4), 'RIFF', fileName);
    assert.equal(data.toString('ascii', 8, 12), 'WEBP', fileName);
    let width, height;
    const format = data.toString('ascii', 12, 16);
    if (format === 'VP8 ') {
      width = data.readUInt16LE(26) & 0x3fff;
      height = data.readUInt16LE(28) & 0x3fff;
    } else if (format === 'VP8X') {
      width = 1 + data.readUIntLE(24, 3);
      height = 1 + data.readUIntLE(27, 3);
    } else if (format === 'VP8L') {
      const bits = data.readUInt32LE(21);
      width = 1 + (bits & 0x3fff);
      height = 1 + ((bits >>> 14) & 0x3fff);
    }
    assert.equal(Number(meta(html, 'og:image:width')), width, fileName);
    assert.equal(Number(meta(html, 'og:image:height')), height, fileName);
    assert.ok(data.length < 5 * 1024 * 1024, fileName);
  }
});

test('SEO updates preserve noindex, the sitemap boundary and unreleased pages', () => {
  const urls = [...bundle['sitemap.xml'].source.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 17);
  assert.equal(new Set(urls).size, urls.length);
  for (const [fileName, { source: html }] of pages) {
    const noindex = /<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/.test(headOf(html));
    assert.equal(noindex, protectedPages.has(fileName), fileName);
    assert.equal(urls.includes(`${siteOrigin}${pagePath(fileName)}`), !protectedPages.has(fileName), fileName);
  }
  assert.ok(bundle['contact/index.html']);
  assert.doesNotMatch(bundle['sitemap.xml'].source, /pages\.dev|elevate/);
  assert.match(read('public/robots.txt'), /Sitemap: https:\/\/www\.yogarise\.com\.au\/sitemap.xml/);
  assert.match(read('public/_headers'), /https:\/\/yoga-rise-website\.pages\.dev\/\*\s+X-Robots-Tag: noindex, nofollow/);
  assert.match(read('public/_headers'), /https:\/\/:version\.yoga-rise-website\.pages\.dev\/\*\s+X-Robots-Tag: noindex, nofollow/);
});

test('metadata rendering is idempotent, safely escaped, and leaves visible copy untouched', () => {
  const input = '<html><head><title>Learn &amp; connect | YogaRise</title><meta name="description" content="A &quot;fresh&quot; view &amp; more." /><meta name="robots" content="noindex, nofollow" /></head><body><h1>Keep this heading</h1></body></html>';
  const rendered = applySeoMetadata(input, 'about/index.html');
  assert.equal(meta(rendered, 'og:title'), 'Learn &amp; connect | YogaRise');
  assert.equal(meta(rendered, 'og:description'), 'A &quot;fresh&quot; view &amp; more.');
  assert.equal(rendered, applySeoMetadata(rendered, 'about/index.html'));
  assert.ok(rendered.endsWith('<body><h1>Keep this heading</h1></body></html>'));
  const home = bundle['index.html'].source;
  assert.equal(home, applySeoMetadata(home, 'index.html'));
  assert.equal((home.match(/id="site-identity"/g) || []).length, 1);
  const identity = JSON.parse(home.match(/id="site-identity">(.*?)<\/script>/)[1]);
  assert.deepEqual(identity, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'YogaRise', url: `${siteOrigin}/` });
  assert.match(home, /<title>YogaRise<\/title>/);
});

test('missing image choices or unresolved metadata fail the build rather than sharing stale information', () => {
  assert.throws(() => applySeoMetadata('<head></head>', 'about/index.html'), /Missing rendered SEO/);
  assert.throws(() => applySeoMetadata(read('blog/index.html'), 'blog/index.html'), /Missing rendered SEO/);
  assert.throws(() => applySeoMetadata(read('index.html'), 'new-page/index.html'), /Missing sharing image/);
});

test('website-owned copy, drafts and calculator display code contain no em dashes', () => {
  function textFiles(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? textFiles(path) : /\.(html|js|css|json)$/.test(entry.name) ? [path] : [];
    });
  }
  const files = new Set([...sources, ...['src', 'build', 'content', 'functions'].flatMap(textFiles)]);
  for (const file of files) {
    assert.doesNotMatch(read(file), /\u2014|&mdash;|&#0*8212;|&#x0*2014;|\\u2014/gi, relative('.', file));
  }
  for (const [name, { source }] of pages) assert.doesNotMatch(source, /\u2014|&mdash;|&#0*8212;|&#x0*2014;/gi, name);
});
