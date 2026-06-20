/* ============================================================
   CLINILAB PASTOR — Main JS
   ============================================================ */

/* ── Navbar scroll behavior ── */
const navbar = document.querySelector('.navbar');
// Solo modo transparente en la home, donde el hero ocupa toda la pantalla
const hasFullHero = !!document.querySelector('.hero');

function updateNavbar() {
  if (!navbar) return;
  if (!hasFullHero || window.scrollY > 60) {
    navbar.classList.add('navbar--solid');
    navbar.classList.remove('navbar--transparent');
  } else {
    navbar.classList.remove('navbar--solid');
    navbar.classList.add('navbar--transparent');
  }
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ── Mobile menu toggle ── */
const toggle = document.querySelector('.navbar__toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    navbar.classList.toggle('navbar--open');
    const isOpen = navbar.classList.contains('navbar--open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('navbar--open') && !navbar.contains(e.target)) {
      navbar.classList.remove('navbar--open');
      document.body.style.overflow = '';
    }
  });
}

/* ── Active nav link ── */
(function markActiveLink() {
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.navbar__link, .navbar__dropdown-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.includes(href.replace(/^\./, '').replace('.html', ''))) {
      a.classList.add('active');
    }
  });
})();

/* ── Scroll reveal ── */
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Cookie banner ── */
(function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => banner.classList.add('visible'), 1200);
  }
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', '1');
    banner.classList.remove('visible');
  });
  document.getElementById('cookieReject')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', '0');
    banner.classList.remove('visible');
  });
})();

/* ── Smooth anchor scroll with offset ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;
    window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' });
  });
});
