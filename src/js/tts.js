let utterance = null;

export function speakText(text, onEndCallback) {
  if (!window.speechSynthesis) {
    alert('Ваш браузер не поддерживает синтез речи!');
    return;
  }
  window.speechSynthesis.cancel();
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
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
