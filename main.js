import { renderNavbar } from './js/components/Navbar.js';
import { renderFooter } from './js/components/Footer.js';
import { initAnimations } from './js/modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    initAnimations();

    console.log("Modular Systems Portfolio Initialized.");
});
