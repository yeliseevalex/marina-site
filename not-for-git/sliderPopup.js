let currentSlide = 0;
const popupSlides = document.querySelectorAll(".slide");
const slidePrevBtn = document.getElementById("slidePrev");
const slideNextBtn = document.getElementById("slideNext");

function showSlide(newIndex) {
    if(newIndex === currentSlide) return;

    // текущий уходит влево
    popupSlides[currentSlide].classList.remove("active");
    popupSlides[currentSlide].classList.add("prev");

    // новый появляется
    popupSlides[newIndex].classList.add("active");

    // через 500ms убираем prev, чтобы скрыть старый слайд
    setTimeout(() => {
        popupSlides.forEach((s, i) => {
            if(i !== newIndex) s.classList.remove("prev");
        });
    }, 500);

    currentSlide = newIndex;
}

slidePrevBtn.addEventListener("click", () => {
    let prevIndex = (currentSlide - 1 + popupSlides.length) % popupSlides.length;
    showSlide(prevIndex);
});

slideNextBtn.addEventListener("click", () => {
    let nextIndex = (currentSlide + 1) % popupSlides.length;
    showSlide(nextIndex);
});