let currentHighlight = null;

export function highlightElement(target) {
  if (currentHighlight) {
    currentHighlight.classList.remove('screen-reader-highlight');
  }
  currentHighlight = target;
  currentHighlight.classList.add('screen-reader-highlight');
}

export function removeHighlight() {
  if (currentHighlight) {
    currentHighlight.classList.remove('screen-reader-highlight');
    currentHighlight = null;
  }
}
