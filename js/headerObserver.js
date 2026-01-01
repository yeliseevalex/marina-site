document.addEventListener("DOMContentLoaded", () => {

    // Ждём появления header и section-1
    const waitForElements = () => {
        const header = document.querySelector(".header");
        const firstSection = document.querySelector(".section-1");

        if (!header || !firstSection) return; // Ждём

        // Когда элементы появились — запускаем наблюдатель
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        header.classList.remove("visible");
                    } else {
                        header.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(firstSection);

        // Выключаем наблюдение DOM (нам больше не нужно)
        mutationObserver.disconnect();
    };

    // Следим за изменениями DOM
    const mutationObserver = new MutationObserver(waitForElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // На случай если элементы уже есть
    waitForElements();
});