export function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-entry');

    if (!filterButtons.length || !projects.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    // Re-trigger animation if visible
                    setTimeout(() => {
                        project.classList.add('visible');
                    }, 50);
                } else {
                    project.style.display = 'none';
                    project.classList.remove('visible');
                }
            });
        });
    });
}
