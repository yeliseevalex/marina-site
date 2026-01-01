document.addEventListener("headerLoaded", () => {
    const links = document.querySelectorAll(".div-links-header .link-header");
    const currentPath = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active-link");
        }
    });
});
