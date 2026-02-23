export function renderFooter() {
    const footers = document.querySelectorAll('footer#contact, footer.section');

    footers.forEach(footer => {
        if (footer.id === 'contact') {
            footer.innerHTML = `
                <div class="container">
                    <h2>Let's Build the Future</h2>
                    <div class="social-links">
                        <a href="https://linkedin.com/in/pranavdm" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://github.com/pranavdm99" target="_blank"><i class="fab fa-github"></i></a>
                        <a href="mailto:pranavdeshakulkarni@gmail.com"><i class="fas fa-envelope"></i></a>
                    </div>
                    <p style="margin-top: 30px; font-size: 0.8rem; color: var(--text-muted);">© 2026 Pranav Deshakulkarni Manjunath. Built for the intersection of Hardware and Intelligence.</p>
                </div>
            `;
        }
    });
}
