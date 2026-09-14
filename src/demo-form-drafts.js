// Development-only UI. This module is dynamically imported inside a DEV
// guard, and must not be emitted by the normal production build.
import contact from './demo-pages/contact.draft.html?raw';

export const draftPages = [
  ['/contact', { title: 'Contact (local draft)', html: contact }],
];

const shortForm = (purpose, phone = false) => `
  <div class="demo-form-shell">
    <p class="demo-draft-notice">Local design review only. ${purpose} connection pending. Nothing is submitted.</p>
    <form class="demo-enquiry-form" data-demo-draft-form>
      <fieldset disabled><legend>${purpose}</legend>
        <div class="demo-form-grid">
          <label>First name<input name="name" autocomplete="given-name" required /></label>
          <label>Email address<input name="email" type="email" autocomplete="email" required /></label>
          ${phone ? '<label>Phone<input name="phone" type="tel" autocomplete="tel" /></label>' : ''}
        </div>
      </fieldset>
      <button class="button button-dark" type="submit" disabled>${phone ? 'Join the YogaRise community' : 'Send me the calculator'}</button>
      <p role="status" aria-live="polite"></p>
    </form>
  </div>`;

export function mountDraftForms() {
  document.querySelectorAll('[data-navigation], .demo-footer-nav > ul').forEach((navigation) => {
    const link = document.createElement('a');
    link.href = '/contact/';
    link.textContent = 'Contact';
    if (navigation.tagName === 'UL') {
      const item = document.createElement('li');
      item.append(link);
      navigation.append(item);
    } else navigation.append(link);
  });
  if (location.pathname.replace(/\/+$/, '') === '/membership') {
    const title = [...document.querySelectorAll('h2')].find((h2) => h2.textContent === 'Join the YogaRise community.');
    const button = title?.closest('section')?.querySelector('a.content-button');
    if (button) {
      const template = document.createElement('template');
      template.innerHTML = shortForm('Membership', true);
      button.replaceWith(template.content);
    }
  }
  if (location.pathname.replace(/\/+$/, '') === '/blog/what-does-your-yoga-career-actually-earn-you') {
    const link = document.querySelector('main a[href="/yoga-teacher-income-calculator/"]');
    if (link) {
      const dialog = document.createElement('dialog');
      dialog.className = 'demo-calculator-dialog';
      dialog.innerHTML = '<button class="demo-dialog-close" type="button" aria-label="Close calculator signup">×</button><h2>Yoga Teacher Pricing Calculator</h2>' + shortForm('Calculator access');
      document.body.append(dialog);
      dialog.querySelector('.demo-dialog-close').addEventListener('click', () => dialog.close());
      link.addEventListener('click', (event) => { event.preventDefault(); dialog.showModal(); });
    }
  }
  // Disabled fieldsets avoid accidentally collecting real information in drafts.
  document.querySelectorAll('[data-demo-draft-form]').forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
  });
}
