# README

[Русская версия](README.ru.md)

This plugin adds screen reader functionality to your WordPress site.

![Plugin demo](example.webp)

## Features

- Read text on mouse hover ("Read on hover" mode)
- Playback controls: all buttons (Enable/Disable hover reading, Read entire page, Pause, Stop) are always visible in a single row
- Read the entire page (temporarily disables hover reading, then restores it)
- Pause and resume reading from the same place
- Stops reading when switching to a new element or pressing Stop
- Automatically stops playback on page reload
- Russian language support
- Excludes unnecessary elements (navigation, menus, footers)

## Development & Testing

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm start      # Launches webpack-dev-server on port 9000
```

### Production build (in progress)

```bash
npm run build
```

### Testing

1. Build the project: `npm run dev`
2. Open `http://localhost:9000` in your browser
3. All control buttons are visible at the top of the page
4. "🔊 Enable reading" — toggles hover reading mode
5. "▶️ Read entire page" — reads all text, temporarily disabling hover mode
6. "⏸ Pause" — pauses reading, pressing "Read entire page" again resumes from the same place
7. "⏹ Stop" — completely stops reading
8. Playback always stops on page reload

## Project files

- `src/screen-reader.js` — Main plugin logic
- `src/screen-reader.css` — Plugin styles
- `src/screen-reader.php` — WordPress PHP integration
- `test_page/index.html` — Test page
- `webpack.config.js` — Build configuration

## Build output structure

After building, the `test_page/` folder will contain `screen-reader.bundle.js` with all JavaScript and CSS code included.

## TODO:
- Implement a build script to package the plugin into a zip file.
