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

function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/views/') ? '..' : '.';
}

function resolveHeaderPaths() {
    const header = document.querySelector('#header');
    if (!header) return;

    const base = getBasePath();

    const routes = {
        index: `${base}/index.html`,
        conocenos: `${base}/views/conocenos.html`,
        destinos: `${base}/views/destinos.html`,
        promociones: `${base}/views/promociones.html`,
        contacto: `${base}/views/contacto.html`,
        'paquetes-nacionales': `${base}/views/paquetes.html#nacionales`,
        'paquetes-internacional': `${base}/views/paquetes.html#internacional`,
    };

    const assets = {
        logo: `${base}/assets/img/logo.png`,
    };

    header.querySelectorAll('[data-link]').forEach((element) => {
        const key = element.dataset.link;
        if (routes[key]) {
            element.setAttribute('href', routes[key]);
        }
    });

    header.querySelectorAll('[data-src]').forEach((element) => {
        const key = element.dataset.src;
        if (assets[key]) {
            element.setAttribute('src', assets[key]);
        }
    });
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
    const base = getBasePath();

    await loadPartial('#header', `${base}/partials/header.html`);
    await loadPartial('#footer', `${base}/partials/footer.html`);

    resolveHeaderPaths();
    initHeaderMenu();
}

document.addEventListener('DOMContentLoaded', loadPartials);