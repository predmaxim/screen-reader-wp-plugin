import { speakText, stopReading, pauseReading, resumeReading } from './tts.js';
import { highlightElement, removeHighlight } from './highlight.js';
import { updateToggleButtons, getControlElements } from './ui.js';
import { EXCLUDED_SELECTORS_BASE, EXCLUDED_SELECTORS_WITH_BUTTONS, SELECTORS_TO_READ } from '../config/constants.js';

let isReadingMode = false;
let readerEnabled = false;
export function setReaderEnabled(enabled) {
  readerEnabled = !!enabled;
  // Не меняем isReadingMode здесь
}

export function initReader() {
  const { toggleOnBtn, toggleOffBtn, controlsDiv, playBtn, pauseBtn, stopBtn } = getControlElements();
  controlsDiv.style.display = 'none';
  updateToggleButtons(false);

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
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      resumeReading();
      return;
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
    });
  });

  pauseBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    pauseReading();
  });

  stopBtn.addEventListener('click', function () {
    if (!readerEnabled) return;
    stopReading();
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
