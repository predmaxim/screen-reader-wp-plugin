<?php
/*
Plugin Name: Screen Reader
Description: Adds a floating control panel for text-to-speech and hover reading. Uses browser speechSynthesis API. Supports Chrome, Firefox, Safari, Edge.
Version: 1.0
Author: Maxim Predybaylo
Tags: accessibility, screen reader, tts, a11y, voice
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

function screen_reader_assets() {
    wp_enqueue_style(
        'screen-reader-css',
        plugin_dir_url(__FILE__) . 'screen-reader.css'
    );
    wp_enqueue_script(
        'screen-reader-js',
        plugin_dir_url(__FILE__) . 'screen-reader.js',
        array(),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'screen_reader_assets');