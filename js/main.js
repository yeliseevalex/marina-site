document.addEventListener("click", e => {
    if (e.target.matches("[data-setlang]")) {
        localStorage.setItem("lang", e.target.dataset.setlang);
        location.reload();
    }
});
