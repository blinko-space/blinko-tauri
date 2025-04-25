import { invoke } from '@tauri-apps/api/core';

async function setStatusBarColor(hexColor) {
    await invoke('plugin:blinko|setcolor', {
        payload: {
            hex: hexColor,
        },
    });
    return null;
}

export { setStatusBarColor };
