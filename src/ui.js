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

export function createMainToggleIfNeeded() {
  if (!document.getElementById('screen-reader-main-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'screen-reader-main-toggle';
    btn.className = 'screen-reader-main-toggle';
    btn.type = 'button';
    btn.innerHTML = '🦻';
    document.body.appendChild(btn);
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

export function setControlsVisible(visible) {
  const controlsDiv = document.getElementById('screen-reader-controls');
  if (controlsDiv) {
    controlsDiv.style.display = visible ? 'flex' : 'none';
  }
}

export function setControlsFixed(fixed) {
  const controlsDiv = document.getElementById('screen-reader-controls');
  if (controlsDiv) {
    controlsDiv.classList.toggle('screen-reader-fixed', fixed);
  }
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
