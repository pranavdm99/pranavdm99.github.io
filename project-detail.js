document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        window.location.href = 'index.html';
        return;
    }

    // Load project data
    fetch('assets/projects.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const project = data[projectId];
            if (project) {
                renderProject(project);
                renderNavigation(projectId, data);
            } else {
                showError("Project not found in registry.");
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            if (window.location.protocol === 'file:') {
                showError(`
                    <div style="text-align: left; max-width: 600px; margin: 0 auto; padding: 20px; background: rgba(255,100,100,0.1); border-radius: 8px; border: 1px solid rgba(255,100,100,0.3);">
                        <h3 style="color: #ff6b6b;"><i class="fas fa-shield-alt"></i> Local Security Restriction</h3>
                        <p>Browsers block dynamic <code>fetch</code> calls when opening files directly via <code>file://</code>.</p>
                        <p style="margin-top: 15px;"><strong>Immediate Solution:</strong> Run a local server to view the deep dives:</p>
                        <pre style="background: #111; padding: 10px; border-radius: 4px; color: #00ff00; font-family: monospace;">python3 -m http.server 8000</pre>
                        <p style="margin-top: 10px;">Then visit: <a href="http://localhost:8000" style="color: #4facfe;">http://localhost:8000</a></p>
                    </div>
                `);
            } else {
                showError("Failed to load project database. Please try again.");
            }
        });
});

function renderNavigation(currentId, data) {
    const projectKeys = Object.keys(data);
    const currentIndex = projectKeys.indexOf(currentId);
    const navContainer = document.getElementById('project-navigation');

    if (!navContainer) return;

    let navHtml = '';

    // Previous Button
    if (currentIndex > 0) {
        const prevId = projectKeys[currentIndex - 1];
        const prevProject = data[prevId];
        navHtml += `
            <a href="project-detail.html?id=${prevId}" class="nav-btn">
                <span class="nav-btn-label"><i class="fas fa-chevron-left"></i> Previous Project</span>
                <span class="project-title">${prevProject.title}</span>
            </a>
        `;
    }

    // Next Button
    if (currentIndex < projectKeys.length - 1) {
        const nextId = projectKeys[currentIndex + 1];
        const nextProject = data[nextId];
        navHtml += `
            <a href="project-detail.html?id=${nextId}" class="nav-btn">
                <span class="nav-btn-label">Next Project <i class="fas fa-chevron-right"></i></span>
                <span class="project-title">${nextProject.title}</span>
            </a>
        `;
    }

    navContainer.innerHTML = navHtml;
}

function showError(message) {
    const container = document.getElementById('project-detail-content');
    if (container) {
        container.innerHTML = `<div class="error-msg fade-up" style="margin-top: 100px; text-align: center;">${message}</div>`;
    } else {
        document.body.innerHTML = `<div class="error-msg fade-up" style="margin-top: 100px; text-align: center;">${message}</div>`;
    }
    document.body.style.opacity = 1;
}

function renderProject(project) {
    // Update basic info
    document.title = `${project.title} | Pranav Deshakulkarni Manjunath`;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-tag').textContent = project.tag;
    document.getElementById('project-mission').textContent = project.mission;
    document.getElementById('project-problem').textContent = project.problem;
    document.getElementById('project-solution').textContent = project.solution;

    // Set Hero Background
    if (project.heroImage) {
        document.getElementById('project-hero').style.backgroundImage =
            `linear-gradient(to bottom, rgba(10, 10, 10, 0.8), #0a0a0a), url('${project.heroImage}')`;
    }

    // Render Tech Stack
    const stackContainer = document.getElementById('project-stack');
    project.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = tech;
        stackContainer.appendChild(span);
    });

    // Render Metrics
    const metricsContainer = document.getElementById('project-metrics');
    project.metrics.forEach(metric => {
        const div = document.createElement('div');
        div.className = 'metric-item glass';
        div.innerHTML = `
            <span class="metric-value text-gradient">${metric.value}</span>
            <span class="metric-label">${metric.label}</span>
        `;
        metricsContainer.appendChild(div);
    });

    // Render Pivots
    const pivotsContainer = document.getElementById('project-pivots');
    project.pivots.forEach(pivot => {
        const div = document.createElement('div');
        div.className = 'pivot-item';
        div.innerHTML = `
            <h4 style="color: white; margin-bottom: 10px;">${pivot.title}</h4>
            <p style="font-size: 0.95rem; line-height: 1.6;">${pivot.description}</p>
        `;
        pivotsContainer.appendChild(div);
    });

    // Render Plots
    if (project.plots && project.plots.length > 0) {
        const mainContent = document.querySelector('.main-content');
        const plotSection = document.createElement('section');
        plotSection.className = 'content-section';
        plotSection.innerHTML = `
            <h3><i class="fas fa-chart-line"></i> Performance Proofs</h3>
            <div id="project-plots" class="plots-grid"></div>
        `;
        mainContent.appendChild(plotSection);

        const plotsContainer = plotSection.querySelector('#project-plots');
        project.plots.forEach(plot => {
            const div = document.createElement('div');
            div.className = 'plot-item';
            div.innerHTML = `
                <img src="${plot.url}" alt="${plot.caption}" loading="lazy">
                <p class="plot-caption">${plot.caption}</p>
            `;
            plotsContainer.appendChild(div);
        });
    }

    // Reveal animation
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s';
        document.body.style.opacity = 1;
    }, 100);
}
