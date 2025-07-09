import { speakText, stopReading, pauseReading, resumeReading } from './tts.js';
import { highlightElement, removeHighlight } from './highlight.js';
import { updateToggleButtons, getControlElements, updatePlayPauseStopButtons } from './ui.js';
import { EXCLUDED_SELECTORS_BASE, EXCLUDED_SELECTORS_WITH_BUTTONS, SELECTORS_TO_READ } from '../config/constants.js';

let isReadingMode = false;
let readerEnabled = false;
let wasReadingMode = false;
export function setReaderEnabled(enabled) {
  readerEnabled = !!enabled;
  // Не меняем isReadingMode здесь
}

export function initReader() {
  const { toggleOnBtn, toggleOffBtn, controlsDiv, playBtn, pauseBtn, stopBtn } = getControlElements();
  controlsDiv.style.display = 'none';
  updateToggleButtons(false);
  updatePlayPauseStopButtons(false);

  toggleOnBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    isReadingMode = true;
    updateToggleButtons(isReadingMode);
  });
  toggleOffBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    isReadingMode = false;
    updateToggleButtons(isReadingMode);
    stopReading();
    removeHighlight();
  });

  playBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    updatePlayPauseStopButtons(true);
    // Если paused, но нет активного utterance, запускаем чтение заново
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      if (window.speechSynthesis.speaking) {
        resumeReading();
        return;
      }
      // если не speaking, значит было stop после pause — продолжаем как обычный play
    }
    wasReadingMode = isReadingMode;
    isReadingMode = false;
    updateToggleButtons(isReadingMode);
    removeHighlight();
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(EXCLUDED_SELECTORS_WITH_BUTTONS).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text, function () {
      if (wasReadingMode) {
        isReadingMode = true;
        updateToggleButtons(isReadingMode);
      }
      updatePlayPauseStopButtons(false);
    });
  });

  pauseBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    pauseReading();
  });

  stopBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    stopReading();
    updatePlayPauseStopButtons(false);
  });

  document.addEventListener('mouseover', function (e) {
    if (!readerEnabled || !isReadingMode) return;
    const target = e.target.closest(SELECTORS_TO_READ);
    if (!target || target.matches(EXCLUDED_SELECTORS_BASE) || !target.innerText.trim()) return;
    highlightElement(target);
    stopReading();
    speakText(target.innerText.trim());
  });

  document.addEventListener('mouseout', function (e) {
    removeHighlight();
  });
}
