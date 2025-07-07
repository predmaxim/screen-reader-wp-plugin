document.addEventListener('DOMContentLoaded', function () {
  let isReadingMode = false;
  let utterance = null;
  let currentHighlight = null;
  const excludedSelectors = 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]';

  // Элементы UI
  const toggleBtn = document.getElementById('text-reader-toggle');
  const controlsDiv = document.getElementById('text-reader-controls');
  const playBtn = document.getElementById('text-reader-play');
  const pauseBtn = document.getElementById('text-reader-pause');
  const stopBtn = document.getElementById('text-reader-stop');

  // Включение/выключение режима чтения
  toggleBtn.addEventListener('click', function () {
    isReadingMode = !isReadingMode;
    toggleBtn.textContent = isReadingMode ? '🔇 Выключить чтение' : '🔊 Включить чтение';
    controlsDiv.style.display = isReadingMode ? 'block' : 'none';

    if (!isReadingMode) {
      stopReading();
      removeHighlight();
    }
  });

  // Чтение всей страницы (исключая ненужные элементы)
  playBtn.addEventListener('click', function () {
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(excludedSelectors).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text);
  });

  pauseBtn.addEventListener('click', function () {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  });

  stopBtn.addEventListener('click', stopReading);

  // Чтение при наведении (с прерыванием текущего)
  document.addEventListener('mouseover', function (e) {
    if (!isReadingMode) return;

    const target = e.target.closest('p, h1, h2, h3, h4, h5, h6, div, span, li, a, button'); // Проверяем только текстовые элементы
    if (!target || target.matches(excludedSelectors) || !target.innerText.trim()) return;

    // Удаляем подсветку с предыдущего элемента
    removeHighlight();

    // Подсвечиваем новый
    target.classList.add('highlight-text');
    currentHighlight = target;

    // Прерываем текущее чтение и начинаем новое
    stopReading();
    speakText(target.innerText.trim());
  });

  // Убираем подсветку при уходе курсора
  document.addEventListener('mouseout', function (e) {
    if (currentHighlight && !e.relatedTarget || !currentHighlight.contains(e.relatedTarget)) {
      removeHighlight();
    }
  });

  // Функции для речи и подсветки
  function speakText(text) {
    if (!window.speechSynthesis) {
      alert('Ваш браузер не поддерживает синтез речи!');
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
  }

  function stopReading() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function removeHighlight() {
    if (currentHighlight) {
      currentHighlight.classList.remove('highlight-text');
      currentHighlight = null;
    }
  }
});