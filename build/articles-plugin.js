import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles } from '../content/articles.js';

const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const articleUrl = (article) => `/blog/${article.slug}/`;

function publishedArticles() {
  const slugs = new Set();
  for (const article of articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || slugs.has(article.slug)) {
      throw new Error(`Invalid or duplicate article slug: ${article.slug}`);
    }
    slugs.add(article.slug);
    if (!['draft', 'published'].includes(article.status) || !article.title || !article.excerpt || !article.body) {
      throw new Error(`Incomplete article: ${article.slug}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date) || Number.isNaN(Date.parse(article.date))) {
      throw new Error(`Invalid article date: ${article.slug}`);
    }
    if (article.cta?.href && !/^\/(?!\/)/.test(article.cta.href)) {
      throw new Error(`Article CTA must use a site-relative URL: ${article.slug}`);
    }
  }
  return articles.filter((article) => article.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date));
}

function cards(posts) {
  return posts.map((article) => `<article class="article-card">
    <h3><a href="${articleUrl(article)}">${escape(article.title)}</a></h3>
    <div class="article-image supplied-scene ${escape(article.imageClass)}" role="img" aria-label="${escape(article.imageAlt)}"></div>
    <p>${escape(article.excerpt)}</p>
    <a class="button button-small button-dark" href="${articleUrl(article)}" aria-label="Read ${escape(article.title)}">Read more</a>
  </article>`).join('\n');
}

function renderBody(article) {
  const cta = article.cta?.href
    ? `<a class="button button-dark" href="${escape(article.cta.href)}">${escape(article.cta.label)} <span aria-hidden="true">→</span></a>`
    : `<p class="article-cta-pending">${escape(article.cta.label)}<small>Link coming soon</small></p>`;
  return `<article>
    <header class="article-heading"><p class="article-eyebrow">YogaRise insights</p><h1>${escape(article.title)}</h1><p>${escape(article.excerpt)}</p></header>
    <div class="article-body">${article.body}<aside class="article-cta">${cta}</aside><a class="article-back" href="/blog/">← Back to articles</a></div>
  </article>`;
}

function page(template, article, posts) {
  const title = article ? `${article.title} | YogaRise` : 'Insights | YogaRise';
  const description = article?.excerpt ?? 'Practical insights for building a sustainable yoga career.';
  const body = article ? renderBody(article)
    : `<header class="article-heading"><p class="article-eyebrow">YogaRise insights</p><h1>Ideas for your next step.</h1></header><div class="blog-list article-grid">${cards(posts)}</div>`;
  return template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace('content="__ARTICLE_DESCRIPTION__"', `content="${escape(description)}"`)
    .replace('<!-- article-content -->', body);
}

export function articlesPlugin() {
  let root;
  return {
    name: 'yogarise-articles',
    enforce: 'post',
    configResolved(config) { root = config.root; },
    transformIndexHtml(html, context) {
      if (context.path === '/' || context.path === '/index.html') {
        return html.replace(/<!-- latest-articles:start -->[\s\S]*?<!-- latest-articles:end -->/,
          `<!-- latest-articles:start -->\n${cards(publishedArticles().slice(0, 4))}\n<!-- latest-articles:end -->`);
      }
      return html;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname;
        if (!pathname.startsWith('/blog/') && pathname !== '/blog') return next();
        const posts = publishedArticles();
        const article = posts.find((post) => pathname.replace(/\/$/, '') === articleUrl(post).replace(/\/$/, ''));
        if (!article && !['/blog', '/blog/', '/blog/index.html'].includes(pathname)) {
          res.statusCode = 404;
          return res.end('Article not found');
        }
        try {
          const template = readFileSync(resolve(root, 'blog/index.html'), 'utf8');
          const html = await server.transformIndexHtml('/blog/index.html', page(template, article, posts));
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (error) { next(error); }
      });
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const template = bundle['blog/index.html'];
        if (!template || template.type !== 'asset') throw new Error('Missing blog template output');
        const original = String(template.source);
        const posts = publishedArticles();
        template.source = page(original, null, posts);
        for (const article of posts) {
          this.emitFile({ type: 'asset', fileName: `blog/${article.slug}/index.html`, source: page(original, article, posts) });
        }
      },
    },
  };
}
