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
  BUTTON_LABELS: {
    TOGGLE_ON: '🔊 Hover Reading',
    TOGGLE_ON_ACTIVE: '🟢 Hover Reading ON',
    PLAY: '▶ Read Entire Page',
    PAUSE: '⏸ Pause',
    RESUME: '▶ Resume Reading',
    STOP: '⏹ Stop',
    MAIN: '🦻',
  },
};