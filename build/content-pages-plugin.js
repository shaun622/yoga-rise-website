import { relative, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { activeContentPages, contentPages } from '../content/page-release.js';

const toPosix = (value) => value.replaceAll('\\', '/');
const primaryOrder = ['about', 'expo', 'awards', 'membership'];
const footerOrder = [...primaryOrder, 'partner', 'ambassador', 'volunteer', 'healthCheck'];

function pageLinks(pages, { footer = false } = {}) {
  const order = footer ? footerOrder : primaryOrder;
  const byKey = new Map(pages.map((page) => [page.key, page]));
  const selected = order.map((key) => byKey.get(key)).filter(Boolean);
  const links = selected.map((page) => `<a href="${page.path}">${page.label}</a>`);
  links.push('<a href="/blog/">Blog</a>');
  return links.join('\n');
}

export function contentPagesPlugin({ review = false } = {}) {
  let root;
  const activePages = activeContentPages({ includeDrafts: review });
  const activeByKey = new Map(activePages.map((page) => [page.key, page]));
  const knownSources = new Set(['index.html', 'blog/index.html', 'yoga-teacher-income-calculator/index.html', ...contentPages.map((page) => page.source)]);

  for (const page of activePages) {
    for (const dependency of page.dependencies) {
      if (!activeByKey.has(dependency)) {
        throw new Error(`Content page ${page.key} requires excluded page ${dependency}`);
      }
    }
  }

  return {
    name: 'yogarise-content-pages',
    configResolved(config) {
      root = config.root;
    },
    transformIndexHtml(html, context) {
      if (!context.filename) return html;
      const source = toPosix(relative(root, context.filename));
      if (!knownSources.has(source)) return html;

      let transformed = html
        .replace('<!-- site:header -->', () => readFileSync(resolve(root, 'build/site-header.html'), 'utf8'))
        .replace('<!-- site:footer -->', () => readFileSync(resolve(root, 'build/site-footer.html'), 'utf8'))
        .replace('<!-- site:team -->', () => readFileSync(resolve(root, 'build/site-team.html'), 'utf8'))
        .replace('<!-- content:primary-nav -->', pageLinks(activePages))
        .replace('<!-- content:footer-nav -->', pageLinks(activePages, { footer: true }));

      // Move the existing homepage form, preserving its markup and handler.
      // Other pages link directly to it, not to a now-retired temporary hero.
      const signup = source === 'index.html'
        ? transformed.match(/<form class="hero-optin"[\s\S]*?<\/form>/)?.[0]
        : null;
      if (signup) transformed = transformed.replace(signup, '');
      transformed = transformed.replace('<!-- site:newsletter -->', signup
        || '<a class="button button-light" href="/#newsletter">Join the YogaRise list <span aria-hidden="true">→</span></a>');

      // Existing community CTAs must still land on the retained signup form.
      transformed = transformed.replace(/(<a\b[^>]*\bhref=")https:\/\/www\.yogarise\.com\.au\/("[^>]*>)/g, '$1/#newsletter$2');

      transformed = transformed.replace(/data-page-link="([A-Za-z]+)"/g, (_match, key) => {
        const destination = activeByKey.get(key);
        if (!destination) throw new Error(`Content page ${source} links to excluded page ${key}`);
        return `href="${destination.path}"`;
      });

      if (!review) {
        transformed = transformed.replace(
          /<!-- review-only:start -->[\s\S]*?<!-- review-only:end -->/g,
          '',
        );
      }
      return transformed;
    },
  };
}

export function contentPageInputs(root, { review = false } = {}) {
  return Object.fromEntries(
    activeContentPages({ includeDrafts: review }).map((page) => [
      page.key,
      resolve(root, page.source),
    ]),
  );
}
