'use strict';

var core = require('@tauri-apps/api/core');

async function setStatusBarColor(hexColor) {
    await core.invoke('plugin:blinko|setcolor', {
        payload: {
            hex: hexColor,
        },
    });
    return null;
}

exports.setStatusBarColor = setStatusBarColor;
