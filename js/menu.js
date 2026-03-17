document.addEventListener('DOMContentLoaded', () => {
    const initDropdown = () => {
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
    };

    initDropdown();
});