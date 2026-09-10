import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './content-pages.css';
import './analytics.js';

const menuToggle = document.querySelector('[data-content-menu-toggle]');
const navigation = document.querySelector('[data-content-navigation]');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

function setLinkAvailability(isAvailable) {
  navigation?.querySelectorAll('a').forEach((link) => {
    if (isAvailable) {
      link.removeAttribute('tabindex');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
}

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');

  if (mobileNavigation.matches) {
    navigation.setAttribute('aria-hidden', 'true');
    setLinkAvailability(false);
  }

  if (restoreFocus) menuToggle.focus();
}

function openMenu() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute('aria-expanded', 'true');
  navigation.classList.add('is-open');
  navigation.setAttribute('aria-hidden', 'false');
  setLinkAvailability(true);
}

function syncNavigation() {
  if (!menuToggle || !navigation) return;

  if (mobileNavigation.matches) {
    closeMenu();
  } else {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    navigation.removeAttribute('aria-hidden');
    setLinkAvailability(true);
  }
}

menuToggle?.addEventListener('click', () => {
  if (menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  } else {
    openMenu();
  }
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

mobileNavigation.addEventListener('change', syncNavigation);
syncNavigation();
