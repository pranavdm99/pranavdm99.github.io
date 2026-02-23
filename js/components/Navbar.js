export function renderNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    nav.innerHTML = `
        <div class="container">
            <a href="index.html" class="logo">
                <img src="assets/pdm_logo_original.jpeg" alt="PDM Logo" class="logo-img">
            </a>
            <ul class="nav-links">
                <li><a href="index.html#expertise">Expertise</a></li>
                <li><a href="index.html#projects">Systems</a></li>
                <li><a href="index.html#experience">Evolution</a></li>
                <li><a href="index.html#contact">Contact</a></li>
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
