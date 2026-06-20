document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initGalleryLightbox();
  initShareForm();
  initBlogPost();
  setActiveNavLink();
  initRotatingQuotes();
});

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
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

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.dataset.full || img.src;
      lightbox.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

function initShareForm() {
  const form = document.getElementById('shareForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const story = {
      id: Date.now(),
      name: document.getElementById('storyName')?.value || 'Anonymous',
      title: document.getElementById('storyTitle')?.value || 'Untitled',
      lang: document.getElementById('storyLang')?.value || 'en',
      content: document.getElementById('storyContent')?.value || '',
      date: new Date().toISOString(),
    };

    if (!story.content.trim()) return;

    const stories = JSON.parse(localStorage.getItem('love-stories') || '[]');
    stories.unshift(story);
    localStorage.setItem('love-stories', JSON.stringify(stories));

    form.reset();
    const success = document.getElementById('formSuccess');
    if (success) {
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 4000);
    }

    displayStories();
  });

  displayStories();
}

function displayStories() {
  const wall = document.getElementById('storiesWall');
  if (!wall) return;

  const stories = JSON.parse(localStorage.getItem('love-stories') || '[]');

  if (stories.length === 0) {
    wall.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:40px;" data-i18n="share.empty">${t('share.empty')}</p>`;
    return;
  }

  wall.innerHTML = stories.map(s => {
    const date = new Date(s.date).toLocaleDateString();
    return `
      <div class="submitted-story fade-in">
        <h4>${escapeHtml(s.title)}</h4>
        <div class="meta">${escapeHtml(s.name)} &mdash; ${date}</div>
        <p>${escapeHtml(s.content)}</p>
      </div>
    `;
  }).join('');

  setTimeout(initScrollAnimations, 100);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

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

  document.getElementById('postBody').innerHTML = post.content[lang] || post.content.en;
}

function initRotatingQuotes() {
  const el = document.getElementById('rotatingQuote');
  if (!el) return;

  const quotesData = t('home.quotes');
  const quotes = Array.isArray(quotesData) ? quotesData : [];
  if (quotes.length === 0) return;

  let index = 0;
  el.textContent = quotes[0];

  setInterval(() => {
    index = (index + 1) % quotes.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = quotes[index];
      el.style.opacity = '1';
    }, 300);
  }, 5000);
}

function getLang() {
  return document.documentElement.lang || 'en';
}

function t(key) {
  if (typeof window.t === 'function') return window.t(key);
  const lang = getLang();
  const keys = key.split('.');
  let obj = window.translations;
  for (const k of keys) {
    if (obj && obj[k]) obj = obj[k];
    else return key;
  }
  if (obj && typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
  return obj && obj.en !== undefined ? obj.en : key;
}
