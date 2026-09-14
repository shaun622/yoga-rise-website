// The approved full-site design is now shared by the main site and Pages.
// Keep the original outreach pages unchanged on the custom domains.
export const demoHostname = 'yoga-rise-website.pages.dev';
export const fullSiteHosts = [demoHostname, 'www.yogarise.com.au', 'yogarise.com.au', 'localhost', '127.0.0.1'];

export function demoSitePlugin() {
  return {
    name: 'yogarise-demo-site',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // No query-string switch can expose development-only form drafts.
        const bootstrap = `<script data-demo-bootstrap>if ((${JSON.stringify(fullSiteHosts)}.includes(location.hostname) || location.hostname.endsWith('.${demoHostname}')) && !(location.hostname.endsWith('yogarise.com.au') && location.pathname.startsWith('/yoga-teacher-industry-survey'))) { document.documentElement.dataset.demoSite = '${demoHostname}'; document.documentElement.dataset.demoPage = location.pathname.split('/').filter(Boolean)[0] || 'home'; } if (!['www.yogarise.com.au','yogarise.com.au'].includes(location.hostname)) { const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex, nofollow'; document.head.append(robots); }</script>\n<script type="module" src="/src/demo-site.js"></script>`;
        return html.replace(/(<meta\s+charset=[^>]+>)/i, `$1\n${bootstrap}`);
      },
    },
  };
}
