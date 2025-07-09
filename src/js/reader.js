import { speakText, stopReading, pauseReading, resumeReading } from './tts.js';
import { highlightElement, removeHighlight } from './highlight.js';
import { updateToggleButtons, getControlElements, updatePlayPauseStopButtons } from './ui.js';
import { STATE, CONFIG } from '../config/constants.js';

let isPaused = false;

export function setReaderEnabled(enabled) {
  STATE.READER_ENABLED = !!enabled;
  if (!STATE.READER_ENABLED) {
    STATE.IS_READING_MODE = false;
    updateToggleButtons(false);
    updatePlayPauseStopButtons(false);
    stopReading();
    removeHighlight();
  }
}

export function initReader() {
  const { toggleOnBtn, controlsDiv, playBtn, pauseBtn, stopBtn } = getControlElements();
  controlsDiv.style.display = 'none';
  updateToggleButtons(false);
  updatePlayPauseStopButtons(false);

  toggleOnBtn.addEventListener('click', function () {
    STATE.IS_READING_MODE = !STATE.IS_READING_MODE;
    updateToggleButtons(STATE.IS_READING_MODE);
    if (STATE.IS_READING_MODE) {
      stopReading();
      updatePlayPauseStopButtons(false);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
      playBtn.setAttribute('hidden', ''); // скрыть playBtn, если включён режим чтения по наведению
    } else {
      stopReading();
      removeHighlight();
      updatePlayPauseStopButtons(false);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
      playBtn.removeAttribute('hidden'); // показать playBtn, если режим выключен
    }
  });

  pauseBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    pauseReading();
    isPaused = true;
    playBtn.innerHTML = CONFIG.BUTTON_LABELS.RESUME;
    playBtn.classList.add('screen-reader-btn-pause');
    playBtn.removeAttribute('hidden');
    pauseBtn.setAttribute('hidden', '');
    stopBtn.removeAttribute('hidden');
    playBtn.onclick = null;
    playBtn.onclick = function () {
      if (!STATE.READER_ENABLED) return;
      if (isPaused && window.speechSynthesis && window.speechSynthesis.paused) {
        resumeReading();
        updatePlayPauseStopButtons(true);
        playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
        playBtn.classList.remove('screen-reader-btn-pause');
        playBtn.onclick = null;
        isPaused = false;
      }
    };
    toggleOnBtn.setAttribute('hidden', '');
  });

  playBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    if (isPaused && window.speechSynthesis && window.speechSynthesis.paused) {
      resumeReading();
      updatePlayPauseStopButtons(true);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.classList.remove('screen-reader-btn-pause');
      playBtn.onclick = null;
      isPaused = false;
      return;
    }
    STATE.IS_READING_MODE = false;
    updateToggleButtons(STATE.IS_READING_MODE);
    stopReading();
    if (window.speechSynthesis && window.speechSynthesis.speaking) return;
    updatePlayPauseStopButtons(true);
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      if (window.speechSynthesis.speaking) {
        resumeReading();
        return;
      }
    }
    STATE.WAS_READING_MODE = false;
    removeHighlight();
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(CONFIG.EXCLUDED_SELECTORS_WITH_BUTTONS).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text, function () {
      updatePlayPauseStopButtons(false);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.classList.remove('screen-reader-btn-pause');
      playBtn.onclick = null;
      playBtn.removeAttribute('hidden');
      toggleOnBtn.removeAttribute('hidden');
    });
    toggleOnBtn.setAttribute('hidden', ''); // скрыть toggleOnBtn, если включено чтение всей страницы
  });

  stopBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    stopReading();
    updatePlayPauseStopButtons(false);
    playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
    playBtn.classList.remove('screen-reader-btn-pause'); // сбросить жёлтый цвет
    playBtn.onclick = null;
    playBtn.removeAttribute('hidden');
    toggleOnBtn.removeAttribute('hidden');
    isPaused = false;
  });

  document.addEventListener('mouseover', function (e) {
    if (!STATE.READER_ENABLED || !STATE.IS_READING_MODE) return;
    const target = e.target.closest(CONFIG.SELECTORS_TO_READ);
    if (!target || target.matches(CONFIG.EXCLUDED_SELECTORS_BASE) || !target.innerText.trim()) return;
    highlightElement(target);
    // Добавляем красивую подсветку
    target.classList.add('screen-reader-highlight');
    stopReading();
    if (window.speechSynthesis && window.speechSynthesis.speaking) return;
    speakText(target.innerText.trim());
  });

  document.addEventListener('mouseout', function (e) {
    removeHighlight();
    // Убираем подсветку
    if (e.target) e.target.classList.remove('screen-reader-highlight');
  });
}
