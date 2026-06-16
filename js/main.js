// Set copyright year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Company page image carousel
(function () {
  const track = document.getElementById('companyCarouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track) return;

  const slides = track.querySelectorAll('.company-carousel-slide');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 4.5 s
  let timer = setInterval(() => goTo(current + 1), 4500);
  track.closest('.company-carousel').addEventListener('mouseenter', () => clearInterval(timer));
  track.closest('.company-carousel').addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 4500);
  });
})();

// Significant projects filter
(function () {
  var btns = document.querySelectorAll('.proj-filter-btn');
  if (!btns.length) return;

  var sections = document.querySelectorAll('[data-category]');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show/hide sections
      sections.forEach(function (sec) {
        if (filter === 'all' || sec.getAttribute('data-category') === filter) {
          sec.classList.remove('proj-section-hidden');
        } else {
          sec.classList.add('proj-section-hidden');
        }
      });
    });
  });
})();

// Contact form: prevent default and show confirmation (placeholder)
const contactForm = document.querySelector('form[aria-label="Contact form"]');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const gdpr = contactForm.querySelector('#gdpr');
    if (!gdpr.checked) {
      gdpr.focus();
      alert('Please accept the Privacy Policy before sending your message.');
      return;
    }
    // Replace with actual form submission logic (e.g. fetch to a backend endpoint)
    alert('Thank you for your message. We will get back to you shortly.');
    contactForm.reset();
  });
}
