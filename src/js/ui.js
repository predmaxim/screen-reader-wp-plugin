import { CONFIG } from '../config/constants.js';

export function createControlsIfNeeded() {
  if (!document.getElementById('screen-reader-controls')) {
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'screen-reader-controls';
    controlsDiv.className = 'screen-reader-controls';
    controlsDiv.innerHTML = `
      <button id="screen-reader-toggle-on" class="screen-reader-btn">${CONFIG.BUTTON_LABELS.TOGGLE_ON}</button>
      <button id="screen-reader-play" class="screen-reader-btn">${CONFIG.BUTTON_LABELS.PLAY}</button>
      <button id="screen-reader-pause" class="screen-reader-btn">${CONFIG.BUTTON_LABELS.PAUSE}</button>
      <button id="screen-reader-stop" class="screen-reader-btn">${CONFIG.BUTTON_LABELS.STOP}</button>
    `;
    document.body.insertBefore(controlsDiv, document.body.firstChild);
  }
}

export function getControlElements() {
  return {
    toggleOnBtn: document.getElementById('screen-reader-toggle-on'),
    controlsDiv: document.getElementById('screen-reader-controls'),
    playBtn: document.getElementById('screen-reader-play'),
    pauseBtn: document.getElementById('screen-reader-pause'),
    stopBtn: document.getElementById('screen-reader-stop'),
  };
}

export function updateToggleButtons(isReadingMode) {
  const { toggleOnBtn } = getControlElements();
  if (isReadingMode) {
    toggleOnBtn.innerHTML = CONFIG.BUTTON_LABELS.TOGGLE_ON_ACTIVE;
    toggleOnBtn.classList.add('screen-reader-btn-active');
  } else {
    toggleOnBtn.innerHTML = CONFIG.BUTTON_LABELS.TOGGLE_ON;
    toggleOnBtn.classList.remove('screen-reader-btn-active');
  }
}

export function createMainToggleIfNeeded() {
  if (!document.getElementById('screen-reader-main-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'screen-reader-main-toggle';
    btn.className = 'screen-reader-main-toggle';
    btn.type = 'button';
    btn.innerHTML = CONFIG.BUTTON_LABELS.MAIN;
    if (!CONFIG.ENABLED_FIXED) {
      btn.classList.add('screen-reader-main-toggle-static');
    }
    btn.addEventListener('click', () => {
      if (typeof window.setReaderEnabled === 'function') {
        window.setReaderEnabled(!STATE.READER_ENABLED);
      }
    });
    document.body.appendChild(btn);
  }
}

export function setMainToggleFixed(fixed) {
  const btn = document.getElementById('screen-reader-main-toggle');
  if (btn) {
    if (fixed) {
      btn.classList.remove('screen-reader-main-toggle-static');
    } else {
      btn.classList.add('screen-reader-main-toggle-static');
    }
  }
}

export function setControlsVisible(visible) {
  const controlsDiv = document.getElementById('screen-reader-controls');
  if (controlsDiv) {
    controlsDiv.style.display = visible ? 'flex' : 'none';
    controlsDiv.classList.remove('screen-reader-controls-fixed', 'screen-reader-controls-static', 'screen-reader-controls-absolute');
    if (CONFIG.ENABLED_FIXED) {
      controlsDiv.classList.add('screen-reader-controls-fixed');
    } else {
      controlsDiv.classList.add('screen-reader-controls-static');
    }
  }
}

export function updatePlayPauseStopButtons(isPlaying) {
  const playBtn = document.getElementById('screen-reader-play');
  const pauseBtn = document.getElementById('screen-reader-pause');
  const stopBtn = document.getElementById('screen-reader-stop');
  if (isPlaying) {
    playBtn.setAttribute('hidden', '');
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
  } else {
    playBtn.removeAttribute('hidden');
    pauseBtn.setAttribute('hidden', '');
    stopBtn.setAttribute('hidden', '');
  }
}
