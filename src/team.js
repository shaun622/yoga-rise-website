import './team.css';

const teamGrid = document.querySelector('[data-team-grid]');
if (teamGrid) {
  const previous = document.querySelector('[data-team-prev]');
  const next = document.querySelector('[data-team-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateTeamControls() {
    const maxScroll = teamGrid.scrollWidth - teamGrid.clientWidth;
    previous?.setAttribute('aria-disabled', String(teamGrid.scrollLeft <= 1));
    next?.setAttribute('aria-disabled', String(teamGrid.scrollLeft >= maxScroll - 1));
  }

  function scrollTeam(direction) {
    const card = teamGrid.querySelector('.team-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(teamGrid).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const index = Math.round(teamGrid.scrollLeft / step) + direction;
    const maxScroll = teamGrid.scrollWidth - teamGrid.clientWidth;
    teamGrid.scrollTo({
      left: Math.max(0, Math.min(index * step, maxScroll)),
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  }

  previous?.addEventListener('click', () => {
    if (previous.getAttribute('aria-disabled') !== 'true') scrollTeam(-1);
  });
  next?.addEventListener('click', () => {
    if (next.getAttribute('aria-disabled') !== 'true') scrollTeam(1);
  });
  teamGrid.addEventListener('scroll', updateTeamControls, { passive: true });
  new ResizeObserver(updateTeamControls).observe(teamGrid);
  updateTeamControls();
}
