const measurementId = 'G-8L51BW487V';
const liveHosts = new Set(['www.yogarise.com.au', 'yogarise.com.au']);

// Preview deployments and local development must not enter production reports.
if (liveHosts.has(window.location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Exclude query strings and fragments, which can contain outreach/form details.
  const pageLocation = window.location.origin + window.location.pathname;
  let pageReferrer = '';
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      pageReferrer = referrer.origin + referrer.pathname;
    } catch { /* An invalid referrer should not interrupt the page. */ }
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: pageLocation,
    page_referrer: pageReferrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}
