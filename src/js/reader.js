import { speakText, stopReading, pauseReading, resumeReading } from './tts.js';
import { highlightElement, removeHighlight } from './highlight.js';
import { updateToggleButtons, getControlElements, updatePlayPauseStopButtons } from './ui.js';
import { STATE, CONFIG } from '../config/constants.js';

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
      playBtn.textContent = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
    } else {
      stopReading();
      removeHighlight();
      updatePlayPauseStopButtons(false);
      playBtn.textContent = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
    }
  });

  playBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
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
      playBtn.textContent = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
    });
  });

  pauseBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    pauseReading();
    playBtn.textContent = CONFIG.BUTTON_LABELS.RESUME;
    playBtn.removeAttribute('hidden');
    pauseBtn.setAttribute('hidden', '');
    stopBtn.removeAttribute('hidden');
    playBtn.onclick = null;
    playBtn.onclick = function () {
      if (!STATE.READER_ENABLED) return;
      resumeReading();
      updatePlayPauseStopButtons(true);
      playBtn.textContent = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
    };
  });

  stopBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    stopReading();
    updatePlayPauseStopButtons(false);
    playBtn.textContent = CONFIG.BUTTON_LABELS.PLAY;
    playBtn.onclick = null;
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
