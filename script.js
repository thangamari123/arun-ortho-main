/* ================================================================
   Arun Ortho Speciality Clinic — script.js
   Pure Vanilla JavaScript | Modular & Clean
   ================================================================ */

'use strict';

/* ---------------------------------------------------------------
   1. UTILITY HELPERS
--------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const debounce = (fn, delay = 100) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
};

/* ---------------------------------------------------------------
   2. PREMIUM NAVBAR — Sticky + Scroll Shadow + Mobile Drawer
--------------------------------------------------------------- */
const initNavbar = () => {
  const siteHeader  = $('#header');
  const topBar      = $('#topBar');
  const hamburger   = $('#hamburger');
  const mobileMenu  = $('#mobileMenu');
  const mobileClose = $('#mobileClose');
  const drawerOverlay = $('#drawerOverlay');
  const drawerLinks = $$('.drawer-link');
  const navLinks    = $$('.site-nav-link');
  const sections    = $$('section[id]');

  if (!siteHeader) return;

  /* ── Scroll handler ── */
  const handleScroll = () => {
    const scrolled = window.scrollY > 30;

    /* Add shadow + slight bg opacity on scroll */
    siteHeader.classList.toggle('scrolled', scrolled);

    /* Hide top bar after 80px scroll for more space (optional) */
    if (topBar) {
      topBar.style.transform = scrolled && window.scrollY > 80
        ? 'translateY(-100%)'
        : 'translateY(0)';
    }

    /* Active nav section highlight */
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    drawerLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* Smooth top-bar transition */
  if (topBar) {
    topBar.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  handleScroll();

  /* ── Mobile drawer open ── */
  const openDrawer = () => {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  /* ── Mobile drawer close ── */
  const closeDrawer = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  mobileClose?.addEventListener('click', closeDrawer);

  /* Close on overlay click */
  drawerOverlay?.addEventListener('click', closeDrawer);

  /* Close drawer when a standard link is clicked */
  drawerLinks.forEach(link => {
    if (!link.classList.contains('drawer-dropdown-btn')) {
      link.addEventListener('click', closeDrawer);
    }
  });

  /* Drawer Dropdown Toggle */
  const dropdownBtn = $('#drawerDropdownBtn');
  const dropdownMenu = $('#mobileServicesMenu');
  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('open');
    });
  }

  /* Close drawer when a sublink is clicked */
  const drawerSublinks = $$('.drawer-sublink');
  drawerSublinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* Escape key closes drawer */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeDrawer();
  });
};



/* ---------------------------------------------------------------
   3. SMOOTH SCROLL
--------------------------------------------------------------- */
const initSmoothScroll = () => {
  document.addEventListener('click', e => {
    const link = e.target.closest('[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
};

/* ---------------------------------------------------------------
   4. SCROLL REVEAL ANIMATIONS
--------------------------------------------------------------- */
const initScrollReveal = () => {
  const revealEls = $$('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el, i) => {
    if (!el.dataset.delay) {
      // stagger siblings
      const parent = el.parentElement;
      const siblings = [...parent.children].filter(c => c.classList.contains(el.classList[0]));
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 80;
    }
    observer.observe(el);
  });
};

/* ---------------------------------------------------------------
   5. COUNTER ANIMATIONS
--------------------------------------------------------------- */
const initCounters = () => {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
};

/* ---------------------------------------------------------------
   6. TESTIMONIAL SCROLL
--------------------------------------------------------------- */
const initTestimonialScroll = () => {
  const wrapper = $('#testimonialScroll');
  if (!wrapper) return;

  // Auto-scroll logic
  let autoTimer;
  const startAuto = () => {
    autoTimer = setInterval(() => {
      if (!wrapper) return;
      const card = $('.testimonial-card', wrapper);
      if (!card) return;
      const cardWidth = card.offsetWidth + 24; // width + gap
      
      // If reached the end, scroll back to start
      if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10) {
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);
  };
  const stopAuto = () => clearInterval(autoTimer);

  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);
  wrapper.addEventListener('touchstart', stopAuto, { passive: true });
  wrapper.addEventListener('touchend', startAuto, { passive: true });

  // Optional: manual mouse drag to scroll on desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.style.cursor = 'grabbing';
    wrapper.style.scrollSnapType = 'none'; // disable snap while dragging
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    stopAuto();
  });
  
  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.style.cursor = '';
    wrapper.style.scrollSnapType = 'x mandatory';
  });
  
  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.style.cursor = '';
    wrapper.style.scrollSnapType = 'x mandatory';
    startAuto();
  });
  
  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  startAuto();
};

