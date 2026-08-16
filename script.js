document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNavPanel = document.querySelector('.mobile-nav-panel');
navToggle.addEventListener('click', () => {
  const isOpen = mobileNavPanel.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileNavPanel.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNavPanel.classList.remove('open');
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

// Experience accordion
document.querySelectorAll('.timeline-header').forEach((header) => {
  header.addEventListener('click', () => {
    const item = header.closest('.timeline-item');
    const isOpen = item.classList.toggle('is-open');
    header.setAttribute('aria-expanded', String(isOpen));
  });
});

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

// Animated stat counters
const counters = document.querySelectorAll('.hero-stat-num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((c) => countObserver.observe(c));

// Tilt hover on cards
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Command palette
(function () {
  const overlay = document.getElementById('cmdk-overlay');
  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');
  const hint = document.getElementById('cmdk-hint');

  const items = [
    { label: 'About', tag: 'Section', href: '#about' },
    { label: 'Skills', tag: 'Section', href: '#skills' },
    { label: 'Experience', tag: 'Section', href: '#experience' },
    { label: 'Certifications', tag: 'Section', href: '#certifications' },
    { label: 'Projects', tag: 'Section', href: '#projects' },
    { label: 'Education', tag: 'Section', href: '#education' },
    { label: 'Contact', tag: 'Section', href: '#contact' },
    { label: 'Resume (PDF)', tag: 'Link', href: 'assets/Nithin_Resume.pdf', external: true },
    { label: 'GitHub', tag: 'Link', href: 'https://github.com/NithinBobbili', external: true },
    { label: 'LinkedIn', tag: 'Link', href: 'https://linkedin.com/in/nithin-bobbili07', external: true },
    { label: 'Email Nithin', tag: 'Action', href: 'mailto:nithinbobbili07@gmail.com', external: true },
  ];

  let activeIndex = 0;
  let filtered = items;

  function render() {
    list.innerHTML = '';
    if (filtered.length === 0) {
      list.innerHTML = '<div class="cmdk-empty">No matches</div>';
      return;
    }
    filtered.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'cmdk-item' + (i === activeIndex ? ' active' : '');
      row.innerHTML = `<span class="cmdk-item-label">${item.label}</span><span class="cmdk-item-tag">${item.tag}</span>`;
      row.addEventListener('click', () => go(item));
      row.addEventListener('mouseenter', () => { activeIndex = i; render(); });
      list.appendChild(row);
    });
  }

  function go(item) {
    close();
    if (item.external) {
      window.open(item.href, '_blank', 'noopener');
    } else {
      const target = document.querySelector(item.href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function open() {
    overlay.classList.add('open');
    input.value = '';
    filtered = items;
    activeIndex = 0;
    render();
    setTimeout(() => input.focus(), 10);
  }

  function close() {
    overlay.classList.remove('open');
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    filtered = items.filter((item) => item.label.toLowerCase().includes(q));
    activeIndex = 0;
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) go(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      close();
    }
  });

  hint.addEventListener('click', open);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    const isK = e.key === 'k' || e.key === 'K';
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      overlay.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();
