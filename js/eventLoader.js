document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "wedding";

    const data = eventsData[type];
    if (!data) return console.warn(`No data found for event type: ${type}`);

    const setContent = (id, value, isHTML = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        isHTML ? (el.innerHTML = value) : (el.textContent = value);
    };

    // ----------------------
    // Секция 1 (всегда есть)
    // ----------------------
    setContent("title1", data.title1);
    setContent("text1", data.text1, true);
    const img1 = document.getElementById("img1");
    if (img1 && data.img1) img1.src = data.img1;

    // ----------------------
    // Секция 2 (может не быть)
    // ----------------------
    const section2 = document.querySelector(".event-section-3"); // вторая секция
    if (data.title2 || data.text2 || data.img2) {
        setContent("title2", data.title2 || "");
        setContent("text2", data.text2 || "", true);
        const img2 = document.getElementById("img2");
        if (img2 && data.img2) img2.src = data.img2;
        if (section2) section2.style.display = "block";
    } else if (section2) {
        section2.style.display = "none";
    }

    // ----------------------
    // Слайдер (если есть)
    // ----------------------
    const slider = document.getElementById("slider");
    if (slider && data.slider && data.slider.length) {
        // очищаем
        slider.innerHTML = "";

        // добавляем оригинальные слайды
        data.slider.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "slider-img";
            slider.appendChild(img);
        });

        // клонируем для бесконечной прокрутки
        const slides = Array.from(slider.children);
        slides.forEach(slide => slider.appendChild(slide.cloneNode(true)));

        let scrollPos = 0;
        const speed = 0.5; // скорость прокрутки px

        function animateSlider() {
            scrollPos += speed;
            const totalWidth = slider.scrollWidth / 2; // половина ширины для бесконечной прокрутки
            if (scrollPos >= totalWidth) scrollPos = 0;

            slider.style.transform = `translateX(${-scrollPos}px)`;
            requestAnimationFrame(animateSlider);
        }

        animateSlider();
    } else if (slider) {
        slider.style.display = "none";
    }
});
