import courses from './demo-pages/courses.html?raw';
import events from './demo-pages/events.html?raw';
import resources from './demo-pages/resources.html?raw';
import booking from './demo-pages/book-a-call.html?raw';

const pages = new Map([
  ['/courses', { title: 'Courses', html: courses }],
  ['/events', { title: 'Events', html: events }],
  ['/resources', { title: 'Resources', html: resources }],
  ['/book-a-call', { title: 'Book a call', html: booking }],
]);

export function registerDemoDraftPages(drafts) {
  // Defense in depth: production can never register unfinished routes.
  if (import.meta.env.DEV) drafts.forEach(([path, page]) => pages.set(path, page));
}

// Reuse Pages' existing root fallback. Do not emit new static HTML routes:
// those would also be served on the main custom domains in this deployment.
export function renderDemoPage() {
  const path = location.pathname.replace(/\/+$/, '');
  const page = pages.get(path);
  if (!page) return false;
  const main = document.querySelector('#main-content');
  const header = document.querySelector('[data-site-header]');
  if (!main || !header) return false;

  const template = document.createElement('template');
  template.innerHTML = page.html;
  // Move the existing header, preserving its mobile-menu event handlers.
  template.content.querySelector('[data-demo-header-slot]').replaceWith(header);
  main.replaceChildren(template.content);
  main.classList.add('demo-landing-page');
  document.title = `${page.title} | YogaRise`;
  const description = main.querySelector('.demo-landing-intro > p:not(.demo-eyebrow)')?.textContent
    || 'Book a YogaRise call with Valerie Saindon.';
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${location.origin}${path}/`);
  document.querySelector('[data-site-footer] .newsletter')?.setAttribute('id', 'demo-newsletter');

  if (path === '/book-a-call') {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.append(script);
  }
  // Native initial fragment navigation may run before this content exists.
  if (location.hash) {
    let fragment;
    try { fragment = decodeURIComponent(location.hash.slice(1)); } catch { return true; }
    requestAnimationFrame(() => document.getElementById(fragment)?.scrollIntoView());
  }
  return true;
}

export function updateDemoDestinationLinks() {
  const routes = [
    ['.hero-actions a[href="#courses"]', '/courses/'],
    ['#courses .button', '/courses/'],
    ['#events .button', '/events/'],
    ['#resources .button', '/resources/'],
  ];
  for (const [selector, path] of routes) {
    document.querySelectorAll(selector).forEach((link) => link.setAttribute('href', path));
  }
}
