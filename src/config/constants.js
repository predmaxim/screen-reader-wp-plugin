// SVG-иконки вынесены в отдельный объект ICONS
export const ICONS = {
  TOGGLE_ON: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8V12H7L11 16V4L7 8H3Z" fill="currentColor"/></svg>',
  TOGGLE_ON_ACTIVE: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="#43a047"/><path d="M7 10.5L9 12.5L13 8.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  PLAY: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 16,10 6,16" fill="currentColor"/></svg>',
  PAUSE: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="3" height="12" fill="currentColor"/><rect x="11" y="4" width="3" height="12" fill="currentColor"/></svg>',
  RESUME: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 16,10 6,16" fill="currentColor"/></svg>',
  STOP: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="8" height="8" fill="currentColor"/></svg>',
  MAIN: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" fill="#1976d2"/><path d="M10 18V10L18 14L10 18Z" fill="#fff"/></svg>',
};

export const STATE = {
  READER_ENABLED: false,
  IS_READING_MODE: false,
  WAS_READING_MODE: false,
  MAIN_TOGGLE_ACTIVE: false,
  ENABLED_VISIBLE: false,
  INITIAL_READER_ENABLED: false,
  CONTROLS_VISIBLE: false,
  CONTROLS_FIXED: false,
};

export const CONFIG = {
  ENABLED_FIXED: true,
  SELECTORS_TO_READ: 'p, h1, h2, h3, h4, h5, h6, div, span, li, a, button',
  EXCLUDED_SELECTORS_BASE: 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]',
  EXCLUDED_SELECTORS_WITH_BUTTONS: 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"], #screen-reader-controls, #screen-reader-toggle-on, #screen-reader-play, #screen-reader-pause, #screen-reader-stop',
  HOVER_READ_DELAY: 500,
  BUTTON_LABELS: {
    TOGGLE_ON: ICONS.TOGGLE_ON + ' Hover Reading',
    TOGGLE_ON_ACTIVE: ICONS.TOGGLE_ON_ACTIVE + ' Hover Reading ON',
    PLAY: ICONS.PLAY + ' Read Entire Page',
    PAUSE: ICONS.PAUSE + ' Pause',
    RESUME: ICONS.RESUME + ' Resume Reading',
    STOP: ICONS.STOP + ' Stop',
    MAIN: ICONS.MAIN,
  },
};