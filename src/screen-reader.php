<?php
/*
Plugin Name: Screen Reader
Description: A plugin for reading text with control buttons and hover mode.
Version: 1.0
Author: Maxim Predybaylo
*/

<?php

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