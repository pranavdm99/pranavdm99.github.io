export function renderNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    nav.innerHTML = `
        <div class="container">
            <a href="index.html" class="logo">
                <img src="assets/pdm_logo_light_v2.png" alt="PDM Logo" class="logo-img logo-dark">
                <img src="assets/pdm_logo_dark.png" alt="PDM Logo" class="logo-img logo-light">
            </a>
            <ul class="nav-links">
                <li><a href="index.html#expertise">Expertise</a></li>
                <li><a href="index.html#projects">Projects</a></li>
                <li><a href="index.html#publications">Publications</a></li>
                <li><a href="index.html#experience">Timeline</a></li>
                <li><a href="index.html#contact">Contact</a></li>
                <li>
                    <button id="theme-toggle" class="theme-btn" aria-label="Toggle theme">
                        <i class="fas fa-sun"></i>
                    </button>
                </li>
            </ul>
        </div>
    `;

    // Handle scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}
