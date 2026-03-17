async function loadPartial(selector, file) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function initHeaderMenu() {
    const dropdown = document.querySelector('.dropdown');
    const toggle = document.querySelector('.dropdown-toggle');

    if (!dropdown || !toggle) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');

        const isOpen = dropdown.classList.contains('active');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

async function loadPartials() {
    const isInViews = window.location.pathname.includes('/views/');
    const basePath = isInViews ? '..' : '.';

    await loadPartial('#header', `${basePath}/partials/header.html`);
    await loadPartial('#footer', `${basePath}/partials/footer.html`);

    initHeaderMenu();
}

document.addEventListener('DOMContentLoaded', loadPartials);