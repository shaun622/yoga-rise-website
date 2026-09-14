import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

test('every Valerie portrait in page and shared-partial source uses the shared crop', () => {
  const sources = readdirSync(resolve('.'), { recursive: true })
    .filter((name) => name.endsWith('.html') && !/^(?:node_modules|dist|dist-review|public|\.reference|\.git)[\\/]/.test(name));
  const placements = [];
  for (const name of sources) {
    const html = readFileSync(name, 'utf8');
    const portraits = [...html.matchAll(/<img\b[^>]*src="\/assets\/valerie\.webp"[^>]*>/g)];
    for (const portrait of portraits) {
      assert.match(portrait[0], /class="valerie-portrait-image"/, name);
      assert.match(html.slice(0, portrait.index), /<div\b[^>]*class="[^"]*valerie-portrait-frame[^"]*">\s*$/, name);
      placements.push(name.replaceAll('\\', '/'));
    }
  }
  assert.deepEqual(placements.sort(), ['about/index.html', 'build/site-team.html', 'expo/index.html']);
});

test('portrait framing is shared CSS, with no team-only runtime crop', () => {
  const css = readFileSync('src/styles.css', 'utf8');
  assert.match(css, /\.valerie-portrait-frame\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.valerie-portrait-frame > \.valerie-portrait-image\s*\{[^}]*transform:\s*scale\(1\.38\);[^}]*transform-origin:\s*center top;/s);
  assert.doesNotMatch(readFileSync('src/demo-site.js', 'utf8'), /updateTeamCrop|demo-valerie-frame/);
});
