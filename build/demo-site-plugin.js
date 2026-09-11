// These hosts share a Pages deployment. Keep the published main-domain HTML
// and components as the default; the approved client edits are demo-only.
export const demoHostname = 'yoga-rise-website.pages.dev';

export function demoSitePlugin() {
  let localDevelopment = false;
  return {
    name: 'yogarise-demo-site',
    configResolved(config) {
      localDevelopment = config.command === 'serve';
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // The localhost option exists only in Vite's development server. A
        // production build cannot enable these edits with a query parameter.
        const localCondition = localDevelopment
          ? " || (['localhost', '127.0.0.1'].includes(location.hostname) && !new URLSearchParams(location.search).has('original'))"
          : '';
        const bootstrap = `<script data-demo-bootstrap>if (location.hostname === '${demoHostname}'${localCondition}) { document.documentElement.dataset.demoSite = '${demoHostname}'; document.documentElement.dataset.demoPage = location.pathname.split('/').filter(Boolean)[0] || 'home'; }</script>\n<script type="module" src="/src/demo-site.js"></script>`;
        return html.replace(/(<meta\s+charset=[^>]+>)/i, `$1\n${bootstrap}`);
      },
    },
  };
}