/* ---------------------------------------------------------------
   7. FORM VALIDATION
--------------------------------------------------------------- */
const initFormValidation = () => {
  const form = $('#appointmentForm');
  if (!form) return;

  const rules = {
    name:    { required: true, minLength: 2,  msg: 'Please enter your full name (min 2 chars).' },
    phone:   { required: true, pattern: /^[6-9]\d{9}$/, msg: 'Enter a valid 10-digit Indian mobile number.' },
    email:   { required: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Enter a valid email address.' },
    service: { required: true, msg: 'Please select a service.' },
    date:    { required: true, msg: 'Please select a preferred date.' },
    message: { required: false, minLength: 0 },
  };

  const getField = (name) => form.querySelector(`[name="${name}"]`);
  const getError = (name) => form.querySelector(`[data-error="${name}"]`);

  const validateField = (name) => {
    const field = getField(name);
    const errEl = getError(name);
    if (!field) return true;

    const rule = rules[name];
    const val  = field.value.trim();
    let valid  = true;
    let msg    = '';

    if (rule.required && !val) { valid = false; msg = rule.msg; }
    else if (val && rule.pattern && !rule.pattern.test(val)) { valid = false; msg = rule.msg; }
    else if (val && rule.minLength && val.length < rule.minLength) { valid = false; msg = rule.msg; }

    field.classList.toggle('error', !valid);
    if (errEl) { errEl.textContent = msg; errEl.classList.toggle('show', !valid); }
    return valid;
  };

  // Live validation
  Object.keys(rules).forEach(name => {
    const field = getField(name);
    field?.addEventListener('blur', () => validateField(name));
    field?.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(name);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = Object.keys(rules).map(validateField).every(Boolean);

    if (allValid) {
      // Show success
      form.style.display = 'none';
      const success = $('#formSuccess');
      if (success) { success.classList.add('show'); }

      // Reset after 5s
      setTimeout(() => {
        form.reset();
        form.style.display = '';
        if (success) success.classList.remove('show');
        Object.keys(rules).forEach(name => {
          const f = getField(name);
          f?.classList.remove('error');
          const err = getError(name);
          if (err) err.classList.remove('show');
        });
      }, 5000);
    }
  });
};

/* ---------------------------------------------------------------
   9. LAZY IMAGE LOADING
--------------------------------------------------------------- */
const initLazyImages = () => {
  const imgs = $$('img[data-src]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
};

/* ---------------------------------------------------------------
   10. FLOATING CARD PARALLAX (subtle)
--------------------------------------------------------------- */
const initParallax = () => {
  const hero = $('#hero');
  if (!hero) return;

  window.addEventListener('mousemove', e => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;

    const floatCards = $$('.float-card', hero);
    floatCards.forEach((card, i) => {
      const factor = (i % 2 === 0) ? 1 : -1;
      card.style.transform = `translate(${x * 0.3 * factor}px, ${y * 0.3 * factor}px)`;
    });
  });
};

/* ---------------------------------------------------------------
   11. SET MINIMUM DATE FOR APPOINTMENT FORM
--------------------------------------------------------------- */
const initDateField = () => {
  const dateInput = $('[name="date"]');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
};

/* ---------------------------------------------------------------
   12. HERO ANIMATED HEADLINE
--------------------------------------------------------------- */
const initHeroAnimations = () => {
  // Stagger hero content children
  const heroContent = $('.hero-content-full');
  if (!heroContent) return;
  const children = [...heroContent.children];
  children.forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(28px)';
    child.style.transition = `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    });
  });
};

/* ---------------------------------------------------------------
   13. ACTIVE NAV ON CLICK (immediate)
--------------------------------------------------------------- */
const initNavActiveClick = () => {
  $$('.site-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.site-nav-link').forEach(l => l.classList.remove('active'));
      $$('.drawer-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // mirror active state in drawer
      const href = link.getAttribute('href');
      $$('.drawer-link').forEach(dl => {
        dl.classList.toggle('active', dl.getAttribute('href') === href);
      });
    });
  });
};

/* ---------------------------------------------------------------
   14. SERVICE CARD HOVER TILT
--------------------------------------------------------------- */
const initCardTilt = () => {
  $$('.service-card, .why-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 4;
      const rotateY = (x / rect.width) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ---------------------------------------------------------------
   11b. HERO BACKGROUND SLIDER
--------------------------------------------------------------- */
const initHeroSlider = () => {
  const slides      = $$('.hbs-slide');
  const dots        = $$('.hbs-dot');
  const prevBtn     = $('#hbsPrev');
  const nextBtn     = $('#hbsNext');
  const progressBar = $('#hbsProgressBar');
  const labelTag    = $('#hbsTag');
  const labelText   = $('#hbsText');
  const section     = $('.hero-fullbg');

  if (!slides.length) return;

  const INTERVAL = 5000; // ms per slide
  let current  = 0;
  let autoTimer = null;
  let isPaused  = false;

  /* Slide data: captions for the label badge */
  const slideData = [
    { tag: 'Expert Consultation',  text: 'Personalized care for every patient' },
    { tag: 'Advanced Surgery',     text: 'State-of-the-art surgical procedures' },
    { tag: 'Rehabilitation',       text: 'Faster recovery programs' },
    { tag: 'Advanced Diagnostics', text: 'Precision imaging technology' },
  ];

  /* Go to a specific slide */
  const goTo = (idx) => {
    const prev = current;
    current = (idx + slides.length) % slides.length;

    slides[prev].classList.remove('active');
    slides[prev].classList.add('exit');
    setTimeout(() => slides[prev].classList.remove('exit'), 1000);

    slides[current].classList.add('active');

    // Update dots
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });

    // Update label badge
    if (labelTag && slideData[current]) {
      labelTag.textContent  = slideData[current].tag;
      labelText.textContent = slideData[current].text;
    }

    startProgress();
  };

  /* Animated progress bar */
  const startProgress = () => {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    progressBar.getBoundingClientRect(); // force reflow
    progressBar.style.transition = `width ${INTERVAL}ms linear`;
    progressBar.style.width = '100%';
  };

  /* Auto-play */
  const startAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!isPaused) goTo(current + 1);
    }, INTERVAL);
  };

  const stopAuto  = () => clearInterval(autoTimer);
  const resetAuto = () => { stopAuto(); startAuto(); };

  /* Controls */
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.idx, 10));
      resetAuto();
    });
  });

  /* Keyboard */
  section?.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
  });

  /* Pause on hover */
  section?.addEventListener('mouseenter', () => { isPaused = true; });
  section?.addEventListener('mouseleave', () => { isPaused = false; });

  /* Touch swipe */
  let touchX = 0;
  section?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  section?.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  }, { passive: true });

  /* Pause on hidden tab */
  document.addEventListener('visibilitychange', () => { isPaused = document.hidden; });

  /* Kick off */
  startProgress();
  startAuto();
};

/* ---------------------------------------------------------------
   INIT ALL
--------------------------------------------------------------- */
const init = () => {
  initNavbar();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initTestimonialScroll();
  initFormValidation();
  initLazyImages();
  initParallax();
  initDateField();
  initHeroAnimations();
  initNavActiveClick();
  initHeroSlider();                    // ← hero image slider
  setTimeout(initCardTilt, 500);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
