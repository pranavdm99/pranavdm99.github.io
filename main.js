import { renderNavbar } from './js/components/Navbar.js';
import { renderFooter } from './js/components/Footer.js';
import { initAnimations } from './js/modules/animations.js';
import { initTheme } from './js/modules/theme.js';
import { initProjectFilter } from './js/modules/filter.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    initTheme(); // Must happen after renderNavbar so the toggle button exists
    renderFooter();
    initAnimations();
    initProjectFilter();

    console.log("Modular Portfolio Initialized.");
});
