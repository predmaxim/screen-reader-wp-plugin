import { speakText, stopReading, pauseReading, resumeReading } from './tts.js';
import { highlightElement, removeHighlight } from './highlight.js';
import { updateToggleButtons, getControlElements, updatePlayPauseStopButtons } from './ui.js';
import { EXCLUDED_SELECTORS_BASE, EXCLUDED_SELECTORS_WITH_BUTTONS, SELECTORS_TO_READ, STATE } from '../config/constants.js';

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
  const { toggleOnBtn, toggleOffBtn, controlsDiv, playBtn, pauseBtn, stopBtn } = getControlElements();
  controlsDiv.style.display = 'none';
  updateToggleButtons(false);
  updatePlayPauseStopButtons(false);

  toggleOnBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    STATE.IS_READING_MODE = true;
    updateToggleButtons(STATE.IS_READING_MODE);
  });
  toggleOffBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    STATE.IS_READING_MODE = false;
    updateToggleButtons(STATE.IS_READING_MODE);
    stopReading();
    removeHighlight();
  });

  playBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    updatePlayPauseStopButtons(true);
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      if (window.speechSynthesis.speaking) {
        resumeReading();
        return;
      }
    }
    STATE.WAS_READING_MODE = STATE.IS_READING_MODE;
    STATE.IS_READING_MODE = false;
    updateToggleButtons(STATE.IS_READING_MODE);
    removeHighlight();
    const mainContent = document.body.cloneNode(true);
    mainContent.querySelectorAll(EXCLUDED_SELECTORS_WITH_BUTTONS).forEach(el => el.remove());
    const text = mainContent.innerText.trim().replace(/\s+/g, ' ');
    speakText(text, function () {
      if (STATE.WAS_READING_MODE) {
        STATE.IS_READING_MODE = true;
        updateToggleButtons(STATE.IS_READING_MODE);
      }
      updatePlayPauseStopButtons(false);
    });
  });

  pauseBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    pauseReading();
    playBtn.textContent = '▶ Resume Reading';
    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = '';
    playBtn.onclick = function () {
      if (!STATE.READER_ENABLED) return;
      resumeReading();
      updatePlayPauseStopButtons(true);
      playBtn.textContent = '▶ Read Entire Page';
      playBtn.onclick = null;
    };
  });

  stopBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    stopReading();
    updatePlayPauseStopButtons(false);
    playBtn.textContent = '▶ Read Entire Page';
    playBtn.onclick = null;
  });

  document.addEventListener('mouseover', function (e) {
    if (!STATE.READER_ENABLED || !STATE.IS_READING_MODE) return;
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
