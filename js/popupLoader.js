document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const popupType = params.get("type");

    if (!popupType || !popupData[popupType]) {
        console.error("Unknown popup type:", popupType);
        return;
    }

    const items = popupData[popupType];
    if (!items || !items.length) {
        console.error("No items for type:", popupType);
        return;
    }

    const slidesContainer = document.querySelector(".slides-container");
    if (!slidesContainer) {
        console.error("Не найден .slides-container");
        return;
    }

    slidesContainer.innerHTML = "";

    // --- Генерация всех слайдов ---
    items.forEach(item => {
        const slide = document.createElement("div");
        slide.className = "slide"; // по CSS они все abs, opacity 0

        slide.innerHTML = `
            <div class="slide-left">
                <img src="${item.main}" alt="">
                <div class="review-content bottom-start">
                    <span class="review-open-text">${item.review}</span>
                </div>
                <div class="review-overlay bottom-overlay">
                    <svg class="review-arrow" viewBox="0 0 25 46" fill="none">
                        <path d="M22.638 0L0 22.64 22.638 45.28 24.676 43.24 4.07854 22.6436 24.6787 2.04 22.638 0Z" fill="#FAF9F6"/>
                    </svg>
                    <span class="review-text">ОТЗЫВ</span>
                </div>
            </div>
            <div class="slide-right">
                <div class="slide-text-wrapper">
                    <h2 class="slide-title">${item.title || ""}</h2>
                    <span class="slide-text">${item.text}</span>
                    <span class="read-more-text">ЧИТАТЬ ДАЛЬШЕ</span>
                </div>
                <div class="slide-thumbs">
                    ${item.thumbs.map(t => `<img src="${t}" alt="">`).join("")}
                </div>
            </div>
        `;
        slidesContainer.appendChild(slide);
    });

    initReadMore();
    initReviewOverlay();

    // --- Слайдер через active/prev ---
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("slidePrev");
    const nextBtn = document.getElementById("slideNext");
    // Если всего один слайд — скрываем стрелки
    if (slides.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
    let currentIndex = 0;

    // Показываем первый слайд
    slides[currentIndex].classList.add("active");

    function showSlide(newIndex) {
        if (newIndex === currentIndex) return;

        slides[currentIndex].classList.remove("active");
        slides[currentIndex].classList.add("prev");

        slides[newIndex].classList.add("active");

        setTimeout(() => {
            slides.forEach((s, i) => {
                if (i !== newIndex) s.classList.remove("prev");
            });
        }, 500); // совпадает с transition

        currentIndex = newIndex;
    }

    prevBtn.addEventListener("click", () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    });

    nextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    });
});

// ----------------------------
// "Читать дальше"
function initReadMore() {
    document.querySelectorAll('.slide-text-wrapper').forEach(wrapper => {
        const textEl = wrapper.querySelector('.slide-text');
        const readMore = wrapper.querySelector('.read-more-text');

        const fullText = textEl.textContent;
        const visibleChars = 400;

        if (fullText.length <= visibleChars) {
            readMore.style.display = 'none';
            return;
        }

        textEl.textContent = fullText.slice(0, visibleChars) + '...';

        readMore.addEventListener('click', () => {
            if (wrapper.classList.contains('expanded')) {
                textEl.textContent = fullText.slice(0, visibleChars) + '...';
                readMore.textContent = 'ЧИТАТЬ ДАЛЬШЕ';
                wrapper.classList.remove('expanded');
            } else {
                textEl.textContent = fullText;
                readMore.textContent = 'СВЕРНУТЬ';
                wrapper.classList.add('expanded');
            }
        });
    });
}

// ----------------------------
// Review overlay
function initReviewOverlay() {
    document.querySelectorAll('.review-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const parent = overlay.closest('.slide-left');
            if (overlay.classList.contains('bottom-overlay')) {
                parent.classList.toggle('bottom-open');
            }
        });
    });
}
