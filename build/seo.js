import { articles } from '../content/articles.js';

export const siteOrigin = 'https://www.yogarise.com.au';
export const pagePath = (fileName) => fileName === 'index.html' ? '/' : `/${fileName.replace(/index\.html$/, '')}`;

const image = (name, alt, width = 1536, height = 1024) => ({
  src: `/assets/demo-20260911/${name}.webp`, alt, width, height,
});
const images = {
  home: image('home-hero', 'Woman practising an extended side-angle yoga pose against a warm brown background'),
  about: image('about-hero', 'Woman practising a seated yoga twist against a warm brown background'),
  awards: image('awards-hero', 'Three YogaRise Awards trophies beside flowers and a YogaRise Awards sign'),
  expo: image('expo-hero', 'People connecting over coffee beside YogaRise networking event signage'),
  partner: image('partner-hero', 'Man practising an extended side-angle yoga pose against a warm brown background'),
  seated: image('seated', 'Woman sitting cross-legged against a warm brown background'),
  why: image('why', 'Man practising a seated yoga twist against a warm brown background'),
  courses: image('educators', 'Yoga educator teaching anatomy with a skeleton model to a small group', 768, 512),
  events: image('events', 'People connecting over coffee beside YogaRise networking event signage', 768, 512),
  resources: image('studio-owners', 'Yoga studio owner talking with two people at the reception desk', 768, 512),
};

// Match the approved page imagery. New released routes must choose an image
// explicitly instead of silently inheriting an unrelated homepage preview.
const pageImages = new Map([
  ['index.html', images.home],
  ['about/index.html', images.about],
  ['awards/index.html', images.awards],
  ['expo/index.html', images.expo],
  ['membership/index.html', images.seated],
  ['become-a-partner/index.html', images.partner],
  ['become-a-volunteer/index.html', images.about],
  ['become-a-brand-ambassador/index.html', images.home],
  ['become-a-speaker/index.html', images.partner],
  ['courses/index.html', images.courses],
  ['events/index.html', images.events],
  ['resources/index.html', images.resources],
  ['book-a-call/index.html', images.about],
  ['blog/index.html', images.about],
  ['yoga-teacher-income-calculator/index.html', images.why],
  ['yogarise-marketing-health-check/index.html', images.why],
  ['yoga-teacher-industry-survey/index.html', images.seated],
  ['yoga-teacher-industry-survey/thank-you/index.html', images.seated],
  ['404.html', images.home],
]);
const publishedArticles = new Map(articles.filter((article) => article.status === 'published')
  .map((article) => [`blog/${article.slug}/index.html`, article]));

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const decode = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, name) => {
  if (name.startsWith('#')) return String.fromCodePoint(parseInt(name.slice(name[1].toLowerCase() === 'x' ? 2 : 1), name[1].toLowerCase() === 'x' ? 16 : 10));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[name.toLowerCase()] ?? entity;
});
function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'))?.[2];
}

// Run after page/article rendering so crawlers receive the final tags without
// JavaScript. Replacing owned tags also makes repeated build passes idempotent.
export function applySeoMetadata(html, fileName) {
  const article = publishedArticles.get(fileName);
  const preview = article ? {
    src: article.imageSrc, alt: article.imageAlt, width: article.imageWidth, height: article.imageHeight,
  } : pageImages.get(fileName);
  if (!preview) throw new Error(`Missing sharing image for ${fileName}`);
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0];
  const pageTitle = head?.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  const descriptionTag = head?.match(/<meta\b[^>]*>/gi)?.find((tag) => attribute(tag, 'name')?.toLowerCase() === 'description');
  const description = descriptionTag && attribute(descriptionTag, 'content');
  if (!pageTitle?.trim() || !description?.trim() || description === '__ARTICLE_DESCRIPTION__') {
    throw new Error(`Missing rendered SEO title or description for ${fileName}`);
  }
  const title = fileName === 'index.html' ? 'YogaRise | Grow beyond the mat'
    : fileName === 'yoga-teacher-income-calculator/index.html' ? 'Yoga Teacher Income Calculator | YogaRise'
      : decode(pageTitle).trim();
  const canonical = `${siteOrigin}${pagePath(fileName)}`;
  const imageUrl = `${siteOrigin}${preview.src}`;
  const tags = [
    `<link rel="canonical" href="${escape(canonical)}" />`,
    ...Object.entries({
      'og:title': title,
      'og:description': decode(description),
      'og:type': article ? 'article' : 'website',
      'og:url': canonical,
      'og:site_name': 'YogaRise',
      'og:locale': 'en_AU',
      'og:image': imageUrl,
      'og:image:secure_url': imageUrl,
      'og:image:type': 'image/webp',
      'og:image:width': preview.width,
      'og:image:height': preview.height,
      'og:image:alt': preview.alt,
    }).map(([property, value]) => `<meta property="${property}" content="${escape(value)}" />`),
    ...Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': decode(description),
      'twitter:image': imageUrl,
      'twitter:image:alt': preview.alt,
    }).map(([name, value]) => `<meta name="${name}" content="${escape(value)}" />`),
  ];
  if (fileName === 'index.html') {
    tags.push(`<script type="application/ld+json" id="site-identity">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebSite', name: 'YogaRise', url: `${siteOrigin}/`,
    })}</script>`);
  }
  const cleanHead = head.replace(/<meta\b[^>]*>\s*/gi, (tag) =>
    /^(og:|twitter:)/i.test(attribute(tag, 'property') ?? attribute(tag, 'name') ?? '') ? '' : tag)
    .replace(/<link\b[^>]*>\s*/gi, (tag) => attribute(tag, 'rel')?.toLowerCase() === 'canonical' ? '' : tag)
    .replace(/<script\b[^>]*\bid="site-identity"[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<\/head>/i, `${tags.join('\n')}\n</head>`);
  return html.replace(head, () => cleanHead);
}
