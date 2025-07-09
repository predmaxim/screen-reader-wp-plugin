import { CONFIG } from '../config/constants.js';

export function createControlsIfNeeded() {
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
}

export function getControlElements() {
  return {
    toggleOnBtn: document.getElementById('screen-reader-toggle-on'),
    toggleOffBtn: document.getElementById('screen-reader-toggle-off'),
    controlsDiv: document.getElementById('screen-reader-controls'),
    playBtn: document.getElementById('screen-reader-play'),
    pauseBtn: document.getElementById('screen-reader-pause'),
    stopBtn: document.getElementById('screen-reader-stop'),
  };
}

export function updateToggleButtons(isReadingMode) {
  const { toggleOnBtn, toggleOffBtn } = getControlElements();
  if (isReadingMode) {
    toggleOnBtn.style.display = 'none';
    toggleOffBtn.style.display = '';
  } else {
    toggleOnBtn.style.display = '';
    toggleOffBtn.style.display = 'none';
  }
}

export function createMainToggleIfNeeded() {
  if (!document.getElementById('screen-reader-main-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'screen-reader-main-toggle';
    btn.className = 'screen-reader-main-toggle';
    btn.type = 'button';
    btn.innerHTML = '🦻';
    if (!CONFIG.ENABLED_FIXED) {
      btn.classList.add('screen-reader-main-toggle-static');
    }
    document.body.appendChild(btn);
  }
}

export function setMainToggleFixed(fixed) {
  const btn = document.getElementById('screen-reader-main-toggle');
  if (btn) {
    if (fixed) {
      btn.classList.remove('screen-reader-main-toggle-static');
      btn.classList.add('screen-reader-main-toggle');
    } else {
      btn.classList.remove('screen-reader-main-toggle');
      btn.classList.add('screen-reader-main-toggle-static');
    }
  }
}

export function setControlsVisible(visible) {
  const controlsDiv = document.getElementById('screen-reader-controls');
  if (controlsDiv) {
    controlsDiv.style.display = visible ? 'flex' : 'none';
    if (CONFIG.ENABLED_FIXED) {
      controlsDiv.classList.add('screen-reader-controls-absolute');
    } else {
      controlsDiv.classList.remove('screen-reader-controls-absolute');
    }
  }
}

export function updatePlayPauseStopButtons(isPlaying) {
  const playBtn = document.getElementById('screen-reader-play');
  const pauseBtn = document.getElementById('screen-reader-pause');
  const stopBtn = document.getElementById('screen-reader-stop');
  if (isPlaying) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = '';
    stopBtn.style.display = '';
  } else {
    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
  }
}
