import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles.css';
import './income-calculator.css';

const sections = {
  teaching: [
    ['classesPerWeek', 'Studio classes per week'], ['payPerClass', 'Pay per studio class', '$'],
    ['corporatePerWeek', 'Corporate classes per week'], ['corporateRate', 'Corporate class rate', '$'],
    ['weeksPerYear', 'Weeks taught per year', '', 52],
    ['privatesPerWeek', 'Private sessions per week'], ['privateRate', 'Private session rate', '$'],
    ['workshopsPerYear', 'Workshops per year'], ['workshopIncome', 'Average workshop income', '$'],
    ['retreatsPerYear', 'Retreats per year'], ['retreatIncome', 'Average retreat income', '$'],
    ['otherIncome', 'Other annual income (courses, commission, online, etc.)', '$'],
  ],
  expense: [
    ['expInsurance', 'Insurance', '$'], ['expMembership', 'Yoga organisation / membership', '$'],
    ['expWebSoftware', 'Website & software', '$'], ['expCourses', 'Courses & professional development', '$'],
    ['expOther', 'Other annual expenses', '$'], ['expPerClass', 'Studio hire / travel per class', '$'],
  ],
  time: [
    ['timeTeach', 'Teaching', 'min'], ['timeTravel', 'Travel', 'min'],
    ['timePrep', 'Preparation', 'min'], ['timeAdmin', 'Admin & post-class', 'min'],
  ],
  goal: [['desiredIncome', 'Desired annual take-home income', '$'], ['taxRate', 'Estimated tax / financial reserve', '%', 100]],
};

for (const [section, fields] of Object.entries(sections)) {
  const container = document.getElementById(`${section}-fields`);
  for (const [id, label, unit = '', max] of fields) {
    const row = document.createElement('div');
    row.className = 'calculator-input-row';
    row.innerHTML = `<label for="${id}">${label}</label><div class="calculator-number"><span aria-hidden="true">${unit}</span><input type="number" id="${id}" name="${id}" min="0" ${max ? `max="${max}"` : ''} step="any" inputmode="decimal" value="0" aria-label="${label}${unit ? ` (${unit})` : ''}" /></div>`;
    container.append(row);
  }
}

const form = document.getElementById('income-inputs');
const inputs = [...form.querySelectorAll('input')];
const outputs = [...document.querySelectorAll('.calculator-results output')];
const currency = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
const hours = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 1 });
const show = (id, value) => { document.getElementById(id).textContent = value; };

function calculate() {
  const values = {};
  let invalid = false;
  for (const input of inputs) {
    const value = input.value === '' ? 0 : Number(input.value);
    const valid = !input.validity.badInput && Number.isFinite(value) && value >= 0 && (!input.max || value <= Number(input.max));
    input.setAttribute('aria-invalid', String(!valid));
    invalid ||= !valid;
    values[input.id] = value;
  }
  show('calculator-validation', invalid ? 'Use non-negative numbers, up to 52 teaching weeks and a reserve between 0% and 100%.' : '');
  if (invalid) {
    outputs.forEach(output => { output.textContent = '—'; });
    return;
  }
  const v = values;
  const gross = (v.classesPerWeek * v.payPerClass + v.corporatePerWeek * v.corporateRate + v.privatesPerWeek * v.privateRate) * v.weeksPerYear + v.workshopsPerYear * v.workshopIncome + v.retreatsPerYear * v.retreatIncome + v.otherIncome;
  const expenses = v.expInsurance + v.expMembership + v.expWebSoftware + v.expCourses + v.expOther + v.expPerClass * (v.classesPerWeek + v.corporatePerWeek) * v.weeksPerYear;
  const net = gross - expenses;
  const reserve = Math.max(0, net) * v.taxRate / 100;
  const available = net - reserve;
  const gap = available - v.desiredIncome;
  const perClassHours = (v.timeTeach + v.timeTravel + v.timePrep + v.timeAdmin) / 60;
  const weeklyHours = (v.classesPerWeek + v.corporatePerWeek) * perClassHours + v.privatesPerWeek * 1.25;
  const levers = {
    leverMoreClasses: 2 * v.payPerClass * v.weeksPerYear,
    leverRaiseCorporate: v.corporatePerWeek * 30 * v.weeksPerYear,
    leverRaiseRate: v.classesPerWeek * 5 * v.weeksPerYear,
    leverAddPrivate: v.privateRate * v.weeksPerYear,
    leverAddWorkshops: 2 * v.workshopIncome,
  };
  if (![gross, expenses, net, reserve, available, gap, weeklyHours, ...Object.values(levers)].every(Number.isFinite)) {
    show('calculator-validation', 'These numbers are too large to calculate. Please use smaller values.');
    outputs.forEach(output => { output.textContent = '—'; });
    return;
  }
  for (const [id, value] of Object.entries({ resGross: gross, resExpenses: expenses, resNet: net, resReserve: reserve, resAvailable: available })) show(id, currency.format(value));
  show('resGap', `${gap > 0 ? '+' : ''}${currency.format(gap)}`);
  show('gap-label', gap < 0 ? 'Annual income gap' : gap > 0 ? 'Annual income surplus' : 'Income gap / surplus');
  show('resHourly', perClassHours > 0 ? `${currency.format((v.payPerClass - v.expPerClass) / perClassHours)}/hr` : 'Add class time');
  show('resHoursWeek', `${hours.format(weeklyHours)} hrs`);
  for (const [id, value] of Object.entries(levers)) show(id, `+${currency.format(value)}/yr`);
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', calculate);
calculate();
