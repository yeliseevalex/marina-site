document.querySelectorAll('.review-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const parent = overlay.closest('.div-two-images');

        if (overlay.classList.contains('right-overlay')) {
            parent.classList.toggle('right-open');
            parent.classList.remove('left-open');
        }

        if (overlay.classList.contains('left-overlay')) {
            parent.classList.toggle('left-open');
            parent.classList.remove('right-open');
        }
    });
});