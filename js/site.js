(() => {
  const root = document.documentElement;
  const themeColor = document.getElementById('theme-color');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  }

  let initialTheme = 'light';
  try {
    if (localStorage.getItem('theme') === 'dark') {
      initialTheme = 'dark';
    }
  } catch {
    // Theme controls still work when browser storage is unavailable.
  }
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const moreToggle = document.getElementById('more-toggle');
    const eduExpContent = document.getElementById('edu-exp-content');

    function updateThemeControl() {
      const isDark = root.dataset.theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }

    updateThemeControl();
    themeToggle.hidden = false;
    themeToggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      updateThemeControl();
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // A blocked preference save must not interrupt the page controls.
      }
    });

    // Leave these sections readable if JavaScript is disabled or fails to load.
    eduExpContent.hidden = true;
    moreToggle.hidden = false;
    moreToggle.addEventListener('click', () => {
      const expanded = moreToggle.getAttribute('aria-expanded') !== 'true';
      eduExpContent.hidden = !expanded;
      moreToggle.setAttribute('aria-expanded', String(expanded));
      moreToggle.setAttribute('aria-label', expanded
        ? 'Hide education and experience'
        : 'Show education and experience');
      moreToggle.textContent = expanded ? '(less)' : '(more)';
    });
  });
})();
