import { events, eventPath } from '../content/events.js';

const escape = (text) => String(text).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const paragraphs = (items) => items.map(text => `<p>${escape(text)}</p>`).join('');
const arrow = '<span aria-hidden="true">→</span>';
const icon = (name) => {
  const paths = {
    calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 3v4m10-4v4M3 11h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
};
const ticketButton = (event, light = false) => `<a class="button ${light ? 'button-light' : 'button-dark'} event-ticket-button" href="#tickets">Get your ticket ${arrow}</a>`;
const facts = (event) => `<ul class="event-facts">
  <li>${icon('calendar')}<time datetime="${event.date}">${escape(event.dateLabel)}</time></li>
  <li>${icon('clock')}<span>${escape(event.time)}</span></li>
  <li>${icon('location')}<span>${escape(event.location)}${event.venueNote ? `<small>${escape(event.venueNote)}</small>` : ''}</span></li>
</ul>`;

export function renderEventCards() {
  return [...events].sort((a, b) => a.date.localeCompare(b.date)).map(event => `<article class="event-card">
    <a class="event-card-link" href="${eventPath(event)}" aria-label="Explore ${escape(event.title)}, ${escape(event.shortDate)}">
      <div class="event-card-media">
        <img src="${event.image}" alt="${escape(event.imageAlt)}" width="${event.imageWidth}" height="${event.imageHeight}" loading="lazy" decoding="async" />
        <span class="event-date-badge" aria-hidden="true"><strong>${event.day}</strong>${event.month}</span>
      </div>
      <div class="event-card-copy">
        <p class="event-card-category">${escape(event.format)} <span>·</span> ${escape(event.shortDate)}</p>
        <h3>${escape(event.displayTitle || event.title)}${event.edition ? `<span>${escape(event.edition)}</span>` : ''}</h3>
        <p class="event-card-description">${escape(event.excerpt)}</p>
        <div class="event-card-meta"><span>${escape(event.time)}<br />${escape(event.location)}</span><span class="event-card-price">$${event.price}<small>per person</small></span></div>
        <span class="event-card-cta">Explore event ${arrow}</span>
      </div>
    </a>
  </article>`).join('\n');
}

export function renderEventsIndex(fragment) {
  return fragment.replace('<!-- events:grid -->', renderEventCards());
}

function renderSession(session, index) {
  const portrait = `<img ${session.portraitClass ? 'class="valerie-portrait-image" ' : ''}src="${session.image}" alt="${escape(session.name)}" width="${session.width}" height="${session.height}" loading="lazy" decoding="async" />`;
  return `<article class="event-session">
    <div class="event-speaker-photo${session.portraitClass ? ' valerie-portrait-frame' : ''}">${portrait}</div>
    <p class="event-session-number">Session 0${index + 1}</p>
    <h3>${escape(session.title)}</h3>
    <p class="event-speaker-name">${escape(session.name)}<span>${escape(session.role)}</span></p>
    <p>${escape(session.description)}</p>
  </article>`;
}

export function renderEventPage(event) {
  const other = events.find(item => item.slug === event.otherSlug);
  return `<div class="event-page">
  <section class="demo-landing-hero event-detail-hero event-detail-hero-${event.edition.toLowerCase()}" aria-labelledby="demo-page-title" style="--demo-landing-image: url('${event.image}')">
    <div data-demo-header-slot></div>
    <div class="event-hero-layout">
      <div class="event-hero-copy">
        <a class="event-back" href="/events/">← All events</a>
        <p class="demo-eyebrow">YogaRise presents</p>
        <h1 id="demo-page-title">${escape(event.displayTitle || event.title)}${event.edition ? `<span>${escape(event.edition)}</span>` : ''}</h1>
        <p class="event-subtitle">${escape(event.subtitle)}</p>
        <p>${escape(event.description)}</p>
      </div>
      <aside class="event-hero-booking" aria-label="Event at a glance">
        <p class="demo-eyebrow">${escape(event.format)}</p>
        ${facts(event)}
        <p class="event-hero-price">$${event.price}<span>per person</span></p>
        <p class="event-price-note">${escape(event.priceNote)}</p>
        ${ticketButton(event, true)}
        <a class="event-programme-link" href="#programme">View the programme ↓</a>
      </aside>
    </div>
  </section>

  <section class="demo-landing-section event-introduction" aria-labelledby="event-intro-title">
    <div class="event-section-layout"><div><p class="demo-eyebrow">Beyond your usual circle</p><h2 id="event-intro-title">${escape(event.introductionTitle)}</h2></div>
      <div class="event-prose">${paragraphs(event.introduction)}${ticketButton(event)}</div></div>
  </section>

  <section class="demo-landing-section event-benefits" aria-labelledby="event-benefits-title">
    <p class="demo-eyebrow">A shared space to grow</p><h2 id="event-benefits-title">Learn. Connect. Grow.</h2>
    <div class="event-benefit-grid">
      <article><span class="event-section-number" aria-hidden="true">01</span><h3>Practical insights</h3><p>Explore fresh perspectives on branding, marketing, teaching and professional development through three focused educational sessions and Industry Survey insights.</p></article>
      <article><span class="event-section-number" aria-hidden="true">02</span><h3>Meaningful connections</h3><p>Meet fellow yoga teachers, studio owners, educators and industry professionals. Exchange ideas, share experiences and expand your network.</p></article>
      <article><span class="event-section-number" aria-hidden="true">03</span><h3>Industry perspectives</h3><p>Discover what Australian yoga teachers are sharing through the YogaRise Industry Survey and contribute to conversations about the future of the profession.</p></article>
    </div>
    ${ticketButton(event)}
  </section>

  <section class="demo-landing-section event-programme" id="programme" aria-labelledby="event-programme-title">
    <div class="event-section-layout"><div><p class="demo-eyebrow">Your time with us</p><h2 id="event-programme-title">${escape(event.programmeTitle)}</h2><p>${escape(event.dateLabel)}</p><p class="event-programme-note">${event.edition === 'Online' ? 'All times are AEDT. ' : ''}Programme and timings are subject to minor changes.</p>${ticketButton(event)}</div>
      <dl class="event-schedule">${event.programme.map(([time, title]) => `<div><dt>${escape(time)}</dt><dd>${escape(title)}</dd></div>`).join('')}</dl>
    </div>
  </section>

  <section class="demo-landing-section event-learning" aria-labelledby="event-learning-title">
    <div class="event-section-heading"><p class="demo-eyebrow">Fresh perspectives. Practical ideas.</p><h2 id="event-learning-title">What you'll learn</h2><p>${escape(event.learningIntro)}</p></div>
    <div class="event-session-grid">${event.sessions.map(renderSession).join('')}</div>
    <article class="event-survey-session"><p class="demo-eyebrow">Industry Survey insights</p><div><h3>What We're Hearing From Australian Yoga Teachers</h3><p>Yoga teachers across Australia have been sharing their experiences and challenges through the YogaRise Industry Survey.</p><p>We'll share emerging findings and explore what these insights tell us about professional growth and opportunities for greater industry support.</p></div></article>
    ${ticketButton(event)}
  </section>

  <section class="demo-landing-section event-connection" aria-labelledby="event-connection-title"><div class="event-section-layout">
    <div><p class="demo-eyebrow">Community, in good company</p><h2 id="event-connection-title">${escape(event.connectionTitle)}</h2></div>
    <div class="event-prose">${paragraphs(event.connection)}<p>Whether you're a newly qualified teacher, an experienced educator, a studio owner or part of the wider yoga industry, you're welcome.</p>${ticketButton(event, true)}</div>
  </div></section>

  <section class="demo-landing-section event-about" aria-labelledby="event-about-title"><div class="event-section-layout">
    <div><p class="demo-eyebrow">Meet YogaRise</p><h2 id="event-about-title">Supporting the people behind the practice.</h2><p class="event-manifesto">Education. Community. Opportunity.<br />Grow beyond the mat.</p></div>
    <div class="event-prose"><p>YogaRise is an emerging Australian yoga industry platform bringing together education, professional connections and opportunities for growth.</p><p>Through events, resources and industry initiatives, we're working to support yoga professionals in developing their skills, building sustainable careers and connecting with the wider industry.</p><p>${escape(event.firstEvent)}</p>${ticketButton(event)}</div>
  </div></section>

  <section class="demo-landing-section event-tickets" aria-labelledby="event-tickets-title"><div class="event-section-layout">
    <div><p class="demo-eyebrow">Be part of it</p><h2 id="event-tickets-title">${event.edition === 'Sydney' ? 'Join us in Sydney' : 'Join us online'}</h2>${facts(event)}</div>
    <div class="event-ticket-summary"><p class="event-ticket-price">$${event.price}<span>per person</span></p><h3>Your ticket includes</h3><ul>${event.inclusions.map(item => `<li>${escape(item)}</li>`).join('')}</ul>${event.joiningNote ? `<p class="event-joining-note">${escape(event.joiningNote)}</p>` : ''}${ticketButton(event)}<p class="event-ticket-tagline">Learn. Connect. Grow.</p></div>
  </div></section>

  ${other ? `<aside class="demo-landing-section event-other" aria-labelledby="event-other-title"><div class="event-section-layout">
    <div><p class="demo-eyebrow">Another way to join us</p><h2 id="event-other-title">${escape(event.otherTitle)}</h2></div>
    <div class="event-prose"><p>${escape(event.otherCopy)}</p><p><strong>${escape(other.dateLabel)}<br />${escape(other.time)}</strong><br />${escape(other.location)} · $${other.price} per person</p><a class="button button-dark" href="${eventPath(other)}">${escape(event.otherLabel)} ${arrow}</a></div>
  </div></aside>` : ''}

  <section class="demo-landing-section event-checkout" id="tickets" aria-labelledby="event-checkout-title" tabindex="-1">
    <div class="event-checkout-inner">
      <div class="event-section-heading"><p class="demo-eyebrow">Ticket booking</p><h2 id="event-checkout-title">Book your place</h2><p>${escape(event.title)}<br />${escape(event.dateLabel)} · ${escape(event.time)}</p></div>
      ${event.checkout ? '<p class="event-checkout-status" role="status">Loading the secure Humanitix checkout...</p>' : ''}
      ${event.checkout ? `<div class="event-checkout-widget">
        <iframe data-checkout="${escape(event.checkout.slug)}" title="${escape(event.title)} ticket checkout"></iframe>
      </div>
      <p class="event-checkout-fallback">Having trouble with the checkout? <a href="${escape(event.checkout.url)}" target="_blank" rel="noopener noreferrer">Open on Humanitix <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></p>`
      : `<div class="event-checkout-placeholder"><h3>Online ticket booking is coming soon</h3><p>Tickets for this event will be available here soon. Join the YogaRise list to hear when bookings open.</p><a class="button button-dark" href="#newsletter">Keep me updated ${arrow}</a></div>`}
    </div>
  </section>
  </div>`;
}
