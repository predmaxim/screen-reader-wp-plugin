export const EXCLUDED_SELECTORS_BASE =
  'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]';
export const EXCLUDED_SELECTORS_WITH_BUTTONS =
  EXCLUDED_SELECTORS_BASE +
  ", #screen-reader-controls, #screen-reader-toggle-on, #screen-reader-toggle-off, #screen-reader-play, #screen-reader-pause, #screen-reader-stop";
export const SELECTORS_TO_READ =
  "p, h1, h2, h3, h4, h5, h6, div, span, li, a, button";
