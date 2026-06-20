const themes = [
  { id: 'romantic', label: { en: 'Romantic', fr: 'Romantique', ar: 'رومانسي' } },
  { id: 'pastel', label: { en: 'Pastel', fr: 'Pastel', ar: 'باستيل' } },
  { id: 'dark', label: { en: 'Dark', fr: 'Sombre', ar: 'داكن' } },
  { id: 'sunset', label: { en: 'Sunset', fr: 'Coucher de soleil', ar: 'غروب' } },
];

let currentTheme = localStorage.getItem('love-theme') || 'romantic';

function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
  currentTheme = themeId;
  localStorage.setItem('love-theme', themeId);
  updateThemeButtons();
}

function updateThemeButtons() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const id = btn.dataset.theme;
    btn.classList.toggle('active', id === currentTheme);
    const lang = document.documentElement.lang || 'en';
    const label = themes.find(t => t.id === id)?.label?.[lang] || id;
    const labelKey = lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en';
    btn.textContent = themes.find(t => t.id === id)?.label?.[labelKey] || id;
  });
}

function setupThemeSwitcher() {
  applyTheme(currentTheme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupThemeSwitcher);
