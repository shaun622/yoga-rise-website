import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './content-pages.css';
import './analytics.js';
import './site-chrome.js';

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
