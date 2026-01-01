document.querySelectorAll('.slide-text-wrapper').forEach(wrapper => {
  const textEl = wrapper.querySelector('.slide-text');
  const readMore = wrapper.querySelector('.read-more-text');

  const fullText = textEl.textContent;
  const visibleChars = 500; // показываем первые 500 символов

  // Если текста меньше или равно 500 символов — скрываем кнопку
  if (fullText.length <= visibleChars) {
    readMore.style.display = 'none';
    return; // больше ничего не делаем
  }

  textEl.textContent = fullText.slice(0, visibleChars) + '...';

  readMore.addEventListener('click', () => {
    if (wrapper.classList.contains('expanded')) {
      textEl.textContent = fullText.slice(0, visibleChars) + '...';
      readMore.textContent = 'ЧИТАТЬ ДАЛЬШЕ';
      wrapper.classList.remove('expanded');
    } else {
      textEl.textContent = fullText;
      readMore.textContent = 'СВЕРНУТЬ';
      wrapper.classList.add('expanded');
    }
  });
});