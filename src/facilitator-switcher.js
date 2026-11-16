import './facilitator-switcher.css';

export function mountFacilitatorSwitcher() {
  const switcher = document.querySelector('[data-facilitator-switcher]');
  if (!switcher) return;

  const section = switcher.closest('[data-facilitator-preview]');
  const buttons = switcher.querySelectorAll('button[data-layout]');
  for (const button of buttons) {
    button.addEventListener('click', () => {
      section.dataset.facilitatorPreview = button.dataset.layout;
      for (const option of buttons) {
        option.setAttribute('aria-pressed', String(option === button));
      }
    });
  }
  switcher.hidden = false;
}
