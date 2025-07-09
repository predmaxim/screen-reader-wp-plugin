export const EXCLUDED_SELECTORS_BASE =
  'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]';
export const EXCLUDED_SELECTORS_WITH_BUTTONS =
  EXCLUDED_SELECTORS_BASE +
  ', #screen-reader-controls, #screen-reader-toggle-on, #screen-reader-toggle-off, #screen-reader-play, #screen-reader-pause, #screen-reader-stop';
export const SELECTORS_TO_READ =
  'p, h1, h2, h3, h4, h5, h6, div, span, li, a, button';

// Глобальное состояние плагина
export const STATE = {
  READER_ENABLED: false,
  IS_READING_MODE: false,
  WAS_READING_MODE: false,
  MAIN_TOGGLE_ACTIVE: false, // основная кнопка
  ENABLED_VISIBLE: false, // для setControlsVisible
  ENABLED_FIXED: false,   // для setControlsFixed
  ENABLED_READER: false   // для setReaderEnabled
};

export const INITIAL_CONTROLS_VISIBLE = false;
export const INITIAL_CONTROLS_FIXED = false;
export const INITIAL_READER_ENABLED = false;