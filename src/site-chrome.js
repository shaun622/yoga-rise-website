import './site-chrome.css';

const mobileNavigation = window.matchMedia('(max-width: 980px)');

document.querySelectorAll('[data-site-header]').forEach((header) => {
  const toggle = header.querySelector('[data-menu-toggle]');
  const navigation = header.querySelector('[data-navigation]');
  const label = toggle?.querySelector('.sr-only');
  if (!toggle || !navigation) return;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open, { restoreFocus = false } = {}) => {
    const mobileOpen = mobileNavigation.matches && open;
    toggle.setAttribute('aria-expanded', String(mobileOpen));
    if (label) label.textContent = mobileOpen ? 'Close menu' : 'Open menu';
    navigation.hidden = mobileNavigation.matches && !mobileOpen;
    navigation.classList.toggle('is-open', mobileOpen);
    document.body.classList.toggle('menu-open', mobileOpen);
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  window.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, { restoreFocus: true });
    } else if (event.key === 'Tab') {
      const links = [...header.querySelectorAll('a, button')];
      const first = links[0];
      const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  mobileNavigation.addEventListener('change', () => setOpen(false));
  window.addEventListener('pageshow', () => setOpen(false));
  setOpen(false);
});
