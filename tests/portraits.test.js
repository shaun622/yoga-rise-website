import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { eventSessions } from '../content/events.js';

test('every Valerie portrait in page and shared-partial source uses the shared crop', () => {
  const sources = readdirSync(resolve('.'), { recursive: true })
    .filter((name) => name.endsWith('.html') && !/^(?:node_modules|dist|dist-review|public|\.reference|\.git)[\\/]/.test(name));
  const placements = [];
  for (const name of sources) {
    const html = readFileSync(name, 'utf8');
    const portraits = [...html.matchAll(/<img\b[^>]*alt="Valerie Saindon"[^>]*>/g)];
    for (const portrait of portraits) {
      assert.match(portrait[0], /src="\/assets\/valerie-original-20261020\.webp"/, name);
      assert.match(portrait[0], /width="1600" height="1500"/, name);
      assert.match(portrait[0], /class="valerie-portrait-image"/, name);
      assert.match(html.slice(0, portrait.index), /<div\b[^>]*class="[^"]*valerie-portrait-frame[^"]*">\s*$/, name);
      placements.push(name.replaceAll('\\', '/'));
    }
  }
  assert.deepEqual(placements.sort(), ['about/index.html', 'build/site-team.html', 'expo/index.html']);
});

test('event speaker portraits use the supplied original Valerie photo', () => {
  const valerie = eventSessions.find(session => session.name === 'Valerie Saindon');
  assert.equal(valerie.image, '/assets/valerie-original-20261020.webp');
  assert.equal(valerie.width, 1600);
  assert.equal(valerie.height, 1500);
  assert.equal(valerie.portraitClass, 'valerie-portrait');
});

test('portrait framing is shared CSS, with no team-only runtime crop', () => {
  const css = readFileSync('src/styles.css', 'utf8');
  assert.match(css, /\.valerie-portrait-frame\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.valerie-portrait-frame > \.valerie-portrait-image\s*\{[^}]*transform:\s*translateY\(-23%\) scale\(1\.65\);[^}]*transform-origin:\s*center top;/s);
  assert.doesNotMatch(readFileSync('src/demo-site.js', 'utf8'), /updateTeamCrop|demo-valerie-frame/);
});
