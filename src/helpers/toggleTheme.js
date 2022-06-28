const body = document.querySelector('body');
body.setAttribute('data-theme', 'light');

const toggleThemeBtn = document.querySelector('.toggle-btn');

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
}

export default function toggleTheme() {
  const activeTheme = body.getAttribute('data-theme');

  if (activeTheme === 'light') {
    setTheme('dark');
    toggleThemeBtn.textContent = 'Light Mode';
  } else {
    setTheme('light');
    toggleThemeBtn.textContent = 'Dark Mode';
  }
}
