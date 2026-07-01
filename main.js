// =============================================
// DWASA Shared JavaScript
// =============================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
}

// Mobile dropdowns
document.querySelectorAll('.nav-dropdown').forEach(dd => {
  dd.querySelector('a').addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      dd.classList.toggle('open');
    }
  });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Animate on scroll
function initAOS() {
  const els = document.querySelectorAll('.aos');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initAOS);

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg   = lightbox.querySelector('img');
  const items   = [...document.querySelectorAll('.gallery-item')];
  let current   = 0;

  function openLightbox(idx) {
    current = idx;
    const src = items[idx].querySelector('img').src;
    lbImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function next() { openLightbox((current + 1) % items.length); }
  function prev() { openLightbox((current - 1 + items.length) % items.length); }

  items.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lb-next').addEventListener('click', next);
  lightbox.querySelector('.lb-prev').addEventListener('click', prev);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const isOpen = header.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.classList.remove('open');
      h.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      header.classList.add('open');
      body.classList.add('open');
    }
  });
});

// Copy to clipboard
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = 'Copy', 2000);
    showToast('Copied to clipboard!');
  });
}

// Toast
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
      else { el.textContent = Math.floor(start) + (el.dataset.suffix || ''); }
    }, 25);
  });
}
const counterSection = document.querySelector('.stats-strip');
if (counterSection) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(counterSection);
}
