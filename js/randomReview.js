document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("btn-open-popup");
    const popup = document.getElementById("portfolioPopup");
    const slidesContainer = document.getElementById("popupSlides");
    const closeBtn = popup.querySelector(".popup-close");
    const prevBtn = document.getElementById("slidePrev");
    const nextBtn = document.getElementById("slideNext");

    let currentIndex = 0;

    openBtn.addEventListener("click", () => {
        // Собираем все отзывы из всех категорий
        const allReviews = Object.values(popupData).flat();
        if (!allReviews.length) return;

        // Берем, например, 10 случайных отзывов
        const randomReviews = [];
        const count = Math.min(10, allReviews.length);
        const usedIndexes = new Set();

        while (randomReviews.length < count) {
            const idx = Math.floor(Math.random() * allReviews.length);
            if (!usedIndexes.has(idx)) {
                randomReviews.push(allReviews[idx]);
                usedIndexes.add(idx);
            }
        }

        // Очищаем контейнер
        slidesContainer.innerHTML = "";

        // Генерация слайдов
        randomReviews.forEach(item => {
            const slide = document.createElement("div");
            slide.className = "slide";

            slide.innerHTML = `
                <div class="slide-left">
                    <img src="${item.main}" alt="">
                    <div class="review-content-popup bottom-start">
                        <span class="review-open-text">${item.review}</span>
                    </div>
                    <div class="review-overlay-popup bottom-overlay">
                        <svg class="review-arrow" viewBox="0 0 25 46" fill="none">
                            <path d="M22.638 0L0 22.64 22.638 45.28 24.676 43.24 4.07854 22.6436 24.6787 2.04 22.638 0Z" fill="#FAF9F6"/>
                        </svg>
                        <span class="review-text">ОТЗЫВ</span>
                    </div>
                </div>
                <div class="slide-right">
                    <div class="slide-text-wrapper">
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

        // Инициализация "читать дальше" и overlay
        initReadMore();
        initReviewOverlay();

        const slides = document.querySelectorAll(".slide");
        currentIndex = 0;
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
            }, 500);

            currentIndex = newIndex;
        }

        prevBtn.onclick = () => {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        };
        nextBtn.onclick = () => {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        };

        popup.classList.add("active");
    });

    // Закрытие попапа
    closeBtn.addEventListener("click", () => popup.classList.remove("active"));
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });
});

// ----------------------------
// "Читать дальше"
function initReadMore() {
    document.querySelectorAll('.slide-text-wrapper').forEach(wrapper => {
        const textEl = wrapper.querySelector('.slide-text');
        const readMore = wrapper.querySelector('.read-more-text');

        const fullText = textEl.textContent;
        const visibleChars = 450;

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
    document.querySelectorAll('.review-overlay-popup').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const parent = overlay.closest('.slide-left');
            if (overlay.classList.contains('bottom-overlay')) {
                parent.classList.toggle('bottom-open');
            }
        });
    });
}
