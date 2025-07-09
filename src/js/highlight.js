let currentHighlight = null;

export function highlightElement(target) {
  removeHighlight();
  target.classList.add('highlight-text');
  currentHighlight = target;
}

export function removeHighlight() {
  if (currentHighlight) {
    currentHighlight.classList.remove('highlight-text');
    currentHighlight = null;
  }
}
