const popupBtn = document.getElementById("btn-open-popup");
    const popupEl = document.getElementById("portfolioPopup");
    const popupCloseBtn = document.querySelector(".popup-close");

    popupBtn.addEventListener("click", () => {
        popupEl.classList.add("active");
    });

    popupCloseBtn.addEventListener("click", () => {
        popupEl.classList.remove("active");
    });

    popupEl.addEventListener("click", (e) => {
        if (e.target === popupEl) popupEl.classList.remove("active");
    });