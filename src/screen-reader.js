import './screen-reader.css';

document.addEventListener('DOMContentLoaded', function () {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  let isReadingMode = false;
  let utterance = null;
  let currentHighlight = null;
  let wasReadingMode = false;
  const excludedSelectors = 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]';

  const toggleBtn = document.getElementById('screen-reader-toggle');
  const controlsDiv = document.getElementById('screen-reader-controls');
  const playBtn = document.getElementById('screen-reader-play');
  const pauseBtn = document.getElementById('screen-reader-pause');
  const stopBtn = document.getElementById('screen-reader-stop');

  controlsDiv.style.display = 'flex';

  toggleBtn.addEventListener('click', function () {
    isReadingMode = !isReadingMode;
    toggleBtn.textContent = isReadingMode ? '🔇 Выключить чтение' : '🔊 Включить чтение';
    if (!isReadingMode) {
      stopReading();
      removeHighlight();
    }
  });

  playBtn.addEventListener('click', function () {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      return;
    }
    wasReadingMode = isReadingMode;
    isReadingMode = false;
    toggleBtn.textContent = '🔊 Включить чтение';
    removeHighlight();
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(excludedSelectors).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text, function () {
      if (wasReadingMode) {
        isReadingMode = true;
        toggleBtn.textContent = '🔇 Выключить чтение';
      }
    });
  });

  pauseBtn.addEventListener('click', function () {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  });

  stopBtn.addEventListener('click', stopReading);

  document.addEventListener('mouseover', function (e) {
    if (!isReadingMode) return;
    const target = e.target.closest('p, h1, h2, h3, h4, h5, h6, div, span, li, a, button');
    if (!target || target.matches(excludedSelectors) || !target.innerText.trim()) return;
    removeHighlight();
    target.classList.add('highlight-text');
    currentHighlight = target;
    stopReading();
    speakText(target.innerText.trim());
  });

  document.addEventListener('mouseout', function (e) {
    if (currentHighlight && (!e.relatedTarget || !currentHighlight.contains(e.relatedTarget))) {
      removeHighlight();
    }
  });

  function speakText(text, onEndCallback) {
    if (!window.speechSynthesis) {
      alert('Ваш браузер не поддерживает синтез речи!');
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    if (typeof onEndCallback === 'function') {
      utterance.onend = onEndCallback;
    } else {
      utterance.onend = null;
    }
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