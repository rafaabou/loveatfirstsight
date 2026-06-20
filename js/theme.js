let currentTheme = localStorage.getItem('love-theme') || 'romantic';

function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
  currentTheme = themeId;
  localStorage.setItem('love-theme', themeId);
  updateThemeActive();
}

function updateThemeActive() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === currentTheme);
  });
}

function setupThemeSwitcher() {
  applyTheme(currentTheme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
}

document.addEventListener('DOMContentLoaded', setupThemeSwitcher);
