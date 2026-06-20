document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initGalleryLightbox();
  initShareForm();
  initContactForm();
  initBlogPost();
  setActiveNavLink();
  initRotatingQuotes();
  initVideoHandlers();
});

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
    else if (page === '' && href === 'index.html') link.classList.add('active');
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initGalleryLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  if (!lightbox) return;
  let lastFocused = null;

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lastFocused = item;
      lightboxImg.src = img.dataset.full || img.src;
      lightbox.classList.add('active');
      closeBtn?.focus();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'Tab') {
      e.preventDefault();
      if (closeBtn) closeBtn.focus();
    }
  });
}

const API_BASE = window.location.origin;

function initShareForm() {
  const form = document.getElementById('shareForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const story = {
      name: document.getElementById('storyName')?.value || 'Anonymous',
      email: document.getElementById('storyEmail')?.value || '',
      title: document.getElementById('storyTitle')?.value || 'Untitled',
      lang: document.getElementById('storyLang')?.value || 'en',
      content: document.getElementById('storyContent')?.value || '',
    };

    if (!story.content.trim()) return;

    // Try Worker API first, fall back to localStorage
    try {
      const res = await fetch(`${API_BASE}/api/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story),
      });
      if (res.ok) {
        form.reset();
        const success = document.getElementById('formSuccess');
        if (success) {
          success.style.display = 'block';
          setTimeout(() => { success.style.display = 'none'; }, 4000);
        }
        displayStories();
        return;
      }
    } catch (e) {
      console.log('Worker API unavailable, falling back to localStorage:', e.message);
    }

    // Fallback: save to localStorage
    story.id = Date.now().toString();
    story.date = new Date().toISOString();
    story.status = 'approved';

    const stories = JSON.parse(localStorage.getItem('love-stories') || '[]');
    stories.unshift(story);
    localStorage.setItem('love-stories', JSON.stringify(stories));

    form.reset();
    const success = document.getElementById('formSuccess');
    if (success) {
      success.style.display = 'block';
      success.textContent = t('share.localSuccess');
      setTimeout(() => { success.style.display = 'none'; }, 4000);
    }

    displayStories();
  });

  displayStories();
}

function displayStories() {
  const wall = document.getElementById('storiesWall');
  if (!wall) return;

  // Try Worker API first
  fetch(`${API_BASE}/api/stories`)
    .then(res => {
      if (!res.ok) throw new Error('Worker not available');
      return res.json();
    })
    .then(stories => {
      if (stories.length === 0) {
        wall.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:40px;">${t('share.empty')}</p>`;
        return;
      }
      wall.innerHTML = stories.map(s => `
        <div class="submitted-story fade-in">
          <h4>${escapeHtml(s.title)}</h4>
          <div class="meta">${escapeHtml(s.name)} &mdash; ${new Date(s.date).toLocaleDateString()}</div>
          <p>${escapeHtml(s.content)}</p>
        </div>
      `).join('');
      setTimeout(initScrollAnimations, 100);
    })
    .catch((e) => {
      console.log('Worker API unavailable, loading stories from localStorage:', e.message);
      // Fallback: load from localStorage
      const stories = JSON.parse(localStorage.getItem('love-stories') || '[]');
      if (stories.length === 0) {
        wall.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:40px;">${t('share.empty')}</p>`;
        return;
      }
      wall.innerHTML = stories.map(s => `
        <div class="submitted-story fade-in">
          <h4>${escapeHtml(s.title)}</h4>
          <div class="meta">${escapeHtml(s.name)} &mdash; ${new Date(s.date).toLocaleDateString()}</div>
          <p>${escapeHtml(s.content)}</p>
        </div>
      `).join('');
      setTimeout(initScrollAnimations, 100);
    });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

let blogContentCache = null;

function initBlogPost() {
  const container = document.getElementById('blogPostContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'));

  const posts = t('blog.posts');
  if (typeof posts === 'string') return;

  const postsArr = Array.isArray(posts) ? posts : [];
  const post = postsArr.find(p => p.id === postId);

  if (!post) {
    container.innerHTML = `<p data-i18n="blogPost.notFound">${t('blogPost.notFound')}</p>`;
    return;
  }

  const lang = getLang();
  document.getElementById('postTitle').textContent = post.title[lang] || post.title.en;
  document.getElementById('postDate').textContent = post.date[lang] || post.date.en;

  const img = document.getElementById('postImage');
  if (img && post.image) {
    img.src = post.image;
    img.alt = post.title[lang] || post.title.en;
  }

  const renderContent = (content) => {
    document.getElementById('postBody').innerHTML = content[lang] || content.en || '<p>Content not available.</p>';
  };

  if (blogContentCache) {
    renderContent(blogContentCache[postId]);
    return;
  }

  fetch('data/blog-content.json')
    .then(r => r.json())
    .then(data => {
      blogContentCache = data;
      renderContent(data[postId] || post.content || {});
    })
    .catch(() => {
      renderContent(post.content || {});
    });
}

function initRotatingQuotes() {
  const el = document.getElementById('rotatingQuote');
  if (!el) return;

  const quotesData = t('home.quotes');
  const quotes = Array.isArray(quotesData) ? quotesData : [];
  if (quotes.length === 0) return;

  const getQuote = (idx) => {
    const q = quotes[idx];
    if (!q) return '';
    const lang = getLang();
    return q[lang] || q.en || '';
  };

  let index = 0;
  el.textContent = getQuote(0);

  setInterval(() => {
    index = (index + 1) % quotes.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = getQuote(index);
      el.style.opacity = '1';
    }, 300);
  }, 5000);
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('contactName')?.value || '',
      email: document.getElementById('contactEmail')?.value || '',
      subject: document.getElementById('contactSubject')?.value || '',
      message: document.getElementById('contactMessage')?.value || '',
    };

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) return;

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = t('contact.form.sending');
    submitBtn.disabled = true;

    document.getElementById('contactFormSuccess').style.display = 'none';
    document.getElementById('contactFormError').style.display = 'none';

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        document.getElementById('contactFormSuccess').style.display = 'block';
      } else {
        document.getElementById('contactFormError').style.display = 'block';
      }
    } catch (e) {
      console.error('Contact form submission failed:', e.message);
      document.getElementById('contactFormError').style.display = 'block';
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

function initVideoHandlers() {
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const iframe = wrapper.querySelector('iframe');
    const errorEl = wrapper.parentElement.querySelector('.video-error');
    if (!iframe || !errorEl) return;
    const showError = () => { errorEl.style.display = 'block'; };
    iframe.addEventListener('error', showError);
    let timer = setTimeout(showError, 10000);
    iframe.addEventListener('load', () => clearTimeout(timer));
  });
}

// getLang and t are provided by i18n.js — do not redefine them here
