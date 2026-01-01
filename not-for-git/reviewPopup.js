document.querySelectorAll('.review-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const parent = overlay.closest('.slide-left');

        if (overlay.classList.contains('bottom-overlay')) {
            parent.classList.toggle('bottom-open');
        }
    });
});