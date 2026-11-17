/* ===================================================
   OSP Contractors — site behaviour
   Dynamic strings are localised here (EN / EL) because they change at
   runtime; js/i18n.js dispatches a "langchange" event on every switch.
   =================================================== */

var UI = {
  en: {
    heroPause: 'Pause background video',
    heroPlay: 'Play background video',
    carPrev: 'Previous image',
    carNext: 'Next image',
    carPause: 'Pause slideshow',
    carPlay: 'Start slideshow',
    carGoTo: function (n, total) { return 'Go to image ' + n + ' of ' + total; },
    carSlide: function (n, total) { return n + ' of ' + total; },
    filterShowing: function (label) { return 'Showing: ' + label; },
    errName: 'Please enter your name.',
    errEmailEmpty: 'Please enter your email address.',
    errEmailInvalid: 'Please enter a valid email address, for example name@example.com.',
    errSubject: 'Please enter a subject.',
    errMessage: 'Please enter your message.',
    errGdpr: 'Please accept the Privacy Policy before sending your message.',
    summaryOne: 'There is 1 problem with your message:',
    summaryMany: function (n) { return 'There are ' + n + ' problems with your message:'; },
    success: 'Thank you for your message. We will get back to you shortly.',
    sending: 'Sending…',
    errSend: 'Sorry, your message could not be sent. Please try again later or email us at info@osp-contractors.gr.'
  },
  el: {
    heroPause: 'Παύση βίντεο παρασκηνίου',
    heroPlay: 'Αναπαραγωγή βίντεο παρασκηνίου',
    carPrev: 'Προηγούμενη εικόνα',
    carNext: 'Επόμενη εικόνα',
    carPause: 'Παύση προβολής εικόνων',
    carPlay: 'Έναρξη προβολής εικόνων',
    carGoTo: function (n, total) { return 'Μετάβαση στην εικόνα ' + n + ' από ' + total; },
    carSlide: function (n, total) { return n + ' από ' + total; },
    filterShowing: function (label) { return 'Εμφάνιση: ' + label; },
    errName: 'Παρακαλούμε εισάγετε το όνομά σας.',
    errEmailEmpty: 'Παρακαλούμε εισάγετε τη διεύθυνση email σας.',
    errEmailInvalid: 'Παρακαλούμε εισάγετε έγκυρη διεύθυνση email, για παράδειγμα name@example.com.',
    errSubject: 'Παρακαλούμε εισάγετε θέμα.',
    errMessage: 'Παρακαλούμε εισάγετε το μήνυμά σας.',
    errGdpr: 'Παρακαλούμε αποδεχθείτε την Πολιτική Απορρήτου πριν στείλετε το μήνυμά σας.',
    summaryOne: 'Υπάρχει 1 πρόβλημα με το μήνυμά σας:',
    summaryMany: function (n) { return 'Υπάρχουν ' + n + ' προβλήματα με το μήνυμά σας:'; },
    success: 'Ευχαριστούμε για το μήνυμά σας. Θα επικοινωνήσουμε μαζί σας σύντομα.',
    sending: 'Αποστολή…',
    errSend: 'Λυπούμαστε, το μήνυμά σας δεν μπόρεσε να σταλεί. Δοκιμάστε ξανά αργότερα ή στείλτε μας email στο info@osp-contractors.gr.'
  }
};
function ui() { return UI[document.documentElement.lang === 'el' ? 'el' : 'en']; }

var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Set copyright year
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', function () {
    var isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();

// Hero video pause/play toggle (WCAG 2.2.2 Pause, Stop, Hide)
(function () {
  var btn = document.getElementById('heroVideoToggle');
  var video = document.querySelector('.hero-video');
  if (!btn || !video) return;

  function render() {
    var playing = !video.paused;
    btn.setAttribute('aria-label', playing ? ui().heroPause : ui().heroPlay);
    btn.querySelector('span').innerHTML = playing ? '&#9646;&#9646;' : '&#9654;';
  }

  // Respect the "reduce motion" OS setting: do not autoplay
  if (prefersReducedMotion) {
    video.removeAttribute('autoplay');
    video.pause();
  }

  btn.addEventListener('click', function () {
    if (video.paused) { video.play(); } else { video.pause(); }
    render();
  });
  video.addEventListener('play', render);
  video.addEventListener('pause', render);
  document.addEventListener('langchange', render);
  render();
})();

