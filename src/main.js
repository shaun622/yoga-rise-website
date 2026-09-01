import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';

const layoutVariant = window.location.pathname.startsWith('/01') ? '01' : '02';
const comparisonScrollKey = 'yogarise-comparison-scroll';
document.documentElement.dataset.layoutVariant = layoutVariant;

document.querySelectorAll('[data-variant-link]').forEach((link) => {
  const isCurrent = link.dataset.variantLink === layoutVariant;
  link.classList.toggle('is-current', isCurrent);
  if (isCurrent) link.setAttribute('aria-current', 'page');

  link.addEventListener('click', (event) => {
    if (isCurrent) {
      event.preventDefault();
      return;
    }

    window.sessionStorage.setItem(comparisonScrollKey, String(window.scrollY));
  });
});

const savedComparisonScroll = Number(window.sessionStorage.getItem(comparisonScrollKey));
window.sessionStorage.removeItem(comparisonScrollKey);

if (Number.isFinite(savedComparisonScroll) && savedComparisonScroll > 0) {
  window.addEventListener(
    'load',
    () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() =>
          window.scrollTo({ top: savedComparisonScroll, behavior: 'instant' }),
        );
      });
    },
    { once: true },
  );
}

const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const teamGrid = document.querySelector('[data-team-grid]');
document.querySelector('[data-team-prev]')?.addEventListener('click', () => {
  teamGrid?.scrollBy({ left: -(teamGrid.clientWidth * 0.82), behavior: 'smooth' });
});
document.querySelector('[data-team-next]')?.addEventListener('click', () => {
  teamGrid?.scrollBy({ left: teamGrid.clientWidth * 0.82, behavior: 'smooth' });
});

let toastTimer;
function showNotice(message) {
  let toast = document.querySelector('[data-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.dataset.toast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

document.querySelectorAll('.placeholder-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showNotice('This destination will be connected when the final client link is supplied.');
  });
});

const newsletter = document.querySelector('.newsletter');
newsletter?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = newsletter.querySelector('input[type="email"]');
  const message = newsletter.querySelector('[data-form-message]');

  if (!email?.value || !email.checkValidity()) {
    message.textContent = 'Please enter a valid email address.';
    email?.focus();
    return;
  }

  message.textContent = 'Signup is not connected yet, so no details were sent.';
});

const heroOptin = document.querySelector('[data-hero-optin]');
heroOptin?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = heroOptin.querySelector('input[type="email"]');
  const message = heroOptin.querySelector('[data-optin-message]');

  if (!email?.value || !email.checkValidity()) {
    message.textContent = 'Please enter a valid email address.';
    email?.focus();
    return;
  }

  message.textContent = 'Thanks — the mailing-list connection is coming shortly.';
});
