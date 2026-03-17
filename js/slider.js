document.addEventListener('DOMContentLoaded', () => {

    const sliders = document.querySelectorAll('.promo-slider');

    sliders.forEach((slider) => {

        const slides = slider.querySelectorAll('.promo-slide');
        const dotsContainer = slider.querySelector('.promo-dots');
        const prevBtn = slider.querySelector('.promo-slider-btn.prev');
        const nextBtn = slider.querySelector('.promo-slider-btn.next');

        let currentIndex = 0;
        let intervalId;

        /* =======================
           CREAR DOTS AUTOMATICOS
        ======================= */

        slides.forEach((_, index) => {

            const dot = document.createElement('button');

            dot.classList.add('promo-dot');

            if (index === 0) {
                dot.classList.add('active');
            }

            dot.dataset.slide = index;

            dotsContainer.appendChild(dot);

        });

        const dots = dotsContainer.querySelectorAll('.promo-dot');

        /* =======================
           MOSTRAR SLIDE
        ======================= */

        function showSlide(index) {

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoSlide() {
            intervalId = setInterval(nextSlide, 4000);
        }

        function resetAutoSlide() {
            clearInterval(intervalId);
            startAutoSlide();
        }

        /* =======================
           EVENTOS BOTONES
        ======================= */

        nextBtn?.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn?.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        /* =======================
           EVENTOS DOTS
        ======================= */

        dots.forEach((dot, index) => {

            dot.addEventListener('click', () => {

                showSlide(index);
                resetAutoSlide();

            });

        });

        slider.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });

        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        showSlide(0);

        if (slides.length > 1) {
            startAutoSlide();
        }

    });

});