<?php
/*
Plugin Name: Screen Reader
Description: A plugin for reading text with control buttons and hover mode.
Version: 1.0
Author: Maxim Predybaylo
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

function screen_reader_add_ui() {
    echo '
    <div class="screen-reader-ui">
        <button id="screen-reader-toggle" class="screen-reader-btn">🔊 Включить чтение текста</button>
        <div id="screen-reader-controls" style="display:none;">
            <button id="screen-reader-play" class="screen-reader-btn">▶</button>
            <button id="screen-reader-pause" class="screen-reader-btn">⏸</button>
            <button id="screen-reader-stop" class="screen-reader-btn">⏹</button>
        </div>
    </div>
    ';
}
add_action('wp_footer', 'screen_reader_add_ui');