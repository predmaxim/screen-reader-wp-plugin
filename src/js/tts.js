import { CONFIG } from "../config/constants";

let utterance = null;

export function isSpeechSupported() {
  return !!(window.speechSynthesis && window.speechSynthesis.getVoices().length);
}

export function speakText(text, onEndCallback) {
  if (!isSpeechSupported()) {
    alert(CONFIG.BUTTON_LABELS.WARNING_NOT_SUPPORTED);
    return;
  }
  window.speechSynthesis.cancel();
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = CONFIG.LANG === 'en' ? 'en-US' : 'ru-RU';
  if (typeof onEndCallback === 'function') {
    utterance.onend = onEndCallback;
  } else {
    utterance.onend = null;
  }
  window.speechSynthesis.speak(utterance);
}

export function stopReading() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function pauseReading() {
  if (window.speechSynthesis) {
    window.speechSynthesis.pause();
  }
}

export function resumeReading() {
  if (window.speechSynthesis && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}
