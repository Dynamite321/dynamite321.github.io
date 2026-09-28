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

  // Local file previews should not contact analytics services.
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
    return;
  }

  function loadAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-MYEXCN4JMP');

    const googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-MYEXCN4JMP';
    document.head.appendChild(googleTag);

    const visitorMap = document.createElement('script');
    visitorMap.async = true;
    visitorMap.id = 'clustrmaps';
    visitorMap.src = 'https://clustrmaps.com/map_v2.js?d=FMD5WV_LW25u-g-dGYKLhq9wTFftWAEHOZJRtDrdwhQ';
    document.getElementById('visitor-map').appendChild(visitorMap);
  }

  window.addEventListener('load', () => {
    // Start in a new task, after the initial load event has finished.
    window.setTimeout(loadAnalytics, 0);
  }, { once: true });
})();
