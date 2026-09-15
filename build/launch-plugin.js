import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const origin = 'https://www.yogarise.com.au';
const readyPages = [
  ['courses', 'Courses', 'Education for the next stage of your yoga career.'],
  ['events', 'Events', 'Events that bring the yoga industry together.'],
  ['resources', 'Resources', 'Practical tools for life beyond the mat.'],
  ['book-a-call', 'Book a call', 'Book a YogaRise call with Valerie Saindon.'],
  ['become-a-speaker', 'Become a YogaRise Presenter', 'Share your expertise with the YogaRise community. Apply to present at events, workshops and education programs.'],
];
const protectedPages = new Set([
  'yoga-teacher-industry-survey/index.html',
  'yoga-teacher-industry-survey/thank-you/index.html',
  'yoga-teacher-income-calculator/index.html',
  'yogarise-marketing-health-check/index.html',
  '404.html',
]);
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const pagePath = (fileName) => fileName === 'index.html' ? '/' : `/${fileName.replace(/index\.html$/, '')}`;

function metadata(html, fileName) {
  const canonical = `${origin}${pagePath(fileName)}`;
  const indexable = !protectedPages.has(fileName);
  let result = html.replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/g, '')
    .replace(/<meta\b[^>]*property="og:url"[^>]*>\s*/g, '');
  // This date change was already approved and displayed by the demo script.
  if (fileName === 'expo/index.html') result = result.replace('29 November 2026', 'December 2026');
  // Outreach, calculator and unavailable-assessment pages retain noindex.
  if (indexable) result = result.replace(/<meta\b[^>]*name="robots"[^>]*>\s*/g, '');
  return result.replace('</head>', `<link rel="canonical" href="${canonical}" />\n<meta property="og:url" content="${canonical}" />\n</head>`);
}

export function launchPlugin() {
  let root;
  return {
    name: 'yogarise-main-site-launch',
    enforce: 'post',
    configResolved(config) { root = config.root; },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const home = bundle['index.html'];
        if (home?.type !== 'asset') throw new Error('Missing homepage output for launch');
        const template = String(home.source);
        const header = template.match(/<header\b[^>]*data-site-header[\s\S]*?<\/header>/)?.[0];
        if (!header) throw new Error('Missing shared header for ready pages');
        const sitemap = [];
        for (const [name, title, description] of readyPages) {
          const fragment = readFileSync(resolve(root, `src/demo-pages/${name}.html`), 'utf8')
            .replace('<div data-demo-header-slot></div>', header);
          let html = template.replace(/<main\b[^>]*>[\s\S]*?<\/main>/,
            `<main id="main-content" class="demo-landing-page" data-ready-page="${name}">${fragment}</main>`)
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${title} | YogaRise</title>`)
            .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
            .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/, `$1${title} | YogaRise$2`)
            .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
            ;
          const fileName = `${name}/index.html`;
          this.emitFile({ type: 'asset', fileName, source: metadata(html, fileName) });
        }
        // A genuine 404 prevents unfinished paths such as Contact becoming a
        // misleading homepage, now that ready destinations have real files.
        const notFound = template.replace(/<main\b[^>]*>[\s\S]*?<\/main>/,
          `<main id="main-content"><section class="demo-landing-hero">${header}<div class="demo-landing-intro"><h1>Page not found</h1><p>This page is not available.</p><a class="button button-light" href="/">Back to YogaRise</a></div></section></main>`)
          .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | YogaRise</title>')
          .replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>');
        this.emitFile({ type: 'asset', fileName: '404.html', source: metadata(notFound, '404.html') });

        for (const [fileName, asset] of Object.entries(bundle)) {
          if (asset.type !== 'asset' || !fileName.endsWith('.html')) continue;
          asset.source = metadata(String(asset.source), fileName);
          if (!protectedPages.has(fileName)) sitemap.push(`${origin}${pagePath(fileName)}`);
        }
        // Some bundlers expose emitted files immediately; a Set keeps this
        // deterministic either way and excludes every unfinished local draft.
        readyPages.forEach(([name]) => sitemap.push(`${origin}/${name}/`));
        const sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          + [...new Set(sitemap)].sort().map((url) => `  <url><loc>${url}</loc></url>`).join('\n') + '\n</urlset>\n';
        if (bundle['sitemap.xml']) bundle['sitemap.xml'].source = sitemapXml;
        else this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml });
      },
    },
  };
}
