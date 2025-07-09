import './screen-reader.css';
import { createControlsIfNeeded, createMainToggleIfNeeded, setControlsVisible, setControlsFixed } from './js/ui.js';
import { initReader, setReaderEnabled } from './js/reader.js';

if (window.speechSynthesis) {
  window.speechSynthesis.cancel();
}

document.addEventListener('DOMContentLoaded', function () {
  createControlsIfNeeded();
  createMainToggleIfNeeded();
  setControlsVisible(false); // по умолчанию скрыто
  setControlsFixed(true);

  setReaderEnabled(false); // явно выключаем режим чтения при старте

  let enabled = false;
  const mainToggle = document.getElementById('screen-reader-main-toggle');
  mainToggle.setAttribute('aria-pressed', 'false');
  mainToggle.addEventListener('click', function () {
    enabled = !enabled;
    setControlsVisible(enabled);
    setControlsFixed(enabled);
    setReaderEnabled(enabled); // включаем/выключаем режим чтения
    mainToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    if (!enabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  });

  initReader();
});
