import { speakText, stopReading, pauseReading, resumeReading, isSpeechSupported } from './tts.js';
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
    if (!isSpeechSupported()) {
      alert(CONFIG.BUTTON_LABELS.WARNING_NOT_SUPPORTED);
      return;
    }
    STATE.IS_READING_MODE = !STATE.IS_READING_MODE;
    updateToggleButtons(STATE.IS_READING_MODE);
    if (STATE.IS_READING_MODE) {
      stopReading();
      updatePlayPauseStopButtons(false);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
      playBtn.setAttribute('hidden', '');
    } else {
      stopReading();
      removeHighlight();
      updatePlayPauseStopButtons(false);
      playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
      playBtn.onclick = null;
      playBtn.removeAttribute('hidden');
    }
  });

  pauseBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    if (!isSpeechSupported()) {
      alert(CONFIG.BUTTON_LABELS.WARNING_NOT_SUPPORTED);
      return;
    }
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
      if (!isSpeechSupported()) {
        alert(CONFIG.BUTTON_LABELS.WARNING_NOT_SUPPORTED);
        return;
      }
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
    if (!isSpeechSupported()) {
      alert(CONFIG.BUTTON_LABELS.WARNING_NOT_SUPPORTED);
      return;
    }
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
    toggleOnBtn.setAttribute('hidden', '');
  });

  stopBtn.addEventListener('click', function () {
    if (!STATE.READER_ENABLED) return;
    stopReading();
    updatePlayPauseStopButtons(false);
    playBtn.innerHTML = CONFIG.BUTTON_LABELS.PLAY;
    playBtn.classList.remove('screen-reader-btn-pause');
    playBtn.onclick = null;
    playBtn.removeAttribute('hidden');
    toggleOnBtn.removeAttribute('hidden');
    isPaused = false;
  });

  let hoverTimeout = null;
  let lastHovered = null;
  document.addEventListener('mouseover', function (e) {
    if (!STATE.READER_ENABLED || !STATE.IS_READING_MODE) return;
    const target = e.target.closest(CONFIG.SELECTORS_TO_READ);
    if (!target || target.matches(CONFIG.EXCLUDED_SELECTORS_BASE) || !target.innerText.trim()) return;
    if (lastHovered === target) return;
    lastHovered = target;
    highlightElement(target);
    target.classList.add('screen-reader-highlight');
    if (hoverTimeout) clearTimeout(hoverTimeout);
    stopReading();
    hoverTimeout = setTimeout(() => {
      if (lastHovered === target) {
        speakText(target.innerText.trim());
      }
    }, CONFIG.HOVER_READ_DELAY);
  });

  document.addEventListener('mouseout', function (e) {
    removeHighlight();
    if (e.target) e.target.classList.remove('screen-reader-highlight');
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    lastHovered = null;
  });
}
