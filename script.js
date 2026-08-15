document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksWrap = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinksWrap.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinksWrap.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksWrap.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Scroll reveal for sections
const sections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
sections.forEach((s) => revealObserver.observe(s));

// Active nav link highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const navMap = new Map();
navLinks.forEach((link) => {
  const id = link.getAttribute('href').replace('#', '');
  navMap.set(id, link);
});

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = navMap.get(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

document.querySelectorAll('main .section').forEach((s) => navObserver.observe(s));

// Subtle cursor-reactive glow in hero
const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mx', x + '%');
    hero.style.setProperty('--my', y + '%');
  });
}