// Company page image carousel (WCAG 2.2.2, 2.1.1, 4.1.2)
(function () {
  var track = document.getElementById('companyCarouselTrack');
  var dotsContainer = document.getElementById('carouselDots');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');
  var toggleBtn = document.getElementById('carouselToggle');
  if (!track) return;

  var carousel = track.closest('.company-carousel-wrapper');
  var slides = track.querySelectorAll('.company-carousel-slide');
  var dots = [];
  var current = 0;
  var userPaused = !!prefersReducedMotion;   // user (or OS) has stopped rotation
  var hoverOrFocus = false;                  // temporary pause while interacting
  var timer = null;

  slides.forEach(function (slide, i) {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');

    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function labels() {
    prevBtn.setAttribute('aria-label', ui().carPrev);
    nextBtn.setAttribute('aria-label', ui().carNext);
    slides.forEach(function (slide, i) {
      slide.setAttribute('aria-label', ui().carSlide(i + 1, slides.length));
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute('aria-label', ui().carGoTo(i + 1, slides.length));
    });
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', userPaused ? ui().carPlay : ui().carPause);
      toggleBtn.querySelector('span').innerHTML = userPaused ? '&#9654;' : '&#9646;&#9646;';
    }
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    slides.forEach(function (slide, i) {
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
      if (i === current) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
    });
  }

  function schedule() {
    clearInterval(timer);
    timer = null;
    // Rotation is on only if the user has not paused it and is not hovering/focusing
    track.setAttribute('aria-live', userPaused || hoverOrFocus ? 'polite' : 'off');
    if (!userPaused && !hoverOrFocus) {
      timer = setInterval(function () { goTo(current + 1); }, 4500);
    }
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      userPaused = !userPaused;
      labels();
      schedule();
    });
  }

  carousel.addEventListener('mouseenter', function () { hoverOrFocus = true; schedule(); });
  carousel.addEventListener('mouseleave', function () { hoverOrFocus = false; schedule(); });
  carousel.addEventListener('focusin', function () { hoverOrFocus = true; schedule(); });
  carousel.addEventListener('focusout', function (e) {
    if (!carousel.contains(e.relatedTarget)) { hoverOrFocus = false; schedule(); }
  });

  document.addEventListener('langchange', labels);
  labels();
  goTo(0);
  schedule();
})();

// Significant projects filter (WCAG 4.1.2 / 4.1.3)
(function () {
  var btns = document.querySelectorAll('.proj-filter-btn');
  if (!btns.length) return;

  var sections = document.querySelectorAll('[data-category]');

  // Visually hidden live region announcing the result of a filter
  var status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');
  btns[0].parentNode.appendChild(status);

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      btns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      sections.forEach(function (sec) {
        if (filter === 'all' || sec.getAttribute('data-category') === filter) {
          sec.classList.remove('proj-section-hidden');
        } else {
          sec.classList.add('proj-section-hidden');
        }
      });

      status.textContent = ui().filterShowing(btn.textContent.trim());
    });
  });
})();

// Contact form: inline, accessible validation (WCAG 3.3.1, 3.3.3, 4.1.3)
(function () {
  var form = document.querySelector('form[aria-label="Contact form"]');
  if (!form) return;

  var summary = document.getElementById('form-errors');
  var statusBox = document.getElementById('form-status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var fields = [
    { id: 'full-name', check: function (el) { return el.value.trim() ? '' : 'errName'; } },
    { id: 'email', check: function (el) {
        if (!el.value.trim()) return 'errEmailEmpty';
        return emailRe.test(el.value.trim()) ? '' : 'errEmailInvalid';
      } },
    { id: 'subject', check: function (el) { return el.value.trim() ? '' : 'errSubject'; } },
    { id: 'message', check: function (el) { return el.value.trim() ? '' : 'errMessage'; } },
    { id: 'gdpr', check: function (el) { return el.checked ? '' : 'errGdpr'; } }
  ];

  function clearErrors() {
    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      var msg = document.getElementById(f.id + '-error');
      el.removeAttribute('aria-invalid');
      msg.hidden = true;
      msg.textContent = '';
    });
    summary.hidden = true;
    summary.innerHTML = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    statusBox.hidden = true;

    var errors = [];
    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      var key = f.check(el);
      if (key) {
        errors.push({ el: el, text: ui()[key] });
        el.setAttribute('aria-invalid', 'true');
        var msg = document.getElementById(f.id + '-error');
        msg.textContent = ui()[key];
        msg.hidden = false;
      }
    });

    if (errors.length) {
      var intro = document.createElement('p');
      intro.textContent = errors.length === 1 ? ui().summaryOne : ui().summaryMany(errors.length);
      var list = document.createElement('ul');
      errors.forEach(function (err) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + err.el.id;
        a.textContent = err.text;
        a.addEventListener('click', function (ev) { ev.preventDefault(); err.el.focus(); });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.appendChild(intro);
      summary.appendChild(list);
      summary.hidden = false;
      summary.focus();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var label = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.textContent = ui().sending;

    function finish(ok) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-disabled');
      submitBtn.textContent = label;
      statusBox.classList.toggle('is-error', !ok);
      statusBox.setAttribute('role', ok ? 'status' : 'alert');
      statusBox.textContent = ok ? ui().success : ui().errSend;
      statusBox.hidden = false;
      statusBox.focus();
      if (ok) form.reset();
    }

    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) { return res.json().then(function (d) { return res.ok && d.ok; }); })
      .then(finish)
      .catch(function () { finish(false); });
  });
})();
