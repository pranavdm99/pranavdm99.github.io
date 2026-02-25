export function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Check localStorage first, then system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

    // Apply the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Listen for toggle clicks
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let switchToTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', switchToTheme);
            localStorage.setItem('theme', switchToTheme);
            updateIcon(switchToTheme);
        });
    }

    // Optional: Listen for system preference changes if user hasn't overridden
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
        }
    });

    function updateIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun'; // Show sun to indicate clicking will switch to light
        } else {
            icon.className = 'fas fa-moon'; // Show moon to indicate clicking will switch to dark
        }
    }
}
