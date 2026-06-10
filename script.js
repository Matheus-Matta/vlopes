const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.vl-header');
const navLinks = [...document.querySelectorAll('.vl-header__nav a')];
const sections = [...document.querySelectorAll('#inicio, #sobre, #atendimento, #contato')];
const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

body.classList.add('vl-js');

function setHeaderState() {
  header?.classList.toggle('vl-header--scrolled', window.scrollY > 20);
}

function setActiveLink() {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top < window.innerHeight * 0.38)
    .at(-1);

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', current && link.hash === `#${current.id}`);
  });
}

function setParallax() {
  if (!motionAllowed) return;

  const heroShift = Math.min(window.scrollY * 0.055, 46);
  const contact = document.querySelector('.vl-contato');
  const contactRect = contact?.getBoundingClientRect();
  const contactShift = contactRect ? Math.max(Math.min((window.innerHeight - contactRect.top) * 0.04, 34), 0) : 0;

  root.style.setProperty('--hero-drift', `${heroShift}px`);
  root.style.setProperty('--contact-drift', `${contactShift}px`);
}

function onScroll() {
  setHeaderState();
  setActiveLink();
  setParallax();
}

function revealOnScroll() {
  const revealTargets = [
    '.vl-hero__mark',
    '.vl-hero__badge',
    '.vl-hero__name',
    '.vl-hero__cred',
    '.vl-hero__tag',
    '.vl-hero__script',
    '.vl-hero__cta',
    '.vl-hero__divider',
    '.vl-hero__modal',
    '.vl-sobre__card',
    '.vl-serv__head',
    '.vl-service-card',
    '.vl-note',
    '.vl-contato__script',
    '.vl-contato__title',
    '.vl-contato__cta',
    '.vl-contato__divider',
    '.vl-contact-item',
    '.vl-contato__credit',
  ];

  const elements = [...document.querySelectorAll(revealTargets.join(','))];
  elements.forEach((element, index) => {
    element.classList.add('vl-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 24, 180)}ms`);
  });

  if (!motionAllowed || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('vl-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('vl-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  elements.forEach((element) => observer.observe(element));
}

function addButtonGlow() {
  document.querySelectorAll('.vl-btn').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      button.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function addTiltCards() {
  if (!motionAllowed) return;

  document.querySelectorAll('.vl-service-card, .vl-sobre__card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 3.5).toFixed(2)}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', setParallax);
revealOnScroll();
addButtonGlow();
addTiltCards();
onScroll();
