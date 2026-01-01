const slider = document.querySelector('.div-slider-content');
    const slides = Array.from(slider.children);

    // Клонируем все слайды и добавляем в конец
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    let scrollPos = 0;
    const speed = 0.5; // скорость прокрутки в px

    function animateSlider() {
        scrollPos += speed;

        // Когда прокрутка дошла до оригинальной ширины блока — сбрасываем
        if(scrollPos >= slider.offsetWidth / 2) {
            scrollPos = 0;
        }

        slider.style.transform = `translateX(${-scrollPos}px)`;
        requestAnimationFrame(animateSlider);
    }

    animateSlider();