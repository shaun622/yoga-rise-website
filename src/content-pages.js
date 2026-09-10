import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './content-pages.css';
import './analytics.js';

const mobileNavigation = window.matchMedia('(max-width: 980px)');

document.querySelectorAll('[data-content-header]').forEach((header) => {
  const toggle = header.querySelector('[data-content-menu-toggle]');
  const navigation = header.querySelector('[data-content-navigation]');
  if (!toggle || !navigation) return;

  const setOpen = (open, { restoreFocus = false } = {}) => {
    const mobileOpen = mobileNavigation.matches && open;
    toggle.setAttribute('aria-expanded', String(mobileOpen));
    navigation.hidden = mobileNavigation.matches && !mobileOpen;
    navigation.classList.toggle('is-open', mobileOpen);
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, { restoreFocus: true });
    }
  });
  mobileNavigation.addEventListener('change', () => setOpen(false));
  setOpen(false);
});

document.querySelectorAll('[data-draft-form]').forEach((form) => {
  form.addEventListener('submit', (event) => event.preventDefault());
});

document.querySelectorAll('[data-required-group]').forEach((group) => {
  const choices = [...group.querySelectorAll('input[type="checkbox"]')];
  const syncValidity = () => {
    choices[0]?.setCustomValidity(
      choices.some((choice) => choice.checked) ? '' : 'Please select at least one option.',
    );
  };
  choices.forEach((choice) => choice.addEventListener('change', syncValidity));
  syncValidity();
});

document.querySelectorAll('[data-nomination-select]').forEach((link) => {
  link.addEventListener('click', () => {
    const option = document.querySelector(
      `[name="nomination_type"][value="${link.dataset.nominationSelect}"]`,
    );
    if (option) option.checked = true;
  });
});
