export function mountEventTickets() {
  const frame = document.querySelector('.event-checkout iframe[data-checkout]');
  if (!frame || frame.dataset.bound) return;
  frame.dataset.bound = 'true';
  const status = document.querySelector('.event-checkout-status');
  const showFallback = () => {
    if (status && !status.hidden) status.textContent = 'Checkout taking a while? You can book directly on Humanitix using the link below.';
  };
  const loadingTimeout = window.setTimeout(showFallback, 15000);
  window.addEventListener('message', event => {
    // Only the supplied checkout can report that its visible UI has loaded.
    if (event.origin !== 'https://events.humanitix.com' || event.source !== frame.contentWindow) return;
    if (event.data?.type !== 'HX_WIDGETS_V2_INLINE_HEIGHT' || !(event.data.payload?.pageHeight > 0)) return;
    window.clearTimeout(loadingTimeout);
    if (status) status.hidden = true;
  });
  const src = 'https://events.humanitix.com/scripts/widgets/inline.js';
  if (document.querySelector(`script[src="${src}"]`)) return;
  // Load after the iframe exists, including in the local source renderer.
  // Humanitix supplies its checkout URL, payment permissions and auto-height.
  const script = document.createElement('script');
  script.type = 'module';
  script.src = src;
  script.addEventListener('error', showFallback);
  document.head.append(script);
}
