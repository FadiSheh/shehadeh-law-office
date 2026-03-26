/**
 * Dark Mode Toggle
 * Persists preference in localStorage, respects system preference on first load
 */

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Check stored preference or system preference
    function isDarkMode() {
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) {
            return stored === 'true';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Apply dark mode
    function setDarkMode(enabled) {
        if (enabled) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
            if (darkModeToggle) {
                darkModeToggle.setAttribute('aria-pressed', 'true');
                darkModeToggle.setAttribute('title', 'Switch to light mode');
            }
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
            if (darkModeToggle) {
                darkModeToggle.setAttribute('aria-pressed', 'false');
                darkModeToggle.setAttribute('title', 'Switch to dark mode');
            }
        }
    }

    // Initialize on page load
    setDarkMode(isDarkMode());

    // Toggle on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            setDarkMode(!isDark);
        });
    }

    // Listen to system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
        }
    });
});
