document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "ru";

    // Получаем имя страницы: about.html → about
    const page = location.pathname.split("/").pop().replace(".html", "");

    loadTranslations(page, lang);
});

function loadTranslations(page, lang) {
    fetch(`../lang/${page}/${lang}.json`)
        .then(res => res.json())
        .then(dict => {
            applyTranslations(dict);
            applyFormPlaceholders(dict); // подставляем placeholder’ы после загрузки
        })
        .catch(err => console.error("Translation load error:", err));
}

function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
}

function applyFormPlaceholders(dict) {
    // Проверяем, что элементы есть на странице
    const nameInput = document.getElementById("nameInput");
    const contactInput = document.getElementById("contactInput");
    const eventInput = document.getElementById("eventInput");
    const formButton = document.getElementById("formButton");

    if (nameInput && dict.form_name_placeholder) nameInput.placeholder = dict.form_name_placeholder;
    if (contactInput && dict.form_contact_placeholder) contactInput.placeholder = dict.form_contact_placeholder;
    if (eventInput && dict.form_event_placeholder) eventInput.placeholder = dict.form_event_placeholder;
    if (formButton && dict.form_button) formButton.textContent = dict.form_button;
}
