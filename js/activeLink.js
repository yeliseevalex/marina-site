document.addEventListener("headerLoaded", () => {
    const links = document.querySelectorAll(".div-links-header .link-header");
    const currentFile = window.location.pathname.split("/").pop(); // services.html

    links.forEach(link => {
        const hrefFile = link.getAttribute("href").split("/").pop(); // services.html

        if (hrefFile === currentFile) {
            link.classList.add("active-link");
        }
    });
});
