document.addEventListener('DOMContentLoaded', () => {
  // ====== MOBILE NAV ======
  const hamburger = document.getElementById('navHamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  // ====== HERO IMAGE GALLERY ======
  const heroImages = ['images/home-page.png', 'images/home-page.png', 'images/home-page.png', 'images/home-page.png', 'images/home-page.png', 'images/home-page.png'];
  let heroIndex = 0;
  const heroMain = document.getElementById('heroMainImage');
  const thumbs = document.getElementById('heroThumbnails');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  function updateHero() {
    if (!heroMain) return;
    heroMain.src = heroImages[heroIndex];
    if (thumbs) {
      thumbs.querySelectorAll('.hero__thumb').forEach((t, i) => {
        t.classList.toggle('hero__thumb--active', i === heroIndex);
      });
    }
  }

  if (heroPrev) heroPrev.addEventListener('click', () => { heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length; updateHero(); });
  if (heroNext) heroNext.addEventListener('click', () => { heroIndex = (heroIndex + 1) % heroImages.length; updateHero(); });
  if (thumbs) {
    thumbs.addEventListener('click', (e) => {
      const thumb = e.target.closest('.hero__thumb');
      if (thumb) { heroIndex = +thumb.dataset.index; updateHero(); }
    });
  }

  // ====== FAQ ACCORDION ======
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__question');
      if (!btn) return;
      const item = btn.parentElement;
      const answer = item.querySelector('.faq__answer');
      const chevron = btn.querySelector('.faq__chevron');
      const isOpen = item.classList.contains('faq__item--active');

      // Close all
      faqList.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('faq__item--active');
        const a = i.querySelector('.faq__answer');
        if (a) a.style.display = 'none';
        const c = i.querySelector('.faq__chevron');
        if (c) c.innerHTML = '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
        const q = i.querySelector('.faq__question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('faq__item--active');
        if (answer) answer.style.display = 'block';
        if (chevron) chevron.innerHTML = '<path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // ====== APPLICATIONS CAROUSEL ======
  const appTrack = document.getElementById('appTrack');
  const appPrev = document.getElementById('appPrev');
  const appNext = document.getElementById('appNext');
  let appIndex = 0;

  function getVisibleCards() {
    const w = window.innerWidth;
    if (w <= 360) return 1;
    if (w <= 800) return 2;
    if (w <= 1080) return 3;
    return 4;
  }

  function updateAppCarousel() {
    if (!appTrack) return;
    const cards = appTrack.querySelectorAll('.app-card');
    if (!cards.length) return;
    const card = cards[0];
    const gap = 20;
    const cardWidth = card.getBoundingClientRect().width + gap;
    appTrack.style.transform = `translateX(-${appIndex * cardWidth}px)`;
  }

  if (appPrev) appPrev.addEventListener('click', () => { appIndex = Math.max(0, appIndex - 1); updateAppCarousel(); });
  if (appNext) appNext.addEventListener('click', () => {
    const cards = appTrack ? appTrack.querySelectorAll('.app-card') : [];
    const maxIndex = Math.max(0, cards.length - getVisibleCards());
    appIndex = Math.min(maxIndex, appIndex + 1);
    updateAppCarousel();
  });

  // ====== EMAIL FORM ======
  const emailSubmit = document.getElementById('emailSubmit');
  const emailInput = document.getElementById('emailInput');
  if (emailSubmit && emailInput) {
    emailSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (email && email.includes('@')) {
        alert('Thank you! The catalogue will be sent to ' + email);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // ====== HEADER SCROLL EFFECT ======
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,.08)' : 'none';
    });
  }

  // ====== PROCESS TABS ======
  const processTabs = document.getElementById('processTabs');
  const processContent = document.getElementById('processContent');
  const processStepBadge = document.getElementById('processStepBadge');
  const processPrevBtn = document.getElementById('processPrevBtn');
  const processNextBtn = document.getElementById('processNextBtn');
  
  const processSteps = [
    "Raw Material", "Extrusion", "Cooling", "Sizing", 
    "Quality Control", "Marking", "Cutting", "Packaging"
  ];
  let currentProcessIndex = 0;

  function updateProcessPanel() {
    if (processTabs) {
      processTabs.querySelectorAll('.process__tab').forEach((t, i) => {
        t.classList.toggle('process__tab--active', i === currentProcessIndex);
      });
    }
    if (processContent) {
      processContent.querySelectorAll('.process__panel').forEach((p, i) => {
        p.classList.toggle('process__panel--active', i === currentProcessIndex);
      });
    }
    if (processStepBadge) {
      processStepBadge.textContent = `Step ${currentProcessIndex + 1}/8: ${processSteps[currentProcessIndex]}`;
    }
    if (processPrevBtn) {
      if (currentProcessIndex === 0) {
        processPrevBtn.style.opacity = '0.5';
        processPrevBtn.style.pointerEvents = 'none';
      } else {
        processPrevBtn.style.opacity = '1';
        processPrevBtn.style.pointerEvents = 'auto';
      }
    }
    if (processNextBtn) {
      if (currentProcessIndex === processSteps.length - 1) {
        processNextBtn.style.opacity = '0.5';
        processNextBtn.style.pointerEvents = 'none';
      } else {
        processNextBtn.style.opacity = '1';
        processNextBtn.style.pointerEvents = 'auto';
      }
    }
  }

  if (processTabs && processContent) {
    processTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.process__tab');
      if (!tab) return;
      currentProcessIndex = parseInt(tab.dataset.tab, 10);
      updateProcessPanel();
    });
  }

  if (processPrevBtn) {
    processPrevBtn.addEventListener('click', () => {
      if (currentProcessIndex > 0) {
        currentProcessIndex--;
        updateProcessPanel();
      }
    });
  }

  if (processNextBtn) {
    processNextBtn.addEventListener('click', () => {
      if (currentProcessIndex < processSteps.length - 1) {
        currentProcessIndex++;
        updateProcessPanel();
      }
    });
  }
  
  updateProcessPanel();

  // ====== BROCHURE DOWNLOAD MODAL ======
  const brochureModal = document.getElementById('brochureModal');
  const downloadBtn = document.getElementById('downloadBtn');
  const modalClose = document.getElementById('modalClose');
  const brochureSubmit = document.getElementById('brochureSubmit');

  function openModal(modal) {
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(brochureModal);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => closeModal(brochureModal));
  }

  // Close on backdrop click
  if (brochureModal) {
    brochureModal.addEventListener('click', (e) => {
      if (e.target === brochureModal) closeModal(brochureModal);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
    }
  });

  // Submit handler
  if (brochureSubmit) {
    brochureSubmit.addEventListener('click', () => {
      const email = document.getElementById('brochureEmail');
      if (email && email.value.trim() && email.value.includes('@')) {
        alert('Thank you! The brochure will be sent to ' + email.value.trim());
        email.value = '';
        const contact = document.getElementById('brochureContact');
        if (contact) contact.value = '';
        closeModal(brochureModal);
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // ====== REQUEST CALLBACK MODAL ======
  const callbackModal = document.getElementById('callbackModal');
  const requestQuoteBtn = document.getElementById('requestQuoteBtn');
  const callbackModalClose = document.getElementById('callbackModalClose');
  const callbackSubmit = document.getElementById('callbackSubmit');

  if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(callbackModal);
    });
  }

  if (callbackModalClose) {
    callbackModalClose.addEventListener('click', () => closeModal(callbackModal));
  }

  if (callbackModal) {
    callbackModal.addEventListener('click', (e) => {
      if (e.target === callbackModal) closeModal(callbackModal);
    });
  }

  if (callbackSubmit) {
    callbackSubmit.addEventListener('click', () => {
      const name = document.getElementById('cbFullName');
      const email = document.getElementById('cbEmail');
      if (name && name.value.trim() && email && email.value.trim() && email.value.includes('@')) {
        alert('Thank you, ' + name.value.trim() + '! We will call you back shortly.');
        document.getElementById('cbFullName').value = '';
        document.getElementById('cbCompanyName').value = '';
        document.getElementById('cbEmail').value = '';
        document.getElementById('cbPhone').value = '';
        closeModal(callbackModal);
      } else {
        alert('Please fill in your name and a valid email address.');
      }
    });
  }
});
