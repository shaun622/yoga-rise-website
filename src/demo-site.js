import './demo-site.css';

// The .com.au pages are the unchanged default. No query string, cookie or
// local-storage setting can activate these edits on a production domain.
const isDemo = location.hostname === 'yoga-rise-website.pages.dev'
  || (import.meta.env.DEV
    && ['localhost', '127.0.0.1'].includes(location.hostname)
    && !new URLSearchParams(location.search).has('original'));

function replaceImage(selector, file, alt, dimensions = [768, 512]) {
  const image = document.querySelector(selector);
  if (!image) return;
  image.src = `/assets/demo-20260911/${file}.webp`;
  image.removeAttribute('srcset');
  image.alt = alt;
  [image.width, image.height] = dimensions;
  image.loading = 'lazy';
  image.decoding = 'async';
}

function updateFooter() {
  const navigation = document.querySelector('[data-site-footer] .footer-nav');
  if (!navigation) return;
  const links = new Map([...navigation.querySelectorAll('a')]
    .map((link) => [link.getAttribute('href'), link]));
  const general = ['/about/', '/expo/', '/membership/', '/blog/'];
  const contribute = ['/become-a-partner/', '/become-a-brand-ambassador/', '/become-a-volunteer/'];
  // Reuse the released links; do not create destinations for Contact/Presenter.
  if (![...general, ...contribute].every((path) => links.has(path))) return;
  const makeList = (paths) => {
    const list = document.createElement('ul');
    for (const path of paths) {
      const item = document.createElement('li');
      item.append(links.get(path));
      list.append(item);
    }
    return list;
  };
  const secondColumn = document.createElement('div');
  secondColumn.className = 'demo-footer-contribute';
  const heading = document.createElement('p');
  heading.className = 'demo-footer-heading';
  heading.textContent = 'Become a:';
  secondColumn.append(heading, makeList(contribute));
  navigation.replaceChildren(makeList(general), secondColumn);
  navigation.classList.add('demo-footer-nav');
}

function updateTeamCrop() {
  const portrait = document.querySelector('[data-team-grid] img[src="/assets/valerie.webp"]');
  if (!portrait) return;
  const frame = document.createElement('div');
  frame.className = 'demo-valerie-frame';
  portrait.before(frame);
  frame.append(portrait);
}

function updateExpo() {
  const hero = document.querySelector('.page-hero-expo');
  if (!hero) return;
  const date = hero.querySelector('.page-hero-lead');
  // Keep the existing separators, Sydney and Full Day Event unchanged.
  for (const node of date?.childNodes ?? []) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = node.textContent.replace('29 November 2026', 'December 2026');
    }
  }

  const audience = [...document.querySelectorAll('.content-section')]
    .find((section) => section.querySelector('h2')?.textContent === 'This is for you if...');
  if (audience) {
    audience.classList.add('demo-expo-audience');
    audience.parentElement.classList.add('demo-expo-audience-band');
    const copy = document.createElement('div');
    copy.className = 'demo-expo-audience-copy';
    // Move the approved five statements, rather than maintaining another copy.
    copy.append(...audience.childNodes);
    const image = document.createElement('div');
    image.className = 'demo-expo-audience-image';
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', 'Illustrative image of a speaker addressing yoga professionals at an industry event');
    audience.append(copy, image);
  }

  const speakers = document.querySelector('#speakers');
  if (speakers) {
    speakers.classList.add('demo-expo-speakers');
    for (const card of speakers.querySelectorAll('.portrait-card')) {
      const name = card.querySelector('h3');
      if (name) card.prepend(name);
    }
  }
}

if (isDemo) {
  updateFooter();
  updateTeamCrop();
  updateExpo();

  replaceImage('#courses > img', 'courses', 'Illustrative image of a yoga professional studying an online course');
  replaceImage('#events > img', 'events', 'Illustrative image of yoga professionals connecting at an industry event');
  // The existing Events photograph moves to Membership, not the reverse.
  const membership = document.querySelector('#members > img');
  if (membership) {
    membership.src = '/assets/events.webp';
    membership.alt = 'A teacher leading a small yoga workshop';
    membership.width = 876;
    membership.height = 584;
  }
  replaceImage('#awards > img', 'awards', 'Illustrative YogaRise award trophy');

  const audienceImages = [
    ['teachers', 'Illustrative image of yoga teachers learning together'],
    ['studio-owners', 'Illustrative image of studio owners discussing their businesses'],
    ['educators', 'Illustrative image of an educator teaching yoga anatomy'],
    ['industry', 'Illustrative image of a yoga industry presenter'],
    ['brands', 'Illustrative image of brands and yoga professionals networking'],
  ];
  audienceImages.forEach(([file, alt], index) => {
    replaceImage(`#who-its-for .adobe-image-grid article:nth-child(${index + 1}) img`, file, alt);
  });
  replaceImage('#our-vision .adobe-image', 'vision', 'Illustrative image of yoga professionals in conversation', [1200, 1036]);
}
