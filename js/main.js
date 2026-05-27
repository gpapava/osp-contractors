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
