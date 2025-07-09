import './screen-reader.css';
import { createControlsIfNeeded, createMainToggleIfNeeded, setControlsVisible, setControlsFixed, setMainToggleFixed } from './js/ui.js';
import { initReader, setReaderEnabled } from './js/reader.js';
import { STATE, INITIAL_READER_ENABLED } from './config/constants.js';

if (window.speechSynthesis) {
  window.speechSynthesis.cancel();
}

document.addEventListener('DOMContentLoaded', function () {
  createControlsIfNeeded();
  createMainToggleIfNeeded();
  setMainToggleFixed(STATE.ENABLED_FIXED);
  setControlsVisible(false);
  setReaderEnabled(INITIAL_READER_ENABLED);

  const mainToggle = document.getElementById('screen-reader-main-toggle');
  mainToggle.setAttribute('aria-pressed', 'false');
  mainToggle.addEventListener('click', function () {
    STATE.MAIN_TOGGLE_ACTIVE = !STATE.MAIN_TOGGLE_ACTIVE;
    setControlsVisible(STATE.MAIN_TOGGLE_ACTIVE);
    setReaderEnabled(STATE.MAIN_TOGGLE_ACTIVE);
    mainToggle.setAttribute('aria-pressed', STATE.MAIN_TOGGLE_ACTIVE ? 'true' : 'false');
    if (!STATE.MAIN_TOGGLE_ACTIVE && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  });

  initReader();
});
