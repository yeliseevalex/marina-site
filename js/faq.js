const faqItems = document.querySelectorAll(".faq-item");
const faqImage = document.getElementById("faqImage");
const faqRightBlock = document.querySelector(".div-right-faq");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        // закрываем остальные
        faqItems.forEach(i => i !== item && i.classList.remove("active"));

        // переключаем
        item.classList.toggle("active");
    });
});

// Наблюдаем за изменениями высоты правой колонки
const resizeObserver = new ResizeObserver(() => {
    faqImage.style.height = faqRightBlock.offsetHeight + "px";
});

// запускаем наблюдение
resizeObserver.observe(faqRightBlock);

// первичная установка
faqImage.style.height = faqRightBlock.offsetHeight + "px";