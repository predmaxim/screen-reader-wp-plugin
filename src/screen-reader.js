import './screen-reader.css';

document.addEventListener('DOMContentLoaded', function () {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Генерация панели управления, если её нет
  if (!document.getElementById('screen-reader-controls')) {
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'screen-reader-controls';
    controlsDiv.innerHTML = `
      <button id="screen-reader-toggle-on" class="screen-reader-btn">🔊 Enable Hover Reading</button>
      <button id="screen-reader-toggle-off" class="screen-reader-btn">🔇 Disable Hover Reading</button>
      <button id="screen-reader-play" class="screen-reader-btn">▶ Read Entire Page</button>
      <button id="screen-reader-pause" class="screen-reader-btn">⏸ Pause</button>
      <button id="screen-reader-stop" class="screen-reader-btn">⏹ Stop</button>
    `;
    document.body.insertBefore(controlsDiv, document.body.firstChild);
  }

  let isReadingMode = false;
  let utterance = null;
  let currentHighlight = null;
  let wasReadingMode = false;
  const excludedSelectorsBase = 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]';
  const excludedSelectorsWithButtons = excludedSelectorsBase + ', #screen-reader-controls, #screen-reader-toggle-on, #screen-reader-toggle-off, #screen-reader-play, #screen-reader-pause, #screen-reader-stop';

  const toggleOnBtn = document.getElementById('screen-reader-toggle-on');
  const toggleOffBtn = document.getElementById('screen-reader-toggle-off');
  const controlsDiv = document.getElementById('screen-reader-controls');
  const playBtn = document.getElementById('screen-reader-play');
  const pauseBtn = document.getElementById('screen-reader-pause');
  const stopBtn = document.getElementById('screen-reader-stop');

  controlsDiv.style.display = 'flex';

  function updateToggleButtons() {
    if (isReadingMode) {
      toggleOnBtn.style.display = 'none';
      toggleOffBtn.style.display = '';
    } else {
      toggleOnBtn.style.display = '';
      toggleOffBtn.style.display = 'none';
    }
  }
  updateToggleButtons();

  toggleOnBtn.addEventListener('click', function () {
    isReadingMode = true;
    updateToggleButtons();
  });
  toggleOffBtn.addEventListener('click', function () {
    isReadingMode = false;
    updateToggleButtons();
    stopReading();
    removeHighlight();
  });

  playBtn.addEventListener('click', function () {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      return;
    }
    wasReadingMode = isReadingMode;
    isReadingMode = false;
    updateToggleButtons();
    removeHighlight();
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(excludedSelectorsWithButtons).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text, function () {
      if (wasReadingMode) {
        isReadingMode = true;
        updateToggleButtons();
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
    if (!target || target.matches(excludedSelectorsBase) || !target.innerText.trim()) return;
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