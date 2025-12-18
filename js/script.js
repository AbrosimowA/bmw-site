// === OPTIMIZED THEME SYSTEM ===
const ThemeManager = {
  themes: ['dark', 'light', 'bmw-m-dark', 'bmw-m-red', 'sport'],
  currentTheme: null,

  init() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateActiveButton();
  },

  change(theme) {
    if (!this.themes.includes(theme)) return;
    
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateActiveButton();
    
    // Trigger animation
    document.documentElement.style.transition = 'background-color 0.3s ease';
  },

  updateActiveButton() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
    });
  }
};

// Global function for inline HTML
function changeTheme(theme) {
  ThemeManager.change(theme);
}

// === PERFORMANCE OPTIMIZATION ===
const performanceConfig = {
  animationEnabled: true,
  lazyLoadImages: true,
  smoothScroll: window.innerWidth > 768,
};

// Disable smooth scroll on mobile for better performance
if (window.innerWidth <= 768) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// === OPTIMIZED INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme system first
  ThemeManager.init();

  // Mobile menu toggle (optimized)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }

  // Theme button click handler (delegated)
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('theme-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const theme = e.target.getAttribute('data-theme');
      ThemeManager.change(theme);
    }
  });

  // === SCROLL TO TOP BUTTON ===
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const show = window.pageYOffset > 300;
          scrollBtn.classList.toggle('show', show);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // === INTERSECTION OBSERVER FOR ANIMATIONS ===
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const animationTypes = ['fade-in', 'slide-up', 'zoom-in', 'rotate-in'];
          const animationType = animationTypes[index % animationTypes.length];
          entry.target.classList.add(animationType);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
      observer.observe(item);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.style.animationDelay = `${index * 0.15}s`;
      item.classList.add('fade-scale');
      observer.observe(item);
    });
  }

  // === SEARCH FUNCTIONALITY (OPTIMIZED) ===
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      
      searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('[data-filter]');

        cards.forEach(card => {
          const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
          const text = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

          const matches = title.includes(query) || text.includes(query);
          card.style.display = matches ? 'block' : 'none';
        });
      }, 300);
    });
  }

  // === FILTER BUTTONS (OPTIMIZED) ===
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('filter-btn')) {
      e.preventDefault();
      
      const filter = e.target.getAttribute('data-filter');
      const filterParent = e.target.closest('.filter-buttons');
      const cardsContainer = filterParent?.closest('section')?.querySelector('.cards-grid') || 
                             document.querySelector('.cards-grid');

      if (!cardsContainer) return;

      // Update active button
      filterParent?.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');

      // Filter cards
      const cards = cardsContainer.querySelectorAll('.card');
      cards.forEach(card => {
        const cardFilter = card.getAttribute('data-filter');
        const matches = filter === 'all' || (cardFilter && cardFilter.includes(filter));
        card.style.display = matches ? 'block' : 'none';
      });
    }
  });

  // === PARALLAX EFFECT (MOBILE OPTIMIZED) ===
  if (window.innerWidth > 768) {
    let parallaxTimeout;
    
    window.addEventListener('scroll', () => {
      if (!parallaxTimeout) {
        parallaxTimeout = setTimeout(() => {
          const parallaxElements = document.querySelectorAll('[data-parallax]');
          const scrollPos = window.scrollY;

          parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollPos * 0.5}px)`;
          });

          parallaxTimeout = null;
        }, 16);
      }
    }, { passive: true });
  }

  // === LAZY LOADING IMAGES ===
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // === SMOOTH SCROLL FOR INTERNAL LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: performanceConfig.smoothScroll ? 'smooth' : 'auto',
          block: 'start'
        });
      }
    });
  });

  // === GALLERY MODAL (OPTIMIZED) ===
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('gallery-item')) {
      const img = e.target.querySelector('img');
      if (img && img.src) {
        showGalleryModal(img.src);
      }
    }
  });

  // === PAGE TRANSITION (OPTIMIZED) ===
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="./"]');
    if (link && (!link.target || link.target === '_self')) {
      e.preventDefault();
      fadeOutAndNavigate(link.href);
    }
  });
});

// === UTILITY FUNCTIONS ===

function showGalleryModal(src) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="Gallery image" loading="lazy">
    </div>
  `;

  Object.assign(modal.style, {
    position: 'fixed',
    zIndex: '2000',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 0.3s ease',
    backdropFilter: 'blur(4px)',
  });

  const closeBtn = modal.querySelector('.close');
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '30px',
    color: '#dc0000',
    fontSize: '40px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textShadow: '0 0 10px rgba(220, 0, 0, 0.5)',
  });

  closeBtn.addEventListener('click', () => closeModal(modal));
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.color = '#ff3333';
    closeBtn.style.transform = 'scale(1.2) rotate(90deg)';
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.color = '#dc0000';
    closeBtn.style.transform = 'scale(1) rotate(0deg)';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  document.body.appendChild(modal);
}

function closeModal(modal) {
  modal.style.animation = 'fadeOut 0.3s ease';
  setTimeout(() => modal.remove(), 300);
}

function fadeOutAndNavigate(url) {
  const fadeOut = document.createElement('div');
  fadeOut.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-blue);
    animation: fadeInOut 0.5s ease-in-out;
    z-index: 9999;
  `;

  document.body.appendChild(fadeOut);
  setTimeout(() => window.location.href = url, 250);
}

// === ADD REQUIRED ANIMATIONS TO HEAD ===
if (!document.querySelector('style[data-animations="bmw"]')) {
  const style = document.createElement('style');
  style.setAttribute('data-animations', 'bmw');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes fadeInOut {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// === PERFORMANCE MONITORING (Optional) ===
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('📊 Page Load Time:', pageLoadTime + 'ms');
  });
}
