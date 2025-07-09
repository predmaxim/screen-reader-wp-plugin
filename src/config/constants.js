export const ICONS = {
  TOGGLE_ON: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8V12H7L11 16V4L7 8H3Z" fill="currentColor"/></svg>',
  TOGGLE_ON_ACTIVE: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="#43a047"/><path d="M7 10.5L9 12.5L13 8.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  PLAY: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 16,10 6,16" fill="currentColor"/></svg>',
  PAUSE: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="3" height="12" fill="currentColor"/><rect x="11" y="4" width="3" height="12" fill="currentColor"/></svg>',
  RESUME: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 16,10 6,16" fill="currentColor"/></svg>',
  STOP: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="8" height="8" fill="currentColor"/></svg>',
  MAIN: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill=#FFF><path d="M216 260c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-44.112 35.888-80 80-80s80 35.888 80 80c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-13.234-10.767-24-24-24s-24 10.766-24 24zm24-176c-97.047 0-176 78.953-176 176 0 15.464 12.536 28 28 28s28-12.536 28-28c0-66.168 53.832-120 120-120s120 53.832 120 120c0 75.164-71.009 70.311-71.997 143.622L288 404c0 28.673-23.327 52-52 52-15.464 0-28 12.536-28 28s12.536 28 28 28c59.475 0 107.876-48.328 108-107.774.595-34.428 72-48.24 72-144.226 0-97.047-78.953-176-176-176zm268.485-52.201L480.2 3.515c-4.687-4.686-12.284-4.686-16.971 0L376.2 90.544c-4.686 4.686-4.686 12.284 0 16.971l28.285 28.285c4.686 4.686 12.284 4.686 16.97 0l87.03-87.029c4.687-4.688 4.687-12.286 0-16.972zM168.97 314.745c-4.686-4.686-12.284-4.686-16.97 0L3.515 463.23c-4.686 4.686-4.686 12.284 0 16.971L31.8 508.485c4.687 4.686 12.284 4.686 16.971 0L197.256 360c4.686-4.686 4.686-12.284 0-16.971l-28.286-28.284z"/></svg>',
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

export const BUTTON_LABELS_EN = {
  TOGGLE_ON: ICONS.TOGGLE_ON + ' Hover Reading',
  TOGGLE_ON_ACTIVE: ICONS.TOGGLE_ON_ACTIVE + ' Hover Reading ON',
  PLAY: ICONS.PLAY + ' Read Entire Page',
  PAUSE: ICONS.PAUSE + ' Pause',
  RESUME: ICONS.RESUME + ' Resume Reading',
  STOP: ICONS.STOP + ' Stop',
  MAIN: ICONS.MAIN,
  WARNING_NOT_SUPPORTED: 'Your browser does not support speech synthesis!',
};

export const BUTTON_LABELS_RU = {
  TOGGLE_ON: ICONS.TOGGLE_ON + ' Читать при наведении',
  TOGGLE_ON_ACTIVE: ICONS.TOGGLE_ON_ACTIVE + ' Читать при наведении ВКЛ',
  PLAY: ICONS.PLAY + ' Прочитать всю страницу',
  PAUSE: ICONS.PAUSE + ' Пауза',
  RESUME: ICONS.RESUME + ' Продолжить',
  STOP: ICONS.STOP + ' Стоп',
  MAIN: ICONS.MAIN,
  WARNING_NOT_SUPPORTED: 'Ваш браузер не поддерживает синтез речи!',
};

export const CONFIG = {
  ENABLED_FIXED: false,
  LANG: 'ru',
  SELECTORS_TO_READ: 'p, h1, h2, h3, h4, h5, h6, div, span, li, a, button',
  EXCLUDED_SELECTORS_BASE: 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"]',
  EXCLUDED_SELECTORS_WITH_BUTTONS: 'nav, menu, footer, script, style, .menu, .navbar, [aria-hidden="true"], #screen-reader-controls, #screen-reader-toggle-on, #screen-reader-play, #screen-reader-pause, #screen-reader-stop',
  HOVER_READ_DELAY: 400,
  get BUTTON_LABELS() {
    return this.LANG === 'ru' ? BUTTON_LABELS_RU : BUTTON_LABELS_EN;
  },
};