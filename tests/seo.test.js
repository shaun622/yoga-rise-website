import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { activeContentPages } from '../content/page-release.js';
import { articles } from '../content/articles.js';
import { events, eventPath } from '../content/events.js';
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

test('survey thank-you publishes the supplied event offers and claim instructions', () => {
  const html = bundle['yoga-teacher-industry-survey/thank-you/index.html'].source;
  assert.match(html, /<h1>Thank you for sharing your voice\.<\/h1>/);
  assert.match(html, /Your contribution helps shape a more connected yoga industry\./);
  assert.match(html, /Your exclusive survey thank-you/);
  assert.match(html, /Enter code <strong>SURVEY<\/strong> at checkout/);
  assert.match(html, /Valid for one person \(one ticket\)\./);
  assert.match(html, /Thank you for helping us shape the future of Australia's yoga industry\./);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /<form\b|Keep me posted|Sydney Central|Venue to be announced/);

  const offers = [...html.matchAll(/<article class="survey-offer"[\s\S]*?<\/article>/g)].map(([offer]) => offer);
  assert.equal(offers.length, 2);
  for (const [index, edition, discount, label] of [[0, 'Sydney', 15, 'View Sydney Event'], [1, 'Online', 0, 'View Online Event']]) {
    const event = events.find(item => item.edition === edition);
    const offer = offers[index];
    if (event.price === 0) {
      assert.match(offer, /<strong>Free<\/strong>/);
      assert.doesNotMatch(offer, /\$\d+|\boff\b/);
    } else {
      assert.ok(offer.includes(`$${discount} off`));
      assert.ok(offer.includes(`Now <strong>$${event.price - discount}</strong>`));
    }
    assert.ok(offer.includes(`datetime="${event.date}"`));
    assert.ok(offer.includes(`href="${eventPath(event)}">${label}`));
    assert.ok(bundle[`${eventPath(event).slice(1)}index.html`], 'Offer destination is published');
  }
  assert.match(offers[0], /The Dale Loft, Chippendale/);
  assert.match(offers[1], /7:00 pm - 8:15 pm AEDT/);
  assert.match(offers[1], /Live via Zoom/);
  assert.match(html, /at checkout for \$15 off the Sydney in-person event/);
  assert.match(html, /live online event is free and does not require a discount code/);
  assert.doesNotMatch(read('src/survey-thank-you.js'), /subscribeToMailerLite|addEventListener/);
  assert.match(read('yoga-teacher-industry-survey/index.html'), /https:\/\/form\.jotform\.com\/jsform\/262418532735459/);
});

test('free online registration renders consistently without changing Sydney ticket prices', () => {
  const online = events.find(event => event.edition === 'Online');
  const sydney = events.find(event => event.edition === 'Sydney');
  assert.equal(online.price, 0);
  assert.equal(sydney.price, 35);
  const onlineHtml = bundle[`events/${online.slug}/index.html`].source;
  assert.match(onlineHtml, /event-hero-price">Free<span>Registration required/);
  assert.match(onlineHtml, /event-ticket-price">Free<span>Registration required/);
  assert.match(onlineHtml, /Your registration includes/);
  assert.match(onlineHtml, /Free registration/);
  const buttons = [...onlineHtml.matchAll(/<a\b[^>]*class="[^"]*event-ticket-button[^>]*>([\s\S]*?)<\/a>/g)];
  assert.ok(buttons.length > 0);
  for (const [, label] of buttons) assert.match(label, /Register for free/);
  assert.doesNotMatch(onlineHtml, /\$25|\$0|\$-\d/);
  const sydneyHtml = bundle[`events/${sydney.slug}/index.html`].source;
  assert.match(sydneyHtml, /event-hero-price">\$35<span>per person/);
  assert.match(sydneyHtml, /Live online via Zoom · Free<\/p>/);
  const cards = [...bundle['events/index.html'].source.matchAll(/<article class="event-card">[\s\S]*?<\/article>/g)];
  const onlineCard = cards.find(([html]) => html.includes(`/events/${online.slug}/`))[0];
  assert.match(onlineCard, /event-card-price">Free<small>Registration required/);
  assert.doesNotMatch(onlineCard, /\$25|\$0/);
});

test('both homepage explore buttons lead to Events', () => {
  const html = bundle['index.html'].source;
  const links = [...html.matchAll(/<a\b[^>]*href="\/events\/"[^>]*>Explore events<\/a>/g)];
  assert.equal(links.length, 2);
  assert.doesNotMatch(html, /Explore the Expo/i);
});

test('every catalogue event has a linked static detail page and the shared menu leads to Events', () => {
  const index = bundle['events/index.html'].source;
  for (const event of events) {
    const path = eventPath(event);
    assert.ok(index.includes(`href="${path}"`), `Missing listing link: ${path}`);
    const html = bundle[`${path.slice(1)}index.html`]?.source;
    assert.ok(html, `Missing static route: ${path}`);
    assert.ok(html.includes(event.dateLabel), `Missing event date: ${path}`);
    assert.ok(html.includes('href="/events/"'), `Missing return link: ${path}`);
  }
  const navigation = bundle['index.html'].source.match(/<nav\b[^>]*id="primary-navigation"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(navigation?.includes('href="/events/"'));
  assert.ok(!navigation.includes('href="/expo/"'));
});

test('event ticket anchors resolve to one checkout and only supplied event codes are embedded', () => {
  for (const event of events) {
    const html = bundle[`events/${event.slug}/index.html`].source;
    assert.equal((html.match(/id="tickets"/g) || []).length, 1);
    const links = [...html.matchAll(/<a\b[^>]*class="[^"]*event-ticket-button[^>]*>/g)];
    assert.ok(links.length > 0);
    for (const [link] of links) assert.ok(link.includes('href="#tickets"'));
    assert.doesNotMatch(html, /<dialog|data-event-ticket|Eventbrite/);
    const frames = [...html.matchAll(/<iframe\b[^>]*data-checkout="([^"]+)"[^>]*>/g)];
    assert.equal(frames.length, event.checkout ? 1 : 0);
    if (event.checkout) {
      assert.equal(frames[0][1], event.checkout.slug);
      assert.ok(html.includes(`href="${event.checkout.url}"`));
      assert.doesNotMatch(html, /event-checkout-placeholder|Online ticket booking is coming soon/);
    }
  }
});

test('Sydney publishes its confirmed venue, address and map in both event summaries', () => {
  const sydney = events.find(event => event.edition === 'Sydney');
  const html = bundle[`events/${sydney.slug}/index.html`].source;
  assert.equal(sydney.location, 'The Dale Loft');
  assert.equal(sydney.venueNote, '27-39 Abercrombie Street, Chippendale, 2008');
  assert.equal(sydney.mapsUrl, 'https://maps.app.goo.gl/Ds7AepgBGDYqakuN6?g_st=ic');
  const summaries = [...html.matchAll(/<ul class="event-facts">[\s\S]*?<\/ul>/g)];
  assert.equal(summaries.length, 2);
  for (const [summary] of summaries) {
    assert.ok(summary.includes(sydney.location));
    assert.ok(summary.includes(sydney.venueNote));
    assert.ok(summary.includes(`href="${sydney.mapsUrl}" target="_blank" rel="noopener noreferrer"`));
    assert.match(summary, /View on Google Maps/);
  }
  assert.ok(bundle['events/index.html'].source.includes(sydney.location));
  const online = bundle['events/the-yoga-industry-connect-online/index.html'].source;
  assert.ok(online.includes(sydney.location));
  assert.match(online, /Live online via Zoom/);
  for (const page of [html, online, bundle['events/index.html'].source]) {
    assert.doesNotMatch(page, /Venue to be announced|Sydney CBD/);
  }
});

test('online event publishes its supplied Humanitix checkout, separate from Sydney', () => {
  const online = events.find(event => event.edition === 'Online');
  assert.deepEqual(online.checkout, {
    slug: 'the-yoga-industry-connect-online',
    url: 'https://events.humanitix.com/the-yoga-industry-connect-online/tickets',
  });
  const html = bundle[`events/${online.slug}/index.html`].source;
  assert.match(html, /data-checkout="the-yoga-industry-connect-online"/);
  assert.doesNotMatch(html, /data-checkout="the-yoga-industry-connect"/);
});

test('Events and the online event share the supplied laptop image without replacing Sydney imagery', () => {
  const online = events.find(event => event.edition === 'Online');
  const laptop = '/assets/events-online-20261020.webp';
  assert.equal(online.image, laptop);
  assert.match(read('src/demo-pages.css'), /\.demo-landing-hero-events\s*\{[^}]*events-online-20261020\.webp/);
  for (const fileName of ['events/index.html', `events/${online.slug}/index.html`]) {
    assert.equal(meta(bundle[fileName].source, 'og:image'), `${siteOrigin}${laptop}`);
    assert.equal(meta(bundle[fileName].source, 'og:image:width'), '1600');
    assert.equal(meta(bundle[fileName].source, 'og:image:height'), '900');
  }
  assert.ok(bundle['events/index.html'].source.includes(`src="${laptop}"`));
  assert.ok(bundle[`events/${online.slug}/index.html`].source.includes(`url('${laptop}')`));
  assert.equal(events.find(event => event.edition === 'Sydney').image, '/assets/demo-20260911/events.webp');
});

test('every released page has complete static, page-specific social and canonical metadata', () => {
  assert.equal(pages.length, 22 + events.length);
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
  assert.equal(urls.length, 17 + events.length);
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
